package org.hyperledger.fabric.protos.peer

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
import io.grpc.kotlin.ClientCalls.bidiStreamingRpc
import io.grpc.kotlin.ServerCalls
import io.grpc.kotlin.ServerCalls.bidiStreamingServerMethodDefinition
import io.grpc.kotlin.StubFor
import kotlin.coroutines.CoroutineContext
import kotlin.coroutines.EmptyCoroutineContext
import kotlin.jvm.JvmOverloads
import kotlin.jvm.JvmStatic
import kotlinx.coroutines.flow.Flow
import org.hyperledger.fabric.protos.common.Common
import org.hyperledger.fabric.protos.peer.DeliverGrpc.getServiceDescriptor

/**
 * Holder for Kotlin coroutine-based client and server APIs for protos.Deliver.
 */
object DeliverGrpcKt {
  @JvmStatic
  val serviceDescriptor: ServiceDescriptor
    get() = DeliverGrpc.getServiceDescriptor()

  val deliverMethod: MethodDescriptor<Common.Envelope, EventsPackage.DeliverResponse>
    @JvmStatic
    get() = DeliverGrpc.getDeliverMethod()

  val deliverFilteredMethod: MethodDescriptor<Common.Envelope, EventsPackage.DeliverResponse>
    @JvmStatic
    get() = DeliverGrpc.getDeliverFilteredMethod()

  val deliverWithPrivateDataMethod: MethodDescriptor<Common.Envelope, EventsPackage.DeliverResponse>
    @JvmStatic
    get() = DeliverGrpc.getDeliverWithPrivateDataMethod()

  /**
   * A stub for issuing RPCs to a(n) protos.Deliver service as suspending coroutines.
   */
  @StubFor(DeliverGrpc::class)
  class DeliverCoroutineStub @JvmOverloads constructor(
    channel: Channel,
    callOptions: CallOptions = DEFAULT
  ) : AbstractCoroutineStub<DeliverCoroutineStub>(channel, callOptions) {
    override fun build(channel: Channel, callOptions: CallOptions): DeliverCoroutineStub =
        DeliverCoroutineStub(channel, callOptions)

    /**
     * Returns a [Flow] that, when collected, executes this RPC and emits responses from the
     * server as they arrive.  That flow finishes normally if the server closes its response with
     * [`Status.OK`][Status], and fails by throwing a [StatusException] otherwise.  If
     * collecting the flow downstream fails exceptionally (including via cancellation), the RPC
     * is cancelled with that exception as a cause.
     *
     * The [Flow] of requests is collected once each time the [Flow] of responses is
     * collected. If collection of the [Flow] of responses completes normally or
     * exceptionally before collection of `requests` completes, the collection of
     * `requests` is cancelled.  If the collection of `requests` completes
     * exceptionally for any other reason, then the collection of the [Flow] of responses
     * completes exceptionally for the same reason and the RPC is cancelled with that reason.
     *
     * @param requests A [Flow] of request messages.
     *
     * @return A flow that, when collected, emits the responses from the server.
     */
    fun deliver(requests: Flow<Common.Envelope>): Flow<EventsPackage.DeliverResponse> =
        bidiStreamingRpc(
      channel,
      DeliverGrpc.getDeliverMethod(),
      requests,
      callOptions,
      Metadata()
    )
    /**
     * Returns a [Flow] that, when collected, executes this RPC and emits responses from the
     * server as they arrive.  That flow finishes normally if the server closes its response with
     * [`Status.OK`][Status], and fails by throwing a [StatusException] otherwise.  If
     * collecting the flow downstream fails exceptionally (including via cancellation), the RPC
     * is cancelled with that exception as a cause.
     *
     * The [Flow] of requests is collected once each time the [Flow] of responses is
     * collected. If collection of the [Flow] of responses completes normally or
     * exceptionally before collection of `requests` completes, the collection of
     * `requests` is cancelled.  If the collection of `requests` completes
     * exceptionally for any other reason, then the collection of the [Flow] of responses
     * completes exceptionally for the same reason and the RPC is cancelled with that reason.
     *
     * @param requests A [Flow] of request messages.
     *
     * @return A flow that, when collected, emits the responses from the server.
     */
    fun deliverFiltered(requests: Flow<Common.Envelope>): Flow<EventsPackage.DeliverResponse> =
        bidiStreamingRpc(
      channel,
      DeliverGrpc.getDeliverFilteredMethod(),
      requests,
      callOptions,
      Metadata()
    )
    /**
     * Returns a [Flow] that, when collected, executes this RPC and emits responses from the
     * server as they arrive.  That flow finishes normally if the server closes its response with
     * [`Status.OK`][Status], and fails by throwing a [StatusException] otherwise.  If
     * collecting the flow downstream fails exceptionally (including via cancellation), the RPC
     * is cancelled with that exception as a cause.
     *
     * The [Flow] of requests is collected once each time the [Flow] of responses is
     * collected. If collection of the [Flow] of responses completes normally or
     * exceptionally before collection of `requests` completes, the collection of
     * `requests` is cancelled.  If the collection of `requests` completes
     * exceptionally for any other reason, then the collection of the [Flow] of responses
     * completes exceptionally for the same reason and the RPC is cancelled with that reason.
     *
     * @param requests A [Flow] of request messages.
     *
     * @return A flow that, when collected, emits the responses from the server.
     */
    fun deliverWithPrivateData(requests: Flow<Common.Envelope>): Flow<EventsPackage.DeliverResponse>
        = bidiStreamingRpc(
      channel,
      DeliverGrpc.getDeliverWithPrivateDataMethod(),
      requests,
      callOptions,
      Metadata()
    )}

