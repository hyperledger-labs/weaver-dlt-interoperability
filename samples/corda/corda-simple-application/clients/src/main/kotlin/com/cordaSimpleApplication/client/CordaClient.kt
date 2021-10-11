/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

package com.cordaSimpleApplication.client

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.findOrSetObject
import com.github.ajalt.clikt.core.requireObject
import com.github.ajalt.clikt.core.subcommands

/**
 * The CLI application used by the user to trigger flows in the Corda nodes.
 */
class App : CliktCommand() {
    val config by findOrSetObject { mutableMapOf<String, String>() }
    override fun run() {
        config["CORDA_HOST"] = System.getenv("CORDA_HOST") ?: "localhost"
        config["CORDA_PORT"] = System.getenv("CORDA_PORT") ?: "10006"
    }
}

class GetFlowsCommand : CliktCommand(help = "Lists the flows") {
    val config by requireObject<Map<String, String>>()
    override fun run() {
        println("Getting the list of registered flows")
        val rpc = NodeRPCConnection(
                host = config["CORDA_HOST"]!!,
                username = "clientUser1",
                password = "test",
                rpcPort = config["CORDA_PORT"]!!.toInt())
        try {
            val proxy = rpc.proxy
            val flows = proxy.registeredFlows()
            println(flows)
        } catch (e: Exception) {
            println(e.toString())
        } finally {
            rpc.close()
        }
    }
}

fun main(args: Array<String>) = App()
        .subcommands(
                GetFlowsCommand(),
                CreateStateCommand(),
                UpdateStateCommand(),
                DeleteStateCommand(),
                GetStateCommand(),
                GetStateUsingLinearIdCommand(),
                GetStatesCommand(),
                RequestStateCommand(),
                IssueAssetStateCommand(),
                GetAssetStateByLinearIdCommand(),
                DeleteAssetStateCommand(),
                GetAssetStatesByTypeCommand(),
                IssueAssetStateFromStateRefCommand(),
                MergeAssetStatesCommand(),
                RetrieveAssetStateAndRefCommand(),
                SplitAssetStateCommand(),
                TransferAssetStateCommand(),
                CreateVerificationPolicyCommand(),
                UpdateVerificationPolicyCommand(),
                DeleteVerificationPolicyCommand(),
                GetVerificationPolicyCommand(),
                GetVerificationPoliciesCommand(),
                CreateAccessControlPolicyCommand(),
                UpdateAccessControlPolicyCommand(),
                DeleteAccessControlPolicyCommand(),
                GetAccessControlPolicyCommand(),
                GetAccessControlPoliciesCommand(),
                CreateMembershipCommand(),
                UpdateMembershipCommand(),
                DeleteMembershipCommand(),
                GetMembershipCommand(),
                GetMembershipsCommand(),
                ConfigureDataCommand(),
                ConfigureNetworkCommand(),
                ConfigureAllCommand(),
                ConfigureCreateAllCommand(),
                GetExternalStateCommand())
        .main(args)
