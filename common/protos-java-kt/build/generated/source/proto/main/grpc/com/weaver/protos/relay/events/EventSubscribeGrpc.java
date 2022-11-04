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
public final class EventSubscribeGrpc {

  private EventSubscribeGrpc() {}

  public static final String SERVICE_NAME = "relay.events.EventSubscribe";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<com.weaver.protos.common.events.Events.EventSubscription,
      com.weaver.protos.common.ack.AckOuterClass.Ack> getSubscribeEventMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "SubscribeEvent",
      requestType = com.weaver.protos.common.events.Events.EventSubscription.class,
      responseType = com.weaver.protos.common.ack.AckOuterClass.Ack.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.weaver.protos.common.events.Events.EventSubscription,
      com.weaver.protos.common.ack.AckOuterClass.Ack> getSubscribeEventMethod() {
    io.grpc.MethodDescriptor<com.weaver.protos.common.events.Events.EventSubscription, com.weaver.protos.common.ack.AckOuterClass.Ack> getSubscribeEventMethod;
    if ((getSubscribeEventMethod = EventSubscribeGrpc.getSubscribeEventMethod) == null) {
      synchronized (EventSubscribeGrpc.class) {
        if ((getSubscribeEventMethod = EventSubscribeGrpc.getSubscribeEventMethod) == null) {
          EventSubscribeGrpc.getSubscribeEventMethod = getSubscribeEventMethod =
              io.grpc.MethodDescriptor.<com.weaver.protos.common.events.Events.EventSubscription, com.weaver.protos.common.ack.AckOuterClass.Ack>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "SubscribeEvent"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.common.events.Events.EventSubscription.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.common.ack.AckOuterClass.Ack.getDefaultInstance()))
              .setSchemaDescriptor(new EventSubscribeMethodDescriptorSupplier("SubscribeEvent"))
              .build();
        }
      }
    }
    return getSubscribeEventMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.weaver.protos.common.ack.AckOuterClass.Ack,
      com.weaver.protos.common.ack.AckOuterClass.Ack> getSendSubscriptionStatusMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "SendSubscriptionStatus",
      requestType = com.weaver.protos.common.ack.AckOuterClass.Ack.class,
      responseType = com.weaver.protos.common.ack.AckOuterClass.Ack.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.weaver.protos.common.ack.AckOuterClass.Ack,
      com.weaver.protos.common.ack.AckOuterClass.Ack> getSendSubscriptionStatusMethod() {
    io.grpc.MethodDescriptor<com.weaver.protos.common.ack.AckOuterClass.Ack, com.weaver.protos.common.ack.AckOuterClass.Ack> getSendSubscriptionStatusMethod;
    if ((getSendSubscriptionStatusMethod = EventSubscribeGrpc.getSendSubscriptionStatusMethod) == null) {
      synchronized (EventSubscribeGrpc.class) {
        if ((getSendSubscriptionStatusMethod = EventSubscribeGrpc.getSendSubscriptionStatusMethod) == null) {
          EventSubscribeGrpc.getSendSubscriptionStatusMethod = getSendSubscriptionStatusMethod =
              io.grpc.MethodDescriptor.<com.weaver.protos.common.ack.AckOuterClass.Ack, com.weaver.protos.common.ack.AckOuterClass.Ack>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "SendSubscriptionStatus"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.common.ack.AckOuterClass.Ack.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.common.ack.AckOuterClass.Ack.getDefaultInstance()))
              .setSchemaDescriptor(new EventSubscribeMethodDescriptorSupplier("SendSubscriptionStatus"))
              .build();
        }
      }
    }
    return getSendSubscriptionStatusMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.weaver.protos.common.ack.AckOuterClass.Ack,
      com.weaver.protos.common.ack.AckOuterClass.Ack> getSendDriverSubscriptionStatusMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "SendDriverSubscriptionStatus",
      requestType = com.weaver.protos.common.ack.AckOuterClass.Ack.class,
      responseType = com.weaver.protos.common.ack.AckOuterClass.Ack.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.weaver.protos.common.ack.AckOuterClass.Ack,
      com.weaver.protos.common.ack.AckOuterClass.Ack> getSendDriverSubscriptionStatusMethod() {
    io.grpc.MethodDescriptor<com.weaver.protos.common.ack.AckOuterClass.Ack, com.weaver.protos.common.ack.AckOuterClass.Ack> getSendDriverSubscriptionStatusMethod;
    if ((getSendDriverSubscriptionStatusMethod = EventSubscribeGrpc.getSendDriverSubscriptionStatusMethod) == null) {
      synchronized (EventSubscribeGrpc.class) {
        if ((getSendDriverSubscriptionStatusMethod = EventSubscribeGrpc.getSendDriverSubscriptionStatusMethod) == null) {
          EventSubscribeGrpc.getSendDriverSubscriptionStatusMethod = getSendDriverSubscriptionStatusMethod =
              io.grpc.MethodDescriptor.<com.weaver.protos.common.ack.AckOuterClass.Ack, com.weaver.protos.common.ack.AckOuterClass.Ack>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "SendDriverSubscriptionStatus"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.common.ack.AckOuterClass.Ack.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.common.ack.AckOuterClass.Ack.getDefaultInstance()))
              .setSchemaDescriptor(new EventSubscribeMethodDescriptorSupplier("SendDriverSubscriptionStatus"))
              .build();
        }
      }
    }
    return getSendDriverSubscriptionStatusMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static EventSubscribeStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<EventSubscribeStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<EventSubscribeStub>() {
        @java.lang.Override
        public EventSubscribeStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new EventSubscribeStub(channel, callOptions);
        }
      };
    return EventSubscribeStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static EventSubscribeBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<EventSubscribeBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<EventSubscribeBlockingStub>() {
        @java.lang.Override
        public EventSubscribeBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new EventSubscribeBlockingStub(channel, callOptions);
        }
      };
    return EventSubscribeBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static EventSubscribeFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<EventSubscribeFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<EventSubscribeFutureStub>() {
        @java.lang.Override
        public EventSubscribeFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new EventSubscribeFutureStub(channel, callOptions);
        }
      };
    return EventSubscribeFutureStub.newStub(factory, channel);
  }

  /**
   */
  public static abstract class EventSubscribeImplBase implements io.grpc.BindableService {

    /**
     * <pre>
     * the dest-relay forwards the request from client as EventSubscription to the src-relay
     * </pre>
     */
    public void subscribeEvent(com.weaver.protos.common.events.Events.EventSubscription request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack> responseObserver) {
      asyncUnimplementedUnaryCall(getSubscribeEventMethod(), responseObserver);
    }

    /**
     * <pre>
     * Src-relay based upon query (EventSubscription) forwards the same response (Ack) 
     * from driver to the dest-relay by calling a new endpoint in dest-relay
     * </pre>
     */
    public void sendSubscriptionStatus(com.weaver.protos.common.ack.AckOuterClass.Ack request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack> responseObserver) {
      asyncUnimplementedUnaryCall(getSendSubscriptionStatusMethod(), responseObserver);
    }

    /**
     * <pre>
     * Src-driver status of event subscription (Ack) 
     * to the src-relay by calling a new endpoint in src-relay
     * </pre>
     */
    public void sendDriverSubscriptionStatus(com.weaver.protos.common.ack.AckOuterClass.Ack request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack> responseObserver) {
      asyncUnimplementedUnaryCall(getSendDriverSubscriptionStatusMethod(), responseObserver);
    }

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return io.grpc.ServerServiceDefinition.builder(getServiceDescriptor())
          .addMethod(
            getSubscribeEventMethod(),
            asyncUnaryCall(
              new MethodHandlers<
                com.weaver.protos.common.events.Events.EventSubscription,
                com.weaver.protos.common.ack.AckOuterClass.Ack>(
                  this, METHODID_SUBSCRIBE_EVENT)))
          .addMethod(
            getSendSubscriptionStatusMethod(),
            asyncUnaryCall(
              new MethodHandlers<
                com.weaver.protos.common.ack.AckOuterClass.Ack,
                com.weaver.protos.common.ack.AckOuterClass.Ack>(
                  this, METHODID_SEND_SUBSCRIPTION_STATUS)))
          .addMethod(
            getSendDriverSubscriptionStatusMethod(),
            asyncUnaryCall(
              new MethodHandlers<
                com.weaver.protos.common.ack.AckOuterClass.Ack,
                com.weaver.protos.common.ack.AckOuterClass.Ack>(
                  this, METHODID_SEND_DRIVER_SUBSCRIPTION_STATUS)))
          .build();
    }
  }

  /**
   */
  public static final class EventSubscribeStub extends io.grpc.stub.AbstractAsyncStub<EventSubscribeStub> {
    private EventSubscribeStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected EventSubscribeStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new EventSubscribeStub(channel, callOptions);
    }

    /**
     * <pre>
     * the dest-relay forwards the request from client as EventSubscription to the src-relay
     * </pre>
     */
    public void subscribeEvent(com.weaver.protos.common.events.Events.EventSubscription request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack> responseObserver) {
      asyncUnaryCall(
          getChannel().newCall(getSubscribeEventMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Src-relay based upon query (EventSubscription) forwards the same response (Ack) 
     * from driver to the dest-relay by calling a new endpoint in dest-relay
     * </pre>
     */
    public void sendSubscriptionStatus(com.weaver.protos.common.ack.AckOuterClass.Ack request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack> responseObserver) {
      asyncUnaryCall(
          getChannel().newCall(getSendSubscriptionStatusMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Src-driver status of event subscription (Ack) 
     * to the src-relay by calling a new endpoint in src-relay
     * </pre>
     */
    public void sendDriverSubscriptionStatus(com.weaver.protos.common.ack.AckOuterClass.Ack request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack> responseObserver) {
      asyncUnaryCall(
          getChannel().newCall(getSendDriverSubscriptionStatusMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   */
  public static final class EventSubscribeBlockingStub extends io.grpc.stub.AbstractBlockingStub<EventSubscribeBlockingStub> {
    private EventSubscribeBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected EventSubscribeBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new EventSubscribeBlockingStub(channel, callOptions);
    }

    /**
     * <pre>
     * the dest-relay forwards the request from client as EventSubscription to the src-relay
     * </pre>
     */
    public com.weaver.protos.common.ack.AckOuterClass.Ack subscribeEvent(com.weaver.protos.common.events.Events.EventSubscription request) {
      return blockingUnaryCall(
          getChannel(), getSubscribeEventMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Src-relay based upon query (EventSubscription) forwards the same response (Ack) 
     * from driver to the dest-relay by calling a new endpoint in dest-relay
     * </pre>
     */
    public com.weaver.protos.common.ack.AckOuterClass.Ack sendSubscriptionStatus(com.weaver.protos.common.ack.AckOuterClass.Ack request) {
      return blockingUnaryCall(
          getChannel(), getSendSubscriptionStatusMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Src-driver status of event subscription (Ack) 
     * to the src-relay by calling a new endpoint in src-relay
     * </pre>
     */
    public com.weaver.protos.common.ack.AckOuterClass.Ack sendDriverSubscriptionStatus(com.weaver.protos.common.ack.AckOuterClass.Ack request) {
      return blockingUnaryCall(
          getChannel(), getSendDriverSubscriptionStatusMethod(), getCallOptions(), request);
    }
  }

  /**
   */
  public static final class EventSubscribeFutureStub extends io.grpc.stub.AbstractFutureStub<EventSubscribeFutureStub> {
    private EventSubscribeFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected EventSubscribeFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new EventSubscribeFutureStub(channel, callOptions);
    }

    /**
     * <pre>
     * the dest-relay forwards the request from client as EventSubscription to the src-relay
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.weaver.protos.common.ack.AckOuterClass.Ack> subscribeEvent(
        com.weaver.protos.common.events.Events.EventSubscription request) {
      return futureUnaryCall(
          getChannel().newCall(getSubscribeEventMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Src-relay based upon query (EventSubscription) forwards the same response (Ack) 
     * from driver to the dest-relay by calling a new endpoint in dest-relay
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.weaver.protos.common.ack.AckOuterClass.Ack> sendSubscriptionStatus(
        com.weaver.protos.common.ack.AckOuterClass.Ack request) {
      return futureUnaryCall(
          getChannel().newCall(getSendSubscriptionStatusMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Src-driver status of event subscription (Ack) 
     * to the src-relay by calling a new endpoint in src-relay
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.weaver.protos.common.ack.AckOuterClass.Ack> sendDriverSubscriptionStatus(
        com.weaver.protos.common.ack.AckOuterClass.Ack request) {
      return futureUnaryCall(
          getChannel().newCall(getSendDriverSubscriptionStatusMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_SUBSCRIBE_EVENT = 0;
  private static final int METHODID_SEND_SUBSCRIPTION_STATUS = 1;
  private static final int METHODID_SEND_DRIVER_SUBSCRIPTION_STATUS = 2;

  private static final class MethodHandlers<Req, Resp> implements
      io.grpc.stub.ServerCalls.UnaryMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ServerStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ClientStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.BidiStreamingMethod<Req, Resp> {
    private final EventSubscribeImplBase serviceImpl;
    private final int methodId;

    MethodHandlers(EventSubscribeImplBase serviceImpl, int methodId) {
      this.serviceImpl = serviceImpl;
      this.methodId = methodId;
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public void invoke(Req request, io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        case METHODID_SUBSCRIBE_EVENT:
          serviceImpl.subscribeEvent((com.weaver.protos.common.events.Events.EventSubscription) request,
              (io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack>) responseObserver);
          break;
        case METHODID_SEND_SUBSCRIPTION_STATUS:
          serviceImpl.sendSubscriptionStatus((com.weaver.protos.common.ack.AckOuterClass.Ack) request,
              (io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack>) responseObserver);
          break;
        case METHODID_SEND_DRIVER_SUBSCRIPTION_STATUS:
          serviceImpl.sendDriverSubscriptionStatus((com.weaver.protos.common.ack.AckOuterClass.Ack) request,
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

  private static abstract class EventSubscribeBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    EventSubscribeBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return com.weaver.protos.relay.events.Events.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("EventSubscribe");
    }
  }

  private static final class EventSubscribeFileDescriptorSupplier
      extends EventSubscribeBaseDescriptorSupplier {
    EventSubscribeFileDescriptorSupplier() {}
  }

  private static final class EventSubscribeMethodDescriptorSupplier
      extends EventSubscribeBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final String methodName;

    EventSubscribeMethodDescriptorSupplier(String methodName) {
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
      synchronized (EventSubscribeGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new EventSubscribeFileDescriptorSupplier())
              .addMethod(getSubscribeEventMethod())
              .addMethod(getSendSubscriptionStatusMethod())
              .addMethod(getSendDriverSubscriptionStatusMethod())
              .build();
        }
      }
    }
    return result;
  }
}
