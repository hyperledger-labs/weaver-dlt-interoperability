package com.weaver.protos.driver.driver

import com.weaver.protos.common.ack.AckOuterClass
import com.weaver.protos.common.events.Events
import com.weaver.protos.common.query.QueryOuterClass
import com.weaver.protos.driver.driver.DriverCommunicationGrpc.getServiceDescriptor
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
 * Holder for Kotlin coroutine-based client and server APIs for driver.driver.DriverCommunication.
 */
object DriverCommunicationGrpcKt {
  @JvmStatic
  val serviceDescriptor: ServiceDescriptor
    get() = DriverCommunicationGrpc.getServiceDescriptor()

  val requestDriverStateMethod: MethodDescriptor<QueryOuterClass.Query, AckOuterClass.Ack>
    @JvmStatic
    get() = DriverCommunicationGrpc.getRequestDriverStateMethod()

  val subscribeEventMethod: MethodDescriptor<Events.EventSubscription, AckOuterClass.Ack>
    @JvmStatic
    get() = DriverCommunicationGrpc.getSubscribeEventMethod()

  val requestSignedEventSubscriptionQueryMethod: MethodDescriptor<Events.EventSubscription,
      QueryOuterClass.Query>
    @JvmStatic
    get() = DriverCommunicationGrpc.getRequestSignedEventSubscriptionQueryMethod()

  val writeExternalStateMethod: MethodDescriptor<Driver.WriteExternalStateMessage,
      AckOuterClass.Ack>
    @JvmStatic
    get() = DriverCommunicationGrpc.getWriteExternalStateMethod()

  /**
   * A stub for issuing RPCs to a(n) driver.driver.DriverCommunication service as suspending
   * coroutines.
   */
  @StubFor(DriverCommunicationGrpc::class)
  class DriverCommunicationCoroutineStub @JvmOverloads constructor(
    channel: Channel,
    callOptions: CallOptions = DEFAULT
  ) : AbstractCoroutineStub<DriverCommunicationCoroutineStub>(channel, callOptions) {
    override fun build(channel: Channel, callOptions: CallOptions): DriverCommunicationCoroutineStub
        = DriverCommunicationCoroutineStub(channel, callOptions)

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
    suspend fun requestDriverState(request: QueryOuterClass.Query): AckOuterClass.Ack = unaryRpc(
      channel,
      DriverCommunicationGrpc.getRequestDriverStateMethod(),
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
    suspend fun subscribeEvent(request: Events.EventSubscription): AckOuterClass.Ack = unaryRpc(
      channel,
      DriverCommunicationGrpc.getSubscribeEventMethod(),
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
    suspend fun requestSignedEventSubscriptionQuery(request: Events.EventSubscription):
        QueryOuterClass.Query = unaryRpc(
      channel,
      DriverCommunicationGrpc.getRequestSignedEventSubscriptionQueryMethod(),
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
    suspend fun writeExternalState(request: Driver.WriteExternalStateMessage): AckOuterClass.Ack =
        unaryRpc(
      channel,
      DriverCommunicationGrpc.getWriteExternalStateMethod(),
      request,
      callOptions,
      Metadata()
    )}

  /**
   * Skeletal implementation of the driver.driver.DriverCommunication service based on Kotlin
   * coroutines.
   */
  abstract class DriverCommunicationCoroutineImplBase(
    coroutineContext: CoroutineContext = EmptyCoroutineContext
  ) : AbstractCoroutineServerImpl(coroutineContext) {
    /**
     * Returns the response to an RPC for driver.driver.DriverCommunication.RequestDriverState.
     *
     * If this method fails with a [StatusException], the RPC will fail with the corresponding
     * [Status].  If this method fails with a [java.util.concurrent.CancellationException], the RPC
     * will fail
     * with status `Status.CANCELLED`.  If this method fails for any other reason, the RPC will
     * fail with `Status.UNKNOWN` with the exception as a cause.
     *
     * @param request The request from the client.
     */
    open suspend fun requestDriverState(request: QueryOuterClass.Query): AckOuterClass.Ack = throw
        StatusException(UNIMPLEMENTED.withDescription("Method driver.driver.DriverCommunication.RequestDriverState is unimplemented"))

    /**
     * Returns the response to an RPC for driver.driver.DriverCommunication.SubscribeEvent.
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
        StatusException(UNIMPLEMENTED.withDescription("Method driver.driver.DriverCommunication.SubscribeEvent is unimplemented"))

    /**
     * Returns the response to an RPC for
     * driver.driver.DriverCommunication.RequestSignedEventSubscriptionQuery.
     *
     * If this method fails with a [StatusException], the RPC will fail with the corresponding
     * [Status].  If this method fails with a [java.util.concurrent.CancellationException], the RPC
     * will fail
     * with status `Status.CANCELLED`.  If this method fails for any other reason, the RPC will
     * fail with `Status.UNKNOWN` with the exception as a cause.
     *
     * @param request The request from the client.
     */
    open suspend fun requestSignedEventSubscriptionQuery(request: Events.EventSubscription):
        QueryOuterClass.Query = throw
        StatusException(UNIMPLEMENTED.withDescription("Method driver.driver.DriverCommunication.RequestSignedEventSubscriptionQuery is unimplemented"))

    /**
     * Returns the response to an RPC for driver.driver.DriverCommunication.WriteExternalState.
     *
     * If this method fails with a [StatusException], the RPC will fail with the corresponding
     * [Status].  If this method fails with a [java.util.concurrent.CancellationException], the RPC
     * will fail
     * with status `Status.CANCELLED`.  If this method fails for any other reason, the RPC will
     * fail with `Status.UNKNOWN` with the exception as a cause.
     *
     * @param request The request from the client.
     */
    open suspend fun writeExternalState(request: Driver.WriteExternalStateMessage):
        AckOuterClass.Ack = throw
        StatusException(UNIMPLEMENTED.withDescription("Method driver.driver.DriverCommunication.WriteExternalState is unimplemented"))

    final override fun bindService(): ServerServiceDefinition = builder(getServiceDescriptor())
      .addMethod(unaryServerMethodDefinition(
      context = this.context,
      descriptor = DriverCommunicationGrpc.getRequestDriverStateMethod(),
      implementation = ::requestDriverState
    ))
      .addMethod(unaryServerMethodDefinition(
      context = this.context,
      descriptor = DriverCommunicationGrpc.getSubscribeEventMethod(),
      implementation = ::subscribeEvent
    ))
      .addMethod(unaryServerMethodDefinition(
      context = this.context,
      descriptor = DriverCommunicationGrpc.getRequestSignedEventSubscriptionQueryMethod(),
      implementation = ::requestSignedEventSubscriptionQuery
    ))
      .addMethod(unaryServerMethodDefinition(
      context = this.context,
      descriptor = DriverCommunicationGrpc.getWriteExternalStateMethod(),
      implementation = ::writeExternalState
    )).build()
  }
}
