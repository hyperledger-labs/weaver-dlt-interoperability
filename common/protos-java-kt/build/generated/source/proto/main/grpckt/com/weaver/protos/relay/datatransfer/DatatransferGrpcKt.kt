package com.weaver.protos.relay.datatransfer

import com.weaver.protos.common.ack.AckOuterClass
import com.weaver.protos.common.query.QueryOuterClass
import com.weaver.protos.common.state.State
import com.weaver.protos.relay.datatransfer.DataTransferGrpc.getServiceDescriptor
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
 * Holder for Kotlin coroutine-based client and server APIs for relay.datatransfer.DataTransfer.
 */
object DataTransferGrpcKt {
  @JvmStatic
  val serviceDescriptor: ServiceDescriptor
    get() = DataTransferGrpc.getServiceDescriptor()

  val requestStateMethod: MethodDescriptor<QueryOuterClass.Query, AckOuterClass.Ack>
    @JvmStatic
    get() = DataTransferGrpc.getRequestStateMethod()

  val sendStateMethod: MethodDescriptor<State.ViewPayload, AckOuterClass.Ack>
    @JvmStatic
    get() = DataTransferGrpc.getSendStateMethod()

  val sendDriverStateMethod: MethodDescriptor<State.ViewPayload, AckOuterClass.Ack>
    @JvmStatic
    get() = DataTransferGrpc.getSendDriverStateMethod()

  /**
   * A stub for issuing RPCs to a(n) relay.datatransfer.DataTransfer service as suspending
   * coroutines.
   */
  @StubFor(DataTransferGrpc::class)
  class DataTransferCoroutineStub @JvmOverloads constructor(
    channel: Channel,
    callOptions: CallOptions = DEFAULT
  ) : AbstractCoroutineStub<DataTransferCoroutineStub>(channel, callOptions) {
    override fun build(channel: Channel, callOptions: CallOptions): DataTransferCoroutineStub =
        DataTransferCoroutineStub(channel, callOptions)

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
    suspend fun requestState(request: QueryOuterClass.Query): AckOuterClass.Ack = unaryRpc(
      channel,
      DataTransferGrpc.getRequestStateMethod(),
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
      DataTransferGrpc.getSendStateMethod(),
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
    suspend fun sendDriverState(request: State.ViewPayload): AckOuterClass.Ack = unaryRpc(
      channel,
      DataTransferGrpc.getSendDriverStateMethod(),
      request,
      callOptions,
      Metadata()
    )}

  /**
   * Skeletal implementation of the relay.datatransfer.DataTransfer service based on Kotlin
   * coroutines.
   */
  abstract class DataTransferCoroutineImplBase(
    coroutineContext: CoroutineContext = EmptyCoroutineContext
  ) : AbstractCoroutineServerImpl(coroutineContext) {
    /**
     * Returns the response to an RPC for relay.datatransfer.DataTransfer.RequestState.
     *
     * If this method fails with a [StatusException], the RPC will fail with the corresponding
     * [Status].  If this method fails with a [java.util.concurrent.CancellationException], the RPC
     * will fail
     * with status `Status.CANCELLED`.  If this method fails for any other reason, the RPC will
     * fail with `Status.UNKNOWN` with the exception as a cause.
     *
     * @param request The request from the client.
     */
    open suspend fun requestState(request: QueryOuterClass.Query): AckOuterClass.Ack = throw
        StatusException(UNIMPLEMENTED.withDescription("Method relay.datatransfer.DataTransfer.RequestState is unimplemented"))

    /**
     * Returns the response to an RPC for relay.datatransfer.DataTransfer.SendState.
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
        StatusException(UNIMPLEMENTED.withDescription("Method relay.datatransfer.DataTransfer.SendState is unimplemented"))

    /**
     * Returns the response to an RPC for relay.datatransfer.DataTransfer.SendDriverState.
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
        StatusException(UNIMPLEMENTED.withDescription("Method relay.datatransfer.DataTransfer.SendDriverState is unimplemented"))

    final override fun bindService(): ServerServiceDefinition = builder(getServiceDescriptor())
      .addMethod(unaryServerMethodDefinition(
      context = this.context,
      descriptor = DataTransferGrpc.getRequestStateMethod(),
      implementation = ::requestState
    ))
      .addMethod(unaryServerMethodDefinition(
      context = this.context,
      descriptor = DataTransferGrpc.getSendStateMethod(),
      implementation = ::sendState
    ))
      .addMethod(unaryServerMethodDefinition(
      context = this.context,
      descriptor = DataTransferGrpc.getSendDriverStateMethod(),
      implementation = ::sendDriverState
    )).build()
  }
}
