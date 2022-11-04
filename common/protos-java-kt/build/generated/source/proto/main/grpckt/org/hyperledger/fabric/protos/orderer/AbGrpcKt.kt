package org.hyperledger.fabric.protos.orderer

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
import org.hyperledger.fabric.protos.orderer.AtomicBroadcastGrpc.getServiceDescriptor

/**
 * Holder for Kotlin coroutine-based client and server APIs for orderer.AtomicBroadcast.
 */
object AtomicBroadcastGrpcKt {
  @JvmStatic
  val serviceDescriptor: ServiceDescriptor
    get() = AtomicBroadcastGrpc.getServiceDescriptor()

  val broadcastMethod: MethodDescriptor<Common.Envelope, Ab.BroadcastResponse>
    @JvmStatic
    get() = AtomicBroadcastGrpc.getBroadcastMethod()

  val deliverMethod: MethodDescriptor<Common.Envelope, Ab.DeliverResponse>
    @JvmStatic
    get() = AtomicBroadcastGrpc.getDeliverMethod()

  /**
   * A stub for issuing RPCs to a(n) orderer.AtomicBroadcast service as suspending coroutines.
   */
  @StubFor(AtomicBroadcastGrpc::class)
  class AtomicBroadcastCoroutineStub @JvmOverloads constructor(
    channel: Channel,
    callOptions: CallOptions = DEFAULT
  ) : AbstractCoroutineStub<AtomicBroadcastCoroutineStub>(channel, callOptions) {
    override fun build(channel: Channel, callOptions: CallOptions): AtomicBroadcastCoroutineStub =
        AtomicBroadcastCoroutineStub(channel, callOptions)

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
    fun broadcast(requests: Flow<Common.Envelope>): Flow<Ab.BroadcastResponse> = bidiStreamingRpc(
      channel,
      AtomicBroadcastGrpc.getBroadcastMethod(),
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
    fun deliver(requests: Flow<Common.Envelope>): Flow<Ab.DeliverResponse> = bidiStreamingRpc(
      channel,
      AtomicBroadcastGrpc.getDeliverMethod(),
      requests,
      callOptions,
      Metadata()
    )}

  /**
   * Skeletal implementation of the orderer.AtomicBroadcast service based on Kotlin coroutines.
   */
  abstract class AtomicBroadcastCoroutineImplBase(
    coroutineContext: CoroutineContext = EmptyCoroutineContext
  ) : AbstractCoroutineServerImpl(coroutineContext) {
    /**
     * Returns a [Flow] of responses to an RPC for orderer.AtomicBroadcast.Broadcast.
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
    open fun broadcast(requests: Flow<Common.Envelope>): Flow<Ab.BroadcastResponse> = throw
        StatusException(UNIMPLEMENTED.withDescription("Method orderer.AtomicBroadcast.Broadcast is unimplemented"))

    /**
     * Returns a [Flow] of responses to an RPC for orderer.AtomicBroadcast.Deliver.
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
    open fun deliver(requests: Flow<Common.Envelope>): Flow<Ab.DeliverResponse> = throw
        StatusException(UNIMPLEMENTED.withDescription("Method orderer.AtomicBroadcast.Deliver is unimplemented"))

    final override fun bindService(): ServerServiceDefinition = builder(getServiceDescriptor())
      .addMethod(bidiStreamingServerMethodDefinition(
      context = this.context,
      descriptor = AtomicBroadcastGrpc.getBroadcastMethod(),
      implementation = ::broadcast
    ))
      .addMethod(bidiStreamingServerMethodDefinition(
      context = this.context,
      descriptor = AtomicBroadcastGrpc.getDeliverMethod(),
      implementation = ::deliver
    )).build()
  }
}
