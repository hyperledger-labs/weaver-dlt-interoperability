package org.hyperledger.fabric.protos.gossip

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
import io.grpc.kotlin.ClientCalls.bidiStreamingRpc
import io.grpc.kotlin.ClientCalls.unaryRpc
import io.grpc.kotlin.ServerCalls.bidiStreamingServerMethodDefinition
import io.grpc.kotlin.ServerCalls.unaryServerMethodDefinition
import io.grpc.kotlin.StubFor
import kotlin.coroutines.CoroutineContext
import kotlin.coroutines.EmptyCoroutineContext
import kotlin.jvm.JvmOverloads
import kotlin.jvm.JvmStatic
import kotlinx.coroutines.flow.Flow
import org.hyperledger.fabric.protos.gossip.GossipGrpc.getServiceDescriptor

/**
 * Holder for Kotlin coroutine-based client and server APIs for gossip.Gossip.
 */
object GossipGrpcKt {
  @JvmStatic
  val serviceDescriptor: ServiceDescriptor
    get() = GossipGrpc.getServiceDescriptor()

  val gossipStreamMethod: MethodDescriptor<Message.Envelope, Message.Envelope>
    @JvmStatic
    get() = GossipGrpc.getGossipStreamMethod()

  val pingMethod: MethodDescriptor<Message.Empty, Message.Empty>
    @JvmStatic
    get() = GossipGrpc.getPingMethod()

  /**
   * A stub for issuing RPCs to a(n) gossip.Gossip service as suspending coroutines.
   */
  @StubFor(GossipGrpc::class)
  class GossipCoroutineStub @JvmOverloads constructor(
    channel: Channel,
    callOptions: CallOptions = DEFAULT
  ) : AbstractCoroutineStub<GossipCoroutineStub>(channel, callOptions) {
    override fun build(channel: Channel, callOptions: CallOptions): GossipCoroutineStub =
        GossipCoroutineStub(channel, callOptions)

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
    fun gossipStream(requests: Flow<Message.Envelope>): Flow<Message.Envelope> = bidiStreamingRpc(
      channel,
      GossipGrpc.getGossipStreamMethod(),
      requests,
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
    suspend fun ping(request: Message.Empty): Message.Empty = unaryRpc(
      channel,
      GossipGrpc.getPingMethod(),
      request,
      callOptions,
      Metadata()
    )}

  /**
   * Skeletal implementation of the gossip.Gossip service based on Kotlin coroutines.
   */
  abstract class GossipCoroutineImplBase(
    coroutineContext: CoroutineContext = EmptyCoroutineContext
  ) : AbstractCoroutineServerImpl(coroutineContext) {
    /**
     * Returns a [Flow] of responses to an RPC for gossip.Gossip.GossipStream.
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
    open fun gossipStream(requests: Flow<Message.Envelope>): Flow<Message.Envelope> = throw
        StatusException(UNIMPLEMENTED.withDescription("Method gossip.Gossip.GossipStream is unimplemented"))

    /**
     * Returns the response to an RPC for gossip.Gossip.Ping.
     *
     * If this method fails with a [StatusException], the RPC will fail with the corresponding
     * [Status].  If this method fails with a [java.util.concurrent.CancellationException], the RPC
     * will fail
     * with status `Status.CANCELLED`.  If this method fails for any other reason, the RPC will
     * fail with `Status.UNKNOWN` with the exception as a cause.
     *
     * @param request The request from the client.
     */
    open suspend fun ping(request: Message.Empty): Message.Empty = throw
        StatusException(UNIMPLEMENTED.withDescription("Method gossip.Gossip.Ping is unimplemented"))

    final override fun bindService(): ServerServiceDefinition = builder(getServiceDescriptor())
      .addMethod(bidiStreamingServerMethodDefinition(
      context = this.context,
      descriptor = GossipGrpc.getGossipStreamMethod(),
      implementation = ::gossipStream
    ))
      .addMethod(unaryServerMethodDefinition(
      context = this.context,
      descriptor = GossipGrpc.getPingMethod(),
      implementation = ::ping
    )).build()
  }
}
