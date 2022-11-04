package com.weaver.protos.driver.driver;

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
    comments = "Source: driver/driver.proto")
public final class DriverCommunicationGrpc {

  private DriverCommunicationGrpc() {}

  public static final String SERVICE_NAME = "driver.driver.DriverCommunication";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<com.weaver.protos.common.query.QueryOuterClass.Query,
      com.weaver.protos.common.ack.AckOuterClass.Ack> getRequestDriverStateMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "RequestDriverState",
      requestType = com.weaver.protos.common.query.QueryOuterClass.Query.class,
      responseType = com.weaver.protos.common.ack.AckOuterClass.Ack.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.weaver.protos.common.query.QueryOuterClass.Query,
      com.weaver.protos.common.ack.AckOuterClass.Ack> getRequestDriverStateMethod() {
    io.grpc.MethodDescriptor<com.weaver.protos.common.query.QueryOuterClass.Query, com.weaver.protos.common.ack.AckOuterClass.Ack> getRequestDriverStateMethod;
    if ((getRequestDriverStateMethod = DriverCommunicationGrpc.getRequestDriverStateMethod) == null) {
      synchronized (DriverCommunicationGrpc.class) {
        if ((getRequestDriverStateMethod = DriverCommunicationGrpc.getRequestDriverStateMethod) == null) {
          DriverCommunicationGrpc.getRequestDriverStateMethod = getRequestDriverStateMethod =
              io.grpc.MethodDescriptor.<com.weaver.protos.common.query.QueryOuterClass.Query, com.weaver.protos.common.ack.AckOuterClass.Ack>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "RequestDriverState"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.common.query.QueryOuterClass.Query.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.common.ack.AckOuterClass.Ack.getDefaultInstance()))
              .setSchemaDescriptor(new DriverCommunicationMethodDescriptorSupplier("RequestDriverState"))
              .build();
        }
      }
    }
    return getRequestDriverStateMethod;
  }

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
    if ((getSubscribeEventMethod = DriverCommunicationGrpc.getSubscribeEventMethod) == null) {
      synchronized (DriverCommunicationGrpc.class) {
        if ((getSubscribeEventMethod = DriverCommunicationGrpc.getSubscribeEventMethod) == null) {
          DriverCommunicationGrpc.getSubscribeEventMethod = getSubscribeEventMethod =
              io.grpc.MethodDescriptor.<com.weaver.protos.common.events.Events.EventSubscription, com.weaver.protos.common.ack.AckOuterClass.Ack>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "SubscribeEvent"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.common.events.Events.EventSubscription.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.common.ack.AckOuterClass.Ack.getDefaultInstance()))
              .setSchemaDescriptor(new DriverCommunicationMethodDescriptorSupplier("SubscribeEvent"))
              .build();
        }
      }
    }
    return getSubscribeEventMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.weaver.protos.common.events.Events.EventSubscription,
      com.weaver.protos.common.query.QueryOuterClass.Query> getRequestSignedEventSubscriptionQueryMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "RequestSignedEventSubscriptionQuery",
      requestType = com.weaver.protos.common.events.Events.EventSubscription.class,
      responseType = com.weaver.protos.common.query.QueryOuterClass.Query.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.weaver.protos.common.events.Events.EventSubscription,
      com.weaver.protos.common.query.QueryOuterClass.Query> getRequestSignedEventSubscriptionQueryMethod() {
    io.grpc.MethodDescriptor<com.weaver.protos.common.events.Events.EventSubscription, com.weaver.protos.common.query.QueryOuterClass.Query> getRequestSignedEventSubscriptionQueryMethod;
    if ((getRequestSignedEventSubscriptionQueryMethod = DriverCommunicationGrpc.getRequestSignedEventSubscriptionQueryMethod) == null) {
      synchronized (DriverCommunicationGrpc.class) {
        if ((getRequestSignedEventSubscriptionQueryMethod = DriverCommunicationGrpc.getRequestSignedEventSubscriptionQueryMethod) == null) {
          DriverCommunicationGrpc.getRequestSignedEventSubscriptionQueryMethod = getRequestSignedEventSubscriptionQueryMethod =
              io.grpc.MethodDescriptor.<com.weaver.protos.common.events.Events.EventSubscription, com.weaver.protos.common.query.QueryOuterClass.Query>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "RequestSignedEventSubscriptionQuery"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.common.events.Events.EventSubscription.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.common.query.QueryOuterClass.Query.getDefaultInstance()))
              .setSchemaDescriptor(new DriverCommunicationMethodDescriptorSupplier("RequestSignedEventSubscriptionQuery"))
              .build();
        }
      }
    }
    return getRequestSignedEventSubscriptionQueryMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage,
      com.weaver.protos.common.ack.AckOuterClass.Ack> getWriteExternalStateMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "WriteExternalState",
      requestType = com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage.class,
      responseType = com.weaver.protos.common.ack.AckOuterClass.Ack.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage,
      com.weaver.protos.common.ack.AckOuterClass.Ack> getWriteExternalStateMethod() {
    io.grpc.MethodDescriptor<com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage, com.weaver.protos.common.ack.AckOuterClass.Ack> getWriteExternalStateMethod;
    if ((getWriteExternalStateMethod = DriverCommunicationGrpc.getWriteExternalStateMethod) == null) {
      synchronized (DriverCommunicationGrpc.class) {
        if ((getWriteExternalStateMethod = DriverCommunicationGrpc.getWriteExternalStateMethod) == null) {
          DriverCommunicationGrpc.getWriteExternalStateMethod = getWriteExternalStateMethod =
              io.grpc.MethodDescriptor.<com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage, com.weaver.protos.common.ack.AckOuterClass.Ack>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "WriteExternalState"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.common.ack.AckOuterClass.Ack.getDefaultInstance()))
              .setSchemaDescriptor(new DriverCommunicationMethodDescriptorSupplier("WriteExternalState"))
              .build();
        }
      }
    }
    return getWriteExternalStateMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static DriverCommunicationStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<DriverCommunicationStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<DriverCommunicationStub>() {
        @java.lang.Override
        public DriverCommunicationStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new DriverCommunicationStub(channel, callOptions);
        }
      };
    return DriverCommunicationStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static DriverCommunicationBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<DriverCommunicationBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<DriverCommunicationBlockingStub>() {
        @java.lang.Override
        public DriverCommunicationBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new DriverCommunicationBlockingStub(channel, callOptions);
        }
      };
    return DriverCommunicationBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static DriverCommunicationFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<DriverCommunicationFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<DriverCommunicationFutureStub>() {
        @java.lang.Override
        public DriverCommunicationFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new DriverCommunicationFutureStub(channel, callOptions);
        }
      };
    return DriverCommunicationFutureStub.newStub(factory, channel);
  }

  /**
   */
  public static abstract class DriverCommunicationImplBase implements io.grpc.BindableService {

    /**
     * <pre>
     * Data Sharing 
     * the remote relay sends a RequestDriverState request to its driver with a
     * query defining the data it wants to receive
     * </pre>
     */
    public void requestDriverState(com.weaver.protos.common.query.QueryOuterClass.Query request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack> responseObserver) {
      asyncUnimplementedUnaryCall(getRequestDriverStateMethod(), responseObserver);
    }

    /**
     * <pre>
     * Events Subscription
     * the src-relay uses this endpoint to forward the event subscription request from dest-relay to driver
     * </pre>
     */
    public void subscribeEvent(com.weaver.protos.common.events.Events.EventSubscription request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack> responseObserver) {
      asyncUnimplementedUnaryCall(getSubscribeEventMethod(), responseObserver);
    }

    /**
     * <pre>
     * Recommended to have TLS mode on for this unsafe endpoint
     * Relay uses this to get Query.requestor_signature and 
     * Query.certificate required for event subscription
     * </pre>
     */
    public void requestSignedEventSubscriptionQuery(com.weaver.protos.common.events.Events.EventSubscription request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.query.QueryOuterClass.Query> responseObserver) {
      asyncUnimplementedUnaryCall(getRequestSignedEventSubscriptionQueryMethod(), responseObserver);
    }

    /**
     * <pre>
     * Events Publication
     * the dest-relay calls the dest-driver on this end point to write the remote network state to the local ledger
     * </pre>
     */
    public void writeExternalState(com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack> responseObserver) {
      asyncUnimplementedUnaryCall(getWriteExternalStateMethod(), responseObserver);
    }

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return io.grpc.ServerServiceDefinition.builder(getServiceDescriptor())
          .addMethod(
            getRequestDriverStateMethod(),
            asyncUnaryCall(
              new MethodHandlers<
                com.weaver.protos.common.query.QueryOuterClass.Query,
                com.weaver.protos.common.ack.AckOuterClass.Ack>(
                  this, METHODID_REQUEST_DRIVER_STATE)))
          .addMethod(
            getSubscribeEventMethod(),
            asyncUnaryCall(
              new MethodHandlers<
                com.weaver.protos.common.events.Events.EventSubscription,
                com.weaver.protos.common.ack.AckOuterClass.Ack>(
                  this, METHODID_SUBSCRIBE_EVENT)))
          .addMethod(
            getRequestSignedEventSubscriptionQueryMethod(),
            asyncUnaryCall(
              new MethodHandlers<
                com.weaver.protos.common.events.Events.EventSubscription,
                com.weaver.protos.common.query.QueryOuterClass.Query>(
                  this, METHODID_REQUEST_SIGNED_EVENT_SUBSCRIPTION_QUERY)))
          .addMethod(
            getWriteExternalStateMethod(),
            asyncUnaryCall(
              new MethodHandlers<
                com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage,
                com.weaver.protos.common.ack.AckOuterClass.Ack>(
                  this, METHODID_WRITE_EXTERNAL_STATE)))
          .build();
    }
  }

  /**
   */
  public static final class DriverCommunicationStub extends io.grpc.stub.AbstractAsyncStub<DriverCommunicationStub> {
    private DriverCommunicationStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected DriverCommunicationStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new DriverCommunicationStub(channel, callOptions);
    }

    /**
     * <pre>
     * Data Sharing 
     * the remote relay sends a RequestDriverState request to its driver with a
     * query defining the data it wants to receive
     * </pre>
     */
    public void requestDriverState(com.weaver.protos.common.query.QueryOuterClass.Query request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack> responseObserver) {
      asyncUnaryCall(
          getChannel().newCall(getRequestDriverStateMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Events Subscription
     * the src-relay uses this endpoint to forward the event subscription request from dest-relay to driver
     * </pre>
     */
    public void subscribeEvent(com.weaver.protos.common.events.Events.EventSubscription request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack> responseObserver) {
      asyncUnaryCall(
          getChannel().newCall(getSubscribeEventMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Recommended to have TLS mode on for this unsafe endpoint
     * Relay uses this to get Query.requestor_signature and 
     * Query.certificate required for event subscription
     * </pre>
     */
    public void requestSignedEventSubscriptionQuery(com.weaver.protos.common.events.Events.EventSubscription request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.query.QueryOuterClass.Query> responseObserver) {
      asyncUnaryCall(
          getChannel().newCall(getRequestSignedEventSubscriptionQueryMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Events Publication
     * the dest-relay calls the dest-driver on this end point to write the remote network state to the local ledger
     * </pre>
     */
    public void writeExternalState(com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack> responseObserver) {
      asyncUnaryCall(
          getChannel().newCall(getWriteExternalStateMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   */
  public static final class DriverCommunicationBlockingStub extends io.grpc.stub.AbstractBlockingStub<DriverCommunicationBlockingStub> {
    private DriverCommunicationBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected DriverCommunicationBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new DriverCommunicationBlockingStub(channel, callOptions);
    }

    /**
     * <pre>
     * Data Sharing 
     * the remote relay sends a RequestDriverState request to its driver with a
     * query defining the data it wants to receive
     * </pre>
     */
    public com.weaver.protos.common.ack.AckOuterClass.Ack requestDriverState(com.weaver.protos.common.query.QueryOuterClass.Query request) {
      return blockingUnaryCall(
          getChannel(), getRequestDriverStateMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Events Subscription
     * the src-relay uses this endpoint to forward the event subscription request from dest-relay to driver
     * </pre>
     */
    public com.weaver.protos.common.ack.AckOuterClass.Ack subscribeEvent(com.weaver.protos.common.events.Events.EventSubscription request) {
      return blockingUnaryCall(
          getChannel(), getSubscribeEventMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Recommended to have TLS mode on for this unsafe endpoint
     * Relay uses this to get Query.requestor_signature and 
     * Query.certificate required for event subscription
     * </pre>
     */
    public com.weaver.protos.common.query.QueryOuterClass.Query requestSignedEventSubscriptionQuery(com.weaver.protos.common.events.Events.EventSubscription request) {
      return blockingUnaryCall(
          getChannel(), getRequestSignedEventSubscriptionQueryMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Events Publication
     * the dest-relay calls the dest-driver on this end point to write the remote network state to the local ledger
     * </pre>
     */
    public com.weaver.protos.common.ack.AckOuterClass.Ack writeExternalState(com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage request) {
      return blockingUnaryCall(
          getChannel(), getWriteExternalStateMethod(), getCallOptions(), request);
    }
  }

  /**
   */
  public static final class DriverCommunicationFutureStub extends io.grpc.stub.AbstractFutureStub<DriverCommunicationFutureStub> {
    private DriverCommunicationFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected DriverCommunicationFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new DriverCommunicationFutureStub(channel, callOptions);
    }

    /**
     * <pre>
     * Data Sharing 
     * the remote relay sends a RequestDriverState request to its driver with a
     * query defining the data it wants to receive
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.weaver.protos.common.ack.AckOuterClass.Ack> requestDriverState(
        com.weaver.protos.common.query.QueryOuterClass.Query request) {
      return futureUnaryCall(
          getChannel().newCall(getRequestDriverStateMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Events Subscription
     * the src-relay uses this endpoint to forward the event subscription request from dest-relay to driver
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.weaver.protos.common.ack.AckOuterClass.Ack> subscribeEvent(
        com.weaver.protos.common.events.Events.EventSubscription request) {
      return futureUnaryCall(
          getChannel().newCall(getSubscribeEventMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Recommended to have TLS mode on for this unsafe endpoint
     * Relay uses this to get Query.requestor_signature and 
     * Query.certificate required for event subscription
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.weaver.protos.common.query.QueryOuterClass.Query> requestSignedEventSubscriptionQuery(
        com.weaver.protos.common.events.Events.EventSubscription request) {
      return futureUnaryCall(
          getChannel().newCall(getRequestSignedEventSubscriptionQueryMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Events Publication
     * the dest-relay calls the dest-driver on this end point to write the remote network state to the local ledger
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.weaver.protos.common.ack.AckOuterClass.Ack> writeExternalState(
        com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage request) {
      return futureUnaryCall(
          getChannel().newCall(getWriteExternalStateMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_REQUEST_DRIVER_STATE = 0;
  private static final int METHODID_SUBSCRIBE_EVENT = 1;
  private static final int METHODID_REQUEST_SIGNED_EVENT_SUBSCRIPTION_QUERY = 2;
  private static final int METHODID_WRITE_EXTERNAL_STATE = 3;

  private static final class MethodHandlers<Req, Resp> implements
      io.grpc.stub.ServerCalls.UnaryMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ServerStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ClientStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.BidiStreamingMethod<Req, Resp> {
    private final DriverCommunicationImplBase serviceImpl;
    private final int methodId;

    MethodHandlers(DriverCommunicationImplBase serviceImpl, int methodId) {
      this.serviceImpl = serviceImpl;
      this.methodId = methodId;
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public void invoke(Req request, io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        case METHODID_REQUEST_DRIVER_STATE:
          serviceImpl.requestDriverState((com.weaver.protos.common.query.QueryOuterClass.Query) request,
              (io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack>) responseObserver);
          break;
        case METHODID_SUBSCRIBE_EVENT:
          serviceImpl.subscribeEvent((com.weaver.protos.common.events.Events.EventSubscription) request,
              (io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack>) responseObserver);
          break;
        case METHODID_REQUEST_SIGNED_EVENT_SUBSCRIPTION_QUERY:
          serviceImpl.requestSignedEventSubscriptionQuery((com.weaver.protos.common.events.Events.EventSubscription) request,
              (io.grpc.stub.StreamObserver<com.weaver.protos.common.query.QueryOuterClass.Query>) responseObserver);
          break;
        case METHODID_WRITE_EXTERNAL_STATE:
          serviceImpl.writeExternalState((com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage) request,
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

  private static abstract class DriverCommunicationBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    DriverCommunicationBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return com.weaver.protos.driver.driver.Driver.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("DriverCommunication");
    }
  }

  private static final class DriverCommunicationFileDescriptorSupplier
      extends DriverCommunicationBaseDescriptorSupplier {
    DriverCommunicationFileDescriptorSupplier() {}
  }

  private static final class DriverCommunicationMethodDescriptorSupplier
      extends DriverCommunicationBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final String methodName;

    DriverCommunicationMethodDescriptorSupplier(String methodName) {
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
      synchronized (DriverCommunicationGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new DriverCommunicationFileDescriptorSupplier())
              .addMethod(getRequestDriverStateMethod())
              .addMethod(getSubscribeEventMethod())
              .addMethod(getRequestSignedEventSubscriptionQueryMethod())
              .addMethod(getWriteExternalStateMethod())
              .build();
        }
      }
    }
    return result;
  }
}
