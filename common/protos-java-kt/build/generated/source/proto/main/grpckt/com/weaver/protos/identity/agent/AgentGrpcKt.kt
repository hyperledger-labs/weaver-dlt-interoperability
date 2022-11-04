package com.weaver.protos.identity.agent

import com.weaver.protos.common.ack.AckOuterClass
import com.weaver.protos.identity.agent.IINAgentGrpc.getServiceDescriptor
import io.grpc.CallOptions
import io.grpc.CallOptions.DEFAULT
import io.grpc.Channel
import io.grpc.Metadata
import io.grpc.MethodDescriptor
import io.grpc.ServerServiceDefinition
import io.grpc.ServerServiceDefinition.builder
import io.grpc.ServiceDescriptor
import io.grpc.Status
import io.grpc.Status.UNIMPLEMENTED
import io.grpc.StatusException
import io.grpc.kotlin.AbstractCoroutineServerImpl
import io.grpc.kotlin.AbstractCoroutineStub
import io.grpc.kotlin.ClientCalls
import io.grpc.kotlin.ClientCalls.unaryRpc
import io.grpc.kotlin.ServerCalls
import io.grpc.kotlin.ServerCalls.unaryServerMethodDefinition
import io.grpc.kotlin.StubFor
import kotlin.coroutines.CoroutineContext
import kotlin.coroutines.EmptyCoroutineContext
import kotlin.jvm.JvmOverloads
import kotlin.jvm.JvmStatic

/**
 * Holder for Kotlin coroutine-based client and server APIs for identity.agent.IINAgent.
 */
object IINAgentGrpcKt {
  @JvmStatic
  val serviceDescriptor: ServiceDescriptor
    get() = IINAgentGrpc.getServiceDescriptor()

  val syncExternalStateMethod: MethodDescriptor<Agent.SecurityDomainMemberIdentity,
      AckOuterClass.Ack>
    @JvmStatic
    get() = IINAgentGrpc.getSyncExternalStateMethod()

  val requestIdentityConfigurationMethod:
      MethodDescriptor<Agent.SecurityDomainMemberIdentityRequest, AckOuterClass.Ack>
    @JvmStatic
    get() = IINAgentGrpc.getRequestIdentityConfigurationMethod()

  val sendIdentityConfigurationMethod: MethodDescriptor<Agent.AttestedMembership, AckOuterClass.Ack>
    @JvmStatic
    get() = IINAgentGrpc.getSendIdentityConfigurationMethod()

  val requestAttestationMethod: MethodDescriptor<Agent.CounterAttestedMembership, AckOuterClass.Ack>
    @JvmStatic
    get() = IINAgentGrpc.getRequestAttestationMethod()

  val sendAttestationMethod: MethodDescriptor<Agent.CounterAttestedMembership, AckOuterClass.Ack>
    @JvmStatic
    get() = IINAgentGrpc.getSendAttestationMethod()

