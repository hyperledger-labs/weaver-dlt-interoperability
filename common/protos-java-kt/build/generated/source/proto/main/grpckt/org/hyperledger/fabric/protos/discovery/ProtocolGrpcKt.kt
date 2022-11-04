package org.hyperledger.fabric.protos.discovery

import io.grpc.CallOptions
import io.grpc.CallOptions.DEFAULT
import io.grpc.Channel
import io.grpc.Metadata
import io.grpc.MethodDescriptor
import io.grpc.ServerServiceDefinition
import io.grpc.ServerServiceDefinition.builder
import io.grpc.ServiceDescriptor
import io.grpc.Status.UNIMPLEMENTED
import io.grpc.StatusException
import io.grpc.kotlin.AbstractCoroutineServerImpl
import io.grpc.kotlin.AbstractCoroutineStub
import io.grpc.kotlin.ClientCalls.unaryRpc
import io.grpc.kotlin.ServerCalls.unaryServerMethodDefinition
import io.grpc.kotlin.StubFor
import kotlin.coroutines.CoroutineContext
import kotlin.coroutines.EmptyCoroutineContext
import kotlin.jvm.JvmOverloads
import kotlin.jvm.JvmStatic
import org.hyperledger.fabric.protos.discovery.DiscoveryGrpc.getServiceDescriptor

/**
 * Holder for Kotlin coroutine-based client and server APIs for discovery.Discovery.
 */
object DiscoveryGrpcKt {
  @JvmStatic
  val serviceDescriptor: ServiceDescriptor
    get() = DiscoveryGrpc.getServiceDescriptor()

  val discoverMethod: MethodDescriptor<Protocol.SignedRequest, Protocol.Response>
    @JvmStatic
    get() = DiscoveryGrpc.getDiscoverMethod()

  /**
   * A stub for issuing RPCs to a(n) discovery.Discovery service as suspending coroutines.
   */
  @StubFor(DiscoveryGrpc::class)
  class DiscoveryCoroutineStub @JvmOverloads constructor(
    channel: Channel,
    callOptions: CallOptions = DEFAULT
  ) : AbstractCoroutineStub<DiscoveryCoroutineStub>(channel, callOptions) {
    override fun build(channel: Channel, callOptions: CallOptions): DiscoveryCoroutineStub =
        DiscoveryCoroutineStub(channel, callOptions)

    /**
     * Executes this RPC and returns the response message, suspending until the RPC completes
     * with [`Status.OK`][io.grpc.Status].  If the RPC completes with another status, a
     * corresponding
     * [StatusException] is thrown.  If this coroutine is cancelled, the RPC is also cancelled
     * with the corresponding exception as a cause.
     *
     * @param request The request message to send to the server.
     *
     * @return The single response from the server.
     */
    suspend fun discover(request: Protocol.SignedRequest): Protocol.Response = unaryRpc(
      channel,
      DiscoveryGrpc.getDiscoverMethod(),
      request,
      callOptions,
      Metadata()
    )}

  /**
   * Skeletal implementation of the discovery.Discovery service based on Kotlin coroutines.
   */
  abstract class DiscoveryCoroutineImplBase(
    coroutineContext: CoroutineContext = EmptyCoroutineContext
  ) : AbstractCoroutineServerImpl(coroutineContext) {
    /**
     * Returns the response to an RPC for discovery.Discovery.Discover.
     *
     * If this method fails with a [StatusException], the RPC will fail with the corresponding
     * [io.grpc.Status].  If this method fails with a [java.util.concurrent.CancellationException],
     * the RPC will fail
     * with status `Status.CANCELLED`.  If this method fails for any other reason, the RPC will
     * fail with `Status.UNKNOWN` with the exception as a cause.
     *
     * @param request The request from the client.
     */
    open suspend fun discover(request: Protocol.SignedRequest): Protocol.Response = throw
        StatusException(UNIMPLEMENTED.withDescription("Method discovery.Discovery.Discover is unimplemented"))

    final override fun bindService(): ServerServiceDefinition = builder(getServiceDescriptor())
      .addMethod(unaryServerMethodDefinition(
      context = this.context,
      descriptor = DiscoveryGrpc.getDiscoverMethod(),
      implementation = ::discover
    )).build()
  }
}
