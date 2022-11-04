package com.weaver.protos.identity.agent;

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
 * definitions of all messages used in the datatransfer protocol
 * </pre>
 */
@javax.annotation.Generated(
    value = "by gRPC proto compiler (version 1.29.0)",
    comments = "Source: identity/agent.proto")
public final class IINAgentGrpc {

  private IINAgentGrpc() {}

  public static final String SERVICE_NAME = "identity.agent.IINAgent";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<com.weaver.protos.identity.agent.Agent.SecurityDomainMemberIdentity,
      com.weaver.protos.common.ack.AckOuterClass.Ack> getSyncExternalStateMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "SyncExternalState",
      requestType = com.weaver.protos.identity.agent.Agent.SecurityDomainMemberIdentity.class,
      responseType = com.weaver.protos.common.ack.AckOuterClass.Ack.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.weaver.protos.identity.agent.Agent.SecurityDomainMemberIdentity,
      com.weaver.protos.common.ack.AckOuterClass.Ack> getSyncExternalStateMethod() {
    io.grpc.MethodDescriptor<com.weaver.protos.identity.agent.Agent.SecurityDomainMemberIdentity, com.weaver.protos.common.ack.AckOuterClass.Ack> getSyncExternalStateMethod;
    if ((getSyncExternalStateMethod = IINAgentGrpc.getSyncExternalStateMethod) == null) {
      synchronized (IINAgentGrpc.class) {
        if ((getSyncExternalStateMethod = IINAgentGrpc.getSyncExternalStateMethod) == null) {
          IINAgentGrpc.getSyncExternalStateMethod = getSyncExternalStateMethod =
              io.grpc.MethodDescriptor.<com.weaver.protos.identity.agent.Agent.SecurityDomainMemberIdentity, com.weaver.protos.common.ack.AckOuterClass.Ack>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "SyncExternalState"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.identity.agent.Agent.SecurityDomainMemberIdentity.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.common.ack.AckOuterClass.Ack.getDefaultInstance()))
              .setSchemaDescriptor(new IINAgentMethodDescriptorSupplier("SyncExternalState"))
              .build();
        }
      }
    }
    return getSyncExternalStateMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.weaver.protos.identity.agent.Agent.SecurityDomainMemberIdentityRequest,
      com.weaver.protos.common.ack.AckOuterClass.Ack> getRequestIdentityConfigurationMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "RequestIdentityConfiguration",
      requestType = com.weaver.protos.identity.agent.Agent.SecurityDomainMemberIdentityRequest.class,
      responseType = com.weaver.protos.common.ack.AckOuterClass.Ack.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.weaver.protos.identity.agent.Agent.SecurityDomainMemberIdentityRequest,
      com.weaver.protos.common.ack.AckOuterClass.Ack> getRequestIdentityConfigurationMethod() {
    io.grpc.MethodDescriptor<com.weaver.protos.identity.agent.Agent.SecurityDomainMemberIdentityRequest, com.weaver.protos.common.ack.AckOuterClass.Ack> getRequestIdentityConfigurationMethod;
    if ((getRequestIdentityConfigurationMethod = IINAgentGrpc.getRequestIdentityConfigurationMethod) == null) {
      synchronized (IINAgentGrpc.class) {
        if ((getRequestIdentityConfigurationMethod = IINAgentGrpc.getRequestIdentityConfigurationMethod) == null) {
          IINAgentGrpc.getRequestIdentityConfigurationMethod = getRequestIdentityConfigurationMethod =
              io.grpc.MethodDescriptor.<com.weaver.protos.identity.agent.Agent.SecurityDomainMemberIdentityRequest, com.weaver.protos.common.ack.AckOuterClass.Ack>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "RequestIdentityConfiguration"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.identity.agent.Agent.SecurityDomainMemberIdentityRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.common.ack.AckOuterClass.Ack.getDefaultInstance()))
              .setSchemaDescriptor(new IINAgentMethodDescriptorSupplier("RequestIdentityConfiguration"))
              .build();
        }
      }
    }
    return getRequestIdentityConfigurationMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.weaver.protos.identity.agent.Agent.AttestedMembership,
      com.weaver.protos.common.ack.AckOuterClass.Ack> getSendIdentityConfigurationMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "SendIdentityConfiguration",
      requestType = com.weaver.protos.identity.agent.Agent.AttestedMembership.class,
      responseType = com.weaver.protos.common.ack.AckOuterClass.Ack.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.weaver.protos.identity.agent.Agent.AttestedMembership,
      com.weaver.protos.common.ack.AckOuterClass.Ack> getSendIdentityConfigurationMethod() {
    io.grpc.MethodDescriptor<com.weaver.protos.identity.agent.Agent.AttestedMembership, com.weaver.protos.common.ack.AckOuterClass.Ack> getSendIdentityConfigurationMethod;
    if ((getSendIdentityConfigurationMethod = IINAgentGrpc.getSendIdentityConfigurationMethod) == null) {
      synchronized (IINAgentGrpc.class) {
        if ((getSendIdentityConfigurationMethod = IINAgentGrpc.getSendIdentityConfigurationMethod) == null) {
          IINAgentGrpc.getSendIdentityConfigurationMethod = getSendIdentityConfigurationMethod =
              io.grpc.MethodDescriptor.<com.weaver.protos.identity.agent.Agent.AttestedMembership, com.weaver.protos.common.ack.AckOuterClass.Ack>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "SendIdentityConfiguration"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.identity.agent.Agent.AttestedMembership.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.common.ack.AckOuterClass.Ack.getDefaultInstance()))
              .setSchemaDescriptor(new IINAgentMethodDescriptorSupplier("SendIdentityConfiguration"))
              .build();
        }
      }
    }
    return getSendIdentityConfigurationMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.weaver.protos.identity.agent.Agent.CounterAttestedMembership,
      com.weaver.protos.common.ack.AckOuterClass.Ack> getRequestAttestationMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "RequestAttestation",
      requestType = com.weaver.protos.identity.agent.Agent.CounterAttestedMembership.class,
      responseType = com.weaver.protos.common.ack.AckOuterClass.Ack.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.weaver.protos.identity.agent.Agent.CounterAttestedMembership,
      com.weaver.protos.common.ack.AckOuterClass.Ack> getRequestAttestationMethod() {
    io.grpc.MethodDescriptor<com.weaver.protos.identity.agent.Agent.CounterAttestedMembership, com.weaver.protos.common.ack.AckOuterClass.Ack> getRequestAttestationMethod;
    if ((getRequestAttestationMethod = IINAgentGrpc.getRequestAttestationMethod) == null) {
      synchronized (IINAgentGrpc.class) {
        if ((getRequestAttestationMethod = IINAgentGrpc.getRequestAttestationMethod) == null) {
          IINAgentGrpc.getRequestAttestationMethod = getRequestAttestationMethod =
              io.grpc.MethodDescriptor.<com.weaver.protos.identity.agent.Agent.CounterAttestedMembership, com.weaver.protos.common.ack.AckOuterClass.Ack>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "RequestAttestation"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.identity.agent.Agent.CounterAttestedMembership.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.common.ack.AckOuterClass.Ack.getDefaultInstance()))
              .setSchemaDescriptor(new IINAgentMethodDescriptorSupplier("RequestAttestation"))
              .build();
        }
      }
    }
    return getRequestAttestationMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.weaver.protos.identity.agent.Agent.CounterAttestedMembership,
      com.weaver.protos.common.ack.AckOuterClass.Ack> getSendAttestationMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "SendAttestation",
      requestType = com.weaver.protos.identity.agent.Agent.CounterAttestedMembership.class,
      responseType = com.weaver.protos.common.ack.AckOuterClass.Ack.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.weaver.protos.identity.agent.Agent.CounterAttestedMembership,
      com.weaver.protos.common.ack.AckOuterClass.Ack> getSendAttestationMethod() {
    io.grpc.MethodDescriptor<com.weaver.protos.identity.agent.Agent.CounterAttestedMembership, com.weaver.protos.common.ack.AckOuterClass.Ack> getSendAttestationMethod;
    if ((getSendAttestationMethod = IINAgentGrpc.getSendAttestationMethod) == null) {
      synchronized (IINAgentGrpc.class) {
        if ((getSendAttestationMethod = IINAgentGrpc.getSendAttestationMethod) == null) {
          IINAgentGrpc.getSendAttestationMethod = getSendAttestationMethod =
              io.grpc.MethodDescriptor.<com.weaver.protos.identity.agent.Agent.CounterAttestedMembership, com.weaver.protos.common.ack.AckOuterClass.Ack>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "SendAttestation"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.identity.agent.Agent.CounterAttestedMembership.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.weaver.protos.common.ack.AckOuterClass.Ack.getDefaultInstance()))
              .setSchemaDescriptor(new IINAgentMethodDescriptorSupplier("SendAttestation"))
              .build();
        }
      }
    }
    return getSendAttestationMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static IINAgentStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<IINAgentStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<IINAgentStub>() {
        @java.lang.Override
        public IINAgentStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new IINAgentStub(channel, callOptions);
        }
      };
    return IINAgentStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static IINAgentBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<IINAgentBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<IINAgentBlockingStub>() {
        @java.lang.Override
        public IINAgentBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new IINAgentBlockingStub(channel, callOptions);
        }
      };
    return IINAgentBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static IINAgentFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<IINAgentFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<IINAgentFutureStub>() {
        @java.lang.Override
        public IINAgentFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new IINAgentFutureStub(channel, callOptions);
        }
      };
    return IINAgentFutureStub.newStub(factory, channel);
  }

  /**
   * <pre>
   * definitions of all messages used in the datatransfer protocol
   * </pre>
   */
  public static abstract class IINAgentImplBase implements io.grpc.BindableService {

    /**
     * <pre>
     * user or agent triggers a sync of external/foreign network unit's state
     * </pre>
     */
    public void syncExternalState(com.weaver.protos.identity.agent.Agent.SecurityDomainMemberIdentity request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack> responseObserver) {
      asyncUnimplementedUnaryCall(getSyncExternalStateMethod(), responseObserver);
    }

    /**
     * <pre>
     * Requesting network unit's state from a foreign IIN agent.
     * </pre>
     */
    public void requestIdentityConfiguration(com.weaver.protos.identity.agent.Agent.SecurityDomainMemberIdentityRequest request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack> responseObserver) {
      asyncUnimplementedUnaryCall(getRequestIdentityConfigurationMethod(), responseObserver);
    }

    /**
     * <pre>
     * Handling network unit's state sent by a foreign IIN agent.
     * </pre>
     */
    public void sendIdentityConfiguration(com.weaver.protos.identity.agent.Agent.AttestedMembership request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack> responseObserver) {
      asyncUnimplementedUnaryCall(getSendIdentityConfigurationMethod(), responseObserver);
    }

    /**
     * <pre>
     * Requesting attestation from a local IIN agent.
     * </pre>
     */
    public void requestAttestation(com.weaver.protos.identity.agent.Agent.CounterAttestedMembership request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack> responseObserver) {
      asyncUnimplementedUnaryCall(getRequestAttestationMethod(), responseObserver);
    }

    /**
     * <pre>
     * Handling attestation sent by a local IIN agent.
     * </pre>
     */
    public void sendAttestation(com.weaver.protos.identity.agent.Agent.CounterAttestedMembership request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack> responseObserver) {
      asyncUnimplementedUnaryCall(getSendAttestationMethod(), responseObserver);
    }

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return io.grpc.ServerServiceDefinition.builder(getServiceDescriptor())
          .addMethod(
            getSyncExternalStateMethod(),
            asyncUnaryCall(
              new MethodHandlers<
                com.weaver.protos.identity.agent.Agent.SecurityDomainMemberIdentity,
                com.weaver.protos.common.ack.AckOuterClass.Ack>(
                  this, METHODID_SYNC_EXTERNAL_STATE)))
          .addMethod(
            getRequestIdentityConfigurationMethod(),
            asyncUnaryCall(
              new MethodHandlers<
                com.weaver.protos.identity.agent.Agent.SecurityDomainMemberIdentityRequest,
                com.weaver.protos.common.ack.AckOuterClass.Ack>(
                  this, METHODID_REQUEST_IDENTITY_CONFIGURATION)))
          .addMethod(
            getSendIdentityConfigurationMethod(),
            asyncUnaryCall(
              new MethodHandlers<
                com.weaver.protos.identity.agent.Agent.AttestedMembership,
                com.weaver.protos.common.ack.AckOuterClass.Ack>(
                  this, METHODID_SEND_IDENTITY_CONFIGURATION)))
          .addMethod(
            getRequestAttestationMethod(),
            asyncUnaryCall(
              new MethodHandlers<
                com.weaver.protos.identity.agent.Agent.CounterAttestedMembership,
                com.weaver.protos.common.ack.AckOuterClass.Ack>(
                  this, METHODID_REQUEST_ATTESTATION)))
          .addMethod(
            getSendAttestationMethod(),
            asyncUnaryCall(
              new MethodHandlers<
                com.weaver.protos.identity.agent.Agent.CounterAttestedMembership,
                com.weaver.protos.common.ack.AckOuterClass.Ack>(
                  this, METHODID_SEND_ATTESTATION)))
          .build();
    }
  }

  /**
   * <pre>
   * definitions of all messages used in the datatransfer protocol
   * </pre>
   */
  public static final class IINAgentStub extends io.grpc.stub.AbstractAsyncStub<IINAgentStub> {
    private IINAgentStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected IINAgentStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new IINAgentStub(channel, callOptions);
    }

    /**
     * <pre>
     * user or agent triggers a sync of external/foreign network unit's state
     * </pre>
     */
    public void syncExternalState(com.weaver.protos.identity.agent.Agent.SecurityDomainMemberIdentity request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack> responseObserver) {
      asyncUnaryCall(
          getChannel().newCall(getSyncExternalStateMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Requesting network unit's state from a foreign IIN agent.
     * </pre>
     */
    public void requestIdentityConfiguration(com.weaver.protos.identity.agent.Agent.SecurityDomainMemberIdentityRequest request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack> responseObserver) {
      asyncUnaryCall(
          getChannel().newCall(getRequestIdentityConfigurationMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Handling network unit's state sent by a foreign IIN agent.
     * </pre>
     */
    public void sendIdentityConfiguration(com.weaver.protos.identity.agent.Agent.AttestedMembership request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack> responseObserver) {
      asyncUnaryCall(
          getChannel().newCall(getSendIdentityConfigurationMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Requesting attestation from a local IIN agent.
     * </pre>
     */
    public void requestAttestation(com.weaver.protos.identity.agent.Agent.CounterAttestedMembership request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack> responseObserver) {
      asyncUnaryCall(
          getChannel().newCall(getRequestAttestationMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Handling attestation sent by a local IIN agent.
     * </pre>
     */
    public void sendAttestation(com.weaver.protos.identity.agent.Agent.CounterAttestedMembership request,
        io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack> responseObserver) {
      asyncUnaryCall(
          getChannel().newCall(getSendAttestationMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   * <pre>
   * definitions of all messages used in the datatransfer protocol
   * </pre>
   */
  public static final class IINAgentBlockingStub extends io.grpc.stub.AbstractBlockingStub<IINAgentBlockingStub> {
    private IINAgentBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected IINAgentBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new IINAgentBlockingStub(channel, callOptions);
    }

    /**
     * <pre>
     * user or agent triggers a sync of external/foreign network unit's state
     * </pre>
     */
    public com.weaver.protos.common.ack.AckOuterClass.Ack syncExternalState(com.weaver.protos.identity.agent.Agent.SecurityDomainMemberIdentity request) {
      return blockingUnaryCall(
          getChannel(), getSyncExternalStateMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Requesting network unit's state from a foreign IIN agent.
     * </pre>
     */
    public com.weaver.protos.common.ack.AckOuterClass.Ack requestIdentityConfiguration(com.weaver.protos.identity.agent.Agent.SecurityDomainMemberIdentityRequest request) {
      return blockingUnaryCall(
          getChannel(), getRequestIdentityConfigurationMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Handling network unit's state sent by a foreign IIN agent.
     * </pre>
     */
    public com.weaver.protos.common.ack.AckOuterClass.Ack sendIdentityConfiguration(com.weaver.protos.identity.agent.Agent.AttestedMembership request) {
      return blockingUnaryCall(
          getChannel(), getSendIdentityConfigurationMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Requesting attestation from a local IIN agent.
     * </pre>
     */
    public com.weaver.protos.common.ack.AckOuterClass.Ack requestAttestation(com.weaver.protos.identity.agent.Agent.CounterAttestedMembership request) {
      return blockingUnaryCall(
          getChannel(), getRequestAttestationMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Handling attestation sent by a local IIN agent.
     * </pre>
     */
    public com.weaver.protos.common.ack.AckOuterClass.Ack sendAttestation(com.weaver.protos.identity.agent.Agent.CounterAttestedMembership request) {
      return blockingUnaryCall(
          getChannel(), getSendAttestationMethod(), getCallOptions(), request);
    }
  }

  /**
   * <pre>
   * definitions of all messages used in the datatransfer protocol
   * </pre>
   */
  public static final class IINAgentFutureStub extends io.grpc.stub.AbstractFutureStub<IINAgentFutureStub> {
    private IINAgentFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected IINAgentFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new IINAgentFutureStub(channel, callOptions);
    }

    /**
     * <pre>
     * user or agent triggers a sync of external/foreign network unit's state
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.weaver.protos.common.ack.AckOuterClass.Ack> syncExternalState(
        com.weaver.protos.identity.agent.Agent.SecurityDomainMemberIdentity request) {
      return futureUnaryCall(
          getChannel().newCall(getSyncExternalStateMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Requesting network unit's state from a foreign IIN agent.
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.weaver.protos.common.ack.AckOuterClass.Ack> requestIdentityConfiguration(
        com.weaver.protos.identity.agent.Agent.SecurityDomainMemberIdentityRequest request) {
      return futureUnaryCall(
          getChannel().newCall(getRequestIdentityConfigurationMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Handling network unit's state sent by a foreign IIN agent.
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.weaver.protos.common.ack.AckOuterClass.Ack> sendIdentityConfiguration(
        com.weaver.protos.identity.agent.Agent.AttestedMembership request) {
      return futureUnaryCall(
          getChannel().newCall(getSendIdentityConfigurationMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Requesting attestation from a local IIN agent.
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.weaver.protos.common.ack.AckOuterClass.Ack> requestAttestation(
        com.weaver.protos.identity.agent.Agent.CounterAttestedMembership request) {
      return futureUnaryCall(
          getChannel().newCall(getRequestAttestationMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Handling attestation sent by a local IIN agent.
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.weaver.protos.common.ack.AckOuterClass.Ack> sendAttestation(
        com.weaver.protos.identity.agent.Agent.CounterAttestedMembership request) {
      return futureUnaryCall(
          getChannel().newCall(getSendAttestationMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_SYNC_EXTERNAL_STATE = 0;
  private static final int METHODID_REQUEST_IDENTITY_CONFIGURATION = 1;
  private static final int METHODID_SEND_IDENTITY_CONFIGURATION = 2;
  private static final int METHODID_REQUEST_ATTESTATION = 3;
  private static final int METHODID_SEND_ATTESTATION = 4;

  private static final class MethodHandlers<Req, Resp> implements
      io.grpc.stub.ServerCalls.UnaryMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ServerStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ClientStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.BidiStreamingMethod<Req, Resp> {
    private final IINAgentImplBase serviceImpl;
    private final int methodId;

    MethodHandlers(IINAgentImplBase serviceImpl, int methodId) {
      this.serviceImpl = serviceImpl;
      this.methodId = methodId;
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public void invoke(Req request, io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        case METHODID_SYNC_EXTERNAL_STATE:
          serviceImpl.syncExternalState((com.weaver.protos.identity.agent.Agent.SecurityDomainMemberIdentity) request,
              (io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack>) responseObserver);
          break;
        case METHODID_REQUEST_IDENTITY_CONFIGURATION:
          serviceImpl.requestIdentityConfiguration((com.weaver.protos.identity.agent.Agent.SecurityDomainMemberIdentityRequest) request,
              (io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack>) responseObserver);
          break;
        case METHODID_SEND_IDENTITY_CONFIGURATION:
          serviceImpl.sendIdentityConfiguration((com.weaver.protos.identity.agent.Agent.AttestedMembership) request,
              (io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack>) responseObserver);
          break;
        case METHODID_REQUEST_ATTESTATION:
          serviceImpl.requestAttestation((com.weaver.protos.identity.agent.Agent.CounterAttestedMembership) request,
              (io.grpc.stub.StreamObserver<com.weaver.protos.common.ack.AckOuterClass.Ack>) responseObserver);
          break;
        case METHODID_SEND_ATTESTATION:
          serviceImpl.sendAttestation((com.weaver.protos.identity.agent.Agent.CounterAttestedMembership) request,
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

  private static abstract class IINAgentBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    IINAgentBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return com.weaver.protos.identity.agent.Agent.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("IINAgent");
    }
  }

  private static final class IINAgentFileDescriptorSupplier
      extends IINAgentBaseDescriptorSupplier {
    IINAgentFileDescriptorSupplier() {}
  }

  private static final class IINAgentMethodDescriptorSupplier
      extends IINAgentBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final String methodName;

    IINAgentMethodDescriptorSupplier(String methodName) {
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
      synchronized (IINAgentGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new IINAgentFileDescriptorSupplier())
              .addMethod(getSyncExternalStateMethod())
              .addMethod(getRequestIdentityConfigurationMethod())
              .addMethod(getSendIdentityConfigurationMethod())
              .addMethod(getRequestAttestationMethod())
              .addMethod(getSendAttestationMethod())
              .build();
        }
      }
    }
    return result;
  }
}
