"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePatch = void 0;
const chalk_1 = __importDefault(require("chalk"));
const path_1 = require("./path");
const spawnSafe_1 = require("./spawnSafe");
const filterFiles_1 = require("./filterFiles");
const fs_extra_1 = require("fs-extra");
const rimraf_1 = require("rimraf");
const fs_extra_2 = require("fs-extra");
const tmp_1 = require("tmp");
const patchFs_1 = require("./patchFs");
const PackageDetails_1 = require("./PackageDetails");
const resolveRelativeFileDependencies_1 = require("./resolveRelativeFileDependencies");
const getPackageResolution_1 = require("./getPackageResolution");
const parse_1 = require("./patch/parse");
const zlib_1 = require("zlib");
const getPackageVersion_1 = require("./getPackageVersion");
const createIssue_1 = require("./createIssue");
function printNoPackageFoundError(packageName, packageJsonPath) {
    console.error(`No such package ${packageName}

  File not found: ${packageJsonPath}`);
}
function makePatch({ packagePathSpecifier, appPath, packageManager, includePaths, excludePaths, patchDir, createIssue, }) {
    const packageDetails = PackageDetails_1.getPatchDetailsFromCliString(packagePathSpecifier);
    if (!packageDetails) {
        console.error("No such package", packagePathSpecifier);
        return;
    }
    const appPackageJson = require(path_1.join(appPath, "package.json"));
    const packagePath = path_1.join(appPath, packageDetails.path);
    const packageJsonPath = path_1.join(packagePath, "package.json");
    if (!fs_extra_1.existsSync(packageJsonPath)) {
        printNoPackageFoundError(packagePathSpecifier, packageJsonPath);
        process.exit(1);
    }
    const tmpRepo = tmp_1.dirSync({ unsafeCleanup: true });
    const tmpRepoPackagePath = path_1.join(tmpRepo.name, packageDetails.path);
    const tmpRepoNpmRoot = tmpRepoPackagePath.slice(0, -`/node_modules/${packageDetails.name}`.length);
    const tmpRepoPackageJsonPath = path_1.join(tmpRepoNpmRoot, "package.json");
    try {
        const patchesDir = path_1.resolve(path_1.join(appPath, patchDir));
        console.info(chalk_1.default.grey("•"), "Creating temporary folder");
        // make a blank package.json
        fs_extra_1.mkdirpSync(tmpRepoNpmRoot);
        fs_extra_1.writeFileSync(tmpRepoPackageJsonPath, JSON.stringify({
            dependencies: {
                [packageDetails.name]: getPackageResolution_1.getPackageResolution({
                    packageDetails,
                    packageManager,
                    appPath,
                }),
            },
            resolutions: resolveRelativeFileDependencies_1.resolveRelativeFileDependencies(appPath, appPackageJson.resolutions || {}),
        }));
        const packageVersion = getPackageVersion_1.getPackageVersion(path_1.join(path_1.resolve(packageDetails.path), "package.json"));
        [".npmrc", ".yarnrc"].forEach((rcFile) => {
            const rcPath = path_1.join(appPath, rcFile);
            if (fs_extra_1.existsSync(rcPath)) {
                fs_extra_2.copySync(rcPath, path_1.join(tmpRepo.name, rcFile), { dereference: true });
            }
        });
        if (packageManager === "yarn") {
            console.info(chalk_1.default.grey("•"), `Installing ${packageDetails.name}@${packageVersion} with yarn`);
            try {
                // try first without ignoring scripts in case they are required
                // this works in 99.99% of cases
                spawnSafe_1.spawnSafeSync(`yarn`, ["install", "--ignore-engines"], {
                    cwd: tmpRepoNpmRoot,
                    logStdErrOnError: false,
                });
            }
            catch (e) {
                // try again while ignoring scripts in case the script depends on
                // an implicit context which we havn't reproduced
                spawnSafe_1.spawnSafeSync(`yarn`, ["install", "--ignore-engines", "--ignore-scripts"], {
                    cwd: tmpRepoNpmRoot,
                });
            }
        }
        else {
            console.info(chalk_1.default.grey("•"), `Installing ${packageDetails.name}@${packageVersion} with npm`);
            try {
                // try first without ignoring scripts in case they are required
                // this works in 99.99% of cases
                spawnSafe_1.spawnSafeSync(`npm`, ["i", "--force"], {
                    cwd: tmpRepoNpmRoot,
                    logStdErrOnError: false,
                    stdio: "ignore",
                });
            }
            catch (e) {
                // try again while ignoring scripts in case the script depends on
                // an implicit context which we havn't reproduced
                spawnSafe_1.spawnSafeSync(`npm`, ["i", "--ignore-scripts", "--force"], {
                    cwd: tmpRepoNpmRoot,
                    stdio: "ignore",
                });
            }
        }
        const git = (...args) => spawnSafe_1.spawnSafeSync("git", args, {
            cwd: tmpRepo.name,
            env: Object.assign(Object.assign({}, process.env), { HOME: tmpRepo.name }),
            maxBuffer: 1024 * 1024 * 100,
        });
        // remove nested node_modules just to be safe
        rimraf_1.sync(path_1.join(tmpRepoPackagePath, "node_modules"));
        // remove .git just to be safe
        rimraf_1.sync(path_1.join(tmpRepoPackagePath, ".git"));
        // commit the package
        console.info(chalk_1.default.grey("•"), "Diffing your files with clean files");
        fs_extra_1.writeFileSync(path_1.join(tmpRepo.name, ".gitignore"), "!/node_modules\n\n");
        git("init");
        git("config", "--local", "user.name", "patch-package");
        git("config", "--local", "user.email", "patch@pack.age");
        // remove ignored files first
        filterFiles_1.removeIgnoredFiles(tmpRepoPackagePath, includePaths, excludePaths);
        git("add", "-f", packageDetails.path);
        git("commit", "--allow-empty", "-m", "init");
        // replace package with user's version
        rimraf_1.sync(tmpRepoPackagePath);
        // pnpm installs packages as symlinks, copySync would copy only the symlink
        fs_extra_2.copySync(fs_extra_1.realpathSync(packagePath), tmpRepoPackagePath);
        // remove nested node_modules just to be safe
        rimraf_1.sync(path_1.join(tmpRepoPackagePath, "node_modules"));
        // remove .git just to be safe
        rimraf_1.sync(path_1.join(tmpRepoPackagePath, ".git"));
        // also remove ignored files like before
        filterFiles_1.removeIgnoredFiles(tmpRepoPackagePath, includePaths, excludePaths);
        // stage all files
        git("add", "-f", packageDetails.path);
        // get diff of changes
        const diffResult = git("diff", "--cached", "--no-color", "--ignore-space-at-eol", "--no-ext-diff", "--src-prefix=a/", "--dst-prefix=b/");
        if (diffResult.stdout.length === 0) {
            console.warn(`⁉️  Not creating patch file for package '${packagePathSpecifier}'`);
            console.warn(`⁉️  There don't appear to be any changes.`);
            process.exit(1);
            return;
        }
        try {
            parse_1.parsePatchFile(diffResult.stdout.toString());
        }
        catch (e) {
            if (e.message.includes("Unexpected file mode string: 120000")) {
                console.error(`
⛔️ ${chalk_1.default.red.bold("ERROR")}

  Your changes involve creating symlinks. patch-package does not yet support
  symlinks.
  
  ️Please use ${chalk_1.default.bold("--include")} and/or ${chalk_1.default.bold("--exclude")} to narrow the scope of your patch if
  this was unintentional.
`);
            }
            else {
                const outPath = "./patch-package-error.json.gz";
                fs_extra_1.writeFileSync(outPath, zlib_1.gzipSync(JSON.stringify({
                    error: { message: e.message, stack: e.stack },
                    patch: diffResult.stdout.toString(),
                })));
                console.error(`
⛔️ ${chalk_1.default.red.bold("ERROR")}
        
  patch-package was unable to read the patch-file made by git. This should not
  happen.
  
  A diagnostic file was written to
  
    ${outPath}
  
  Please attach it to a github issue
  
    https://github.com/ds300/patch-package/issues/new?title=New+patch+parse+failed&body=Please+attach+the+diagnostic+file+by+dragging+it+into+here+🙏
  
  Note that this diagnostic file will contain code from the package you were
  attempting to patch.

`);
            }
            process.exit(1);
            return;
        }
        // maybe delete existing
        patchFs_1.getPatchFiles(patchDir).forEach((filename) => {
            const deets = PackageDetails_1.getPackageDetailsFromPatchFilename(filename);
            if (deets && deets.path === packageDetails.path) {
                fs_extra_1.unlinkSync(path_1.join(patchDir, filename));
            }
        });
        const patchFileName = createPatchFileName({
            packageDetails,
            packageVersion,
        });
        const patchPath = path_1.join(patchesDir, patchFileName);
        if (!fs_extra_1.existsSync(path_1.dirname(patchPath))) {
            // scoped package
            fs_extra_1.mkdirSync(path_1.dirname(patchPath));
        }
        fs_extra_1.writeFileSync(patchPath, diffResult.stdout);
        console.log(`${chalk_1.default.green("✔")} Created file ${path_1.join(patchDir, patchFileName)}\n`);
        if (createIssue) {
            createIssue_1.openIssueCreationLink({
                packageDetails,
                patchFileContents: diffResult.stdout.toString(),
                packageVersion,
            });
        }
        else {
            createIssue_1.maybePrintIssueCreationPrompt(packageDetails, packageManager);
        }
    }
    catch (e) {
        console.error(e);
        throw e;
    }
    finally {
        tmpRepo.removeCallback();
    }
}
exports.makePatch = makePatch;
function createPatchFileName({ packageDetails, packageVersion, }) {
    const packageNames = packageDetails.packageNames
        .map((name) => name.replace(/\//g, "+"))
        .join("++");
    return `${packageNames}+${packageVersion}.patch`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFrZVBhdGNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21ha2VQYXRjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrREFBeUI7QUFDekIsaUNBQStDO0FBQy9DLDJDQUEyQztBQUUzQywrQ0FBa0Q7QUFDbEQsdUNBT2lCO0FBQ2pCLG1DQUF1QztBQUN2Qyx1Q0FBbUM7QUFDbkMsNkJBQTZCO0FBQzdCLHVDQUF5QztBQUN6QyxxREFJeUI7QUFDekIsdUZBQW1GO0FBQ25GLGlFQUE2RDtBQUM3RCx5Q0FBOEM7QUFDOUMsK0JBQStCO0FBQy9CLDJEQUF1RDtBQUN2RCwrQ0FHc0I7QUFFdEIsU0FBUyx3QkFBd0IsQ0FDL0IsV0FBbUIsRUFDbkIsZUFBdUI7SUFFdkIsT0FBTyxDQUFDLEtBQUssQ0FDWCxtQkFBbUIsV0FBVzs7b0JBRWQsZUFBZSxFQUFFLENBQ2xDLENBQUE7QUFDSCxDQUFDO0FBRUQsU0FBZ0IsU0FBUyxDQUFDLEVBQ3hCLG9CQUFvQixFQUNwQixPQUFPLEVBQ1AsY0FBYyxFQUNkLFlBQVksRUFDWixZQUFZLEVBQ1osUUFBUSxFQUNSLFdBQVcsR0FTWjtJQUNDLE1BQU0sY0FBYyxHQUFHLDZDQUE0QixDQUFDLG9CQUFvQixDQUFDLENBQUE7SUFFekUsSUFBSSxDQUFDLGNBQWMsRUFBRTtRQUNuQixPQUFPLENBQUMsS0FBSyxDQUFDLGlCQUFpQixFQUFFLG9CQUFvQixDQUFDLENBQUE7UUFDdEQsT0FBTTtLQUNQO0lBQ0QsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLFdBQUksQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQTtJQUM3RCxNQUFNLFdBQVcsR0FBRyxXQUFJLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN0RCxNQUFNLGVBQWUsR0FBRyxXQUFJLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQyxDQUFBO0lBRXpELElBQUksQ0FBQyxxQkFBVSxD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TTtZQUNMLDJDQUE2QixDQUFDLGNBQWMsRUFBRSxjQUFjLENBQUMsQ0FBQTtTQUM5RDtLQUNGO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2hCLE1BQU0sQ0FBQyxDQUFBO0tBQ1I7WUFBUztRQUNSLE9BQU8sQ0FBQyxjQUFjLEVBQUUsQ0FBQTtLQUN6QjtBQUNILENBQUM7QUFsUkQsOEJBa1JDO0FBRUQsU0FBUyxtQkFBbUIsQ0FBQyxFQUMzQixjQUFjLEVBQ2QsY0FBYyxHQUlmO0lBQ0MsTUFBTSxZQUFZLEdBQUcsY0FBYyxDQUFDLFlBQVk7U0FDN0MsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztTQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7SUFFYixPQUFPLEdBQUcsWUFBWSxJQUFJLGNBQWMsUUFBUSxDQUFBO0FBQ2xELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhbGsgZnJvbSBcImNoYWxrXCJcbmltcG9ydCB7IGpvaW4sIGRpcm5hbWUsIHJlc29sdmUgfSBmcm9tIFwiLi9wYXRoXCJcbmltcG9ydCB7IHNwYXduU2FmZVN5bmMgfSBmcm9tIFwiLi9zcGF3blNhZmVcIlxuaW1wb3J0IHsgUGFja2FnZU1hbmFnZXIgfSBmcm9tIFwiLi9kZXRlY3RQYWNrYWdlTWFuYWdlclwiXG5pbXBvcnQgeyByZW1vdmVJZ25vcmVkRmlsZXMgfSBmcm9tIFwiLi9maWx0ZXJGaWxlc1wiXG5pbXBvcnQge1xuICB3cml0ZUZpbGVTeW5jLFxuICBleGlzdHNTeW5jLFxuICBta2RpclN5bmMsXG4gIHVubGlua1N5bmMsXG4gIG1rZGlycFN5bmMsXG4gIHJlYWxwYXRoU3luYyxcbn0gZnJvbSBcImZzLWV4dHJhXCJcbmltcG9ydCB7IHN5bmMgYXMgcmltcmFmIH0gZnJvbSBcInJpbXJhZlwiXG5pbXBvcnQgeyBjb3B5U3luYyB9IGZyb20gXCJmcy1leHRyYVwiXG5pbXBvcnQgeyBkaXJTeW5jIH0gZnJvbSBcInRtcFwiXG5pbXBvcnQgeyBnZXRQYXRjaEZpbGVzIH0gZnJvbSBcIi4vcGF0Y2hGc1wiXG5pbXBvcnQge1xuICBnZXRQYXRjaERldGFpbHNGcm9tQ2xpU3RyaW5nLFxuICBnZXRQYWNrYWdlRGV0YWlsc0Zyb21QYXRjaEZpbGVuYW1lLFxuICBQYWNrYWdlRGV0YWlscyxcbn0gZnJvbSBcIi4vUGFja2FnZURldGFpbHNcIlxuaW1wb3J0IHsgcmVzb2x2ZVJlbGF0aXZlRmlsZURlcGVuZGVuY2llcyB9IGZyb20gXCIuL3Jlc29sdmVSZWxhdGl2ZUZpbGVEZXBlbmRlbmNpZXNcIlxuaW1wb3J0IHsgZ2V0UGFja2FnZVJlc29sdXRpb24gfSBmcm9tIFwiLi9nZXRQYWNrYWdlUmVzb2x1dGlvblwiXG5pbXBvcnQgeyBwYXJzZVBhdGNoRmlsZSB9IGZyb20gXCIuL3BhdGNoL3BhcnNlXCJcbmltcG9ydCB7IGd6aXBTeW5jIH0gZnJvbSBcInpsaWJcIlxuaW1wb3J0IHsgZ2V0UGFja2FnZVZlcnNpb24gfSBmcm9tIFwiLi9nZXRQYWNrYWdlVmVyc2lvblwiXG5pbXBvcnQge1xuICBtYXliZVByaW50SXNzdWVDcmVhdGlvblByb21wdCxcbiAgb3Blbklzc3VlQ3JlYXRpb25MaW5rLFxufSBmcm9tIFwiLi9jcmVhdGVJc3N1ZVwiXG5cbmZ1bmN0aW9uIHByaW50Tm9QYWNrYWdlRm91bmRFcnJvcihcbiAgcGFja2FnZU5hbWU6IHN0cmluZyxcbiAgcGFja2FnZUpzb25QYXRoOiBzdHJpbmcsXG4pIHtcbiAgY29uc29sZS5lcnJvcihcbiAgICBgTm8gc3VjaCBwYWNrYWdlICR7cGFja2FnZU5hbWV9XG5cbiAgRmlsZSBub3QgZm91bmQ6ICR7cGFja2FnZUpzb25QYXRofWAsXG4gIClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VQYXRjaCh7XG4gIHBhY2thZ2VQYXRoU3BlY2lmaWVyLFxuICBhcHBQYXRoLFxuICBwYWNrYWdlTWFuYWdlcixcbiAgaW5jbHVkZVBhdGhzLFxuICBleGNsdWRlUGF0aHMsXG4gIHBhdGNoRGlyLFxuICBjcmVhdGVJc3N1ZSxcbn06IHtcbiAgcGFja2FnZVBhdGhTcGVjaWZpZXI6IHN0cmluZ1xuICBhcHBQYXRoOiBzdHJpbmdcbiAgcGFja2FnZU1hbmFnZXI6IFBhY2thZ2VNYW5hZ2VyXG4gIGluY2x1ZGVQYXRoczogUmVnRXhwXG4gIGV4Y2x1ZGVQYXRoczogUmVnRXhwXG4gIHBhdGNoRGlyOiBzdHJpbmdcbiAgY3JlYXRlSXNzdWU6IGJvb2xlYW5cbn0pIHtcbiAgY29uc3QgcGFja2FnZURldGFpbHMgPSBnZXRQYXRjaERldGFpbHNGcm9tQ2xpU3RyaW5nKHBhY2thZ2VQYXRoU3BlY2lmaWVyKVxuXG4gIGlmICghcGFja2FnZURldGFpbHMpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiTm8gc3VjaCBwYWNrYWdlXCIsIHBhY2thZ2VQYXRoU3BlY2lmaWVyKVxuICAgIHJldHVyblxuICB9XG4gIGNvbnN0IGFwcFBhY2thZ2VKc29uID0gcmVxdWlyZShqb2luKGFwcFBhdGgsIFwicGFja2FnZS5qc29uXCIpKVxuICBjb25zdCBwYWNrYWdlUGF0aCA9IGpvaW4oYXBwUGF0aCwgcGFja2FnZURldGFpbHMucGF0aClcbiAgY29uc3QgcGFja2FnZUpzb25QYXRoID0gam9pbihwYWNrYWdlUGF0aCwgXCJwYWNrYWdlLmpzb25cIilcblxuICBpZiAoIWV4aXN0c1N5bmMocGFja2FnZUpzb25QYXRoKSkge1xuICAgIHByaW50Tm9QYWNrYWdlRm91bmRFcnJvcihwYWNrYWdlUGF0aFNwZWNpZmllciwgcGFja2FnZUpzb25QYXRoKVxuICAgIHByb2Nlc3MuZXhpdCgxKVxuICB9XG5cbiAgY29uc3QgdG1wUmVwbyA9IGRpclN5bmMoeyB1bnNhZmVDbGVhbnVwOiB0cnVlIH0pXG4gIGNvbnN0IHRtcFJlcG9QYWNrYWdlUGF0aCA9IGpvaW4odG1wUmVwby5uYW1lLCBwYWNrYWdlRGV0YWlscy5wYXRoKVxuICBjb25zdCB0bXBSZXBvTnBtUm9vdCA9IHRtcFJlcG9QYWNrYWdlUGF0aC5zbGljZShcbiAgICAwLFxuICAgIC1gL25vZGVfbW9kdWxlcy8ke3BhY2thZ2VEZXRhaWxzLm5hbWV9YC5sZW5ndGgsXG4gIClcblxuICBjb25zdCB0bXBSZXBvUGFja2FnZUpzb25QYXRoID0gam9pbih0bXBSZXBvTnBtUm9vdCwgXCJwYWNrYWdlLmpzb25cIilcblxuICB0cnkge1xuICAgIGNvbnN0IHBhdGNoZXNEaXIgPSByZXNvbHZlKGpvaW4oYXBwUGF0aCwgcGF0Y2hEaXIpKVxuXG4gICAgY29uc29sZS5pbmZvKGNoYWxrLmdyZXkoXCLigKJcIiksIFwiQ3JlYXRpbmcgdGVtcG9yYXJ5IGZvbGRlclwiKVxuXG4gICAgLy8gbWFrZSBhIGJsYW5rIHBhY2thZ2UuanNvblxuICAgIG1rZGlycFN5bmModG1wUmVwb05wbVJvb3QpXG4gICAgd3JpdGVGaWxlU3luYyhcbiAgICAgIHRtcFJlcG9QYWNrYWdlSnNvblBhdGgsXG4gICAgICBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGRlcGVuZGVuY2llczoge1xuICAgICAgICAgIFtwYWNrYWdlRGV0YWlscy5uYW1lXTogZ2V0UGFja2FnZVJlc29sdXRpb24oe1xuICAgICAgICAgICAgcGFja2FnZURldGFpbHMsXG4gICAgICAgICAgICBwYWNrYWdlTWFuYWdlcixcbiAgICAgICAgICAgIGFwcFBhdGgsXG4gICAgICAgICAgfSksXG4gICAgICAgIH0sXG4gICAgICAgIHJlc29sdXRpb25zOiByZXNvbHZlUmVsYXRpdmVGaWxlRGVwZW5kZW5jaWVzKFxuICAgICAgICAgIGFwcFBhdGgsXG4gICAgICAgICAgYXBwUGFja2FnZUpzb24ucmVzb2x1dGlvbnMgfHwge30sXG4gICAgICAgICksXG4gICAgICB9KSxcbiAgICApXG5cbiAgICBjb25zdCBwYWNrYWdlVmVyc2lvbiA9IGdldFBhY2thZ2VWZXJzaW9uKFxuICAgICAgam9pbihyZXNvbHZlKHBhY2thZ2VEZXRhaWxzLnBhdGgpLCBcInBhY2thZ2UuanNvblwiKSxcbiAgICApXG5cbiAgICAvLyBjb3B5IC5ucG1yYy8ueWFybnJjIGluIGNhc2UgcGFja2FnZXMgYXJlIGhvc3RlZCBpbiBwcml2YXRlIHJlZ2lzdHJ5XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmFsaWduXG4gICAgO1tcIi5ucG1yY1wiLCBcIi55YXJucmNcIl0uZm9yRWFjaCgocmNGaWxlKSA9PiB7XG4gICAgICBjb25zdCByY1BhdGggPSBqb2luKGFwcFBhdGgsIHJjRmlsZSlcbiAgICAgIGlmIChleGlzdHNTeW5jKHJjUGF0aCkpIHtcbiAgICAgICAgY29weVN5bmMocmNQYXRoLCBqb2luKHRtcFJlcG8ubmFtZSwgcmNGaWxlKSwgeyBkZXJlZmVyZW5jZTogdHJ1ZSB9KVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBpZiAocGFja2FnZU1hbmFnZXIgPT09IFwieWFyblwiKSB7XG4gICAgICBjb25zb2xlLmluZm8oXG4gICAgICAgIGNoYWxrLmdyZXkoXCLigKJcIiksXG4gICAgICAgIGBJbnN0YWxsaW5nICR7cGFja2FnZURldGFpbHMubmFtZX1AJHtwYWNrYWdlVmVyc2lvbn0gd2l0aCB5YXJuYCxcbiAgICAgIClcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIHRyeSBmaXJzdCB3aXRob3V0IGlnbm9yaW5nIHNjcmlwdHMgaW4gY2FzZSB0aGV5IGFyZSByZXF1aXJlZFxuICAgICAgICAvLyB0aGlzIHdvcmtzIGluIDk5Ljk5JSBvZiBjYXNlc1xuICAgICAgICBzcGF3blNhZmVTeW5jKGB5YXJuYCwgW1wiaW5zdGFsbFwiLCBcIi0taWdub3JlLWVuZ2luZXNcIl0sIHtcbiAgICAgICAgICBjd2Q6IHRtcFJlcG9OcG1Sb290LFxuICAgICAgICAgIGxvZ1N0ZEVyck9uRXJyb3I6IGZhbHNlLFxuICAgICAgICB9KVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyB0cnkgYWdhaW4gd2hpbGUgaWdub3Jpbmcgc2NyaXB0cyBpbiBjYXNlIHRoZSBzY3JpcHQgZGVwZW5kcyBvblxuICAgICAgICAvLyBhbiBpbXBsaWNpdCBjb250ZXh0IHdoaWNoIHdlIGhhdm4ndCByZXByb2R1Y2VkXG4gICAgICAgIHNwYXduU2FmZVN5bmMoXG4gICAgICAgICAgYHlhcm5gLFxuICAgICAgICAgIFtcImluc3RhbGxcIiwgXCItLWlnbm9yZS1lbmdpbmVzXCIsIFwiLS1pZ25vcmUtc2NyaXB0c1wiXSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjd2Q6IHRtcFJlcG9OcG1Sb290LFxuICAgICAgICAgIH0sXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5pbmZvKFxuICAgICAgICBjaGFsay5ncmV5KFwi4oCiXCIpLFxuICAgICAgICBgSW5zdGFsbGluZyAke3BhY2thZ2VEZXRhaWxzLm5hbWV9QCR7cGFja2FnZVZlcnNpb259IHdpdGggbnBtYCxcbiAgICAgIClcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIHRyeSBmaXJzdCB3aXRob3V0IGlnbm9yaW5nIHNjcmlwdHMgaW4gY2FzZSB0aGV5IGFyZSByZXF1aXJlZFxuICAgICAgICAvLyB0aGlzIHdvcmtzIGluIDk5Ljk5JSBvZiBjYXNlc1xuICAgICAgICBzcGF3blNhZmVTeW5jKGBucG1gLCBbXCJpXCIsIFwiLS1mb3JjZVwiXSwge1xuICAgICAgICAgIGN3ZDogdG1wUmVwb05wbVJvb3QsXG4gICAgICAgICAgbG9nU3RkRXJyT25FcnJvcjogZmFsc2UsXG4gICAgICAgICAgc3RkaW86IFwiaWdub3JlXCIsXG4gICAgICAgIH0pXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIHRyeSBhZ2FpbiB3aGlsZSBpZ25vcmluZyBzY3JpcHRzIGluIGNhc2UgdGhlIHNjcmlwdCBkZXBlbmRzIG9uXG4gICAgICAgIC8vIGFuIGltcGxpY2l0IGNvbnRleHQgd2hpY2ggd2UgaGF2bid0IHJlcHJvZHVjZWRcbiAgICAgICAgc3Bhd25TYWZlU3luYyhgbnBtYCwgW1wiaVwiLCBcIi0taWdub3JlLXNjcmlwdHNcIiwgXCItLWZvcmNlXCJdLCB7XG4gICAgICAgICAgY3dkOiB0bXBSZXBvTnBtUm9vdCxcbiAgICAgICAgICBzdGRpbzogXCJpZ25vcmVcIixcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBnaXQgPSAoLi4uYXJnczogc3RyaW5nW10pID0+XG4gICAgICBzcGF3blNhZmVTeW5jKFwiZ2l0XCIsIGFyZ3MsIHtcbiAgICAgICAgY3dkOiB0bXBSZXBvLm5hbWUsXG4gICAgICAgIGVudjogeyAuLi5wcm9jZXNzLmVudiwgSE9NRTogdG1wUmVwby5uYW1lIH0sXG4gICAgICAgIG1heEJ1ZmZlcjogMTAyNCAqIDEwMjQgKiAxMDAsXG4gICAgICB9KVxuXG4gICAgLy8gcmVtb3ZlIG5lc3RlZCBub2RlX21vZHVsZXMganVzdCB0byBiZSBzYWZlXG4gICAgcmltcmFmKGpvaW4odG1wUmVwb1BhY2thZ2VQYXRoLCBcIm5vZGVfbW9kdWxlc1wiKSlcbiAgICAvLyByZW1vdmUgLmdpdCBqdXN0IHRvIGJlIHNhZmVcbiAgICByaW1yYWYoam9pbih0bXBSZXBvUGFja2FnZVBhdGgsIFwiLmdpdFwiKSlcblxuICAgIC8vIGNvbW1pdCB0aGUgcGFja2FnZVxuICAgIGNvbnNvbGUuaW5mbyhjaGFsay5ncmV5KFwi4oCiXCIpLCBcIkRpZmZpbmcgeW91ciBmaWxlcyB3aXRoIGNsZWFuIGZpbGVzXCIpXG4gICAgd3JpdGVGaWxlU3luYyhqb2luKHRtcFJlcG8ubmFtZSwgXCIuZ2l0aWdub3JlXCIpLCBcIiEvbm9kZV9tb2R1bGVzXFxuXFxuXCIpXG4gICAgZ2l0KFwiaW5pdFwiKVxuICAgIGdpdChcImNvbmZpZ1wiLCBcIi0tbG9jYWxcIiwgXCJ1c2VyLm5hbWVcIiwgXCJwYXRjaC1wYWNrYWdlXCIpXG4gICAgZ2l0KFwiY29uZmlnXCIsIFwiLS1sb2NhbFwiLCBcInVzZXIuZW1haWxcIiwgXCJwYXRjaEBwYWNrLmFnZVwiKVxuXG4gICAgLy8gcmVtb3ZlIGlnbm9yZWQgZmlsZXMgZmlyc3RcbiAgICByZW1vdmVJZ25vcmVkRmlsZXModG1wUmVwb1BhY2thZ2VQYXRoLCBpbmNsdWRlUGF0aHMsIGV4Y2x1ZGVQYXRocylcblxuICAgIGdpdChcImFkZFwiLCBcIi1mXCIsIHBhY2thZ2VEZXRhaWxzLnBhdGgpXG4gICAgZ2l0KFwiY29tbWl0XCIsIFwiLS1hbGxvdy1lbXB0eVwiLCBcIi1tXCIsIFwiaW5pdFwiKVxuXG4gICAgLy8gcmVwbGFjZSBwYWNrYWdlIHdpdGggdXNlcidzIHZlcnNpb25cbiAgICByaW1yYWYodG1wUmVwb1BhY2thZ2VQYXRoKVxuXG4gICAgLy8gcG5wbSBpbnN0YWxscyBwYWNrYWdlcyBhcyBzeW1saW5rcywgY29weVN5bmMgd291bGQgY29weSBvbmx5IHRoZSBzeW1saW5rXG4gICAgY29weVN5bmMocmVhbHBhdGhTeW5jKHBhY2thZ2VQYXRoKSwgdG1wUmVwb1BhY2thZ2VQYXRoKVxuXG4gICAgLy8gcmVtb3ZlIG5lc3RlZCBub2RlX21vZHVsZXMganVzdCB0byBiZSBzYWZlXG4gICAgcmltcmFmKGpvaW4odG1wUmVwb1BhY2thZ2VQYXRoLCBcIm5vZGVfbW9kdWxlc1wiKSlcbiAgICAvLyByZW1vdmUgLmdpdCBqdXN0IHRvIGJlIHNhZmVcbiAgICByaW1yYWYoam9pbih0bXBSZXBvUGFja2FnZVBhdGgsIFwiLmdpdFwiKSlcblxuICAgIC8vIGFsc28gcmVtb3ZlIGlnbm9yZWQgZmlsZXMgbGlrZSBiZWZvcmVcbiAgICByZW1vdmVJZ25vcmVkRmlsZXModG1wUmVwb1BhY2thZ2VQYXRoLCBpbmNsdWRlUGF0aHMsIGV4Y2x1ZGVQYXRocylcblxuICAgIC8vIHN0YWdlIGFsbCBmaWxlc1xuICAgIGdpdChcImFkZFwiLCBcIi1mXCIsIHBhY2thZ2VEZXRhaWxzLnBhdGgpXG5cbiAgICAvLyBnZXQgZGlmZiBvZiBjaGFuZ2VzXG4gICAgY29uc3QgZGlmZlJlc3VsdCA9IGdpdChcbiAgICAgIFwiZGlmZlwiLFxuICAgICAgXCItLWNhY2hlZFwiLFxuICAgICAgXCItLW5vLWNvbG9yXCIsXG4gICAgICBcIi0taWdub3JlLXNwYWNlLWF0LWVvbFwiLFxuICAgICAgXCItLW5vLWV4dC1kaWZmXCIsXG4gICAgICBcIi0tc3JjLXByZWZpeD1hL1wiLFxuICAgICAgXCItLWRzdC1wcmVmaXg9Yi9cIlxuICAgIClcblxuICAgIGlmIChkaWZmUmVzdWx0LnN0ZG91dC5sZW5ndGggPT09IDApIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYOKBie+4jyAgTm90IGNyZWF0aW5nIHBhdGNoIGZpbGUgZm9yIHBhY2thZ2UgJyR7cGFja2FnZVBhdGhTcGVjaWZpZXJ9J2AsXG4gICAgICApXG4gICAgICBjb25zb2xlLndhcm4oYOKBie+4jyAgVGhlcmUgZG9uJ3QgYXBwZWFyIHRvIGJlIGFueSBjaGFuZ2VzLmApXG4gICAgICBwcm9jZXNzLmV4aXQoMSlcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBwYXJzZVBhdGNoRmlsZShkaWZmUmVzdWx0LnN0ZG91dC50b1N0cmluZygpKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChcbiAgICAgICAgKGUgYXMgRXJyb3IpLm1lc3NhZ2UuaW5jbHVkZXMoXCJVbmV4cGVjdGVkIGZpbGUgbW9kZSBzdHJpbmc6IDEyMDAwMFwiKVxuICAgICAgKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYFxu4puU77iPICR7Y2hhbGsucmVkLmJvbGQoXCJFUlJPUlwiKX1cblxuICBZb3VyIGNoYW5nZXMgaW52b2x2ZSBjcmVhdGluZyBzeW1saW5rcy4gcGF0Y2gtcGFja2FnZSBkb2VzIG5vdCB5ZXQgc3VwcG9ydFxuICBzeW1saW5rcy5cbiAgXG4gIO+4j1BsZWFzZSB1c2UgJHtjaGFsay5ib2xkKFwiLS1pbmNsdWRlXCIpfSBhbmQvb3IgJHtjaGFsay5ib2xkKFxuICAgICAgICAgIFwiLS1leGNsdWRlXCIsXG4gICAgICAgICl9IHRvIG5hcnJvdyB0aGUgc2NvcGUgb2YgeW91ciBwYXRjaCBpZlxuICB0aGlzIHdhcyB1bmludGVudGlvbmFsLlxuYClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG91dFBhdGggPSBcIi4vcGF0Y2gtcGFja2FnZS1lcnJvci5qc29uLmd6XCJcbiAgICAgICAgd3JpdGVGaWxlU3luYyhcbiAgICAgICAgICBvdXRQYXRoLFxuICAgICAgICAgIGd6aXBTeW5jKFxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICBlcnJvcjogeyBtZXNzYWdlOiBlLm1lc3NhZ2UsIHN0YWNrOiBlLnN0YWNrIH0sXG4gICAgICAgICAgICAgIHBhdGNoOiBkaWZmUmVzdWx0LnN0ZG91dC50b1N0cmluZygpLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgKSxcbiAgICAgICAgKVxuICAgICAgICBjb25zb2xlLmVycm9yKGBcbuKblO+4jyAke2NoYWxrLnJlZC5ib2xkKFwiRVJST1JcIil9XG4gICAgICAgIFxuICBwYXRjaC1wYWNrYWdlIHdhcyB1bmFibGUgdG8gcmVhZCB0aGUgcGF0Y2gtZmlsZSBtYWRlIGJ5IGdpdC4gVGhpcyBzaG91bGQgbm90XG4gIGhhcHBlbi5cbiAgXG4gIEEgZGlhZ25vc3RpYyBmaWxlIHdhcyB3cml0dGVuIHRvXG4gIFxuICAgICR7b3V0UGF0aH1cbiAgXG4gIFBsZWFzZSBhdHRhY2ggaXQgdG8gYSBnaXRodWIgaXNzdWVcbiAgXG4gICAgaHR0cHM6Ly9naXRodWIuY29tL2RzMzAwL3BhdGNoLXBhY2thZ2UvaXNzdWVzL25ldz90aXRsZT1OZXcrcGF0Y2grcGFyc2UrZmFpbGVkJmJvZHk9UGxlYXNlK2F0dGFjaCt0aGUrZGlhZ25vc3RpYytmaWxlK2J5K2RyYWdnaW5nK2l0K2ludG8raGVyZSvwn5mPXG4gIFxuICBOb3RlIHRoYXQgdGhpcyBkaWFnbm9zdGljIGZpbGUgd2lsbCBjb250YWluIGNvZGUgZnJvbSB0aGUgcGFja2FnZSB5b3Ugd2VyZVxuICBhdHRlbXB0aW5nIHRvIHBhdGNoLlxuXG5gKVxuICAgICAgfVxuICAgICAgcHJvY2Vzcy5leGl0KDEpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyBtYXliZSBkZWxldGUgZXhpc3RpbmdcbiAgICBnZXRQYXRjaEZpbGVzKHBhdGNoRGlyKS5mb3JFYWNoKChmaWxlbmFtZSkgPT4ge1xuICAgICAgY29uc3QgZGVldHMgPSBnZXRQYWNrYWdlRGV0YWlsc0Zyb21QYXRjaEZpbGVuYW1lKGZpbGVuYW1lKVxuICAgICAgaWYgKGRlZXRzICYmIGRlZXRzLnBhdGggPT09IHBhY2thZ2VEZXRhaWxzLnBhdGgpIHtcbiAgICAgICAgdW5saW5rU3luYyhqb2luKHBhdGNoRGlyLCBmaWxlbmFtZSkpXG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IHBhdGNoRmlsZU5hbWUgPSBjcmVhdGVQYXRjaEZpbGVOYW1lKHtcbiAgICAgIHBhY2thZ2VEZXRhaWxzLFxuICAgICAgcGFja2FnZVZlcnNpb24sXG4gICAgfSlcblxuICAgIGNvbnN0IHBhdGNoUGF0aCA9IGpvaW4ocGF0Y2hlc0RpciwgcGF0Y2hGaWxlTmFtZSlcbiAgICBpZiAoIWV4aXN0c1N5bmMoZGlybmFtZShwYXRjaFBhdGgpKSkge1xuICAgICAgLy8gc2NvcGVkIHBhY2thZ2VcbiAgICAgIG1rZGlyU3luYyhkaXJuYW1lKHBhdGNoUGF0aCkpXG4gICAgfVxuICAgIHdyaXRlRmlsZVN5bmMocGF0Y2hQYXRoLCBkaWZmUmVzdWx0LnN0ZG91dClcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGAke2NoYWxrLmdyZWVuKFwi4pyUXCIpfSBDcmVhdGVkIGZpbGUgJHtqb2luKHBhdGNoRGlyLCBwYXRjaEZpbGVOYW1lKX1cXG5gLFxuICAgIClcbiAgICBpZiAoY3JlYXRlSXNzdWUpIHtcbiAgICAgIG9wZW5Jc3N1ZUNyZWF0aW9uTGluayh7XG4gICAgICAgIHBhY2thZ2VEZXRhaWxzLFxuICAgICAgICBwYXRjaEZpbGVDb250ZW50czogZGlmZlJlc3VsdC5zdGRvdXQudG9TdHJpbmcoKSxcbiAgICAgICAgcGFja2FnZVZlcnNpb24sXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBtYXliZVByaW50SXNzdWVDcmVhdGlvblByb21wdChwYWNrYWdlRGV0YWlscywgcGFja2FnZU1hbmFnZXIpXG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5lcnJvcihlKVxuICAgIHRocm93IGVcbiAgfSBmaW5hbGx5IHtcbiAgICB0bXBSZXBvLnJlbW92ZUNhbGxiYWNrKClcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVQYXRjaEZpbGVOYW1lKHtcbiAgcGFja2FnZURldGFpbHMsXG4gIHBhY2thZ2VWZXJzaW9uLFxufToge1xuICBwYWNrYWdlRGV0YWlsczogUGFja2FnZURldGFpbHNcbiAgcGFja2FnZVZlcnNpb246IHN0cmluZ1xufSkge1xuICBjb25zdCBwYWNrYWdlTmFtZXMgPSBwYWNrYWdlRGV0YWlscy5wYWNrYWdlTmFtZXNcbiAgICAubWFwKChuYW1lKSA9PiBuYW1lLnJlcGxhY2UoL1xcLy9nLCBcIitcIikpXG4gICAgLmpvaW4oXCIrK1wiKVxuXG4gIHJldHVybiBgJHtwYWNrYWdlTmFtZXN9KyR7cGFja2FnZVZlcnNpb259LnBhdGNoYFxufVxuIl19