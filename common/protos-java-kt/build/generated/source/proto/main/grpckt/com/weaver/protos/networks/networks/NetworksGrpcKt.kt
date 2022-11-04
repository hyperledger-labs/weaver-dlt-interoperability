package com.weaver.protos.networks.networks

import com.weaver.protos.common.ack.AckOuterClass
import com.weaver.protos.common.events.Events
import com.weaver.protos.common.state.State
import com.weaver.protos.networks.networks.NetworkGrpc.getServiceDescriptor
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
 * Holder for Kotlin coroutine-based client and server APIs for networks.networks.Network.
 */
object NetworkGrpcKt {
  @JvmStatic
  val serviceDescriptor: ServiceDescriptor
    get() = NetworkGrpc.getServiceDescriptor()

  val requestStateMethod: MethodDescriptor<Networks.NetworkQuery, AckOuterClass.Ack>
    @JvmStatic
    get() = NetworkGrpc.getRequestStateMethod()

  val getStateMethod: MethodDescriptor<Networks.GetStateMessage, State.RequestState>
    @JvmStatic
    get() = NetworkGrpc.getGetStateMethod()

  val requestDatabaseMethod: MethodDescriptor<Networks.DbName, Networks.RelayDatabase>
    @JvmStatic
    get() = NetworkGrpc.getRequestDatabaseMethod()

  val subscribeEventMethod: MethodDescriptor<Networks.NetworkEventSubscription, AckOuterClass.Ack>
    @JvmStatic
    get() = NetworkGrpc.getSubscribeEventMethod()

  val getEventSubscriptionStateMethod: MethodDescriptor<Networks.GetStateMessage,
      Events.EventSubscriptionState>
    @JvmStatic
    get() = NetworkGrpc.getGetEventSubscriptionStateMethod()

  val unsubscribeEventMethod: MethodDescriptor<Networks.NetworkEventUnsubscription,
      AckOuterClass.Ack>
    @JvmStatic
    get() = NetworkGrpc.getUnsubscribeEventMethod()

  val getEventStatesMethod: MethodDescriptor<Networks.GetStateMessage, Events.EventStates>
    @JvmStatic
    get() = NetworkGrpc.getGetEventStatesMethod()

