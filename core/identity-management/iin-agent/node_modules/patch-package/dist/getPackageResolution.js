"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackageResolution = void 0;
const path_1 = require("./path");
const PackageDetails_1 = require("./PackageDetails");
const detectPackageManager_1 = require("./detectPackageManager");
const fs_extra_1 = require("fs-extra");
const lockfile_1 = require("@yarnpkg/lockfile");
const yaml_1 = __importDefault(require("yaml"));
const find_yarn_workspace_root_1 = __importDefault(require("find-yarn-workspace-root"));
const getPackageVersion_1 = require("./getPackageVersion");
function getPackageResolution({ packageDetails, packageManager, appPath, }) {
    if (packageManager === "yarn") {
        let lockFilePath = "yarn.lock";
        if (!fs_extra_1.existsSync(lockFilePath)) {
            const workspaceRoot = find_yarn_workspace_root_1.default();
            if (!workspaceRoot) {
                throw new Error("Can't find yarn.lock file");
            }
            lockFilePath = path_1.join(workspaceRoot, "yarn.lock");
        }
        if (!fs_extra_1.existsSync(lockFilePath)) {
            throw new Error("Can't find yarn.lock file");
        }
        const lockFileString = fs_extra_1.readFileSync(lockFilePath).toString();
        let appLockFile;
        if (lockFileString.includes("yarn lockfile v1")) {
            const parsedYarnLockFile = lockfile_1.parse(lockFileString);
            if (parsedYarnLockFile.type !== "success") {
                throw new Error("Could not parse yarn v1 lock file");
            }
            else {
                appLockFile = parsedYarnLockFile.object;
            }
        }
        else {
            try {
                appLockFile = yaml_1.default.parse(lockFileString);
            }
            catch (e) {
                console.error(e);
                throw new Error("Could not  parse yarn v2 lock file");
            }
        }
        const installedVersion = getPackageVersion_1.getPackageVersion(path_1.join(path_1.resolve(appPath, packageDetails.path), "package.json"));
        const entries = Object.entries(appLockFile).filter(([k, v]) => k.startsWith(packageDetails.name + "@") &&
            // @ts-ignore
            v.version === installedVersion);
        const resolutions = entries.map(([_, v]) => {
            // @ts-ignore
            return v.resolved;
        });
        if (resolutions.length === 0) {
            throw new Error(`Can't find lockfile entry for ${packageDetails.pathSpecifier}`);
        }
        if (new Set(resolutions).size !== 1) {
            console.warn(`Ambigious lockfile entries for ${packageDetails.pathSpecifier}. Using version ${installedVersion}`);
            return installedVersion;
        }
        if (resolutions[0]) {
            return resolutions[0];
        }
        const resolution = entries[0][0].slice(packageDetails.name.length + 1);
        // resolve relative file path
        if (resolution.startsWith("file:.")) {
            return `file:${path_1.resolve(appPath, resolution.slice("file:".length))}`;
        }
        if (resolution.startsWith("npm:")) {
            return resolution.replace("npm:", "");
        }
        return resolution;
    }
    else {
        const lockfile = require(path_1.join(appPath, packageManager === "npm-shrinkwrap"
            ? "npm-shrinkwrap.json"
            : "package-lock.json"));
        const lockFileStack = [lockfile];
        for (const name of packageDetails.packageNames.slice(0, -1)) {
            const child = lockFileStack[0].dependencies;
            if (child && name in child) {
                lockFileStack.push(child[name]);
            }
        }
        lockFileStack.reverse();
        const relevantStackEntry = lockFileStack.find((entry) => entry.dependencies && packageDetails.name in entry.dependencies);
        const pkg = relevantStackEntry.dependencies[packageDetails.name];
        return pkg.resolved || pkg.from || pkg.version;
    }
}
exports.getPackageResolution = getPackageResolution;
if (require.main === module) {
    const packageDetails = PackageDetails_1.getPatchDetailsFromCliString(process.argv[2]);
    if (!packageDetails) {
        console.error(`Can't find package ${process.argv[2]}`);
        process.exit(1);
        throw new Error();
    }
    console.log(getPackageResolution({
        appPath: process.cwd(),
        packageDetails,
        packageManager: detectPackageManager_1.detectPackageManager(process.cwd(), null),
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UGFja2FnZVJlc29sdXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZ2V0UGFja2FnZVJlc29sdXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsaUNBQXNDO0FBQ3RDLHFEQUErRTtBQUMvRSxpRUFBNkU7QUFDN0UsdUNBQW1EO0FBQ25ELGdEQUE4RDtBQUM5RCxnREFBdUI7QUFDdkIsd0ZBQXdEO0FBQ3hELDJEQUF1RDtBQUV2RCxTQUFnQixvQkFBb0IsQ0FBQyxFQUNuQyxjQUFjLEVBQ2QsY0FBYyxFQUNkLE9BQU8sR0FLUjtJQUNDLElBQUksY0FBYyxLQUFLLE1BQU0sRUFBRTtRQUM3QixJQUFJLFlBQVksR0FBRyxXQUFXLENBQUE7UUFDOUIsSUFBSSxDQUFDLHFCQUFVLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDN0IsTUFBTSxhQUFhLEdBQUcsa0NBQWlCLEVBQUUsQ0FBQTtZQUN6QyxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUNsQixNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUE7YUFDN0M7WUFDRCxZQUFZLEdBQUcsV0FBSSxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQTtTQUNoRDtRQUNELElBQUksQ0FBQyxxQkFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQTtTQUM3QztRQUNELE1BQU0sY0FBYyxHQUFHLHVCQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUE7UUFDNUQsSUFBSSxXQUFXLENBQUE7UUFDZixJQUFJLGNBQWMsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsRUFBRTtZQUMvQyxNQUFNLGtCQUFrQixHQUFHLGdCQUFpQixDQUFDLGNBQWMsQ0FBQyxDQUFBO1lBQzVELElBQUksa0JBQWtCLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRTtnQkFDekMsTUFBTSxJQUFJ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QUMxRCxDQUFDLENBQ0gsQ0FBQTtDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgam9pbiwgcmVzb2x2ZSB9IGZyb20gXCIuL3BhdGhcIlxuaW1wb3J0IHsgUGFja2FnZURldGFpbHMsIGdldFBhdGNoRGV0YWlsc0Zyb21DbGlTdHJpbmcgfSBmcm9tIFwiLi9QYWNrYWdlRGV0YWlsc1wiXG5pbXBvcnQgeyBQYWNrYWdlTWFuYWdlciwgZGV0ZWN0UGFja2FnZU1hbmFnZXIgfSBmcm9tIFwiLi9kZXRlY3RQYWNrYWdlTWFuYWdlclwiXG5pbXBvcnQgeyByZWFkRmlsZVN5bmMsIGV4aXN0c1N5bmMgfSBmcm9tIFwiZnMtZXh0cmFcIlxuaW1wb3J0IHsgcGFyc2UgYXMgcGFyc2VZYXJuTG9ja0ZpbGUgfSBmcm9tIFwiQHlhcm5wa2cvbG9ja2ZpbGVcIlxuaW1wb3J0IHlhbWwgZnJvbSBcInlhbWxcIlxuaW1wb3J0IGZpbmRXb3Jrc3BhY2VSb290IGZyb20gXCJmaW5kLXlhcm4td29ya3NwYWNlLXJvb3RcIlxuaW1wb3J0IHsgZ2V0UGFja2FnZVZlcnNpb24gfSBmcm9tIFwiLi9nZXRQYWNrYWdlVmVyc2lvblwiXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQYWNrYWdlUmVzb2x1dGlvbih7XG4gIHBhY2thZ2VEZXRhaWxzLFxuICBwYWNrYWdlTWFuYWdlcixcbiAgYXBwUGF0aCxcbn06IHtcbiAgcGFja2FnZURldGFpbHM6IFBhY2thZ2VEZXRhaWxzXG4gIHBhY2thZ2VNYW5hZ2VyOiBQYWNrYWdlTWFuYWdlclxuICBhcHBQYXRoOiBzdHJpbmdcbn0pIHtcbiAgaWYgKHBhY2thZ2VNYW5hZ2VyID09PSBcInlhcm5cIikge1xuICAgIGxldCBsb2NrRmlsZVBhdGggPSBcInlhcm4ubG9ja1wiXG4gICAgaWYgKCFleGlzdHNTeW5jKGxvY2tGaWxlUGF0aCkpIHtcbiAgICAgIGNvbnN0IHdvcmtzcGFjZVJvb3QgPSBmaW5kV29ya3NwYWNlUm9vdCgpXG4gICAgICBpZiAoIXdvcmtzcGFjZVJvb3QpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgZmluZCB5YXJuLmxvY2sgZmlsZVwiKVxuICAgICAgfVxuICAgICAgbG9ja0ZpbGVQYXRoID0gam9pbih3b3Jrc3BhY2VSb290LCBcInlhcm4ubG9ja1wiKVxuICAgIH1cbiAgICBpZiAoIWV4aXN0c1N5bmMobG9ja0ZpbGVQYXRoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgZmluZCB5YXJuLmxvY2sgZmlsZVwiKVxuICAgIH1cbiAgICBjb25zdCBsb2NrRmlsZVN0cmluZyA9IHJlYWRGaWxlU3luYyhsb2NrRmlsZVBhdGgpLnRvU3RyaW5nKClcbiAgICBsZXQgYXBwTG9ja0ZpbGVcbiAgICBpZiAobG9ja0ZpbGVTdHJpbmcuaW5jbHVkZXMoXCJ5YXJuIGxvY2tmaWxlIHYxXCIpKSB7XG4gICAgICBjb25zdCBwYXJzZWRZYXJuTG9ja0ZpbGUgPSBwYXJzZVlhcm5Mb2NrRmlsZShsb2NrRmlsZVN0cmluZylcbiAgICAgIGlmIChwYXJzZWRZYXJuTG9ja0ZpbGUudHlwZSAhPT0gXCJzdWNjZXNzXCIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IHBhcnNlIHlhcm4gdjEgbG9jayBmaWxlXCIpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcHBMb2NrRmlsZSA9IHBhcnNlZFlhcm5Mb2NrRmlsZS5vYmplY3RcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXBwTG9ja0ZpbGUgPSB5YW1sLnBhcnNlKGxvY2tGaWxlU3RyaW5nKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGUpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCAgcGFyc2UgeWFybiB2MiBsb2NrIGZpbGVcIilcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBpbnN0YWxsZWRWZXJzaW9uID0gZ2V0UGFja2FnZVZlcnNpb24oXG4gICAgICBqb2luKHJlc29sdmUoYXBwUGF0aCwgcGFja2FnZURldGFpbHMucGF0aCksIFwicGFja2FnZS5qc29uXCIpLFxuICAgIClcblxuICAgIGNvbnN0IGVudHJpZXMgPSBPYmplY3QuZW50cmllcyhhcHBMb2NrRmlsZSkuZmlsdGVyKFxuICAgICAgKFtrLCB2XSkgPT5cbiAgICAgICAgay5zdGFydHNXaXRoKHBhY2thZ2VEZXRhaWxzLm5hbWUgKyBcIkBcIikgJiZcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB2LnZlcnNpb24gPT09IGluc3RhbGxlZFZlcnNpb24sXG4gICAgKVxuXG4gICAgY29uc3QgcmVzb2x1dGlvbnMgPSBlbnRyaWVzLm1hcCgoW18sIHZdKSA9PiB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICByZXR1cm4gdi5yZXNvbHZlZFxuICAgIH0pXG5cbiAgICBpZiAocmVzb2x1dGlvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBDYW4ndCBmaW5kIGxvY2tmaWxlIGVudHJ5IGZvciAke3BhY2thZ2VEZXRhaWxzLnBhdGhTcGVjaWZpZXJ9YCxcbiAgICAgIClcbiAgICB9XG5cbiAgICBpZiAobmV3IFNldChyZXNvbHV0aW9ucykuc2l6ZSAhPT0gMSkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBgQW1iaWdpb3VzIGxvY2tmaWxlIGVudHJpZXMgZm9yICR7cGFja2FnZURldGFpbHMucGF0aFNwZWNpZmllcn0uIFVzaW5nIHZlcnNpb24gJHtpbnN0YWxsZWRWZXJzaW9ufWAsXG4gICAgICApXG4gICAgICByZXR1cm4gaW5zdGFsbGVkVmVyc2lvblxuICAgIH1cblxuICAgIGlmIChyZXNvbHV0aW9uc1swXSkge1xuICAgICAgcmV0dXJuIHJlc29sdXRpb25zWzBdXG4gICAgfVxuXG4gICAgY29uc3QgcmVzb2x1dGlvbiA9IGVudHJpZXNbMF1bMF0uc2xpY2UocGFja2FnZURldGFpbHMubmFtZS5sZW5ndGggKyAxKVxuXG4gICAgLy8gcmVzb2x2ZSByZWxhdGl2ZSBmaWxlIHBhdGhcbiAgICBpZiAocmVzb2x1dGlvbi5zdGFydHNXaXRoKFwiZmlsZTouXCIpKSB7XG4gICAgICByZXR1cm4gYGZpbGU6JHtyZXNvbHZlKGFwcFBhdGgsIHJlc29sdXRpb24uc2xpY2UoXCJmaWxlOlwiLmxlbmd0aCkpfWBcbiAgICB9XG5cbiAgICBpZiAocmVzb2x1dGlvbi5zdGFydHNXaXRoKFwibnBtOlwiKSkge1xuICAgICAgcmV0dXJuIHJlc29sdXRpb24ucmVwbGFjZShcIm5wbTpcIiwgXCJcIilcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzb2x1dGlvblxuICB9IGVsc2Uge1xuICAgIGNvbnN0IGxvY2tmaWxlID0gcmVxdWlyZShqb2luKFxuICAgICAgYXBwUGF0aCxcbiAgICAgIHBhY2thZ2VNYW5hZ2VyID09PSBcIm5wbS1zaHJpbmt3cmFwXCJcbiAgICAgICAgPyBcIm5wbS1zaHJpbmt3cmFwLmpzb25cIlxuICAgICAgICA6IFwicGFja2FnZS1sb2NrLmpzb25cIixcbiAgICApKVxuICAgIGNvbnN0IGxvY2tGaWxlU3RhY2sgPSBbbG9ja2ZpbGVdXG4gICAgZm9yIChjb25zdCBuYW1lIG9mIHBhY2thZ2VEZXRhaWxzLnBhY2thZ2VOYW1lcy5zbGljZSgwLCAtMSkpIHtcbiAgICAgIGNvbnN0IGNoaWxkID0gbG9ja0ZpbGVTdGFja1swXS5kZXBlbmRlbmNpZXNcbiAgICAgIGlmIChjaGlsZCAmJiBuYW1lIGluIGNoaWxkKSB7XG4gICAgICAgIGxvY2tGaWxlU3RhY2sucHVzaChjaGlsZFtuYW1lXSlcbiAgICAgIH1cbiAgICB9XG4gICAgbG9ja0ZpbGVTdGFjay5yZXZlcnNlKClcbiAgICBjb25zdCByZWxldmFudFN0YWNrRW50cnkgPSBsb2NrRmlsZVN0YWNrLmZpbmQoXG4gICAgICAoZW50cnkpID0+XG4gICAgICAgIGVudHJ5LmRlcGVuZGVuY2llcyAmJiBwYWNrYWdlRGV0YWlscy5uYW1lIGluIGVudHJ5LmRlcGVuZGVuY2llcyxcbiAgICApXG4gICAgY29uc3QgcGtnID0gcmVsZXZhbnRTdGFja0VudHJ5LmRlcGVuZGVuY2llc1twYWNrYWdlRGV0YWlscy5uYW1lXVxuICAgIHJldHVybiBwa2cucmVzb2x2ZWQgfHwgcGtnLmZyb20gfHwgcGtnLnZlcnNpb25cbiAgfVxufVxuXG5pZiAocmVxdWlyZS5tYWluID09PSBtb2R1bGUpIHtcbiAgY29uc3QgcGFja2FnZURldGFpbHMgPSBnZXRQYXRjaERldGFpbHNGcm9tQ2xpU3RyaW5nKHByb2Nlc3MuYXJndlsyXSlcbiAgaWYgKCFwYWNrYWdlRGV0YWlscykge1xuICAgIGNvbnNvbGUuZXJyb3IoYENhbid0IGZpbmQgcGFja2FnZSAke3Byb2Nlc3MuYXJndlsyXX1gKVxuICAgIHByb2Nlc3MuZXhpdCgxKVxuICAgIHRocm93IG5ldyBFcnJvcigpXG4gIH1cbiAgY29uc29sZS5sb2coXG4gICAgZ2V0UGFja2FnZVJlc29sdXRpb24oe1xuICAgICAgYXBwUGF0aDogcHJvY2Vzcy5jd2QoKSxcbiAgICAgIHBhY2thZ2VEZXRhaWxzLFxuICAgICAgcGFja2FnZU1hbmFnZXI6IGRldGVjdFBhY2thZ2VNYW5hZ2VyKHByb2Nlc3MuY3dkKCksIG51bGwpLFxuICAgIH0pLFxuICApXG59XG4iXX0=