  /**
   * A stub for issuing RPCs to a(n) identity.agent.IINAgent service as suspending coroutines.
   */
  @StubFor(IINAgentGrpc::class)
  class IINAgentCoroutineStub @JvmOverloads constructor(
    channel: Channel,
    callOptions: CallOptions = DEFAULT
  ) : AbstractCoroutineStub<IINAgentCoroutineStub>(channel, callOptions) {
    override fun build(channel: Channel, callOptions: CallOptions): IINAgentCoroutineStub =
        IINAgentCoroutineStub(channel, callOptions)

    /**
     * Executes this RPC and returns the response message, suspending until the RPC completes
     * with [`Status.OK`][Status].  If the RPC completes with another status, a corresponding
     * [StatusException] is thrown.  If this coroutine is cancelled, the RPC is also cancelled
     * with the corresponding exception as a cause.
     *
     * @param request The request message to send to the server.
     *
     * @return The single response from the server.
     */
    suspend fun syncExternalState(request: Agent.SecurityDomainMemberIdentity): AckOuterClass.Ack =
        unaryRpc(
      channel,
      IINAgentGrpc.getSyncExternalStateMethod(),
      request,
      callOptions,
      Metadata()
    )
    /**
     * Executes this RPC and returns the response message, suspending until the RPC completes
     * with [`Status.OK`][Status].  If the RPC completes with another status, a corresponding
     * [StatusException] is thrown.  If this coroutine is cancelled, the RPC is also cancelled
     * with the corresponding exception as a cause.
     *
     * @param request The request message to send to the server.
     *
     * @return The single response from the server.
     */
    suspend fun requestIdentityConfiguration(request: Agent.SecurityDomainMemberIdentityRequest):
        AckOuterClass.Ack = unaryRpc(
      channel,
      IINAgentGrpc.getRequestIdentityConfigurationMethod(),
      request,
      callOptions,
      Metadata()
    )
    /**
     * Executes this RPC and returns the response message, suspending until the RPC completes
     * with [`Status.OK`][Status].  If the RPC completes with another status, a corresponding
     * [StatusException] is thrown.  If this coroutine is cancelled, the RPC is also cancelled
     * with the corresponding exception as a cause.
     *
     * @param request The request message to send to the server.
     *
     * @return The single response from the server.
     */
    suspend fun sendIdentityConfiguration(request: Agent.AttestedMembership): AckOuterClass.Ack =
        unaryRpc(
      channel,
      IINAgentGrpc.getSendIdentityConfigurationMethod(),
      request,
      callOptions,
      Metadata()
    )
    /**
     * Executes this RPC and returns the response message, suspending until the RPC completes
     * with [`Status.OK`][Status].  If the RPC completes with another status, a corresponding
     * [StatusException] is thrown.  If this coroutine is cancelled, the RPC is also cancelled
     * with the corresponding exception as a cause.
     *
     * @param request The request message to send to the server.
     *
     * @return The single response from the server.
     */
    suspend fun requestAttestation(request: Agent.CounterAttestedMembership): AckOuterClass.Ack =
        unaryRpc(
      channel,
      IINAgentGrpc.getRequestAttestationMethod(),
      request,
      callOptions,
      Metadata()
    )
    /**
     * Executes this RPC and returns the response message, suspending until the RPC completes
     * with [`Status.OK`][Status].  If the RPC completes with another status, a corresponding
     * [StatusException] is thrown.  If this coroutine is cancelled, the RPC is also cancelled
     * with the corresponding exception as a cause.
     *
     * @param request The request message to send to the server.
     *
     * @return The single response from the server.
     */
    suspend fun sendAttestation(request: Agent.CounterAttestedMembership): AckOuterClass.Ack =
        unaryRpc(
      channel,
      IINAgentGrpc.getSendAttestationMethod(),
      request,
      callOptions,
      Metadata()
    )}