  /**
   * A stub for issuing RPCs to a(n) networks.networks.Network service as suspending coroutines.
   */
  @StubFor(NetworkGrpc::class)
  class NetworkCoroutineStub @JvmOverloads constructor(
    channel: Channel,
    callOptions: CallOptions = DEFAULT
  ) : AbstractCoroutineStub<NetworkCoroutineStub>(channel, callOptions) {
    override fun build(channel: Channel, callOptions: CallOptions): NetworkCoroutineStub =
        NetworkCoroutineStub(channel, callOptions)

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
    suspend fun requestState(request: Networks.NetworkQuery): AckOuterClass.Ack = unaryRpc(
      channel,
      NetworkGrpc.getRequestStateMethod(),
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
    suspend fun getState(request: Networks.GetStateMessage): State.RequestState = unaryRpc(
      channel,
      NetworkGrpc.getGetStateMethod(),
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
    suspend fun requestDatabase(request: Networks.DbName): Networks.RelayDatabase = unaryRpc(
      channel,
      NetworkGrpc.getRequestDatabaseMethod(),
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
    suspend fun subscribeEvent(request: Networks.NetworkEventSubscription): AckOuterClass.Ack =
        unaryRpc(
      channel,
      NetworkGrpc.getSubscribeEventMethod(),
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
    suspend fun getEventSubscriptionState(request: Networks.GetStateMessage):
        Events.EventSubscriptionState = unaryRpc(
      channel,
      NetworkGrpc.getGetEventSubscriptionStateMethod(),
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
    suspend fun unsubscribeEvent(request: Networks.NetworkEventUnsubscription): AckOuterClass.Ack =
        unaryRpc(
      channel,
      NetworkGrpc.getUnsubscribeEventMethod(),
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
    suspend fun getEventStates(request: Networks.GetStateMessage): Events.EventStates = unaryRpc(
      channel,
      NetworkGrpc.getGetEventStatesMethod(),
      request,
      callOptions,
      Metadata()
    )}

  /**
   * Skeletal implementation of the networks.networks.Network service based on Kotlin coroutines.
   */
  abstract class NetworkCoroutineImplBase(
    coroutineContext: CoroutineContext = EmptyCoroutineContext
  ) : AbstractCoroutineServerImpl(coroutineContext) {
    /**
     * Returns the response to an RPC for networks.networks.Network.RequestState.
     *
     * If this method fails with a [StatusException], the RPC will fail with the corresponding
     * [Status].  If this method fails with a [java.util.concurrent.CancellationException], the RPC
     * will fail
     * with status `Status.CANCELLED`.  If this method fails for any other reason, the RPC will
     * fail with `Status.UNKNOWN` with the exception as a cause.
     *
     * @param request The request from the client.
     */
    open suspend fun requestState(request: Networks.NetworkQuery): AckOuterClass.Ack = throw
        StatusException(UNIMPLEMENTED.withDescription("Method networks.networks.Network.RequestState is unimplemented"))

    /**
     * Returns the response to an RPC for networks.networks.Network.GetState.
     *
     * If this method fails with a [StatusException], the RPC will fail with the corresponding
     * [Status].  If this method fails with a [java.util.concurrent.CancellationException], the RPC
     * will fail
     * with status `Status.CANCELLED`.  If this method fails for any other reason, the RPC will
     * fail with `Status.UNKNOWN` with the exception as a cause.
     *
     * @param request The request from the client.
     */
    open suspend fun getState(request: Networks.GetStateMessage): State.RequestState = throw
        StatusException(UNIMPLEMENTED.withDescription("Method networks.networks.Network.GetState is unimplemented"))

    /**
     * Returns the response to an RPC for networks.networks.Network.RequestDatabase.
     *
     * If this method fails with a [StatusException], the RPC will fail with the corresponding
     * [Status].  If this method fails with a [java.util.concurrent.CancellationException], the RPC
     * will fail
     * with status `Status.CANCELLED`.  If this method fails for any other reason, the RPC will
     * fail with `Status.UNKNOWN` with the exception as a cause.
     *
     * @param request The request from the client.
     */
    open suspend fun requestDatabase(request: Networks.DbName): Networks.RelayDatabase = throw
        StatusException(UNIMPLEMENTED.withDescription("Method networks.networks.Network.RequestDatabase is unimplemented"))

    /**
     * Returns the response to an RPC for networks.networks.Network.SubscribeEvent.
     *
     * If this method fails with a [StatusException], the RPC will fail with the corresponding
     * [Status].  If this method fails with a [java.util.concurrent.CancellationException], the RPC
     * will fail
     * with status `Status.CANCELLED`.  If this method fails for any other reason, the RPC will
     * fail with `Status.UNKNOWN` with the exception as a cause.
     *
     * @param request The request from the client.
     */
    open suspend fun subscribeEvent(request: Networks.NetworkEventSubscription): AckOuterClass.Ack =
        throw
        StatusException(UNIMPLEMENTED.withDescription("Method networks.networks.Network.SubscribeEvent is unimplemented"))

    /**
     * Returns the response to an RPC for networks.networks.Network.GetEventSubscriptionState.
     *
     * If this method fails with a [StatusException], the RPC will fail with the corresponding
     * [Status].  If this method fails with a [java.util.concurrent.CancellationException], the RPC
     * will fail
     * with status `Status.CANCELLED`.  If this method fails for any other reason, the RPC will
     * fail with `Status.UNKNOWN` with the exception as a cause.
     *
     * @param request The request from the client.
     */
    open suspend fun getEventSubscriptionState(request: Networks.GetStateMessage):
        Events.EventSubscriptionState = throw
        StatusException(UNIMPLEMENTED.withDescription("Method networks.networks.Network.GetEventSubscriptionState is unimplemented"))

    /**
     * Returns the response to an RPC for networks.networks.Network.UnsubscribeEvent.
     *
     * If this method fails with a [StatusException], the RPC will fail with the corresponding
     * [Status].  If this method fails with a [java.util.concurrent.CancellationException], the RPC
     * will fail
     * with status `Status.CANCELLED`.  If this method fails for any other reason, the RPC will
     * fail with `Status.UNKNOWN` with the exception as a cause.
     *
     * @param request The request from the client.
     */
    open suspend fun unsubscribeEvent(request: Networks.NetworkEventUnsubscription):
        AckOuterClass.Ack = throw
        StatusException(UNIMPLEMENTED.withDescription("Method networks.networks.Network.UnsubscribeEvent is unimplemented"))

    /**
     * Returns the response to an RPC for networks.networks.Network.GetEventStates.
     *
     * If this method fails with a [StatusException], the RPC will fail with the corresponding
     * [Status].  If this method fails with a [java.util.concurrent.CancellationException], the RPC
     * will fail
     * with status `Status.CANCELLED`.  If this method fails for any other reason, the RPC will
     * fail with `Status.UNKNOWN` with the exception as a cause.
     *
     * @param request The request from the client.
     */
    open suspend fun getEventStates(request: Networks.GetStateMessage): Events.EventStates = throw
        StatusException(UNIMPLEMENTED.withDescription("Method networks.networks.Network.GetEventStates is unimplemented"))

    final override fun bindService(): ServerServiceDefinition = builder(getServiceDescriptor())
      .addMethod(unaryServerMethodDefinition(
      context = this.context,
      descriptor = NetworkGrpc.getRequestStateMethod(),
      implementation = ::requestState
    ))
      .addMethod(unaryServerMethodDefinition(
      context = this.context,
      descriptor = NetworkGrpc.getGetStateMethod(),
      implementation = ::getState
    ))
      .addMethod(unaryServerMethodDefinition(
      context = this.context,
      descriptor = NetworkGrpc.getRequestDatabaseMethod(),
      implementation = ::requestDatabase
    ))
      .addMethod(unaryServerMethodDefinition(
      context = this.context,
      descriptor = NetworkGrpc.getSubscribeEventMethod(),
      implementation = ::subscribeEvent
    ))
      .addMethod(unaryServerMethodDefinition(
      context = this.context,
      descriptor = NetworkGrpc.getGetEventSubscriptionStateMethod(),
      implementation = ::getEventSubscriptionState
    ))
      .addMethod(unaryServerMethodDefinition(
      context = this.context,
      descriptor = NetworkGrpc.getUnsubscribeEventMethod(),
      implementation = ::unsubscribeEvent
    ))
      .addMethod(unaryServerMethodDefinition(
      context = this.context,
      descriptor = NetworkGrpc.getGetEventStatesMethod(),
      implementation = ::getEventStates
    )).build()
  }
}
