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
import org.hyperledger.fabric.protos.peer.ChaincodeSupportGrpc.getServiceDescriptor

/**
 * Holder for Kotlin coroutine-based client and server APIs for protos.ChaincodeSupport.
 */
object ChaincodeSupportGrpcKt {
  @JvmStatic
  val serviceDescriptor: ServiceDescriptor
    get() = ChaincodeSupportGrpc.getServiceDescriptor()

  val registerMethod: MethodDescriptor<ChaincodeShim.ChaincodeMessage,
      ChaincodeShim.ChaincodeMessage>
    @JvmStatic
    get() = ChaincodeSupportGrpc.getRegisterMethod()

  /**
   * A stub for issuing RPCs to a(n) protos.ChaincodeSupport service as suspending coroutines.
   */
  @StubFor(ChaincodeSupportGrpc::class)
  class ChaincodeSupportCoroutineStub @JvmOverloads constructor(
    channel: Channel,
    callOptions: CallOptions = DEFAULT
  ) : AbstractCoroutineStub<ChaincodeSupportCoroutineStub>(channel, callOptions) {
    override fun build(channel: Channel, callOptions: CallOptions): ChaincodeSupportCoroutineStub =
        ChaincodeSupportCoroutineStub(channel, callOptions)

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
    fun register(requests: Flow<ChaincodeShim.ChaincodeMessage>):
        Flow<ChaincodeShim.ChaincodeMessage> = bidiStreamingRpc(
      channel,
      ChaincodeSupportGrpc.getRegisterMethod(),
      requests,
      callOptions,
      Metadata()
    )}

  /**
   * Skeletal implementation of the protos.ChaincodeSupport service based on Kotlin coroutines.
   */
  abstract class ChaincodeSupportCoroutineImplBase(
    coroutineContext: CoroutineContext = EmptyCoroutineContext
  ) : AbstractCoroutineServerImpl(coroutineContext) {
    /**
     * Returns a [Flow] of responses to an RPC for protos.ChaincodeSupport.Register.
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
    open fun register(requests: Flow<ChaincodeShim.ChaincodeMessage>):
        Flow<ChaincodeShim.ChaincodeMessage> = throw
        StatusException(UNIMPLEMENTED.withDescription("Method protos.ChaincodeSupport.Register is unimplemented"))

    final override fun bindService(): ServerServiceDefinition = builder(getServiceDescriptor())
      .addMethod(bidiStreamingServerMethodDefinition(
      context = this.context,
      descriptor = ChaincodeSupportGrpc.getRegisterMethod(),
      implementation = ::register
    )).build()
  }
}

/**
 * Holder for Kotlin coroutine-based client and server APIs for protos.Chaincode.
 */
object ChaincodeGrpcKt {
  @JvmStatic
  val serviceDescriptor: ServiceDescriptor
    get() = ChaincodeGrpc.getServiceDescriptor()

  val connectMethod: MethodDescriptor<ChaincodeShim.ChaincodeMessage,
      ChaincodeShim.ChaincodeMessage>
    @JvmStatic
    get() = ChaincodeGrpc.getConnectMethod()

  /**
   * A stub for issuing RPCs to a(n) protos.Chaincode service as suspending coroutines.
   */
  @StubFor(ChaincodeGrpc::class)
  class ChaincodeCoroutineStub @JvmOverloads constructor(
    channel: Channel,
    callOptions: CallOptions = DEFAULT
  ) : AbstractCoroutineStub<ChaincodeCoroutineStub>(channel, callOptions) {
    override fun build(channel: Channel, callOptions: CallOptions): ChaincodeCoroutineStub =
        ChaincodeCoroutineStub(channel, callOptions)

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
    fun connect(requests: Flow<ChaincodeShim.ChaincodeMessage>):
        Flow<ChaincodeShim.ChaincodeMessage> = bidiStreamingRpc(
      channel,
      ChaincodeGrpc.getConnectMethod(),
      requests,
      callOptions,
      Metadata()
    )}

  /**
   * Skeletal implementation of the protos.Chaincode service based on Kotlin coroutines.
   */
  abstract class ChaincodeCoroutineImplBase(
    coroutineContext: CoroutineContext = EmptyCoroutineContext
  ) : AbstractCoroutineServerImpl(coroutineContext) {
    /**
     * Returns a [Flow] of responses to an RPC for protos.Chaincode.Connect.
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
    open fun connect(requests: Flow<ChaincodeShim.ChaincodeMessage>):
        Flow<ChaincodeShim.ChaincodeMessage> = throw
        StatusException(UNIMPLEMENTED.withDescription("Method protos.Chaincode.Connect is unimplemented"))

    final override fun bindService(): ServerServiceDefinition =
        builder(ChaincodeGrpc.getServiceDescriptor())
      .addMethod(bidiStreamingServerMethodDefinition(
      context = this.context,
      descriptor = ChaincodeGrpc.getConnectMethod(),
      implementation = ::connect
    )).build()
  }
}
