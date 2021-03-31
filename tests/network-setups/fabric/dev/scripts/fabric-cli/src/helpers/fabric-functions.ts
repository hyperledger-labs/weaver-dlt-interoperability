import { Gateway, Wallets, Contract } from 'fabric-network'
import { handlePromise } from './helpers'
import * as FabricCAServices from 'fabric-ca-client'
import { Certificate } from '@fidm/x509'
import { Utils, ICryptoKey } from 'fabric-common'
import * as path from 'path'
import * as dotenv from 'dotenv'
dotenv.config({ path: path.resolve(__dirname, '../../.env') })
import * as fs from 'fs'

export type Query = {
  contractName: string
  channel: string
  args: string[]
  ccFunc: string
}
const walletSetup = async (
  networkName: string,
  walletPath: string,
  ccp: any,
  mspId: string,
  logger: any = console
) => {
  // Create a new CA client for interacting with the CA.
  // Create a new CA client for interacting with the CA.
  const org = ccp.client['organization']
  const caName = ccp.organizations[org]['certificateAuthorities'][0]
  const caURL = ccp.certificateAuthorities[caName].url
  const ca = new FabricCAServices(caURL)
  const ident = ca.newIdentityService()

  const wallet = await Wallets.newFileSystemWallet(walletPath)

  // build a user object for authenticating with the CA        // Check to see if we've already enrolled the admin user.
  let adminIdentity = await wallet.get('admin')

  if (adminIdentity) {
    logger.debug(
      'An identity for the admin user "admin" already exists in the wallet'
    )
  } else {
    // Enroll the admin user, and import the new identity into the wallet.
    const enrollment = await ca.enroll({
      enrollmentID: 'admin',
      enrollmentSecret: 'adminpw'
    })
    const x509Identity = {
      credentials: {
        certificate: enrollment.certificate,
        privateKey: enrollment.key.toBytes()
      },
      mspId: mspId,
      type: 'X.509'
    }
    await wallet.put('admin', x509Identity)
    adminIdentity = await wallet.get('admin')
  }
  const userName = `User1@org1.${networkName}.com`
  const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type)
  const adminUser = await provider.getUserContext(adminIdentity, 'admin')
  const identity = await wallet.get(userName)
  if (!identity) {
    // Register the user, enroll the user, and import the new identity into the wallet.
    const secret = await ca.register(
      {
        affiliation: 'org1.department1',
        enrollmentID: userName,
        role: 'client'
      },
      adminUser
    )
    const enrollment = await ca.enroll({
      enrollmentID: userName,
      enrollmentSecret: secret
    })
    const x509Identity = {
      credentials: {
        certificate: enrollment.certificate,
        privateKey: enrollment.key.toBytes()
      },
      mspId: mspId,
      type: 'X.509'
    }
    await wallet.put(userName, x509Identity)
  }

  return wallet
}
const getCurrentNetworkCredentialPath = (networkName: string): string => {
  const credentialsPath = process.env.MEMBER_CREDENTIAL_FOLDER
    ? path.resolve(__dirname, process.env.MEMBER_CREDENTIAL_FOLDER, networkName)
    : path.join(__dirname, '../data', 'credentials', networkName)
  return credentialsPath
}
const getCredentialPath = (): string => {
  const credentialsPath = process.env.MEMBER_CREDENTIAL_FOLDER
    ? path.resolve(__dirname, process.env.MEMBER_CREDENTIAL_FOLDER)
    : path.join(__dirname, '../data', 'credentials')
  return credentialsPath
}
const generateAccessControl = async (
  channel: string,
  contractName: string,
  connProfilePath: string,
  networkName: string,
  templatePath: string,
  username: string,
  mspId = global.__DEFAULT_MSPID__,
  logger: any = console
): Promise<void> => {
  const { wallet } = await fabricHelper({
    channel,
    contractName,
    connProfilePath,
    networkName,
    logger,
    mspId
  })
  const templateJSON = JSON.parse(
    Buffer.from(fs.readFileSync(templatePath)).toString()
  )
  const [keyCert, keyCertError] = await handlePromise(
    getKeyAndCertForRemoteRequestbyUserName(wallet, username)
  )
  if (keyCertError) {
    logger.error(
      'Error fetching key and certificate from network',
      keyCertError
    )
  }
  const updatedRules = templateJSON.rules.map(rule => {
    rule.principal = keyCert.cert
    return rule
  })
  const accessControlJSON = {
    ...templateJSON,
    securityDomain: networkName,
    rules: updatedRules
  }
  logger.debug(`AccessControlJSON ${JSON.stringify(accessControlJSON)}`)
  const credentialsPath = getCurrentNetworkCredentialPath(networkName)
  fs.writeFileSync(
    path.join(credentialsPath, `access-control.json`),
    JSON.stringify(accessControlJSON)
  )
}

