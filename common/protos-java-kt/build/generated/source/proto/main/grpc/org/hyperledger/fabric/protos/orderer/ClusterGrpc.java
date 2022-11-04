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
 * <pre>
 * Cluster defines communication between cluster members.
 * </pre>
 */
@javax.annotation.Generated(
    value = "by gRPC proto compiler (version 1.29.0)",
    comments = "Source: orderer/cluster.proto")
public final class ClusterGrpc {

  private ClusterGrpc() {}

  public static final String SERVICE_NAME = "orderer.Cluster";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<org.hyperledger.fabric.protos.orderer.ClusterOuterClass.StepRequest,
      org.hyperledger.fabric.protos.orderer.ClusterOuterClass.StepResponse> getStepMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "Step",
      requestType = org.hyperledger.fabric.protos.orderer.ClusterOuterClass.StepRequest.class,
      responseType = org.hyperledger.fabric.protos.orderer.ClusterOuterClass.StepResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.BIDI_STREAMING)
  public static io.grpc.MethodDescriptor<org.hyperledger.fabric.protos.orderer.ClusterOuterClass.StepRequest,
      org.hyperledger.fabric.protos.orderer.ClusterOuterClass.StepResponse> getStepMethod() {
    io.grpc.MethodDescriptor<org.hyperledger.fabric.protos.orderer.ClusterOuterClass.StepRequest, org.hyperledger.fabric.protos.orderer.ClusterOuterClass.StepResponse> getStepMethod;
    if ((getStepMethod = ClusterGrpc.getStepMethod) == null) {
      synchronized (ClusterGrpc.class) {
        if ((getStepMethod = ClusterGrpc.getStepMethod) == null) {
          ClusterGrpc.getStepMethod = getStepMethod =
              io.grpc.MethodDescriptor.<org.hyperledger.fabric.protos.orderer.ClusterOuterClass.StepRequest, org.hyperledger.fabric.protos.orderer.ClusterOuterClass.StepResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.BIDI_STREAMING)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "Step"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  org.hyperledger.fabric.protos.orderer.ClusterOuterClass.StepRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  org.hyperledger.fabric.protos.orderer.ClusterOuterClass.StepResponse.getDefaultInstance()))
              .setSchemaDescriptor(new ClusterMethodDescriptorSupplier("Step"))
              .build();
        }
      }
    }
    return getStepMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static ClusterStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<ClusterStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<ClusterStub>() {
        @java.lang.Override
        public ClusterStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new ClusterStub(channel, callOptions);
        }
      };
    return ClusterStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static ClusterBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<ClusterBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<ClusterBlockingStub>() {
        @java.lang.Override
        public ClusterBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new ClusterBlockingStub(channel, callOptions);
        }
      };
    return ClusterBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static ClusterFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<ClusterFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<ClusterFutureStub>() {
        @java.lang.Override
        public ClusterFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new ClusterFutureStub(channel, callOptions);
        }
      };
    return ClusterFutureStub.newStub(factory, channel);
  }

  /**
   * <pre>
   * Cluster defines communication between cluster members.
   * </pre>
   */
  public static abstract class ClusterImplBase implements io.grpc.BindableService {

    /**
     * <pre>
     * Step passes an implementation-specific message to another cluster member.
     * </pre>
     */
    public io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.orderer.ClusterOuterClass.StepRequest> step(
        io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.orderer.ClusterOuterClass.StepResponse> responseObserver) {
      return asyncUnimplementedStreamingCall(getStepMethod(), responseObserver);
    }

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return io.grpc.ServerServiceDefinition.builder(getServiceDescriptor())
          .addMethod(
            getStepMethod(),
            asyncBidiStreamingCall(
              new MethodHandlers<
                org.hyperledger.fabric.protos.orderer.ClusterOuterClass.StepRequest,
                org.hyperledger.fabric.protos.orderer.ClusterOuterClass.StepResponse>(
                  this, METHODID_STEP)))
          .build();
    }
  }

  /**
   * <pre>
   * Cluster defines communication between cluster members.
   * </pre>
   */
  public static final class ClusterStub extends io.grpc.stub.AbstractAsyncStub<ClusterStub> {
    private ClusterStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected ClusterStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new ClusterStub(channel, callOptions);
    }

    /**
     * <pre>
     * Step passes an implementation-specific message to another cluster member.
     * </pre>
     */
    public io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.orderer.ClusterOuterClass.StepRequest> step(
        io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.orderer.ClusterOuterClass.StepResponse> responseObserver) {
      return asyncBidiStreamingCall(
          getChannel().newCall(getStepMethod(), getCallOptions()), responseObserver);
    }
  }

  /**
   * <pre>
   * Cluster defines communication between cluster members.
   * </pre>
   */
  public static final class ClusterBlockingStub extends io.grpc.stub.AbstractBlockingStub<ClusterBlockingStub> {
    private ClusterBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected ClusterBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new ClusterBlockingStub(channel, callOptions);
    }
  }

  /**
   * <pre>
   * Cluster defines communication between cluster members.
   * </pre>
   */
  public static final class ClusterFutureStub extends io.grpc.stub.AbstractFutureStub<ClusterFutureStub> {
    private ClusterFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected ClusterFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new ClusterFutureStub(channel, callOptions);
    }
  }

  private static final int METHODID_STEP = 0;

  private static final class MethodHandlers<Req, Resp> implements
      io.grpc.stub.ServerCalls.UnaryMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ServerStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ClientStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.BidiStreamingMethod<Req, Resp> {
    private final ClusterImplBase serviceImpl;
    private final int methodId;

    MethodHandlers(ClusterImplBase serviceImpl, int methodId) {
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
        case METHODID_STEP:
          return (io.grpc.stub.StreamObserver<Req>) serviceImpl.step(
              (io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.orderer.ClusterOuterClass.StepResponse>) responseObserver);
        default:
          throw new AssertionError();
      }
    }
  }

  private static abstract class ClusterBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    ClusterBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return org.hyperledger.fabric.protos.orderer.ClusterOuterClass.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("Cluster");
    }
  }

  private static final class ClusterFileDescriptorSupplier
      extends ClusterBaseDescriptorSupplier {
    ClusterFileDescriptorSupplier() {}
  }

  private static final class ClusterMethodDescriptorSupplier
      extends ClusterBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final String methodName;

    ClusterMethodDescriptorSupplier(String methodName) {
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
      synchronized (ClusterGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new ClusterFileDescriptorSupplier())
              .addMethod(getStepMethod())
              .build();
        }
      }
    }
    return result;
  }
}
