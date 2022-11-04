package com.weaver.protos.relay.events

import com.weaver.protos.common.ack.AckOuterClass
import com.weaver.protos.common.events.Events
import com.weaver.protos.common.state.State
import com.weaver.protos.relay.events.EventSubscribeGrpc.getServiceDescriptor
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
 * Holder for Kotlin coroutine-based client and server APIs for relay.events.EventSubscribe.
 */
object EventSubscribeGrpcKt {
  @JvmStatic
  val serviceDescriptor: ServiceDescriptor
    get() = EventSubscribeGrpc.getServiceDescriptor()

  val subscribeEventMethod: MethodDescriptor<Events.EventSubscription, AckOuterClass.Ack>
    @JvmStatic
    get() = EventSubscribeGrpc.getSubscribeEventMethod()

  val sendSubscriptionStatusMethod: MethodDescriptor<AckOuterClass.Ack, AckOuterClass.Ack>
    @JvmStatic
    get() = EventSubscribeGrpc.getSendSubscriptionStatusMethod()

  val sendDriverSubscriptionStatusMethod: MethodDescriptor<AckOuterClass.Ack, AckOuterClass.Ack>
    @JvmStatic
    get() = EventSubscribeGrpc.getSendDriverSubscriptionStatusMethod()

  /**
   * A stub for issuing RPCs to a(n) relay.events.EventSubscribe service as suspending coroutines.
   */
  @StubFor(EventSubscribeGrpc::class)
  class EventSubscribeCoroutineStub @JvmOverloads constructor(
    channel: Channel,
    callOptions: CallOptions = DEFAULT
  ) : AbstractCoroutineStub<EventSubscribeCoroutineStub>(channel, callOptions) {
    override fun build(channel: Channel, callOptions: CallOptions): EventSubscribeCoroutineStub =
        EventSubscribeCoroutineStub(channel, callOptions)

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
    suspend fun subscribeEvent(request: Events.EventSubscription): AckOuterClass.Ack = unaryRpc(
      channel,
      EventSubscribeGrpc.getSubscribeEventMethod(),
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
    suspend fun sendSubscriptionStatus(request: AckOuterClass.Ack): AckOuterClass.Ack = unaryRpc(
      channel,
      EventSubscribeGrpc.getSendSubscriptionStatusMethod(),
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
    suspend fun sendDriverSubscriptionStatus(request: AckOuterClass.Ack): AckOuterClass.Ack =
        unaryRpc(
      channel,
      EventSubscribeGrpc.getSendDriverSubscriptionStatusMethod(),
      request,
      callOptions,
      Metadata()
    )}

  /**
   * Skeletal implementation of the relay.events.EventSubscribe service based on Kotlin coroutines.
   */
  abstract class EventSubscribeCoroutineImplBase(
    coroutineContext: CoroutineContext = EmptyCoroutineContext
  ) : AbstractCoroutineServerImpl(coroutineContext) {
    /**
     * Returns the response to an RPC for relay.events.EventSubscribe.SubscribeEvent.
     *
     * If this method fails with a [StatusException], the RPC will fail with the corresponding
     * [Status].  If this method fails with a [java.util.concurrent.CancellationException], the RPC
     * will fail
     * with status `Status.CANCELLED`.  If this method fails for any other reason, the RPC will
     * fail with `Status.UNKNOWN` with the exception as a cause.
     *
     * @param request The request from the client.
     */
    open suspend fun subscribeEvent(request: Events.EventSubscription): AckOuterClass.Ack = throw
        StatusException(UNIMPLEMENTED.withDescription("Method relay.events.EventSubscribe.SubscribeEvent is unimplemented"))

    /**
     * Returns the response to an RPC for relay.events.EventSubscribe.SendSubscriptionStatus.
     *
     * If this method fails with a [StatusException], the RPC will fail with the corresponding
     * [Status].  If this method fails with a [java.util.concurrent.CancellationException], the RPC
     * will fail
     * with status `Status.CANCELLED`.  If this method fails for any other reason, the RPC will
     * fail with `Status.UNKNOWN` with the exception as a cause.
     *
     * @param request The request from the client.
     */
    open suspend fun sendSubscriptionStatus(request: AckOuterClass.Ack): AckOuterClass.Ack = throw
        StatusException(UNIMPLEMENTED.withDescription("Method relay.events.EventSubscribe.SendSubscriptionStatus is unimplemented"))

    /**
     * Returns the response to an RPC for relay.events.EventSubscribe.SendDriverSubscriptionStatus.
     *
     * If this method fails with a [StatusException], the RPC will fail with the corresponding
     * [Status].  If this method fails with a [java.util.concurrent.CancellationException], the RPC
     * will fail
     * with status `Status.CANCELLED`.  If this method fails for any other reason, the RPC will
     * fail with `Status.UNKNOWN` with the exception as a cause.
     *
     * @param request The request from the client.
     */
    open suspend fun sendDriverSubscriptionStatus(request: AckOuterClass.Ack): AckOuterClass.Ack =
        throw
        StatusException(UNIMPLEMENTED.withDescription("Method relay.events.EventSubscribe.SendDriverSubscriptionStatus is unimplemented"))

    final override fun bindService(): ServerServiceDefinition = builder(getServiceDescriptor())
      .addMethod(unaryServerMethodDefinition(
      context = this.context,
      descriptor = EventSubscribeGrpc.getSubscribeEventMethod(),
      implementation = ::subscribeEvent
    ))
      .addMethod(unaryServerMethodDefinition(
      context = this.context,
      descriptor = EventSubscribeGrpc.getSendSubscriptionStatusMethod(),
      implementation = ::sendSubscriptionStatus
    ))
      .addMethod(unaryServerMethodDefinition(
      context = this.context,
      descriptor = EventSubscribeGrpc.getSendDriverSubscriptionStatusMethod(),
      implementation = ::sendDriverSubscriptionStatus
    )).build()
  }
}

/**
 * Holder for Kotlin coroutine-based client and server APIs for relay.events.EventPublish.
 */
object EventPublishGrpcKt {
  @JvmStatic
  val serviceDescriptor: ServiceDescriptor
    get() = EventPublishGrpc.getServiceDescriptor()

  val sendDriverStateMethod: MethodDescriptor<State.ViewPayload, AckOuterClass.Ack>
    @JvmStatic
    get() = EventPublishGrpc.getSendDriverStateMethod()

  val sendStateMethod: MethodDescriptor<State.ViewPayload, AckOuterClass.Ack>
    @JvmStatic
    get() = EventPublishGrpc.getSendStateMethod()

  /**
   * A stub for issuing RPCs to a(n) relay.events.EventPublish service as suspending coroutines.
   */
  @StubFor(EventPublishGrpc::class)
  class EventPublishCoroutineStub @JvmOverloads constructor(
    channel: Channel,
    callOptions: CallOptions = DEFAULT
  ) : AbstractCoroutineStub<EventPublishCoroutineStub>(channel, callOptions) {
    override fun build(channel: Channel, callOptions: CallOptions): EventPublishCoroutineStub =
        EventPublishCoroutineStub(channel, callOptions)

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
    suspend fun sendDriverState(request: State.ViewPayload): AckOuterClass.Ack = unaryRpc(
      channel,
      EventPublishGrpc.getSendDriverStateMethod(),
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
    suspend fun sendState(request: State.ViewPayload): AckOuterClass.Ack = unaryRpc(
      channel,
      EventPublishGrpc.getSendStateMethod(),
      request,
      callOptions,
      Metadata()
    )}

  /**
   * Skeletal implementation of the relay.events.EventPublish service based on Kotlin coroutines.
   */
  abstract class EventPublishCoroutineImplBase(
    coroutineContext: CoroutineContext = EmptyCoroutineContext
  ) : AbstractCoroutineServerImpl(coroutineContext) {
    /**
     * Returns the response to an RPC for relay.events.EventPublish.SendDriverState.
     *
     * If this method fails with a [StatusException], the RPC will fail with the corresponding
     * [Status].  If this method fails with a [java.util.concurrent.CancellationException], the RPC
     * will fail
     * with status `Status.CANCELLED`.  If this method fails for any other reason, the RPC will
     * fail with `Status.UNKNOWN` with the exception as a cause.
     *
     * @param request The request from the client.
     */
    open suspend fun sendDriverState(request: State.ViewPayload): AckOuterClass.Ack = throw
        StatusException(UNIMPLEMENTED.withDescription("Method relay.events.EventPublish.SendDriverState is unimplemented"))

    /**
     * Returns the response to an RPC for relay.events.EventPublish.SendState.
     *
     * If this method fails with a [StatusException], the RPC will fail with the corresponding
     * [Status].  If this method fails with a [java.util.concurrent.CancellationException], the RPC
     * will fail
     * with status `Status.CANCELLED`.  If this method fails for any other reason, the RPC will
     * fail with `Status.UNKNOWN` with the exception as a cause.
     *
     * @param request The request from the client.
     */
    open suspend fun sendState(request: State.ViewPayload): AckOuterClass.Ack = throw
        StatusException(UNIMPLEMENTED.withDescription("Method relay.events.EventPublish.SendState is unimplemented"))

    final override fun bindService(): ServerServiceDefinition =
        builder(EventPublishGrpc.getServiceDescriptor())
      .addMethod(unaryServerMethodDefinition(
      context = this.context,
      descriptor = EventPublishGrpc.getSendDriverStateMethod(),
      implementation = ::sendDriverState
    ))
      .addMethod(unaryServerMethodDefinition(
      context = this.context,
      descriptor = EventPublishGrpc.getSendStateMethod(),
      implementation = ::sendState
    )).build()
  }
}
