package org.hyperledger.fabric.protos.orderer;

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
    comments = "Source: orderer/ab.proto")
public final class AtomicBroadcastGrpc {

  private AtomicBroadcastGrpc() {}

  public static final String SERVICE_NAME = "orderer.AtomicBroadcast";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<org.hyperledger.fabric.protos.common.Common.Envelope,
      org.hyperledger.fabric.protos.orderer.Ab.BroadcastResponse> getBroadcastMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "Broadcast",
      requestType = org.hyperledger.fabric.protos.common.Common.Envelope.class,
      responseType = org.hyperledger.fabric.protos.orderer.Ab.BroadcastResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.BIDI_STREAMING)
  public static io.grpc.MethodDescriptor<org.hyperledger.fabric.protos.common.Common.Envelope,
      org.hyperledger.fabric.protos.orderer.Ab.BroadcastResponse> getBroadcastMethod() {
    io.grpc.MethodDescriptor<org.hyperledger.fabric.protos.common.Common.Envelope, org.hyperledger.fabric.protos.orderer.Ab.BroadcastResponse> getBroadcastMethod;
    if ((getBroadcastMethod = AtomicBroadcastGrpc.getBroadcastMethod) == null) {
      synchronized (AtomicBroadcastGrpc.class) {
        if ((getBroadcastMethod = AtomicBroadcastGrpc.getBroadcastMethod) == null) {
          AtomicBroadcastGrpc.getBroadcastMethod = getBroadcastMethod =
              io.grpc.MethodDescriptor.<org.hyperledger.fabric.protos.common.Common.Envelope, org.hyperledger.fabric.protos.orderer.Ab.BroadcastResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.BIDI_STREAMING)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "Broadcast"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  org.hyperledger.fabric.protos.common.Common.Envelope.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  org.hyperledger.fabric.protos.orderer.Ab.BroadcastResponse.getDefaultInstance()))
              .setSchemaDescriptor(new AtomicBroadcastMethodDescriptorSupplier("Broadcast"))
              .build();
        }
      }
    }
    return getBroadcastMethod;
  }

  private static volatile io.grpc.MethodDescriptor<org.hyperledger.fabric.protos.common.Common.Envelope,
      org.hyperledger.fabric.protos.orderer.Ab.DeliverResponse> getDeliverMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "Deliver",
      requestType = org.hyperledger.fabric.protos.common.Common.Envelope.class,
      responseType = org.hyperledger.fabric.protos.orderer.Ab.DeliverResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.BIDI_STREAMING)
  public static io.grpc.MethodDescriptor<org.hyperledger.fabric.protos.common.Common.Envelope,
      org.hyperledger.fabric.protos.orderer.Ab.DeliverResponse> getDeliverMethod() {
    io.grpc.MethodDescriptor<org.hyperledger.fabric.protos.common.Common.Envelope, org.hyperledger.fabric.protos.orderer.Ab.DeliverResponse> getDeliverMethod;
    if ((getDeliverMethod = AtomicBroadcastGrpc.getDeliverMethod) == null) {
      synchronized (AtomicBroadcastGrpc.class) {
        if ((getDeliverMethod = AtomicBroadcastGrpc.getDeliverMethod) == null) {
          AtomicBroadcastGrpc.getDeliverMethod = getDeliverMethod =
              io.grpc.MethodDescriptor.<org.hyperledger.fabric.protos.common.Common.Envelope, org.hyperledger.fabric.protos.orderer.Ab.DeliverResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.BIDI_STREAMING)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "Deliver"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  org.hyperledger.fabric.protos.common.Common.Envelope.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  org.hyperledger.fabric.protos.orderer.Ab.DeliverResponse.getDefaultInstance()))
              .setSchemaDescriptor(new AtomicBroadcastMethodDescriptorSupplier("Deliver"))
              .build();
        }
      }
    }
    return getDeliverMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static AtomicBroadcastStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<AtomicBroadcastStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<AtomicBroadcastStub>() {
        @java.lang.Override
        public AtomicBroadcastStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new AtomicBroadcastStub(channel, callOptions);
        }
      };
    return AtomicBroadcastStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static AtomicBroadcastBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<AtomicBroadcastBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<AtomicBroadcastBlockingStub>() {
        @java.lang.Override
        public AtomicBroadcastBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new AtomicBroadcastBlockingStub(channel, callOptions);
        }
      };
    return AtomicBroadcastBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static AtomicBroadcastFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<AtomicBroadcastFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<AtomicBroadcastFutureStub>() {
        @java.lang.Override
        public AtomicBroadcastFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new AtomicBroadcastFutureStub(channel, callOptions);
        }
      };
    return AtomicBroadcastFutureStub.newStub(factory, channel);
  }

  /**
   */
  public static abstract class AtomicBroadcastImplBase implements io.grpc.BindableService {

    /**
     * <pre>
     * broadcast receives a reply of Acknowledgement for each common.Envelope in order, indicating success or type of failure
     * </pre>
     */
    public io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.common.Common.Envelope> broadcast(
        io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.orderer.Ab.BroadcastResponse> responseObserver) {
      return asyncUnimplementedStreamingCall(getBroadcastMethod(), responseObserver);
    }

    /**
     * <pre>
     * deliver first requires an Envelope of type DELIVER_SEEK_INFO with Payload data as a mashaled SeekInfo message, then a stream of block replies is received.
     * </pre>
     */
    public io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.common.Common.Envelope> deliver(
        io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.orderer.Ab.DeliverResponse> responseObserver) {
      return asyncUnimplementedStreamingCall(getDeliverMethod(), responseObserver);
    }

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return io.grpc.ServerServiceDefinition.builder(getServiceDescriptor())
          .addMethod(
            getBroadcastMethod(),
            asyncBidiStreamingCall(
              new MethodHandlers<
                org.hyperledger.fabric.protos.common.Common.Envelope,
                org.hyperledger.fabric.protos.orderer.Ab.BroadcastResponse>(
                  this, METHODID_BROADCAST)))
          .addMethod(
            getDeliverMethod(),
            asyncBidiStreamingCall(
              new MethodHandlers<
                org.hyperledger.fabric.protos.common.Common.Envelope,
                org.hyperledger.fabric.protos.orderer.Ab.DeliverResponse>(
                  this, METHODID_DELIVER)))
          .build();
    }
  }

  /**
   */
  public static final class AtomicBroadcastStub extends io.grpc.stub.AbstractAsyncStub<AtomicBroadcastStub> {
    private AtomicBroadcastStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected AtomicBroadcastStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new AtomicBroadcastStub(channel, callOptions);
    }

    /**
     * <pre>
     * broadcast receives a reply of Acknowledgement for each common.Envelope in order, indicating success or type of failure
     * </pre>
     */
    public io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.common.Common.Envelope> broadcast(
        io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.orderer.Ab.BroadcastResponse> responseObserver) {
      return asyncBidiStreamingCall(
          getChannel().newCall(getBroadcastMethod(), getCallOptions()), responseObserver);
    }

    /**
     * <pre>
     * deliver first requires an Envelope of type DELIVER_SEEK_INFO with Payload data as a mashaled SeekInfo message, then a stream of block replies is received.
     * </pre>
     */
    public io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.common.Common.Envelope> deliver(
        io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.orderer.Ab.DeliverResponse> responseObserver) {
      return asyncBidiStreamingCall(
          getChannel().newCall(getDeliverMethod(), getCallOptions()), responseObserver);
    }
  }

  /**
   */
  public static final class AtomicBroadcastBlockingStub extends io.grpc.stub.AbstractBlockingStub<AtomicBroadcastBlockingStub> {
    private AtomicBroadcastBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected AtomicBroadcastBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new AtomicBroadcastBlockingStub(channel, callOptions);
    }
  }

  /**
   */
  public static final class AtomicBroadcastFutureStub extends io.grpc.stub.AbstractFutureStub<AtomicBroadcastFutureStub> {
    private AtomicBroadcastFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected AtomicBroadcastFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new AtomicBroadcastFutureStub(channel, callOptions);
    }
  }

  private static final int METHODID_BROADCAST = 0;
  private static final int METHODID_DELIVER = 1;

  private static final class MethodHandlers<Req, Resp> implements
      io.grpc.stub.ServerCalls.UnaryMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ServerStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ClientStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.BidiStreamingMethod<Req, Resp> {
    private final AtomicBroadcastImplBase serviceImpl;
    private final int methodId;

    MethodHandlers(AtomicBroadcastImplBase serviceImpl, int methodId) {
      this.serviceImpl = serviceImpl;
      this.methodId = methodId;
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public void invoke(Req request, io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        default:
          throw new AssertionError();
      }
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public io.grpc.stub.StreamObserver<Req> invoke(
        io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        case METHODID_BROADCAST:
          return (io.grpc.stub.StreamObserver<Req>) serviceImpl.broadcast(
              (io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.orderer.Ab.BroadcastResponse>) responseObserver);
        case METHODID_DELIVER:
          return (io.grpc.stub.StreamObserver<Req>) serviceImpl.deliver(
              (io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.orderer.Ab.DeliverResponse>) responseObserver);
        default:
          throw new AssertionError();
      }
    }
  }

  private static abstract class AtomicBroadcastBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    AtomicBroadcastBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return org.hyperledger.fabric.protos.orderer.Ab.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("AtomicBroadcast");
    }
  }

  private static final class AtomicBroadcastFileDescriptorSupplier
      extends AtomicBroadcastBaseDescriptorSupplier {
    AtomicBroadcastFileDescriptorSupplier() {}
  }

  private static final class AtomicBroadcastMethodDescriptorSupplier
      extends AtomicBroadcastBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final String methodName;

    AtomicBroadcastMethodDescriptorSupplier(String methodName) {
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
      synchronized (AtomicBroadcastGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new AtomicBroadcastFileDescriptorSupplier())
              .addMethod(getBroadcastMethod())
              .addMethod(getDeliverMethod())
              .build();
        }
      }
    }
    return result;
  }
}
