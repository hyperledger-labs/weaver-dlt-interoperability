package com.weaver.protos.relay.events;

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
 */
@javax.annotation.Generated(
    value = "by gRPC proto compiler (version 1.29.0)",
    comments = "Source: relay/events.proto")
public final class EventPublishGrpc {

  private EventPublishGrpc() {}

  public static final String SERVICE_NAME = "relay.events.EventPublish";

  // Static method descriptors that strictly reflect the proto.
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
    if ((getSendDriverStateMethod = EventPublishGrpc.getSendDriverStateMethod) == null) {
      synchronized (EventPublishGrpc.class) {
        if ((getSendDriverStateMethod = EventPublishGrpc.getSendDriverStateMethod) == null) {
          EventPublishGrpc.getSendDriverStateMethod = getSendDriverStateMethod =
              io.grpc.MethodDescriptor.<com.weaver.protos.common.state.State.ViewPayload, com.weaver.protos.common.ack.AckOuterClass.Ack>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "SendDriverState"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.common.state.State.ViewPayload.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.common.ack.AckOuterClass.Ack.getDefaultInstance()))
              .setSchemaDescriptor(new EventPublishMethodDescriptorSupplier("SendDriverState"))
              .build();
        }
      }
    }
    return getSendDriverStateMethod;
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
    if ((getSendStateMethod = EventPublishGrpc.getSendStateMethod) == null) {
      synchronized (EventPublishGrpc.class) {
        if ((getSendStateMethod = EventPublishGrpc.getSendStateMethod) == null) {
          EventPublishGrpc.getSendStateMethod = getSendStateMethod =
              io.grpc.MethodDescriptor.<com.weaver.protos.common.state.State.ViewPayload, com.weaver.protos.common.ack.AckOuterClass.Ack>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "SendState"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.common.state.State.ViewPayload.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.common.ack.AckOuterClass.Ack.getDefaultInstance()))
              .setSchemaDescriptor(new EventPublishMethodDescriptorSupplier("SendState"))
              .build();
        }
      }
    }
    return getSendStateMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static EventPublishStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<EventPublishStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<EventPublishStub>() {
        @java.lang.Override
        public EventPublishStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new EventPublishStub(channel, callOptions);
        }
      };
    return EventPublishStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static EventPublishBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<EventPublishBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<EventPublishBlockingStub>() {
        @java.lang.Override
        public EventPublishBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new EventPublishBlockingStub(channel, callOptions);
        }
      };
    return EventPublishBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static EventPublishFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<EventPublishFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<EventPublishFutureStub>() {
        @java.lang.Override
        public EventPublishFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new EventPublishFutureStub(channel, callOptions);
        }
      };
    return EventPublishFutureStub.newStub(factory, channel);
  }

  /**
   */
  public static abstract class EventPublishImplBase implements io.grpc.BindableService {

    /**
     * <pre>
     * src-driver forwards the state as part of event subscription to src-relay
     * </pre>
     */
    public void sendDriverState(com.weaver.protos.common.state.State.ViewPayload request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack> responseObserver) {
      asyncUnimplementedUnaryCall(getSendDriverStateMethod(), responseObserver);
    }

    /**
     * <pre>
     * src-relay will forward the state as part of event subscription to dest-relay
     * </pre>
     */
    public void sendState(com.weaver.protos.common.state.State.ViewPayload request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack> responseObserver) {
      asyncUnimplementedUnaryCall(getSendStateMethod(), responseObserver);
    }

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return io.grpc.ServerServiceDefinition.builder(getServiceDescriptor())
          .addMethod(
            getSendDriverStateMethod(),
            asyncUnaryCall(
              new MethodHandlers<
                com.weaver.protos.common.state.State.ViewPayload,
                com.weaver.protos.common.ack.AckOuterClass.Ack>(
                  this, METHODID_SEND_DRIVER_STATE)))
          .addMethod(
            getSendStateMethod(),
            asyncUnaryCall(
              new MethodHandlers<
                com.weaver.protos.common.state.State.ViewPayload,
                com.weaver.protos.common.ack.AckOuterClass.Ack>(
                  this, METHODID_SEND_STATE)))
          .build();
    }
  }

  /**
   */
  public static final class EventPublishStub extends io.grpc.stub.AbstractAsyncStub<EventPublishStub> {
    private EventPublishStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected EventPublishStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new EventPublishStub(channel, callOptions);
    }

    /**
     * <pre>
     * src-driver forwards the state as part of event subscription to src-relay
     * </pre>
     */
    public void sendDriverState(com.weaver.protos.common.state.State.ViewPayload request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack> responseObserver) {
      asyncUnaryCall(
          getChannel().newCall(getSendDriverStateMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * src-relay will forward the state as part of event subscription to dest-relay
     * </pre>
     */
    public void sendState(com.weaver.protos.common.state.State.ViewPayload request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack> responseObserver) {
      asyncUnaryCall(
          getChannel().newCall(getSendStateMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   */
  public static final class EventPublishBlockingStub extends io.grpc.stub.AbstractBlockingStub<EventPublishBlockingStub> {
    private EventPublishBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected EventPublishBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new EventPublishBlockingStub(channel, callOptions);
    }

    /**
     * <pre>
     * src-driver forwards the state as part of event subscription to src-relay
     * </pre>
     */
    public com.weaver.protos.common.ack.AckOuterClass.Ack sendDriverState(com.weaver.protos.common.state.State.ViewPayload request) {
      return blockingUnaryCall(
          getChannel(), getSendDriverStateMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * src-relay will forward the state as part of event subscription to dest-relay
     * </pre>
     */
    public com.weaver.protos.common.ack.AckOuterClass.Ack sendState(com.weaver.protos.common.state.State.ViewPayload request) {
      return blockingUnaryCall(
          getChannel(), getSendStateMethod(), getCallOptions(), request);
    }
  }

  /**
   */
  public static final class EventPublishFutureStub extends io.grpc.stub.AbstractFutureStub<EventPublishFutureStub> {
    private EventPublishFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected EventPublishFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new EventPublishFutureStub(channel, callOptions);
    }

    /**
     * <pre>
     * src-driver forwards the state as part of event subscription to src-relay
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.weaver.protos.common.ack.AckOuterClass.Ack> sendDriverState(
        com.weaver.protos.common.state.State.ViewPayload request) {
      return futureUnaryCall(
          getChannel().newCall(getSendDriverStateMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * src-relay will forward the state as part of event subscription to dest-relay
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.weaver.protos.common.ack.AckOuterClass.Ack> sendState(
        com.weaver.protos.common.state.State.ViewPayload request) {
      return futureUnaryCall(
          getChannel().newCall(getSendStateMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_SEND_DRIVER_STATE = 0;
  private static final int METHODID_SEND_STATE = 1;

  private static final class MethodHandlers<Req, Resp> implements
      io.grpc.stub.ServerCalls.UnaryMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ServerStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ClientStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.BidiStreamingMethod<Req, Resp> {
    private final EventPublishImplBase serviceImpl;
    private final int methodId;

    MethodHandlers(EventPublishImplBase serviceImpl, int methodId) {
      this.serviceImpl = serviceImpl;
      this.methodId = methodId;
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public void invoke(Req request, io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        case METHODID_SEND_DRIVER_STATE:
          serviceImpl.sendDriverState((com.weaver.protos.common.state.State.ViewPayload) request,
              (io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack>) responseObserver);
          break;
        case METHODID_SEND_STATE:
          serviceImpl.sendState((com.weaver.protos.common.state.State.ViewPayload) request,
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

  private static abstract class EventPublishBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    EventPublishBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return com.weaver.protos.relay.events.Events.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("EventPublish");
    }
  }

  private static final class EventPublishFileDescriptorSupplier
      extends EventPublishBaseDescriptorSupplier {
    EventPublishFileDescriptorSupplier() {}
  }

  private static final class EventPublishMethodDescriptorSupplier
      extends EventPublishBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final String methodName;

    EventPublishMethodDescriptorSupplier(String methodName) {
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
      synchronized (EventPublishGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new EventPublishFileDescriptorSupplier())
              .addMethod(getSendDriverStateMethod())
              .addMethod(getSendStateMethod())
              .build();
        }
      }
    }
    return result;
  }
}
