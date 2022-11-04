package org.hyperledger.fabric.protos.gossip;

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
 * Gossip
 * </pre>
 */
@javax.annotation.Generated(
    value = "by gRPC proto compiler (version 1.29.0)",
    comments = "Source: gossip/message.proto")
public final class GossipGrpc {

  private GossipGrpc() {}

  public static final String SERVICE_NAME = "gossip.Gossip";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<org.hyperledger.fabric.protos.gossip.Message.Envelope,
      org.hyperledger.fabric.protos.gossip.Message.Envelope> getGossipStreamMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "GossipStream",
      requestType = org.hyperledger.fabric.protos.gossip.Message.Envelope.class,
      responseType = org.hyperledger.fabric.protos.gossip.Message.Envelope.class,
      methodType = io.grpc.MethodDescriptor.MethodType.BIDI_STREAMING)
  public static io.grpc.MethodDescriptor<org.hyperledger.fabric.protos.gossip.Message.Envelope,
      org.hyperledger.fabric.protos.gossip.Message.Envelope> getGossipStreamMethod() {
    io.grpc.MethodDescriptor<org.hyperledger.fabric.protos.gossip.Message.Envelope, org.hyperledger.fabric.protos.gossip.Message.Envelope> getGossipStreamMethod;
    if ((getGossipStreamMethod = GossipGrpc.getGossipStreamMethod) == null) {
      synchronized (GossipGrpc.class) {
        if ((getGossipStreamMethod = GossipGrpc.getGossipStreamMethod) == null) {
          GossipGrpc.getGossipStreamMethod = getGossipStreamMethod =
              io.grpc.MethodDescriptor.<org.hyperledger.fabric.protos.gossip.Message.Envelope, org.hyperledger.fabric.protos.gossip.Message.Envelope>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.BIDI_STREAMING)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "GossipStream"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  org.hyperledger.fabric.protos.gossip.Message.Envelope.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  org.hyperledger.fabric.protos.gossip.Message.Envelope.getDefaultInstance()))
              .setSchemaDescriptor(new GossipMethodDescriptorSupplier("GossipStream"))
              .build();
        }
      }
    }
    return getGossipStreamMethod;
  }

  private static volatile io.grpc.MethodDescriptor<org.hyperledger.fabric.protos.gossip.Message.Empty,
      org.hyperledger.fabric.protos.gossip.Message.Empty> getPingMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "Ping",
      requestType = org.hyperledger.fabric.protos.gossip.Message.Empty.class,
      responseType = org.hyperledger.fabric.protos.gossip.Message.Empty.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<org.hyperledger.fabric.protos.gossip.Message.Empty,
      org.hyperledger.fabric.protos.gossip.Message.Empty> getPingMethod() {
    io.grpc.MethodDescriptor<org.hyperledger.fabric.protos.gossip.Message.Empty, org.hyperledger.fabric.protos.gossip.Message.Empty> getPingMethod;
    if ((getPingMethod = GossipGrpc.getPingMethod) == null) {
      synchronized (GossipGrpc.class) {
        if ((getPingMethod = GossipGrpc.getPingMethod) == null) {
          GossipGrpc.getPingMethod = getPingMethod =
              io.grpc.MethodDescriptor.<org.hyperledger.fabric.protos.gossip.Message.Empty, org.hyperledger.fabric.protos.gossip.Message.Empty>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "Ping"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  org.hyperledger.fabric.protos.gossip.Message.Empty.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  org.hyperledger.fabric.protos.gossip.Message.Empty.getDefaultInstance()))
              .setSchemaDescriptor(new GossipMethodDescriptorSupplier("Ping"))
              .build();
        }
      }
    }
    return getPingMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static GossipStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<GossipStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<GossipStub>() {
        @java.lang.Override
        public GossipStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new GossipStub(channel, callOptions);
        }
      };
    return GossipStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static GossipBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<GossipBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<GossipBlockingStub>() {
        @java.lang.Override
        public GossipBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new GossipBlockingStub(channel, callOptions);
        }
      };
    return GossipBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static GossipFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<GossipFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<GossipFutureStub>() {
        @java.lang.Override
        public GossipFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new GossipFutureStub(channel, callOptions);
        }
      };
    return GossipFutureStub.newStub(factory, channel);
  }

  /**
   * <pre>
   * Gossip
   * </pre>
   */
  public static abstract class GossipImplBase implements io.grpc.BindableService {

    /**
     * <pre>
     * GossipStream is the gRPC stream used for sending and receiving messages
     * </pre>
     */
    public io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.gossip.Message.Envelope> gossipStream(
        io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.gossip.Message.Envelope> responseObserver) {
      return asyncUnimplementedStreamingCall(getGossipStreamMethod(), responseObserver);
    }

    /**
     * <pre>
     * Ping is used to probe a remote peer's aliveness
     * </pre>
     */
    public void ping(org.hyperledger.fabric.protos.gossip.Message.Empty request,
        io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.gossip.Message.Empty> responseObserver) {
      asyncUnimplementedUnaryCall(getPingMethod(), responseObserver);
    }

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return io.grpc.ServerServiceDefinition.builder(getServiceDescriptor())
          .addMethod(
            getGossipStreamMethod(),
            asyncBidiStreamingCall(
              new MethodHandlers<
                org.hyperledger.fabric.protos.gossip.Message.Envelope,
                org.hyperledger.fabric.protos.gossip.Message.Envelope>(
                  this, METHODID_GOSSIP_STREAM)))
          .addMethod(
            getPingMethod(),
            asyncUnaryCall(
              new MethodHandlers<
                org.hyperledger.fabric.protos.gossip.Message.Empty,
                org.hyperledger.fabric.protos.gossip.Message.Empty>(
                  this, METHODID_PING)))
          .build();
    }
  }

  /**
   * <pre>
   * Gossip
   * </pre>
   */
  public static final class GossipStub extends io.grpc.stub.AbstractAsyncStub<GossipStub> {
    private GossipStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected GossipStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new GossipStub(channel, callOptions);
    }

    /**
     * <pre>
     * GossipStream is the gRPC stream used for sending and receiving messages
     * </pre>
     */
    public io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.gossip.Message.Envelope> gossipStream(
        io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.gossip.Message.Envelope> responseObserver) {
      return asyncBidiStreamingCall(
          getChannel().newCall(getGossipStreamMethod(), getCallOptions()), responseObserver);
    }

    /**
     * <pre>
     * Ping is used to probe a remote peer's aliveness
     * </pre>
     */
    public void ping(org.hyperledger.fabric.protos.gossip.Message.Empty request,
        io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.gossip.Message.Empty> responseObserver) {
      asyncUnaryCall(
          getChannel().newCall(getPingMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   * <pre>
   * Gossip
   * </pre>
   */
  public static final class GossipBlockingStub extends io.grpc.stub.AbstractBlockingStub<GossipBlockingStub> {
    private GossipBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected GossipBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new GossipBlockingStub(channel, callOptions);
    }

    /**
     * <pre>
     * Ping is used to probe a remote peer's aliveness
     * </pre>
     */
    public org.hyperledger.fabric.protos.gossip.Message.Empty ping(org.hyperledger.fabric.protos.gossip.Message.Empty request) {
      return blockingUnaryCall(
          getChannel(), getPingMethod(), getCallOptions(), request);
    }
  }

  /**
   * <pre>
   * Gossip
   * </pre>
   */
  public static final class GossipFutureStub extends io.grpc.stub.AbstractFutureStub<GossipFutureStub> {
    private GossipFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected GossipFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new GossipFutureStub(channel, callOptions);
    }

    /**
     * <pre>
     * Ping is used to probe a remote peer's aliveness
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<org.hyperledger.fabric.protos.gossip.Message.Empty> ping(
        org.hyperledger.fabric.protos.gossip.Message.Empty request) {
      return futureUnaryCall(
          getChannel().newCall(getPingMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_PING = 0;
  private static final int METHODID_GOSSIP_STREAM = 1;

  private static final class MethodHandlers<Req, Resp> implements
      io.grpc.stub.ServerCalls.UnaryMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ServerStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ClientStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.BidiStreamingMethod<Req, Resp> {
    private final GossipImplBase serviceImpl;
    private final int methodId;

    MethodHandlers(GossipImplBase serviceImpl, int methodId) {
      this.serviceImpl = serviceImpl;
      this.methodId = methodId;
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public void invoke(Req request, io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        case METHODID_PING:
          serviceImpl.ping((org.hyperledger.fabric.protos.gossip.Message.Empty) request,
              (io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.gossip.Message.Empty>) responseObserver);
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
        case METHODID_GOSSIP_STREAM:
          return (io.grpc.stub.StreamObserver<Req>) serviceImpl.gossipStream(
              (io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.gossip.Message.Envelope>) responseObserver);
        default:
          throw new AssertionError();
      }
    }
  }

  private static abstract class GossipBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    GossipBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return org.hyperledger.fabric.protos.gossip.Message.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("Gossip");
    }
  }

  private static final class GossipFileDescriptorSupplier
      extends GossipBaseDescriptorSupplier {
    GossipFileDescriptorSupplier() {}
  }

  private static final class GossipMethodDescriptorSupplier
      extends GossipBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final String methodName;

    GossipMethodDescriptorSupplier(String methodName) {
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
      synchronized (GossipGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new GossipFileDescriptorSupplier())
              .addMethod(getGossipStreamMethod())
              .addMethod(getPingMethod())
              .build();
        }
      }
    }
    return result;
  }
}
