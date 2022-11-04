package com.weaver.protos.relay.datatransfer;

import static io.grpc.MethodDescriptor.generateFullMethodName;
import static io.grpc.stub.ClientCalls.asyncBidiStreamingCall;
import static io.grpc.stub.ClientCalls.asyncClientStreamingCall;
import static io.grpc.stub.ClientCalls.asyncServerStreamingCall;
import static io.grpc.stub.ClientCalls.asyncUnaryCall;
import static io.grpc.stub.ClientCalls.blockingServerStreamingCall;
import static io.grpc.stub.ClientCalls.blockingUnaryCall;
import static io.grpc.stub.ClientCalls.futureUnaryCall;
import static io.grpc.stub.ServerCalls.asyncBidiStreamingCall;
import static io.grpc.stub.ServerCalls.asyncClientStreamingCall;
import static io.grpc.stub.ServerCalls.asyncServerStreamingCall;
import static io.grpc.stub.ServerCalls.asyncUnaryCall;
import static io.grpc.stub.ServerCalls.asyncUnimplementedStreamingCall;
import static io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall;

/**
 * <pre>
 * definitions of all messages used in the datatransfer protocol
 * </pre>
 */
@javax.annotation.Generated(
    value = "by gRPC proto compiler (version 1.29.0)",
    comments = "Source: relay/datatransfer.proto")
public final class DataTransferGrpc {

  private DataTransferGrpc() {}

