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
    comments = "Source: peer/peer.proto")
public final class EndorserGrpc {

  private EndorserGrpc() {}

  public static final String SERVICE_NAME = "protos.Endorser";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<org.hyperledger.fabric.protos.peer.ProposalPackage.SignedProposal,
      org.hyperledger.fabric.protos.peer.ProposalResponsePackage.ProposalResponse> getProcessProposalMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "ProcessProposal",
      requestType = org.hyperledger.fabric.protos.peer.ProposalPackage.SignedProposal.class,
      responseType = org.hyperledger.fabric.protos.peer.ProposalResponsePackage.ProposalResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<org.hyperledger.fabric.protos.peer.ProposalPackage.SignedProposal,
      org.hyperledger.fabric.protos.peer.ProposalResponsePackage.ProposalResponse> getProcessProposalMethod() {
    io.grpc.MethodDescriptor<org.hyperledger.fabric.protos.peer.ProposalPackage.SignedProposal, org.hyperledger.fabric.protos.peer.ProposalResponsePackage.ProposalResponse> getProcessProposalMethod;
    if ((getProcessProposalMethod = EndorserGrpc.getProcessProposalMethod) == null) {
      synchronized (EndorserGrpc.class) {
        if ((getProcessProposalMethod = EndorserGrpc.getProcessProposalMethod) == null) {
          EndorserGrpc.getProcessProposalMethod = getProcessProposalMethod =
              io.grpc.MethodDescriptor.<org.hyperledger.fabric.protos.peer.ProposalPackage.SignedProposal, org.hyperledger.fabric.protos.peer.ProposalResponsePackage.ProposalResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "ProcessProposal"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  org.hyperledger.fabric.protos.peer.ProposalPackage.SignedProposal.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  org.hyperledger.fabric.protos.peer.ProposalResponsePackage.ProposalResponse.getDefaultInstance()))
              .setSchemaDescriptor(new EndorserMethodDescriptorSupplier("ProcessProposal"))
              .build();
        }
      }
    }
    return getProcessProposalMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static EndorserStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<EndorserStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<EndorserStub>() {
        @java.lang.Override
        public EndorserStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new EndorserStub(channel, callOptions);
        }
      };
    return EndorserStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static EndorserBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<EndorserBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<EndorserBlockingStub>() {
        @java.lang.Override
        public EndorserBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new EndorserBlockingStub(channel, callOptions);
        }
      };
    return EndorserBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static EndorserFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<EndorserFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<EndorserFutureStub>() {
        @java.lang.Override
        public EndorserFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new EndorserFutureStub(channel, callOptions);
        }
      };
    return EndorserFutureStub.newStub(factory, channel);
  }

  /**
   */
  public static abstract class EndorserImplBase implements io.grpc.BindableService {

    /**
     */
    public void processProposal(org.hyperledger.fabric.protos.peer.ProposalPackage.SignedProposal request,
        io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.peer.ProposalResponsePackage.ProposalResponse> responseObserver) {
      asyncUnimplementedUnaryCall(getProcessProposalMethod(), responseObserver);
    }

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return io.grpc.ServerServiceDefinition.builder(getServiceDescriptor())
          .addMethod(
            getProcessProposalMethod(),
            asyncUnaryCall(
              new MethodHandlers<
                org.hyperledger.fabric.protos.peer.ProposalPackage.SignedProposal,
                org.hyperledger.fabric.protos.peer.ProposalResponsePackage.ProposalResponse>(
                  this, METHODID_PROCESS_PROPOSAL)))
          .build();
    }
  }

  /**
   */
  public static final class EndorserStub extends io.grpc.stub.AbstractAsyncStub<EndorserStub> {
    private EndorserStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected EndorserStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new EndorserStub(channel, callOptions);
    }

    /**
     */
    public void processProposal(org.hyperledger.fabric.protos.peer.ProposalPackage.SignedProposal request,
        io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.peer.ProposalResponsePackage.ProposalResponse> responseObserver) {
      asyncUnaryCall(
          getChannel().newCall(getProcessProposalMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   */
  public static final class EndorserBlockingStub extends io.grpc.stub.AbstractBlockingStub<EndorserBlockingStub> {
    private EndorserBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected EndorserBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new EndorserBlockingStub(channel, callOptions);
    }

    /**
     */
    public org.hyperledger.fabric.protos.peer.ProposalResponsePackage.ProposalResponse processProposal(org.hyperledger.fabric.protos.peer.ProposalPackage.SignedProposal request) {
      return blockingUnaryCall(
          getChannel(), getProcessProposalMethod(), getCallOptions(), request);
    }
  }

  /**
   */
  public static final class EndorserFutureStub extends io.grpc.stub.AbstractFutureStub<EndorserFutureStub> {
    private EndorserFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected EndorserFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new EndorserFutureStub(channel, callOptions);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<org.hyperledger.fabric.protos.peer.ProposalResponsePackage.ProposalResponse> processProposal(
        org.hyperledger.fabric.protos.peer.ProposalPackage.SignedProposal request) {
      return futureUnaryCall(
          getChannel().newCall(getProcessProposalMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_PROCESS_PROPOSAL = 0;

  private static final class MethodHandlers<Req, Resp> implements
      io.grpc.stub.ServerCalls.UnaryMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ServerStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ClientStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.BidiStreamingMethod<Req, Resp> {
    private final EndorserImplBase serviceImpl;
    private final int methodId;

    MethodHandlers(EndorserImplBase serviceImpl, int methodId) {
      this.serviceImpl = serviceImpl;
      this.methodId = methodId;
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public void invoke(Req request, io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        case METHODID_PROCESS_PROPOSAL:
          serviceImpl.processProposal((org.hyperledger.fabric.protos.peer.ProposalPackage.SignedProposal) request,
              (io.grpc.stub.StreamObserver<org.hyperledger.fabric.protos.peer.ProposalResponsePackage.ProposalResponse>) responseObserver);
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

  private static abstract class EndorserBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    EndorserBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return org.hyperledger.fabric.protos.peer.Peer.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("Endorser");
    }
  }

  private static final class EndorserFileDescriptorSupplier
      extends EndorserBaseDescriptorSupplier {
    EndorserFileDescriptorSupplier() {}
  }

  private static final class EndorserMethodDescriptorSupplier
      extends EndorserBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final String methodName;

    EndorserMethodDescriptorSupplier(String methodName) {
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
      synchronized (EndorserGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new EndorserFileDescriptorSupplier())
              .addMethod(getProcessProposalMethod())
              .build();
        }
      }
    }
    return result;
  }
}