const generateVerificationPolicy = async (
  channel,
  contractName,
  connProfilePath,
  networkName: string,
  templatePath: string,
  mspId = global.__DEFAULT_MSPID__,
  logger: any = console
): Promise<void> => {
  const templateJSON = JSON.parse(
    Buffer.from(fs.readFileSync(templatePath)).toString()
  )
  const { gateway } = await fabricHelper({
    channel,
    contractName,
    connProfilePath,
    networkName,
    mspId,
    logger
  })

  const network = await gateway.getNetwork(channel)
  const mspConfig = await getMspConfig(network, logger)
  const criteria = Object.keys(formatMSP(mspConfig, networkName).members)
  const newIdentifiers = templateJSON.identifiers.map(identifier => {
    identifier.policy.criteria = criteria
    return identifier
  })
  const verificationPolicy = {
    ...templateJSON,
    identifiers: newIdentifiers,
    securityDomain: networkName
  }
  logger.debug(`VerificationPolicyJSON ${JSON.stringify(verificationPolicy)}`)
  const credentialsPath = getCurrentNetworkCredentialPath(networkName)
  logger.debug('Credential Path', credentialsPath)
  fs.writeFileSync(
    path.join(credentialsPath, `verification-policy.json`),
    JSON.stringify(verificationPolicy)
  )
}
const generateMembership = async (
  channel: string,
  contractName: string,
  connProfilePath: string,
  networkName: string,
  mspId = global.__DEFAULT_MSPID__,
  logger: any = console
): Promise<any> => {
  const { gateway } = await fabricHelper({
    channel,
    contractName,
    connProfilePath,
    networkName,
    mspId,
    logger
  })

  const network = await gateway.getNetwork(channel)
  const mspConfig = await getMspConfig(network, logger)
  const membershipJSON = formatMSP(mspConfig, networkName)
  logger.debug(`membershipJSON: ${JSON.stringify(membershipJSON)}`)

  const credentialsPath = getCurrentNetworkCredentialPath(networkName)
  logger.debug(`Credentials Path: ${credentialsPath}`)
  if (!fs.existsSync(credentialsPath)) {
    logger.debug(`Creating directory`)
    fs.mkdirSync(credentialsPath, { recursive: true })
  }

  fs.writeFileSync(
    path.join(credentialsPath, `membership.json`),
    JSON.stringify(membershipJSON)
  )
  return mspConfig
}

const formatMSP = (mspConfig: MspConfig, networkId: string) => {
  const memberObject = { members: {}, securityDomain: networkId }
  Object.entries(mspConfig).forEach(([name, value], _) => {
    // const cert = Certificate.fromPEM(Buffer.from(value.root_certs[0], 'base64'))
    memberObject.members[name] = {
      type: 'ca',
      value: Buffer.from(value.root_certs[0], 'base64').toString('utf8')
    }
  })
  return memberObject
}

type MspConfig = {
  [key: string]: { admins: any; root_certs: any; name: string }
}