  public static final String SERVICE_NAME = "relay.datatransfer.DataTransfer";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<com.weaver.protos.common.query.QueryOuterClass.Query,
      com.weaver.protos.common.ack.AckOuterClass.Ack> getRequestStateMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "RequestState",
      requestType = com.weaver.protos.common.query.QueryOuterClass.Query.class,
      responseType = com.weaver.protos.common.ack.AckOuterClass.Ack.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.weaver.protos.common.query.QueryOuterClass.Query,
      com.weaver.protos.common.ack.AckOuterClass.Ack> getRequestStateMethod() {
    io.grpc.MethodDescriptor<com.weaver.protos.common.query.QueryOuterClass.Query, com.weaver.protos.common.ack.AckOuterClass.Ack> getRequestStateMethod;
    if ((getRequestStateMethod = DataTransferGrpc.getRequestStateMethod) == null) {
      synchronized (DataTransferGrpc.class) {
        if ((getRequestStateMethod = DataTransferGrpc.getRequestStateMethod) == null) {
          DataTransferGrpc.getRequestStateMethod = getRequestStateMethod =
              io.grpc.MethodDescriptor.<com.weaver.protos.common.query.QueryOuterClass.Query, com.weaver.protos.common.ack.AckOuterClass.Ack>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "RequestState"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.common.query.QueryOuterClass.Query.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.common.ack.AckOuterClass.Ack.getDefaultInstance()))
              .setSchemaDescriptor(new DataTransferMethodDescriptorSupplier("RequestState"))
              .build();
        }
      }
    }
    return getRequestStateMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.weaver.protos.common.state.State.ViewPayload,
      com.weaver.protos.common.ack.AckOuterClass.Ack> getSendStateMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "SendState",
      requestType = com.weaver.protos.common.state.State.ViewPayload.class,
      responseType = com.weaver.protos.common.ack.AckOuterClass.Ack.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.weaver.protos.common.state.State.ViewPayload,
      com.weaver.protos.common.ack.AckOuterClass.Ack> getSendStateMethod() {
    io.grpc.MethodDescriptor<com.weaver.protos.common.state.State.ViewPayload, com.weaver.protos.common.ack.AckOuterClass.Ack> getSendStateMethod;
    if ((getSendStateMethod = DataTransferGrpc.getSendStateMethod) == null) {
      synchronized (DataTransferGrpc.class) {
        if ((getSendStateMethod = DataTransferGrpc.getSendStateMethod) == null) {
          DataTransferGrpc.getSendStateMethod = getSendStateMethod =
              io.grpc.MethodDescriptor.<com.weaver.protos.common.state.State.ViewPayload, com.weaver.protos.common.ack.AckOuterClass.Ack>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "SendState"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.common.state.State.ViewPayload.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.common.ack.AckOuterClass.Ack.getDefaultInstance()))
              .setSchemaDescriptor(new DataTransferMethodDescriptorSupplier("SendState"))
              .build();
        }
      }
    }
    return getSendStateMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.weaver.protos.common.state.State.ViewPayload,
      com.weaver.protos.common.ack.AckOuterClass.Ack> getSendDriverStateMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "SendDriverState",
      requestType = com.weaver.protos.common.state.State.ViewPayload.class,
      responseType = com.weaver.protos.common.ack.AckOuterClass.Ack.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.weaver.protos.common.state.State.ViewPayload,
      com.weaver.protos.common.ack.AckOuterClass.Ack> getSendDriverStateMethod() {
    io.grpc.MethodDescriptor<com.weaver.protos.common.state.State.ViewPayload, com.weaver.protos.common.ack.AckOuterClass.Ack> getSendDriverStateMethod;
    if ((getSendDriverStateMethod = DataTransferGrpc.getSendDriverStateMethod) == null) {
      synchronized (DataTransferGrpc.class) {
        if ((getSendDriverStateMethod = DataTransferGrpc.getSendDriverStateMethod) == null) {
          DataTransferGrpc.getSendDriverStateMethod = getSendDriverStateMethod =
              io.grpc.MethodDescriptor.<com.weaver.protos.common.state.State.ViewPayload, com.weaver.protos.common.ack.AckOuterClass.Ack>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "SendDriverState"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.common.state.State.ViewPayload.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.common.ack.AckOuterClass.Ack.getDefaultInstance()))
              .setSchemaDescriptor(new DataTransferMethodDescriptorSupplier("SendDriverState"))
              .build();
        }
      }
    }
    return getSendDriverStateMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static DataTransferStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<DataTransferStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<DataTransferStub>() {
        @java.lang.Override
        public DataTransferStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new DataTransferStub(channel, callOptions);
        }
      };
    return DataTransferStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static DataTransferBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<DataTransferBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<DataTransferBlockingStub>() {
        @java.lang.Override
        public DataTransferBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new DataTransferBlockingStub(channel, callOptions);
        }
      };
    return DataTransferBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static DataTransferFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<DataTransferFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<DataTransferFutureStub>() {
        @java.lang.Override
        public DataTransferFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new DataTransferFutureStub(channel, callOptions);
        }
      };
    return DataTransferFutureStub.newStub(factory, channel);
  }

  /**
   * <pre>
   * definitions of all messages used in the datatransfer protocol
   * </pre>
   */
  public static abstract class DataTransferImplBase implements io.grpc.BindableService {

    /**
     * <pre>
     * the requesting relay sends a RequestState request to the remote relay with a
     * query defining the data it wants to receive
     * </pre>
     */
    public void requestState(com.weaver.protos.common.query.QueryOuterClass.Query request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack> responseObserver) {
      asyncUnimplementedUnaryCall(getRequestStateMethod(), responseObserver);
    }

    /**
     * <pre>
     * the remote relay asynchronously sends back the requested data with
     * SendState
     * </pre>
     */
    public void sendState(com.weaver.protos.common.state.State.ViewPayload request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack> responseObserver) {
      asyncUnimplementedUnaryCall(getSendStateMethod(), responseObserver);
    }

    /**
     * <pre>
     * Handling state sent from the driver.
     * </pre>
     */
    public void sendDriverState(com.weaver.protos.common.state.State.ViewPayload request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack> responseObserver) {
      asyncUnimplementedUnaryCall(getSendDriverStateMethod(), responseObserver);
    }

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return io.grpc.ServerServiceDefinition.builder(getServiceDescriptor())
          .addMethod(
            getRequestStateMethod(),
            asyncUnaryCall(
              new MethodHandlers<
                com.weaver.protos.common.query.QueryOuterClass.Query,
                com.weaver.protos.common.ack.AckOuterClass.Ack>(
                  this, METHODID_REQUEST_STATE)))
          .addMethod(
            getSendStateMethod(),
            asyncUnaryCall(
              new MethodHandlers<
                com.weaver.protos.common.state.State.ViewPayload,
                com.weaver.protos.common.ack.AckOuterClass.Ack>(
                  this, METHODID_SEND_STATE)))
          .addMethod(
            getSendDriverStateMethod(),
            asyncUnaryCall(
              new MethodHandlers<
                com.weaver.protos.common.state.State.ViewPayload,
                com.weaver.protos.common.ack.AckOuterClass.Ack>(
                  this, METHODID_SEND_DRIVER_STATE)))
          .build();
    }
  }

  /**
   * <pre>
   * definitions of all messages used in the datatransfer protocol
   * </pre>
   */
  public static final class DataTransferStub extends io.grpc.stub.AbstractAsyncStub<DataTransferStub> {
    private DataTransferStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected DataTransferStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new DataTransferStub(channel, callOptions);
    }

    /**
     * <pre>
     * the requesting relay sends a RequestState request to the remote relay with a
     * query defining the data it wants to receive
     * </pre>
     */
    public void requestState(com.weaver.protos.common.query.QueryOuterClass.Query request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack> responseObserver) {
      asyncUnaryCall(
          getChannel().newCall(getRequestStateMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * the remote relay asynchronously sends back the requested data with
     * SendState
     * </pre>
     */
    public void sendState(com.weaver.protos.common.state.State.ViewPayload request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack> responseObserver) {
      asyncUnaryCall(
          getChannel().newCall(getSendStateMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Handling state sent from the driver.
     * </pre>
     */
    public void sendDriverState(com.weaver.protos.common.state.State.ViewPayload request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack> responseObserver) {
      asyncUnaryCall(
          getChannel().newCall(getSendDriverStateMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   * <pre>
   * definitions of all messages used in the datatransfer protocol
   * </pre>
   */
  public static final class DataTransferBlockingStub extends io.grpc.stub.AbstractBlockingStub<DataTransferBlockingStub> {
    private DataTransferBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected DataTransferBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new DataTransferBlockingStub(channel, callOptions);
    }

    /**
     * <pre>
     * the requesting relay sends a RequestState request to the remote relay with a
     * query defining the data it wants to receive
     * </pre>
     */
    public com.weaver.protos.common.ack.AckOuterClass.Ack requestState(com.weaver.protos.common.query.QueryOuterClass.Query request) {
      return blockingUnaryCall(
          getChannel(), getRequestStateMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * the remote relay asynchronously sends back the requested data with
     * SendState
     * </pre>
     */
    public com.weaver.protos.common.ack.AckOuterClass.Ack sendState(com.weaver.protos.common.state.State.ViewPayload request) {
      return blockingUnaryCall(
          getChannel(), getSendStateMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Handling state sent from the driver.
     * </pre>
     */
    public com.weaver.protos.common.ack.AckOuterClass.Ack sendDriverState(com.weaver.protos.common.state.State.ViewPayload request) {
      return blockingUnaryCall(
          getChannel(), getSendDriverStateMethod(), getCallOptions(), request);
    }
  }

  /**
   * <pre>
   * definitions of all messages used in the datatransfer protocol
   * </pre>
   */
  public static final class DataTransferFutureStub extends io.grpc.stub.AbstractFutureStub<DataTransferFutureStub> {
    private DataTransferFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected DataTransferFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new DataTransferFutureStub(channel, callOptions);
    }

    /**
     * <pre>
     * the requesting relay sends a RequestState request to the remote relay with a
     * query defining the data it wants to receive
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.weaver.protos.common.ack.AckOuterClass.Ack> requestState(
        com.weaver.protos.common.query.QueryOuterClass.Query request) {
      return futureUnaryCall(
          getChannel().newCall(getRequestStateMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * the remote relay asynchronously sends back the requested data with
     * SendState
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.weaver.protos.common.ack.AckOuterClass.Ack> sendState(
        com.weaver.protos.common.state.State.ViewPayload request) {
      return futureUnaryCall(
          getChannel().newCall(getSendStateMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Handling state sent from the driver.
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.weaver.protos.common.ack.AckOuterClass.Ack> sendDriverState(
        com.weaver.protos.common.state.State.ViewPayload request) {
      return futureUnaryCall(
          getChannel().newCall(getSendDriverStateMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_REQUEST_STATE = 0;
  private static final int METHODID_SEND_STATE = 1;
  private static final int METHODID_SEND_DRIVER_STATE = 2;

  private static final class MethodHandlers<Req, Resp> implements
      io.grpc.stub.ServerCalls.UnaryMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ServerStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ClientStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.BidiStreamingMethod<Req, Resp> {
    private final DataTransferImplBase serviceImpl;
    private final int methodId;

    MethodHandlers(DataTransferImplBase serviceImpl, int methodId) {
      this.serviceImpl = serviceImpl;
      this.methodId = methodId;
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public void invoke(Req request, io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        case METHODID_REQUEST_STATE:
          serviceImpl.requestState((com.weaver.protos.common.query.QueryOuterClass.Query) request,
              (io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack>) responseObserver);
          break;
        case METHODID_SEND_STATE:
          serviceImpl.sendState((com.weaver.protos.common.state.State.ViewPayload) request,
              (io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack>) responseObserver);
          break;
        case METHODID_SEND_DRIVER_STATE:
          serviceImpl.sendDriverState((com.weaver.protos.common.state.State.ViewPayload) request,
              (io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack>) responseObserver);
          break;
        default:
          throw new AssertionError();
      }
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public io.grpc.stub.StreamObserver<Req> invoke(
        io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        default:
          throw new AssertionError();
      }
    }
  }

  private static abstract class DataTransferBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    DataTransferBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return com.weaver.protos.relay.datatransfer.Datatransfer.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("DataTransfer");
    }
  }

  private static final class DataTransferFileDescriptorSupplier
      extends DataTransferBaseDescriptorSupplier {
    DataTransferFileDescriptorSupplier() {}
  }

  private static final class DataTransferMethodDescriptorSupplier
      extends DataTransferBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final String methodName;

    DataTransferMethodDescriptorSupplier(String methodName) {
      this.methodName = methodName;
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.MethodDescriptor getMethodDescriptor() {
      return getServiceDescriptor().findMethodByName(methodName);
    }
  }

  private static volatile io.grpc.ServiceDescriptor serviceDescriptor;

  public static io.grpc.ServiceDescriptor getServiceDescriptor() {
    io.grpc.ServiceDescriptor result = serviceDescriptor;
    if (result == null) {
      synchronized (DataTransferGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new DataTransferFileDescriptorSupplier())
              .addMethod(getRequestStateMethod())
              .addMethod(getSendStateMethod())
              .addMethod(getSendDriverStateMethod())
              .build();
        }
      }
    }
    return result;
  }
}
