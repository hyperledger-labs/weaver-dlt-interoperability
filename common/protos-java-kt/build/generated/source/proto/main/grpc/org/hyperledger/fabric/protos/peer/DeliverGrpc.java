package org.hyperledger.fabric.protos.peer;

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
    comments = "Source: peer/events.proto")
public final class DeliverGrpc {

  private DeliverGrpc() {}

  public static final String SERVICE_NAME = "protos.Deliver";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<org.hyperledger.fabric.protos.common.Common.Envelope,
      org.hyperledger.fabric.protos.peer.EventsPackage.DeliverResponse> getDeliverMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "Deliver",
      requestType = org.hyperledger.fabric.protos.common.Common.Envelope.class,
      responseType = org.hyperledger.fabric.protos.peer.EventsPackage.DeliverResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.BIDI_STREAMING)
  public static io.grpc.MethodDescriptor<org.hyperledger.fabric.protos.common.Common.Envelope,
      org.hyperledger.fabric.protos.peer.EventsPackage.DeliverResponse> getDeliverMethod() {
    io.grpc.MethodDescriptor<org.hyperledger.fabric.protos.common.Common.Envelope, org.hyperledger.fabric.protos.peer.EventsPackage.DeliverResponse> getDeliverMethod;
    if ((getDeliverMethod = DeliverGrpc.getDeliverMethod) == null) {
      synchronized (DeliverGrpc.class) {
        if ((getDeliverMethod = DeliverGrpc.getDeliverMethod) == null) {
          DeliverGrpc.getDeliverMethod = getDeliverMethod =
              io.grpc.MethodDescriptor.<org.hyperledger.fabric.protos.common.Common.Envelope, org.hyperledger.fabric.protos.peer.EventsPackage.DeliverResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.BIDI_STREAMING)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "Deliver"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  org.hyperledger.fabric.protos.common.Common.Envelope.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  org.hyperledger.fabric.protos.peer.EventsPackage.DeliverResponse.getDefaultInstance()))
              .setSchemaDescriptor(new DeliverMethodDescriptorSupplier("Deliver"))
              .build();
        }
      }
    }
    return getDeliverMethod;
  }

  private static volatile io.grpc.MethodDescriptor<org.hyperledger.fabric.protos.common.Common.Envelope,
      org.hyperledger.fabric.protos.peer.EventsPackage.DeliverResponse> getDeliverFilteredMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "DeliverFiltered",
      requestType = org.hyperledger.fabric.protos.common.Common.Envelope.class,
      responseType = org.hyperledger.fabric.protos.peer.EventsPackage.DeliverResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.BIDI_STREAMING)
  public static io.grpc.MethodDescriptor<org.hyperledger.fabric.protos.common.Common.Envelope,
      org.hyperledger.fabric.protos.peer.EventsPackage.DeliverResponse> getDeliverFilteredMethod() {
    io.grpc.MethodDescriptor<org.hyperledger.fabric.protos.common.Common.Envelope, org.hyperledger.fabric.protos.peer.EventsPackage.DeliverResponse> getDeliverFilteredMethod;
    if ((getDeliverFilteredMethod = DeliverGrpc.getDeliverFilteredMethod) == null) {
      synchronized (DeliverGrpc.class) {
        if ((getDeliverFilteredMethod = DeliverGrpc.getDeliverFilteredMethod) == null) {
          DeliverGrpc.getDeliverFilteredMethod = getDeliverFilteredMethod =
              io.grpc.MethodDescriptor.<org.hyperledger.fabric.protos.common.Common.Envelope, org.hyperledger.fabric.protos.peer.EventsPackage.DeliverResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.BIDI_STREAMING)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "DeliverFiltered"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  org.hyperledger.fabric.protos.common.Common.Envelope.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  org.hyperledger.fabric.protos.peer.EventsPackage.DeliverResponse.getDefaultInstance()))
              .setSchemaDescriptor(new DeliverMethodDescriptorSupplier("DeliverFiltered"))
              .build();
        }
      }
    }
    return getDeliverFilteredMethod;
  }

  private static volatile io.grpc.MethodDescriptor<org.hyperledger.fabric.protos.common.Common.Envelope,
      org.hyperledger.fabric.protos.peer.EventsPackage.DeliverResponse> getDeliverWithPrivateDataMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "DeliverWithPrivateData",
      requestType = org.hyperledger.fabric.protos.common.Common.Envelope.class,
      responseType = org.hyperledger.fabric.protos.peer.EventsPackage.DeliverResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.BIDI_STREAMING)
  public static io.grpc.MethodDescriptor<org.hyperledger.fabric.protos.common.Common.Envelope,
      org.hyperledger.fabric.protos.peer.EventsPackage.DeliverResponse> getDeliverWithPrivateDataMethod() {
    io.grpc.MethodDescriptor<org.hyperledger.fabric.protos.common.Common.Envelope, org.hyperledger.fabric.protos.peer.EventsPackage.DeliverResponse> getDeliverWithPrivateDataMethod;
    if ((getDeliverWithPrivateDataMethod = DeliverGrpc.getDeliverWithPrivateDataMethod) == null) {
      synchronized (DeliverGrpc.class) {
        if ((getDeliverWithPrivateDataMethod = DeliverGrpc.getDeliverWithPrivateDataMethod) == null) {
          DeliverGrpc.getDeliverWithPrivateDataMethod = getDeliverWithPrivateDataMethod =
              io.grpc.MethodDescriptor.<org.hyperledger.fabric.protos.common.Common.Envelope, org.hyperledger.fabric.protos.peer.EventsPackage.DeliverResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.BIDI_STREAMING)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "DeliverWithPrivateData"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  org.hyperledger.fabric.protos.common.Common.Envelope.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  org.hyperledger.fabric.protos.peer.EventsPackage.DeliverResponse.getDefaultInstance()))
              .setSchemaDescriptor(new DeliverMethodDescriptorSupplier("DeliverWithPrivateData"))
              .build();
        }
      }
    }
    return getDeliverWithPrivateDataMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static DeliverStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<DeliverStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<DeliverStub>() {
        @java.lang.Override
        public DeliverStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new DeliverStub(channel, callOptions);
        }
      };
    return DeliverStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static DeliverBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<DeliverBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<DeliverBlockingStub>() {
        @java.lang.Override
        public DeliverBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new DeliverBlockingStub(channel, callOptions);
        }
      };
    return DeliverBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static DeliverFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<DeliverFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<DeliverFutureStub>() {
        @java.lang.Override
        public DeliverFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new DeliverFutureStub(channel, callOptions);
        }
      };
    return DeliverFutureStub.newStub(factory, channel);
  }

  /**
   */
  public static abstract class DeliverImplBase implements io.grpc.BindableService {

    /**
     * <pre>
     * Deliver first requires an Envelope of type ab.DELIVER_SEEK_INFO with
     * Payload data as a marshaled orderer.SeekInfo message,
     * then a stream of block replies is received
     * </pre>
     */
    public io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.common.Common.Envelope> deliver(
        io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.peer.EventsPackage.DeliverResponse> responseObserver) {
      return asyncUnimplementedStreamingCall(getDeliverMethod(), responseObserver);
    }

    /**
     * <pre>
     * DeliverFiltered first requires an Envelope of type ab.DELIVER_SEEK_INFO with
     * Payload data as a marshaled orderer.SeekInfo message,
     * then a stream of **filtered** block replies is received
     * </pre>
     */
    public io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.common.Common.Envelope> deliverFiltered(
        io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.peer.EventsPackage.DeliverResponse> responseObserver) {
      return asyncUnimplementedStreamingCall(getDeliverFilteredMethod(), responseObserver);
    }

    /**
     * <pre>
     * DeliverWithPrivateData first requires an Envelope of type ab.DELIVER_SEEK_INFO with
     * Payload data as a marshaled orderer.SeekInfo message,
     * then a stream of block and private data replies is received
     * </pre>
     */
    public io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.common.Common.Envelope> deliverWithPrivateData(
        io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.peer.EventsPackage.DeliverResponse> responseObserver) {
      return asyncUnimplementedStreamingCall(getDeliverWithPrivateDataMethod(), responseObserver);
    }

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return io.grpc.ServerServiceDefinition.builder(getServiceDescriptor())
          .addMethod(
            getDeliverMethod(),
            asyncBidiStreamingCall(
              new MethodHandlers<
                org.hyperledger.fabric.protos.common.Common.Envelope,
                org.hyperledger.fabric.protos.peer.EventsPackage.DeliverResponse>(
                  this, METHODID_DELIVER)))
          .addMethod(
            getDeliverFilteredMethod(),
            asyncBidiStreamingCall(
              new MethodHandlers<
                org.hyperledger.fabric.protos.common.Common.Envelope,
                org.hyperledger.fabric.protos.peer.EventsPackage.DeliverResponse>(
                  this, METHODID_DELIVER_FILTERED)))
          .addMethod(
            getDeliverWithPrivateDataMethod(),
            asyncBidiStreamingCall(
              new MethodHandlers<
                org.hyperledger.fabric.protos.common.Common.Envelope,
                org.hyperledger.fabric.protos.peer.EventsPackage.DeliverResponse>(
                  this, METHODID_DELIVER_WITH_PRIVATE_DATA)))
          .build();
    }
  }

  /**
   */
  public static final class DeliverStub extends io.grpc.stub.AbstractAsyncStub<DeliverStub> {
    private DeliverStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected DeliverStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new DeliverStub(channel, callOptions);
    }

    /**
     * <pre>
     * Deliver first requires an Envelope of type ab.DELIVER_SEEK_INFO with
     * Payload data as a marshaled orderer.SeekInfo message,
     * then a stream of block replies is received
     * </pre>
     */
    public io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.common.Common.Envelope> deliver(
        io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.peer.EventsPackage.DeliverResponse> responseObserver) {
      return asyncBidiStreamingCall(
          getChannel().newCall(getDeliverMethod(), getCallOptions()), responseObserver);
    }

    /**
     * <pre>
     * DeliverFiltered first requires an Envelope of type ab.DELIVER_SEEK_INFO with
     * Payload data as a marshaled orderer.SeekInfo message,
     * then a stream of **filtered** block replies is received
     * </pre>
     */
    public io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.common.Common.Envelope> deliverFiltered(
        io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.peer.EventsPackage.DeliverResponse> responseObserver) {
      return asyncBidiStreamingCall(
          getChannel().newCall(getDeliverFilteredMethod(), getCallOptions()), responseObserver);
    }

    /**
     * <pre>
     * DeliverWithPrivateData first requires an Envelope of type ab.DELIVER_SEEK_INFO with
     * Payload data as a marshaled orderer.SeekInfo message,
     * then a stream of block and private data replies is received
     * </pre>
     */
    public io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.common.Common.Envelope> deliverWithPrivateData(
        io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.peer.EventsPackage.DeliverResponse> responseObserver) {
      return asyncBidiStreamingCall(
          getChannel().newCall(getDeliverWithPrivateDataMethod(), getCallOptions()), responseObserver);
    }
  }

  /**
   */
  public static final class DeliverBlockingStub extends io.grpc.stub.AbstractBlockingStub<DeliverBlockingStub> {
    private DeliverBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected DeliverBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new DeliverBlockingStub(channel, callOptions);
    }
  }

  /**
   */
  public static final class DeliverFutureStub extends io.grpc.stub.AbstractFutureStub<DeliverFutureStub> {
    private DeliverFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected DeliverFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new DeliverFutureStub(channel, callOptions);
    }
  }

  private static final int METHODID_DELIVER = 0;
  private static final int METHODID_DELIVER_FILTERED = 1;
  private static final int METHODID_DELIVER_WITH_PRIVATE_DATA = 2;

  private static final class MethodHandlers<Req, Resp> implements
      io.grpc.stub.ServerCalls.UnaryMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ServerStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ClientStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.BidiStreamingMethod<Req, Resp> {
    private final DeliverImplBase serviceImpl;
    private final int methodId;

    MethodHandlers(DeliverImplBase serviceImpl, int methodId) {
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
        case METHODID_DELIVER:
          return (io.grpc.stub.StreamObserver<Req>) serviceImpl.deliver(
              (io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.peer.EventsPackage.DeliverResponse>) responseObserver);
        case METHODID_DELIVER_FILTERED:
          return (io.grpc.stub.StreamObserver<Req>) serviceImpl.deliverFiltered(
              (io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.peer.EventsPackage.DeliverResponse>) responseObserver);
        case METHODID_DELIVER_WITH_PRIVATE_DATA:
          return (io.grpc.stub.StreamObserver<Req>) serviceImpl.deliverWithPrivateData(
              (io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.peer.EventsPackage.DeliverResponse>) responseObserver);
        default:
          throw new AssertionError();
      }
    }
  }

  private static abstract class DeliverBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    DeliverBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return org.hyperledger.fabric.protos.peer.EventsPackage.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("Deliver");
    }
  }

  private static final class DeliverFileDescriptorSupplier
      extends DeliverBaseDescriptorSupplier {
    DeliverFileDescriptorSupplier() {}
  }

  private static final class DeliverMethodDescriptorSupplier
      extends DeliverBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final String methodName;

    DeliverMethodDescriptorSupplier(String methodName) {
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
      synchronized (DeliverGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new DeliverFileDescriptorSupplier())
              .addMethod(getDeliverMethod())
              .addMethod(getDeliverFilteredMethod())
              .addMethod(getDeliverWithPrivateDataMethod())
              .build();
        }
      }
    }
    return result;
  }
}
