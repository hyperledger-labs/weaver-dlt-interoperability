package com.weaver.protos.networks.networks;

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
 * This service is the interface for how the network communicates with
 * its relay.
 * </pre>
 */
@javax.annotation.Generated(
    value = "by gRPC proto compiler (version 1.29.0)",
    comments = "Source: networks/networks.proto")
public final class NetworkGrpc {

  private NetworkGrpc() {}

  public static final String SERVICE_NAME = "networks.networks.Network";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<com.weaver.protos.networks.networks.Networks.NetworkQuery,
      com.weaver.protos.common.ack.AckOuterClass.Ack> getRequestStateMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "RequestState",
      requestType = com.weaver.protos.networks.networks.Networks.NetworkQuery.class,
      responseType = com.weaver.protos.common.ack.AckOuterClass.Ack.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.weaver.protos.networks.networks.Networks.NetworkQuery,
      com.weaver.protos.common.ack.AckOuterClass.Ack> getRequestStateMethod() {
    io.grpc.MethodDescriptor<com.weaver.protos.networks.networks.Networks.NetworkQuery, com.weaver.protos.common.ack.AckOuterClass.Ack> getRequestStateMethod;
    if ((getRequestStateMethod = NetworkGrpc.getRequestStateMethod) == null) {
      synchronized (NetworkGrpc.class) {
        if ((getRequestStateMethod = NetworkGrpc.getRequestStateMethod) == null) {
          NetworkGrpc.getRequestStateMethod = getRequestStateMethod =
              io.grpc.MethodDescriptor.<com.weaver.protos.networks.networks.Networks.NetworkQuery, com.weaver.protos.common.ack.AckOuterClass.Ack>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "RequestState"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.networks.networks.Networks.NetworkQuery.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.common.ack.AckOuterClass.Ack.getDefaultInstance()))
              .setSchemaDescriptor(new NetworkMethodDescriptorSupplier("RequestState"))
              .build();
        }
      }
    }
    return getRequestStateMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.weaver.protos.networks.networks.Networks.GetStateMessage,
      com.weaver.protos.common.state.State.RequestState> getGetStateMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "GetState",
      requestType = com.weaver.protos.networks.networks.Networks.GetStateMessage.class,
      responseType = com.weaver.protos.common.state.State.RequestState.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.weaver.protos.networks.networks.Networks.GetStateMessage,
      com.weaver.protos.common.state.State.RequestState> getGetStateMethod() {
    io.grpc.MethodDescriptor<com.weaver.protos.networks.networks.Networks.GetStateMessage, com.weaver.protos.common.state.State.RequestState> getGetStateMethod;
    if ((getGetStateMethod = NetworkGrpc.getGetStateMethod) == null) {
      synchronized (NetworkGrpc.class) {
        if ((getGetStateMethod = NetworkGrpc.getGetStateMethod) == null) {
          NetworkGrpc.getGetStateMethod = getGetStateMethod =
              io.grpc.MethodDescriptor.<com.weaver.protos.networks.networks.Networks.GetStateMessage, com.weaver.protos.common.state.State.RequestState>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "GetState"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.networks.networks.Networks.GetStateMessage.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.common.state.State.RequestState.getDefaultInstance()))
              .setSchemaDescriptor(new NetworkMethodDescriptorSupplier("GetState"))
              .build();
        }
      }
    }
    return getGetStateMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.weaver.protos.networks.networks.Networks.DbName,
      com.weaver.protos.networks.networks.Networks.RelayDatabase> getRequestDatabaseMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "RequestDatabase",
      requestType = com.weaver.protos.networks.networks.Networks.DbName.class,
      responseType = com.weaver.protos.networks.networks.Networks.RelayDatabase.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.weaver.protos.networks.networks.Networks.DbName,
      com.weaver.protos.networks.networks.Networks.RelayDatabase> getRequestDatabaseMethod() {
    io.grpc.MethodDescriptor<com.weaver.protos.networks.networks.Networks.DbName, com.weaver.protos.networks.networks.Networks.RelayDatabase> getRequestDatabaseMethod;
    if ((getRequestDatabaseMethod = NetworkGrpc.getRequestDatabaseMethod) == null) {
      synchronized (NetworkGrpc.class) {
        if ((getRequestDatabaseMethod = NetworkGrpc.getRequestDatabaseMethod) == null) {
          NetworkGrpc.getRequestDatabaseMethod = getRequestDatabaseMethod =
              io.grpc.MethodDescriptor.<com.weaver.protos.networks.networks.Networks.DbName, com.weaver.protos.networks.networks.Networks.RelayDatabase>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "RequestDatabase"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.networks.networks.Networks.DbName.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.networks.networks.Networks.RelayDatabase.getDefaultInstance()))
              .setSchemaDescriptor(new NetworkMethodDescriptorSupplier("RequestDatabase"))
              .build();
        }
      }
    }
    return getRequestDatabaseMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.weaver.protos.networks.networks.Networks.NetworkEventSubscription,
      com.weaver.protos.common.ack.AckOuterClass.Ack> getSubscribeEventMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "SubscribeEvent",
      requestType = com.weaver.protos.networks.networks.Networks.NetworkEventSubscription.class,
      responseType = com.weaver.protos.common.ack.AckOuterClass.Ack.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.weaver.protos.networks.networks.Networks.NetworkEventSubscription,
      com.weaver.protos.common.ack.AckOuterClass.Ack> getSubscribeEventMethod() {
    io.grpc.MethodDescriptor<com.weaver.protos.networks.networks.Networks.NetworkEventSubscription, com.weaver.protos.common.ack.AckOuterClass.Ack> getSubscribeEventMethod;
    if ((getSubscribeEventMethod = NetworkGrpc.getSubscribeEventMethod) == null) {
      synchronized (NetworkGrpc.class) {
        if ((getSubscribeEventMethod = NetworkGrpc.getSubscribeEventMethod) == null) {
          NetworkGrpc.getSubscribeEventMethod = getSubscribeEventMethod =
              io.grpc.MethodDescriptor.<com.weaver.protos.networks.networks.Networks.NetworkEventSubscription, com.weaver.protos.common.ack.AckOuterClass.Ack>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "SubscribeEvent"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.networks.networks.Networks.NetworkEventSubscription.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.common.ack.AckOuterClass.Ack.getDefaultInstance()))
              .setSchemaDescriptor(new NetworkMethodDescriptorSupplier("SubscribeEvent"))
              .build();
        }
      }
    }
    return getSubscribeEventMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.weaver.protos.networks.networks.Networks.GetStateMessage,
      com.weaver.protos.common.events.Events.EventSubscriptionState> getGetEventSubscriptionStateMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "GetEventSubscriptionState",
      requestType = com.weaver.protos.networks.networks.Networks.GetStateMessage.class,
      responseType = com.weaver.protos.common.events.Events.EventSubscriptionState.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.weaver.protos.networks.networks.Networks.GetStateMessage,
      com.weaver.protos.common.events.Events.EventSubscriptionState> getGetEventSubscriptionStateMethod() {
    io.grpc.MethodDescriptor<com.weaver.protos.networks.networks.Networks.GetStateMessage, com.weaver.protos.common.events.Events.EventSubscriptionState> getGetEventSubscriptionStateMethod;
    if ((getGetEventSubscriptionStateMethod = NetworkGrpc.getGetEventSubscriptionStateMethod) == null) {
      synchronized (NetworkGrpc.class) {
        if ((getGetEventSubscriptionStateMethod = NetworkGrpc.getGetEventSubscriptionStateMethod) == null) {
          NetworkGrpc.getGetEventSubscriptionStateMethod = getGetEventSubscriptionStateMethod =
              io.grpc.MethodDescriptor.<com.weaver.protos.networks.networks.Networks.GetStateMessage, com.weaver.protos.common.events.Events.EventSubscriptionState>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "GetEventSubscriptionState"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.networks.networks.Networks.GetStateMessage.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.common.events.Events.EventSubscriptionState.getDefaultInstance()))
              .setSchemaDescriptor(new NetworkMethodDescriptorSupplier("GetEventSubscriptionState"))
              .build();
        }
      }
    }
    return getGetEventSubscriptionStateMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.weaver.protos.networks.networks.Networks.NetworkEventUnsubscription,
      com.weaver.protos.common.ack.AckOuterClass.Ack> getUnsubscribeEventMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "UnsubscribeEvent",
      requestType = com.weaver.protos.networks.networks.Networks.NetworkEventUnsubscription.class,
      responseType = com.weaver.protos.common.ack.AckOuterClass.Ack.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.weaver.protos.networks.networks.Networks.NetworkEventUnsubscription,
      com.weaver.protos.common.ack.AckOuterClass.Ack> getUnsubscribeEventMethod() {
    io.grpc.MethodDescriptor<com.weaver.protos.networks.networks.Networks.NetworkEventUnsubscription, com.weaver.protos.common.ack.AckOuterClass.Ack> getUnsubscribeEventMethod;
    if ((getUnsubscribeEventMethod = NetworkGrpc.getUnsubscribeEventMethod) == null) {
      synchronized (NetworkGrpc.class) {
        if ((getUnsubscribeEventMethod = NetworkGrpc.getUnsubscribeEventMethod) == null) {
          NetworkGrpc.getUnsubscribeEventMethod = getUnsubscribeEventMethod =
              io.grpc.MethodDescriptor.<com.weaver.protos.networks.networks.Networks.NetworkEventUnsubscription, com.weaver.protos.common.ack.AckOuterClass.Ack>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "UnsubscribeEvent"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.networks.networks.Networks.NetworkEventUnsubscription.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.common.ack.AckOuterClass.Ack.getDefaultInstance()))
              .setSchemaDescriptor(new NetworkMethodDescriptorSupplier("UnsubscribeEvent"))
              .build();
        }
      }
    }
    return getUnsubscribeEventMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.weaver.protos.networks.networks.Networks.GetStateMessage,
      com.weaver.protos.common.events.Events.EventStates> getGetEventStatesMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "GetEventStates",
      requestType = com.weaver.protos.networks.networks.Networks.GetStateMessage.class,
      responseType = com.weaver.protos.common.events.Events.EventStates.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.weaver.protos.networks.networks.Networks.GetStateMessage,
      com.weaver.protos.common.events.Events.EventStates> getGetEventStatesMethod() {
    io.grpc.MethodDescriptor<com.weaver.protos.networks.networks.Networks.GetStateMessage, com.weaver.protos.common.events.Events.EventStates> getGetEventStatesMethod;
    if ((getGetEventStatesMethod = NetworkGrpc.getGetEventStatesMethod) == null) {
      synchronized (NetworkGrpc.class) {
        if ((getGetEventStatesMethod = NetworkGrpc.getGetEventStatesMethod) == null) {
          NetworkGrpc.getGetEventStatesMethod = getGetEventStatesMethod =
              io.grpc.MethodDescriptor.<com.weaver.protos.networks.networks.Networks.GetStateMessage, com.weaver.protos.common.events.Events.EventStates>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "GetEventStates"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.networks.networks.Networks.GetStateMessage.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.common.events.Events.EventStates.getDefaultInstance()))
              .setSchemaDescriptor(new NetworkMethodDescriptorSupplier("GetEventStates"))
              .build();
        }
      }
    }
    return getGetEventStatesMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static NetworkStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<NetworkStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<NetworkStub>() {
        @java.lang.Override
        public NetworkStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new NetworkStub(channel, callOptions);
        }
      };
    return NetworkStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static NetworkBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<NetworkBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<NetworkBlockingStub>() {
        @java.lang.Override
        public NetworkBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new NetworkBlockingStub(channel, callOptions);
        }
      };
    return NetworkBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static NetworkFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<NetworkFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<NetworkFutureStub>() {
        @java.lang.Override
        public NetworkFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new NetworkFutureStub(channel, callOptions);
        }
      };
    return NetworkFutureStub.newStub(factory, channel);
  }

  /**
   * <pre>
   * This service is the interface for how the network communicates with
   * its relay.
   * </pre>
   */
  public static abstract class NetworkImplBase implements io.grpc.BindableService {

    /**
     * <pre>
     * Data Sharing endpoints
     * endpoint for a network to request remote relay state via local relay
     * </pre>
     */
    public void requestState(com.weaver.protos.networks.networks.Networks.NetworkQuery request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack> responseObserver) {
      asyncUnimplementedUnaryCall(getRequestStateMethod(), responseObserver);
    }

    /**
     * <pre>
     * This rpc endpoint is for polling the local relay for request state.
     * </pre>
     */
    public void getState(com.weaver.protos.networks.networks.Networks.GetStateMessage request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.state.State.RequestState> responseObserver) {
      asyncUnimplementedUnaryCall(getGetStateMethod(), responseObserver);
    }

    /**
     * <pre>
     * NOTE: This rpc is just for debugging.
     * </pre>
     */
    public void requestDatabase(com.weaver.protos.networks.networks.Networks.DbName request,
        io.grpc.stub.StreamObserver<com.weaver.protos.networks.networks.Networks.RelayDatabase> responseObserver) {
      asyncUnimplementedUnaryCall(getRequestDatabaseMethod(), responseObserver);
    }

    /**
     * <pre>
     * Event endpoints
     * endpoint for a client to subscribe to event via local relay initiating subscription flow.
     * </pre>
     */
    public void subscribeEvent(com.weaver.protos.networks.networks.Networks.NetworkEventSubscription request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack> responseObserver) {
      asyncUnimplementedUnaryCall(getSubscribeEventMethod(), responseObserver);
    }

    /**
     * <pre>
     * This rpc endpoint is for polling the local relay for subscription state.
     * </pre>
     */
    public void getEventSubscriptionState(com.weaver.protos.networks.networks.Networks.GetStateMessage request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.events.Events.EventSubscriptionState> responseObserver) {
      asyncUnimplementedUnaryCall(getGetEventSubscriptionStateMethod(), responseObserver);
    }

    /**
     * <pre>
     * endpoint for a client to subscribe to event via local relay initiating subscription flow.
     * </pre>
     */
    public void unsubscribeEvent(com.weaver.protos.networks.networks.Networks.NetworkEventUnsubscription request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack> responseObserver) {
      asyncUnimplementedUnaryCall(getUnsubscribeEventMethod(), responseObserver);
    }

    /**
     * <pre>
     * endpoint for a client to fetch received events. 
     * Note: events are marked as deleted from relay database as soon as client fetches them.
     * </pre>
     */
    public void getEventStates(com.weaver.protos.networks.networks.Networks.GetStateMessage request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.events.Events.EventStates> responseObserver) {
      asyncUnimplementedUnaryCall(getGetEventStatesMethod(), responseObserver);
    }

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return io.grpc.ServerServiceDefinition.builder(getServiceDescriptor())
          .addMethod(
            getRequestStateMethod(),
            asyncUnaryCall(
              new MethodHandlers<
                com.weaver.protos.networks.networks.Networks.NetworkQuery,
                com.weaver.protos.common.ack.AckOuterClass.Ack>(
                  this, METHODID_REQUEST_STATE)))
          .addMethod(
            getGetStateMethod(),
            asyncUnaryCall(
              new MethodHandlers<
                com.weaver.protos.networks.networks.Networks.GetStateMessage,
                com.weaver.protos.common.state.State.RequestState>(
                  this, METHODID_GET_STATE)))
          .addMethod(
            getRequestDatabaseMethod(),
            asyncUnaryCall(
              new MethodHandlers<
                com.weaver.protos.networks.networks.Networks.DbName,
                com.weaver.protos.networks.networks.Networks.RelayDatabase>(
                  this, METHODID_REQUEST_DATABASE)))
          .addMethod(
            getSubscribeEventMethod(),
            asyncUnaryCall(
              new MethodHandlers<
                com.weaver.protos.networks.networks.Networks.NetworkEventSubscription,
                com.weaver.protos.common.ack.AckOuterClass.Ack>(
                  this, METHODID_SUBSCRIBE_EVENT)))
          .addMethod(
            getGetEventSubscriptionStateMethod(),
            asyncUnaryCall(
              new MethodHandlers<
                com.weaver.protos.networks.networks.Networks.GetStateMessage,
                com.weaver.protos.common.events.Events.EventSubscriptionState>(
                  this, METHODID_GET_EVENT_SUBSCRIPTION_STATE)))
          .addMethod(
            getUnsubscribeEventMethod(),
            asyncUnaryCall(
              new MethodHandlers<
                com.weaver.protos.networks.networks.Networks.NetworkEventUnsubscription,
                com.weaver.protos.common.ack.AckOuterClass.Ack>(
                  this, METHODID_UNSUBSCRIBE_EVENT)))
          .addMethod(
            getGetEventStatesMethod(),
            asyncUnaryCall(
              new MethodHandlers<
                com.weaver.protos.networks.networks.Networks.GetStateMessage,
                com.weaver.protos.common.events.Events.EventStates>(
                  this, METHODID_GET_EVENT_STATES)))
          .build();
    }
  }

  /**
   * <pre>
   * This service is the interface for how the network communicates with
   * its relay.
   * </pre>
   */
  public static final class NetworkStub extends io.grpc.stub.AbstractAsyncStub<NetworkStub> {
    private NetworkStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected NetworkStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new NetworkStub(channel, callOptions);
    }

    /**
     * <pre>
     * Data Sharing endpoints
     * endpoint for a network to request remote relay state via local relay
     * </pre>
     */
    public void requestState(com.weaver.protos.networks.networks.Networks.NetworkQuery request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack> responseObserver) {
      asyncUnaryCall(
          getChannel().newCall(getRequestStateMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * This rpc endpoint is for polling the local relay for request state.
     * </pre>
     */
    public void getState(com.weaver.protos.networks.networks.Networks.GetStateMessage request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.state.State.RequestState> responseObserver) {
      asyncUnaryCall(
          getChannel().newCall(getGetStateMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * NOTE: This rpc is just for debugging.
     * </pre>
     */
    public void requestDatabase(com.weaver.protos.networks.networks.Networks.DbName request,
        io.grpc.stub.StreamObserver<com.weaver.protos.networks.networks.Networks.RelayDatabase> responseObserver) {
      asyncUnaryCall(
          getChannel().newCall(getRequestDatabaseMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Event endpoints
     * endpoint for a client to subscribe to event via local relay initiating subscription flow.
     * </pre>
     */
    public void subscribeEvent(com.weaver.protos.networks.networks.Networks.NetworkEventSubscription request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack> responseObserver) {
      asyncUnaryCall(
          getChannel().newCall(getSubscribeEventMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * This rpc endpoint is for polling the local relay for subscription state.
     * </pre>
     */
    public void getEventSubscriptionState(com.weaver.protos.networks.networks.Networks.GetStateMessage request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.events.Events.EventSubscriptionState> responseObserver) {
      asyncUnaryCall(
          getChannel().newCall(getGetEventSubscriptionStateMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * endpoint for a client to subscribe to event via local relay initiating subscription flow.
     * </pre>
     */
    public void unsubscribeEvent(com.weaver.protos.networks.networks.Networks.NetworkEventUnsubscription request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack> responseObserver) {
      asyncUnaryCall(
          getChannel().newCall(getUnsubscribeEventMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * endpoint for a client to fetch received events. 
     * Note: events are marked as deleted from relay database as soon as client fetches them.
     * </pre>
     */
    public void getEventStates(com.weaver.protos.networks.networks.Networks.GetStateMessage request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.events.Events.EventStates> responseObserver) {
      asyncUnaryCall(
          getChannel().newCall(getGetEventStatesMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   * <pre>
   * This service is the interface for how the network communicates with
   * its relay.
   * </pre>
   */
  public static final class NetworkBlockingStub extends io.grpc.stub.AbstractBlockingStub<NetworkBlockingStub> {
    private NetworkBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected NetworkBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new NetworkBlockingStub(channel, callOptions);
    }

    /**
     * <pre>
     * Data Sharing endpoints
     * endpoint for a network to request remote relay state via local relay
     * </pre>
     */
    public com.weaver.protos.common.ack.AckOuterClass.Ack requestState(com.weaver.protos.networks.networks.Networks.NetworkQuery request) {
      return blockingUnaryCall(
          getChannel(), getRequestStateMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * This rpc endpoint is for polling the local relay for request state.
     * </pre>
     */
    public com.weaver.protos.common.state.State.RequestState getState(com.weaver.protos.networks.networks.Networks.GetStateMessage request) {
      return blockingUnaryCall(
          getChannel(), getGetStateMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * NOTE: This rpc is just for debugging.
     * </pre>
     */
    public com.weaver.protos.networks.networks.Networks.RelayDatabase requestDatabase(com.weaver.protos.networks.networks.Networks.DbName request) {
      return blockingUnaryCall(
          getChannel(), getRequestDatabaseMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Event endpoints
     * endpoint for a client to subscribe to event via local relay initiating subscription flow.
     * </pre>
     */
    public com.weaver.protos.common.ack.AckOuterClass.Ack subscribeEvent(com.weaver.protos.networks.networks.Networks.NetworkEventSubscription request) {
      return blockingUnaryCall(
          getChannel(), getSubscribeEventMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * This rpc endpoint is for polling the local relay for subscription state.
     * </pre>
     */
    public com.weaver.protos.common.events.Events.EventSubscriptionState getEventSubscriptionState(com.weaver.protos.networks.networks.Networks.GetStateMessage request) {
      return blockingUnaryCall(
          getChannel(), getGetEventSubscriptionStateMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * endpoint for a client to subscribe to event via local relay initiating subscription flow.
     * </pre>
     */
    public com.weaver.protos.common.ack.AckOuterClass.Ack unsubscribeEvent(com.weaver.protos.networks.networks.Networks.NetworkEventUnsubscription request) {
      return blockingUnaryCall(
          getChannel(), getUnsubscribeEventMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * endpoint for a client to fetch received events. 
     * Note: events are marked as deleted from relay database as soon as client fetches them.
     * </pre>
     */
    public com.weaver.protos.common.events.Events.EventStates getEventStates(com.weaver.protos.networks.networks.Networks.GetStateMessage request) {
      return blockingUnaryCall(
          getChannel(), getGetEventStatesMethod(), getCallOptions(), request);
    }
  }

  /**
   * <pre>
   * This service is the interface for how the network communicates with
   * its relay.
   * </pre>
   */
  public static final class NetworkFutureStub extends io.grpc.stub.AbstractFutureStub<NetworkFutureStub> {
    private NetworkFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected NetworkFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new NetworkFutureStub(channel, callOptions);
    }

    /**
     * <pre>
     * Data Sharing endpoints
     * endpoint for a network to request remote relay state via local relay
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.weaver.protos.common.ack.AckOuterClass.Ack> requestState(
        com.weaver.protos.networks.networks.Networks.NetworkQuery request) {
      return futureUnaryCall(
          getChannel().newCall(getRequestStateMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * This rpc endpoint is for polling the local relay for request state.
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.weaver.protos.common.state.State.RequestState> getState(
        com.weaver.protos.networks.networks.Networks.GetStateMessage request) {
      return futureUnaryCall(
          getChannel().newCall(getGetStateMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * NOTE: This rpc is just for debugging.
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.weaver.protos.networks.networks.Networks.RelayDatabase> requestDatabase(
        com.weaver.protos.networks.networks.Networks.DbName request) {
      return futureUnaryCall(
          getChannel().newCall(getRequestDatabaseMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Event endpoints
     * endpoint for a client to subscribe to event via local relay initiating subscription flow.
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.weaver.protos.common.ack.AckOuterClass.Ack> subscribeEvent(
        com.weaver.protos.networks.networks.Networks.NetworkEventSubscription request) {
      return futureUnaryCall(
          getChannel().newCall(getSubscribeEventMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * This rpc endpoint is for polling the local relay for subscription state.
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.weaver.protos.common.events.Events.EventSubscriptionState> getEventSubscriptionState(
        com.weaver.protos.networks.networks.Networks.GetStateMessage request) {
      return futureUnaryCall(
          getChannel().newCall(getGetEventSubscriptionStateMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * endpoint for a client to subscribe to event via local relay initiating subscription flow.
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.weaver.protos.common.ack.AckOuterClass.Ack> unsubscribeEvent(
        com.weaver.protos.networks.networks.Networks.NetworkEventUnsubscription request) {
      return futureUnaryCall(
          getChannel().newCall(getUnsubscribeEventMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * endpoint for a client to fetch received events. 
     * Note: events are marked as deleted from relay database as soon as client fetches them.
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.weaver.protos.common.events.Events.EventStates> getEventStates(
        com.weaver.protos.networks.networks.Networks.GetStateMessage request) {
      return futureUnaryCall(
          getChannel().newCall(getGetEventStatesMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_REQUEST_STATE = 0;
  private static final int METHODID_GET_STATE = 1;
  private static final int METHODID_REQUEST_DATABASE = 2;
  private static final int METHODID_SUBSCRIBE_EVENT = 3;
  private static final int METHODID_GET_EVENT_SUBSCRIPTION_STATE = 4;
  private static final int METHODID_UNSUBSCRIBE_EVENT = 5;
  private static final int METHODID_GET_EVENT_STATES = 6;

  private static final class MethodHandlers<Req, Resp> implements
      io.grpc.stub.ServerCalls.UnaryMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ServerStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ClientStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.BidiStreamingMethod<Req, Resp> {
    private final NetworkImplBase serviceImpl;
    private final int methodId;

    MethodHandlers(NetworkImplBase serviceImpl, int methodId) {
      this.serviceImpl = serviceImpl;
      this.methodId = methodId;
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public void invoke(Req request, io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        case METHODID_REQUEST_STATE:
          serviceImpl.requestState((com.weaver.protos.networks.networks.Networks.NetworkQuery) request,
              (io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack>) responseObserver);
          break;
        case METHODID_GET_STATE:
          serviceImpl.getState((com.weaver.protos.networks.networks.Networks.GetStateMessage) request,
              (io.grpc.stub.StreamObserver<com.weaver.protos.common.state.State.RequestState>) responseObserver);
          break;
        case METHODID_REQUEST_DATABASE:
          serviceImpl.requestDatabase((com.weaver.protos.networks.networks.Networks.DbName) request,
              (io.grpc.stub.StreamObserver<com.weaver.protos.networks.networks.Networks.RelayDatabase>) responseObserver);
          break;
        case METHODID_SUBSCRIBE_EVENT:
          serviceImpl.subscribeEvent((com.weaver.protos.networks.networks.Networks.NetworkEventSubscription) request,
              (io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack>) responseObserver);
          break;
        case METHODID_GET_EVENT_SUBSCRIPTION_STATE:
          serviceImpl.getEventSubscriptionState((com.weaver.protos.networks.networks.Networks.GetStateMessage) request,
              (io.grpc.stub.StreamObserver<com.weaver.protos.common.events.Events.EventSubscriptionState>) responseObserver);
          break;
        case METHODID_UNSUBSCRIBE_EVENT:
          serviceImpl.unsubscribeEvent((com.weaver.protos.networks.networks.Networks.NetworkEventUnsubscription) request,
              (io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack>) responseObserver);
          break;
        case METHODID_GET_EVENT_STATES:
          serviceImpl.getEventStates((com.weaver.protos.networks.networks.Networks.GetStateMessage) request,
              (io.grpc.stub.StreamObserver<com.weaver.protos.common.events.Events.EventStates>) responseObserver);
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

  private static abstract class NetworkBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    NetworkBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return com.weaver.protos.networks.networks.Networks.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("Network");
    }
  }

  private static final class NetworkFileDescriptorSupplier
      extends NetworkBaseDescriptorSupplier {
    NetworkFileDescriptorSupplier() {}
  }

  private static final class NetworkMethodDescriptorSupplier
      extends NetworkBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final String methodName;

    NetworkMethodDescriptorSupplier(String methodName) {
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
      synchronized (NetworkGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new NetworkFileDescriptorSupplier())
              .addMethod(getRequestStateMethod())
              .addMethod(getGetStateMethod())
              .addMethod(getRequestDatabaseMethod())
              .addMethod(getSubscribeEventMethod())
              .addMethod(getGetEventSubscriptionStateMethod())
              .addMethod(getUnsubscribeEventMethod())
              .addMethod(getGetEventStatesMethod())
              .build();
        }
      }
    }
    return result;
  }
}