  /**
   * Skeletal implementation of the protos.Deliver service based on Kotlin coroutines.
   */
  abstract class DeliverCoroutineImplBase(
    coroutineContext: CoroutineContext = EmptyCoroutineContext
  ) : AbstractCoroutineServerImpl(coroutineContext) {
    /**
     * Returns a [Flow] of responses to an RPC for protos.Deliver.Deliver.
     *
     * If creating or collecting the returned flow fails with a [StatusException], the RPC
     * will fail with the corresponding [Status].  If it fails with a
     * [java.util.concurrent.CancellationException], the RPC will fail with status
     * `Status.CANCELLED`.  If creating
     * or collecting the returned flow fails for any other reason, the RPC will fail with
     * `Status.UNKNOWN` with the exception as a cause.
     *
     * @param requests A [Flow] of requests from the client.  This flow can be
     *        collected only once and throws [java.lang.IllegalStateException] on attempts to
     * collect
     *        it more than once.
     */
    open fun deliver(requests: Flow<Common.Envelope>): Flow<EventsPackage.DeliverResponse> = throw
        StatusException(UNIMPLEMENTED.withDescription("Method protos.Deliver.Deliver is unimplemented"))

    /**
     * Returns a [Flow] of responses to an RPC for protos.Deliver.DeliverFiltered.
     *
     * If creating or collecting the returned flow fails with a [StatusException], the RPC
     * will fail with the corresponding [Status].  If it fails with a
     * [java.util.concurrent.CancellationException], the RPC will fail with status
     * `Status.CANCELLED`.  If creating
     * or collecting the returned flow fails for any other reason, the RPC will fail with
     * `Status.UNKNOWN` with the exception as a cause.
     *
     * @param requests A [Flow] of requests from the client.  This flow can be
     *        collected only once and throws [java.lang.IllegalStateException] on attempts to
     * collect
     *        it more than once.
     */
    open fun deliverFiltered(requests: Flow<Common.Envelope>): Flow<EventsPackage.DeliverResponse> =
        throw
        StatusException(UNIMPLEMENTED.withDescription("Method protos.Deliver.DeliverFiltered is unimplemented"))

    /**
     * Returns a [Flow] of responses to an RPC for protos.Deliver.DeliverWithPrivateData.
     *
     * If creating or collecting the returned flow fails with a [StatusException], the RPC
     * will fail with the corresponding [Status].  If it fails with a
     * [java.util.concurrent.CancellationException], the RPC will fail with status
     * `Status.CANCELLED`.  If creating
     * or collecting the returned flow fails for any other reason, the RPC will fail with
     * `Status.UNKNOWN` with the exception as a cause.
     *
     * @param requests A [Flow] of requests from the client.  This flow can be
     *        collected only once and throws [java.lang.IllegalStateException] on attempts to
     * collect
     *        it more than once.
     */
    open fun deliverWithPrivateData(requests: Flow<Common.Envelope>):
        Flow<EventsPackage.DeliverResponse> = throw
        StatusException(UNIMPLEMENTED.withDescription("Method protos.Deliver.DeliverWithPrivateData is unimplemented"))

    final override fun bindService(): ServerServiceDefinition = builder(getServiceDescriptor())
      .addMethod(bidiStreamingServerMethodDefinition(
      context = this.context,
      descriptor = DeliverGrpc.getDeliverMethod(),
      implementation = ::deliver
    ))
      .addMethod(bidiStreamingServerMethodDefinition(
      context = this.context,
      descriptor = DeliverGrpc.getDeliverFilteredMethod(),
      implementation = ::deliverFiltered
    ))
      .addMethod(bidiStreamingServerMethodDefinition(
      context = this.context,
      descriptor = DeliverGrpc.getDeliverWithPrivateDataMethod(),
      implementation = ::deliverWithPrivateData
    )).build()
  }
}