  /**
   * Skeletal implementation of the identity.agent.IINAgent service based on Kotlin coroutines.
   */
  abstract class IINAgentCoroutineImplBase(
    coroutineContext: CoroutineContext = EmptyCoroutineContext
  ) : AbstractCoroutineServerImpl(coroutineContext) {
    /**
     * Returns the response to an RPC for identity.agent.IINAgent.SyncExternalState.
     *
     * If this method fails with a [StatusException], the RPC will fail with the corresponding
     * [Status].  If this method fails with a [java.util.concurrent.CancellationException], the RPC
     * will fail
     * with status `Status.CANCELLED`.  If this method fails for any other reason, the RPC will
     * fail with `Status.UNKNOWN` with the exception as a cause.
     *
     * @param request The request from the client.
     */
    open suspend fun syncExternalState(request: Agent.SecurityDomainMemberIdentity):
        AckOuterClass.Ack = throw
        StatusException(UNIMPLEMENTED.withDescription("Method identity.agent.IINAgent.SyncExternalState is unimplemented"))

    /**
     * Returns the response to an RPC for identity.agent.IINAgent.RequestIdentityConfiguration.
     *
     * If this method fails with a [StatusException], the RPC will fail with the corresponding
     * [Status].  If this method fails with a [java.util.concurrent.CancellationException], the RPC
     * will fail
     * with status `Status.CANCELLED`.  If this method fails for any other reason, the RPC will
     * fail with `Status.UNKNOWN` with the exception as a cause.
     *
     * @param request The request from the client.
     */
    open suspend
        fun requestIdentityConfiguration(request: Agent.SecurityDomainMemberIdentityRequest):
        AckOuterClass.Ack = throw
        StatusException(UNIMPLEMENTED.withDescription("Method identity.agent.IINAgent.RequestIdentityConfiguration is unimplemented"))

    /**
     * Returns the response to an RPC for identity.agent.IINAgent.SendIdentityConfiguration.
     *
     * If this method fails with a [StatusException], the RPC will fail with the corresponding
     * [Status].  If this method fails with a [java.util.concurrent.CancellationException], the RPC
     * will fail
     * with status `Status.CANCELLED`.  If this method fails for any other reason, the RPC will
     * fail with `Status.UNKNOWN` with the exception as a cause.
     *
     * @param request The request from the client.
     */
    open suspend fun sendIdentityConfiguration(request: Agent.AttestedMembership): AckOuterClass.Ack
        = throw
        StatusException(UNIMPLEMENTED.withDescription("Method identity.agent.IINAgent.SendIdentityConfiguration is unimplemented"))

    /**
     * Returns the response to an RPC for identity.agent.IINAgent.RequestAttestation.
     *
     * If this method fails with a [StatusException], the RPC will fail with the corresponding
     * [Status].  If this method fails with a [java.util.concurrent.CancellationException], the RPC
     * will fail
     * with status `Status.CANCELLED`.  If this method fails for any other reason, the RPC will
     * fail with `Status.UNKNOWN` with the exception as a cause.
     *
     * @param request The request from the client.
     */
    open suspend fun requestAttestation(request: Agent.CounterAttestedMembership): AckOuterClass.Ack
        = throw
        StatusException(UNIMPLEMENTED.withDescription("Method identity.agent.IINAgent.RequestAttestation is unimplemented"))

    /**
     * Returns the response to an RPC for identity.agent.IINAgent.SendAttestation.
     *
     * If this method fails with a [StatusException], the RPC will fail with the corresponding
     * [Status].  If this method fails with a [java.util.concurrent.CancellationException], the RPC
     * will fail
     * with status `Status.CANCELLED`.  If this method fails for any other reason, the RPC will
     * fail with `Status.UNKNOWN` with the exception as a cause.
     *
     * @param request The request from the client.
     */
    open suspend fun sendAttestation(request: Agent.CounterAttestedMembership): AckOuterClass.Ack =
        throw
        StatusException(UNIMPLEMENTED.withDescription("Method identity.agent.IINAgent.SendAttestation is unimplemented"))

    final override fun bindService(): ServerServiceDefinition = builder(getServiceDescriptor())
      .addMethod(unaryServerMethodDefinition(
      context = this.context,
      descriptor = IINAgentGrpc.getSyncExternalStateMethod(),
      implementation = ::syncExternalState
    ))
      .addMethod(unaryServerMethodDefinition(
      context = this.context,
      descriptor = IINAgentGrpc.getRequestIdentityConfigurationMethod(),
      implementation = ::requestIdentityConfiguration
    ))
      .addMethod(unaryServerMethodDefinition(
      context = this.context,
      descriptor = IINAgentGrpc.getSendIdentityConfigurationMethod(),
      implementation = ::sendIdentityConfiguration
    ))
      .addMethod(unaryServerMethodDefinition(
      context = this.context,
      descriptor = IINAgentGrpc.getRequestAttestationMethod(),
      implementation = ::requestAttestation
    ))
      .addMethod(unaryServerMethodDefinition(
      context = this.context,
      descriptor = IINAgentGrpc.getSendAttestationMethod(),
      implementation = ::sendAttestation
    )).build()
  }
}