const getMspConfig = async (
  network,
  logger: any = console
): Promise<MspConfig> => {
  const mspConfigs = network.channel.getMspids()
  const orgMspConfig = {}
  logger.debug(mspConfigs)
  logger.debug(network.channel.getMsp(mspConfigs[0]))

  mspConfigs.forEach(mspId => {
    if (mspId !== 'OrdererMSP') {
      logger.info('Getting MSP Info for org with MSP ID: ' + mspId + '.')
      const mspConfig = network.getChannel().getMsp(mspId)
      delete mspConfig.id
      if (Array.isArray(mspConfig.admins)) {
        for (let i = 0; i < mspConfig.admins.length; i++) {
          mspConfig.admins[i] = Buffer.from(mspConfig.admins[i]).toString(
            'base64'
          )
        }
      } else if (mspConfig.admins.length === 0) {
        mspConfig.admins = []
      } else {
        mspConfig.admins = [Buffer.from(mspConfig.admins).toString('base64')]
      }
      if (Array.isArray(mspConfig.rootCerts)) {
        for (let i = 0; i < mspConfig.rootCerts.length; i++) {
          mspConfig.rootCerts[i] = Buffer.from(mspConfig.rootCerts[i]).toString(
            'base64'
          )
        }
      } else if (mspConfig.rootCerts.length === 0) {
        mspConfig.rootCerts = []
      } else {
        mspConfig.rootCerts = [
          Buffer.from(mspConfig.rootCerts).toString('base64')
        ]
      }
      mspConfig.root_certs = mspConfig.rootCerts
      delete mspConfig.rootCerts
      if (Array.isArray(mspConfig.intermediateCerts)) {
        for (let i = 0; i < mspConfig.intermediateCerts.length; i++) {
          mspConfig.intermediateCerts[i] = Buffer.from(
            mspConfig.intermediateCerts[i]
          ).toString('base64')
        }
      } else if (mspConfig.intermediateCerts.length === 0) {
        mspConfig.intermediateCerts = []
      } else {
        mspConfig.intermediateCerts = [
          Buffer.from(mspConfig.intermediateCerts).toString('base64')
        ]
      }
      mspConfig.intermediate_certs = mspConfig.intermediateCerts
      delete mspConfig.intermediateCerts
      if (Array.isArray(mspConfig.tlsRootCerts)) {
        for (let i = 0; i < mspConfig.tlsRootCerts.length; i++) {
          mspConfig.tlsRootCerts[i] = Buffer.from(
            mspConfig.tlsRootCerts[i]
          ).toString('base64')
        }
      } else if (mspConfig.tlsRootCerts.length === 0) {
        mspConfig.tlsRootCerts = []
      } else {
        mspConfig.tlsRootCerts = [
          Buffer.from(mspConfig.tlsRootCerts).toString('base64')
        ]
      }
      mspConfig.tls_root_certs = mspConfig.tlsRootCerts
      delete mspConfig.tlsRootCerts
      if (Array.isArray(mspConfig.tlsIntermediateCerts)) {
        for (let i = 0; i < mspConfig.tlsIntermediateCerts.length; i++) {
          mspConfig.tlsIntermediateCerts[i] = Buffer.from(
            mspConfig.tlsIntermediateCerts[i]
          ).toString('base64')
        }
      } else if (mspConfig.tlsIntermediateCerts.length === 0) {
        mspConfig.tlsIntermediateCerts = []
      } else {
        mspConfig.tlsIntermediateCerts = [
          Buffer.from(mspConfig.tlsIntermediateCerts).toString('base64')
        ]
      }
      mspConfig.tls_intermediate_certs = mspConfig.tlsIntermediateCerts
      delete mspConfig.tlsIntermediateCerts
      orgMspConfig[mspId] = mspConfig
    }
  })
  return orgMspConfig
}

