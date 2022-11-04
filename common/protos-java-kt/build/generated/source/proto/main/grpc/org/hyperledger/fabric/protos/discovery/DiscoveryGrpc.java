package org.hyperledger.fabric.protos.discovery;

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
 * Discovery defines a service that serves information about the fabric network
 * like which peers, orderers, chaincodes, etc.
 * </pre>
 */
@javax.annotation.Generated(
    value = "by gRPC proto compiler (version 1.29.0)",
    comments = "Source: discovery/protocol.proto")
public final class DiscoveryGrpc {

  private DiscoveryGrpc() {}

  public static final String SERVICE_NAME = "discovery.Discovery";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<org.hyperledger.fabric.protos.discovery.Protocol.SignedRequest,
      org.hyperledger.fabric.protos.discovery.Protocol.Response> getDiscoverMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "Discover",
      requestType = org.hyperledger.fabric.protos.discovery.Protocol.SignedRequest.class,
      responseType = org.hyperledger.fabric.protos.discovery.Protocol.Response.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<org.hyperledger.fabric.protos.discovery.Protocol.SignedRequest,
      org.hyperledger.fabric.protos.discovery.Protocol.Response> getDiscoverMethod() {
    io.grpc.MethodDescriptor<org.hyperledger.fabric.protos.discovery.Protocol.SignedRequest, org.hyperledger.fabric.protos.discovery.Protocol.Response> getDiscoverMethod;
    if ((getDiscoverMethod = DiscoveryGrpc.getDiscoverMethod) == null) {
      synchronized (DiscoveryGrpc.class) {
        if ((getDiscoverMethod = DiscoveryGrpc.getDiscoverMethod) == null) {
          DiscoveryGrpc.getDiscoverMethod = getDiscoverMethod =
              io.grpc.MethodDescriptor.<org.hyperledger.fabric.protos.discovery.Protocol.SignedRequest, org.hyperledger.fabric.protos.discovery.Protocol.Response>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "Discover"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  org.hyperledger.fabric.protos.discovery.Protocol.SignedRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  org.hyperledger.fabric.protos.discovery.Protocol.Response.getDefaultInstance()))
              .setSchemaDescriptor(new DiscoveryMethodDescriptorSupplier("Discover"))
              .build();
        }
      }
    }
    return getDiscoverMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static DiscoveryStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<DiscoveryStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<DiscoveryStub>() {
        @java.lang.Override
        public DiscoveryStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new DiscoveryStub(channel, callOptions);
        }
      };
    return DiscoveryStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static DiscoveryBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<DiscoveryBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<DiscoveryBlockingStub>() {
        @java.lang.Override
        public DiscoveryBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new DiscoveryBlockingStub(channel, callOptions);
        }
      };
    return DiscoveryBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static DiscoveryFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<DiscoveryFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<DiscoveryFutureStub>() {
        @java.lang.Override
        public DiscoveryFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new DiscoveryFutureStub(channel, callOptions);
        }
      };
    return DiscoveryFutureStub.newStub(factory, channel);
  }

  /**
   * <pre>
   * Discovery defines a service that serves information about the fabric network
   * like which peers, orderers, chaincodes, etc.
   * </pre>
   */
  public static abstract class DiscoveryImplBase implements io.grpc.BindableService {

    /**
     * <pre>
     * Discover receives a signed request, and returns a response.
     * </pre>
     */
    public void discover(org.hyperledger.fabric.protos.discovery.Protocol.SignedRequest request,
        io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.discovery.Protocol.Response> responseObserver) {
      asyncUnimplementedUnaryCall(getDiscoverMethod(), responseObserver);
    }

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return io.grpc.ServerServiceDefinition.builder(getServiceDescriptor())
          .addMethod(
            getDiscoverMethod(),
            asyncUnaryCall(
              new MethodHandlers<
                org.hyperledger.fabric.protos.discovery.Protocol.SignedRequest,
                org.hyperledger.fabric.protos.discovery.Protocol.Response>(
                  this, METHODID_DISCOVER)))
          .build();
    }
  }

  /**
   * <pre>
   * Discovery defines a service that serves information about the fabric network
   * like which peers, orderers, chaincodes, etc.
   * </pre>
   */
  public static final class DiscoveryStub extends io.grpc.stub.AbstractAsyncStub<DiscoveryStub> {
    private DiscoveryStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected DiscoveryStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new DiscoveryStub(channel, callOptions);
    }

    /**
     * <pre>
     * Discover receives a signed request, and returns a response.
     * </pre>
     */
    public void discover(org.hyperledger.fabric.protos.discovery.Protocol.SignedRequest request,
        io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.discovery.Protocol.Response> responseObserver) {
      asyncUnaryCall(
          getChannel().newCall(getDiscoverMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   * <pre>
   * Discovery defines a service that serves information about the fabric network
   * like which peers, orderers, chaincodes, etc.
   * </pre>
   */
  public static final class DiscoveryBlockingStub extends io.grpc.stub.AbstractBlockingStub<DiscoveryBlockingStub> {
    private DiscoveryBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected DiscoveryBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new DiscoveryBlockingStub(channel, callOptions);
    }

    /**
     * <pre>
     * Discover receives a signed request, and returns a response.
     * </pre>
     */
    public org.hyperledger.fabric.protos.discovery.Protocol.Response discover(org.hyperledger.fabric.protos.discovery.Protocol.SignedRequest request) {
      return blockingUnaryCall(
          getChannel(), getDiscoverMethod(), getCallOptions(), request);
    }
  }

  /**
   * <pre>
   * Discovery defines a service that serves information about the fabric network
   * like which peers, orderers, chaincodes, etc.
   * </pre>
   */
  public static final class DiscoveryFutureStub extends io.grpc.stub.AbstractFutureStub<DiscoveryFutureStub> {
    private DiscoveryFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected DiscoveryFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new DiscoveryFutureStub(channel, callOptions);
    }

    /**
     * <pre>
     * Discover receives a signed request, and returns a response.
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<org.hyperledger.fabric.protos.discovery.Protocol.Response> discover(
        org.hyperledger.fabric.protos.discovery.Protocol.SignedRequest request) {
      return futureUnaryCall(
          getChannel().newCall(getDiscoverMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_DISCOVER = 0;

  private static final class MethodHandlers<Req, Resp> implements
      io.grpc.stub.ServerCalls.UnaryMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ServerStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ClientStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.BidiStreamingMethod<Req, Resp> {
    private final DiscoveryImplBase serviceImpl;
    private final int methodId;

    MethodHandlers(DiscoveryImplBase serviceImpl, int methodId) {
      this.serviceImpl = serviceImpl;
      this.methodId = methodId;
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public void invoke(Req request, io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        case METHODID_DISCOVER:
          serviceImpl.discover((org.hyperledger.fabric.protos.discovery.Protocol.SignedRequest) request,
              (io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.discovery.Protocol.Response>) responseObserver);
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

  private static abstract class DiscoveryBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    DiscoveryBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return org.hyperledger.fabric.protos.discovery.Protocol.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("Discovery");
    }
  }

  private static final class DiscoveryFileDescriptorSupplier
      extends DiscoveryBaseDescriptorSupplier {
    DiscoveryFileDescriptorSupplier() {}
  }

  private static final class DiscoveryMethodDescriptorSupplier
      extends DiscoveryBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final String methodName;

    DiscoveryMethodDescriptorSupplier(String methodName) {
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
      synchronized (DiscoveryGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new DiscoveryFileDescriptorSupplier())
              .addMethod(getDiscoverMethod())
              .build();
        }
      }
    }
    return result;
  }
}