async function fabricHelper({
  channel,
  contractName,
  connProfilePath,
  networkName,
  mspId = global.__DEFAULT_MSPID__,
  logger = console,
  discoverEnabled = true
}: {
  channel: string
  contractName: string
  connProfilePath: string
  networkName: string
  mspId?: string
  discoverEnabled?: boolean
  logger?: any
}): Promise<{ gateway: Gateway; contract: Contract; wallet: any }> {
  // load the network configuration
  const ccpPath = path.resolve(__dirname, connProfilePath)
  const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'))
  const userString = `User1@org1.${networkName}.com`
  // Create a new file system based wallet for managing identities.
  const walletPath = process.env.WALLET_PATH
    ? process.env.WALLET_PATH
    : path.join(__dirname, '../', `wallet-${networkName}`)
  const wallet = await walletSetup(networkName, walletPath, ccp, mspId, logger)
  // Check to see if we've already enrolled the user.
  const identity = await wallet.get(userString)
  if (!identity) {
    logger.info(
      `An identity for the user "${userString}" does not exist in the wallet`
    )
    logger.info('Run the registerUser.ts application before retrying')
  }
  // Create a new gateway for connecting to our peer node.
  const gateway = new Gateway()
  await gateway.connect(ccp, {
    wallet,
    identity: identity,
    discovery: {
      enabled: discoverEnabled,
      asLocalhost: process.env.LOCAL === 'false' ? false : true
    }
  })

  const network = await gateway.getNetwork(channel)
  // Get the contract from the network.
  const contract = network.getContract(contractName)
  return { gateway, contract, wallet }
}

async function query(
  query: Query,
  connProfilePath: string,
  networkName: string,
  mspId = global.__DEFAULT_MSPID__,
  logger: any = console
): Promise<string> {
  logger.debug('Running invoke on fabric network')
  try {
    logger.debug(
      `QUERY: ${JSON.stringify(
        query
      )} connProfilePath: ${connProfilePath} networkName ${networkName} `
    )
    const { contract, gateway } = await fabricHelper({
      channel: query.channel,
      contractName: query.contractName,
      connProfilePath,
      networkName,
      mspId
    })
    const read = await contract.evaluateTransaction(query.ccFunc, ...query.args)
    const state = Buffer.from(read).toString()
    if (state) {
      logger.debug(`State From Network:`, state)
    } else {
      logger.debug(`No State from network`)
    }
    // Disconnect from the gateway.
    await gateway.disconnect()
    return state
  } catch (error) {
    logger.error(`Failed to submit transaction: ${error}`)
    throw new Error(error)
  }
}
async function invoke(
  query: Query,
  connProfilePath: string,
  networkName: string,
  mspId = global.__DEFAULT_MSPID__,
  logger: any = console
): Promise<string> {
  logger.debug('Running invoke on fabric network')
  try {
    const { contract, gateway } = await fabricHelper({
      channel: query.channel,
      contractName: query.contractName,
      connProfilePath,
      networkName,
      mspId,
      logger
    })
    logger.debug(
      `CCFunc: ${query.ccFunc} 'CCArgs: ${JSON.stringify(query.args)}`
    )
    const read = await contract.submitTransaction(query.ccFunc, ...query.args)
    const state = Buffer.from(read).toString()
    if (state) {
      logger.debug(`Response From Network: ${state}`)
    } else {
      logger.debug('No Response from network')
    }

    // Disconnect from the gateway.
    await gateway.disconnect()
    return state
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`)
    throw new Error(error)
  }
}
const getKeyAndCertForRemoteRequestbyUserName = async (
  wallet: any,
  username: string
): Promise<{ key: ICryptoKey; cert: any }> => {
  if (!wallet) {
    throw new Error('No wallet passed')
  }
  if (!username) {
    throw new Error('No username passed')
  }
  const identity = await wallet.get(username)
  if (!identity) {
    throw new Error(
      'Identity for username ' + username + ' not present in wallet'
    )
  }
  // Assume the identity is of type 'fabric-network.X509Identity'
  const privKey = Utils.newCryptoSuite().createKeyFromRaw(
    identity.credentials.privateKey
  )
  return { key: privKey, cert: identity.credentials.certificate }
}

export {
  invoke,
  query,
  fabricHelper,
  generateMembership,
  generateAccessControl,
  getKeyAndCertForRemoteRequestbyUserName,
  getCredentialPath,
  getCurrentNetworkCredentialPath,
  generateVerificationPolicy
}
