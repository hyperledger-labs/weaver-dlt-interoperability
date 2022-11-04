// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: driver/driver.proto

package com.weaver.protos.driver.driver;

public final class Driver {
  private Driver() {}
  public static void registerAllExtensions(
      com.google.protobuf.ExtensionRegistryLite registry) {
  }

  public static void registerAllExtensions(
      com.google.protobuf.ExtensionRegistry registry) {
    registerAllExtensions(
        (com.google.protobuf.ExtensionRegistryLite) registry);
  }
  public interface WriteExternalStateMessageOrBuilder extends
      // @@protoc_insertion_point(interface_extends:driver.driver.WriteExternalStateMessage)
      com.google.protobuf.MessageOrBuilder {

    /**
     * <code>.common.state.ViewPayload view_payload = 1;</code>
     * @return Whether the viewPayload field is set.
     */
    boolean hasViewPayload();
    /**
     * <code>.common.state.ViewPayload view_payload = 1;</code>
     * @return The viewPayload.
     */
    com.weaver.protos.common.state.State.ViewPayload getViewPayload();
    /**
     * <code>.common.state.ViewPayload view_payload = 1;</code>
     */
    com.weaver.protos.common.state.State.ViewPayloadOrBuilder getViewPayloadOrBuilder();

    /**
     * <code>.common.events.ContractTransaction ctx = 2;</code>
     * @return Whether the ctx field is set.
     */
    boolean hasCtx();
    /**
     * <code>.common.events.ContractTransaction ctx = 2;</code>
     * @return The ctx.
     */
    com.weaver.protos.common.events.Events.ContractTransaction getCtx();
    /**
     * <code>.common.events.ContractTransaction ctx = 2;</code>
     */
    com.weaver.protos.common.events.Events.ContractTransactionOrBuilder getCtxOrBuilder();
  }
  /**
   * <pre>
   * Data for a View processing by dest-driver
   * </pre>
   *
   * Protobuf type {@code driver.driver.WriteExternalStateMessage}
   */
  public  static final class WriteExternalStateMessage extends
      com.google.protobuf.GeneratedMessageV3 implements
      // @@protoc_insertion_point(message_implements:driver.driver.WriteExternalStateMessage)
      WriteExternalStateMessageOrBuilder {
  private static final long serialVersionUID = 0L;
    // Use WriteExternalStateMessage.newBuilder() to construct.
    private WriteExternalStateMessage(com.google.protobuf.GeneratedMessageV3.Builder<?> builder) {
      super(builder);
    }
    private WriteExternalStateMessage() {
    }

    @java.lang.Override
    @SuppressWarnings({"unused"})
    protected java.lang.Object newInstance(
        UnusedPrivateParameter unused) {
      return new WriteExternalStateMessage();
    }

    @java.lang.Override
    public final com.google.protobuf.UnknownFieldSet
    getUnknownFields() {
      return this.unknownFields;
    }
    private WriteExternalStateMessage(
        com.google.protobuf.CodedInputStream input,
        com.google.protobuf.ExtensionRegistryLite extensionRegistry)
        throws com.google.protobuf.InvalidProtocolBufferException {
      this();
      if (extensionRegistry == null) {
        throw new java.lang.NullPointerException();
      }
      com.google.protobuf.UnknownFieldSet.Builder unknownFields =
          com.google.protobuf.UnknownFieldSet.newBuilder();
      try {
        boolean done = false;
        while (!done) {
          int tag = input.readTag();
          switch (tag) {
            case 0:
              done = true;
              break;
            case 10: {
              com.weaver.protos.common.state.State.ViewPayload.Builder subBuilder = null;
              if (viewPayload_ != null) {
                subBuilder = viewPayload_.toBuilder();
              }
              viewPayload_ = input.readMessage(com.weaver.protos.common.state.State.ViewPayload.parser(), extensionRegistry);
              if (subBuilder != null) {
                subBuilder.mergeFrom(viewPayload_);
                viewPayload_ = subBuilder.buildPartial();
              }

              break;
            }
            case 18: {
              com.weaver.protos.common.events.Events.ContractTransaction.Builder subBuilder = null;
              if (ctx_ != null) {
                subBuilder = ctx_.toBuilder();
              }
              ctx_ = input.readMessage(com.weaver.protos.common.events.Events.ContractTransaction.parser(), extensionRegistry);
              if (subBuilder != null) {
                subBuilder.mergeFrom(ctx_);
                ctx_ = subBuilder.buildPartial();
              }

              break;
            }
            default: {
              if (!parseUnknownField(
                  input, unknownFields, extensionRegistry, tag)) {
                done = true;
              }
              break;
            }
          }
        }
      } catch (com.google.protobuf.InvalidProtocolBufferException e) {
        throw e.setUnfinishedMessage(this);
      } catch (java.io.IOException e) {
        throw new com.google.protobuf.InvalidProtocolBufferException(
            e).setUnfinishedMessage(this);
      } finally {
        this.unknownFields = unknownFields.build();
        makeExtensionsImmutable();
      }
    }
    public static final com.google.protobuf.Descriptors.Descriptor
        getDescriptor() {
      return com.weaver.protos.driver.driver.Driver.internal_static_driver_driver_WriteExternalStateMessage_descriptor;
    }

    @java.lang.Override
    protected com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
        internalGetFieldAccessorTable() {
      return com.weaver.protos.driver.driver.Driver.internal_static_driver_driver_WriteExternalStateMessage_fieldAccessorTable
          .ensureFieldAccessorsInitialized(
              com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage.class, com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage.Builder.class);
    }

    public static final int VIEW_PAYLOAD_FIELD_NUMBER = 1;
    private com.weaver.protos.common.state.State.ViewPayload viewPayload_;
    /**
     * <code>.common.state.ViewPayload view_payload = 1;</code>
     * @return Whether the viewPayload field is set.
     */
    public boolean hasViewPayload() {
      return viewPayload_ != null;
    }
    /**
     * <code>.common.state.ViewPayload view_payload = 1;</code>
     * @return The viewPayload.
     */
    public com.weaver.protos.common.state.State.ViewPayload getViewPayload() {
      return viewPayload_ == null ? com.weaver.protos.common.state.State.ViewPayload.getDefaultInstance() : viewPayload_;
    }
    /**
     * <code>.common.state.ViewPayload view_payload = 1;</code>
     */
    public com.weaver.protos.common.state.State.ViewPayloadOrBuilder getViewPayloadOrBuilder() {
      return getViewPayload();
    }

    public static final int CTX_FIELD_NUMBER = 2;
    private com.weaver.protos.common.events.Events.ContractTransaction ctx_;
    /**
     * <code>.common.events.ContractTransaction ctx = 2;</code>
     * @return Whether the ctx field is set.
     */
    public boolean hasCtx() {
      return ctx_ != null;
    }
    /**
     * <code>.common.events.ContractTransaction ctx = 2;</code>
     * @return The ctx.
     */
    public com.weaver.protos.common.events.Events.ContractTransaction getCtx() {
      return ctx_ == null ? com.weaver.protos.common.events.Events.ContractTransaction.getDefaultInstance() : ctx_;
    }
    /**
     * <code>.common.events.ContractTransaction ctx = 2;</code>
     */
    public com.weaver.protos.common.events.Events.ContractTransactionOrBuilder getCtxOrBuilder() {
      return getCtx();
    }

    private byte memoizedIsInitialized = -1;
    @java.lang.Override
    public final boolean isInitialized() {
      byte isInitialized = memoizedIsInitialized;
      if (isInitialized == 1) return true;
      if (isInitialized == 0) return false;

      memoizedIsInitialized = 1;
      return true;
    }

    @java.lang.Override
    public void writeTo(com.google.protobuf.CodedOutputStream output)
                        throws java.io.IOException {
      if (viewPayload_ != null) {
        output.writeMessage(1, getViewPayload());
      }
      if (ctx_ != null) {
        output.writeMessage(2, getCtx());
      }
      unknownFields.writeTo(output);
    }

    @java.lang.Override
    public int getSerializedSize() {
      int size = memoizedSize;
      if (size != -1) return size;

      size = 0;
      if (viewPayload_ != null) {
        size += com.google.protobuf.CodedOutputStream
          .computeMessageSize(1, getViewPayload());
      }
      if (ctx_ != null) {
        size += com.google.protobuf.CodedOutputStream
          .computeMessageSize(2, getCtx());
      }
      size += unknownFields.getSerializedSize();
      memoizedSize = size;
      return size;
    }

    @java.lang.Override
    public boolean equals(final java.lang.Object obj) {
      if (obj == this) {
       return true;
      }
      if (!(obj instanceof com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage)) {
        return super.equals(obj);
      }
      com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage other = (com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage) obj;

      if (hasViewPayload() != other.hasViewPayload()) return false;
      if (hasViewPayload()) {
        if (!getViewPayload()
            .equals(other.getViewPayload())) return false;
      }
      if (hasCtx() != other.hasCtx()) return false;
      if (hasCtx()) {
        if (!getCtx()
            .equals(other.getCtx())) return false;
      }
      if (!unknownFields.equals(other.unknownFields)) return false;
      return true;
    }

    @java.lang.Override
    public int hashCode() {
      if (memoizedHashCode != 0) {
        return memoizedHashCode;
      }
      int hash = 41;
      hash = (19 * hash) + getDescriptor().hashCode();
      if (hasViewPayload()) {
        hash = (37 * hash) + VIEW_PAYLOAD_FIELD_NUMBER;
        hash = (53 * hash) + getViewPayload().hashCode();
      }
      if (hasCtx()) {
        hash = (37 * hash) + CTX_FIELD_NUMBER;
        hash = (53 * hash) + getCtx().hashCode();
      }
      hash = (29 * hash) + unknownFields.hashCode();
      memoizedHashCode = hash;
      return hash;
    }

    public static com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage parseFrom(
        java.nio.ByteBuffer data)
        throws com.google.protobuf.InvalidProtocolBufferException {
      return PARSER.parseFrom(data);
    }
    public static com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage parseFrom(
        java.nio.ByteBuffer data,
        com.google.protobuf.ExtensionRegistryLite extensionRegistry)
        throws com.google.protobuf.InvalidProtocolBufferException {
      return PARSER.parseFrom(data, extensionRegistry);
    }
    public static com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage parseFrom(
        com.google.protobuf.ByteString data)
        throws com.google.protobuf.InvalidProtocolBufferException {
      return PARSER.parseFrom(data);
    }
    public static com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage parseFrom(
        com.google.protobuf.ByteString data,
        com.google.protobuf.ExtensionRegistryLite extensionRegistry)
        throws com.google.protobuf.InvalidProtocolBufferException {
      return PARSER.parseFrom(data, extensionRegistry);
    }
    public static com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage parseFrom(byte[] data)
        throws com.google.protobuf.InvalidProtocolBufferException {
      return PARSER.parseFrom(data);
    }
    public static com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage parseFrom(
        byte[] data,
        com.google.protobuf.ExtensionRegistryLite extensionRegistry)
        throws com.google.protobuf.InvalidProtocolBufferException {
      return PARSER.parseFrom(data, extensionRegistry);
    }
    public static com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage parseFrom(java.io.InputStream input)
        throws java.io.IOException {
      return com.google.protobuf.GeneratedMessageV3
          .parseWithIOException(PARSER, input);
    }
    public static com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage parseFrom(
        java.io.InputStream input,
        com.google.protobuf.ExtensionRegistryLite extensionRegistry)
        throws java.io.IOException {
      return com.google.protobuf.GeneratedMessageV3
          .parseWithIOException(PARSER, input, extensionRegistry);
    }
    public static com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage parseDelimitedFrom(java.io.InputStream input)
        throws java.io.IOException {
      return com.google.protobuf.GeneratedMessageV3
          .parseDelimitedWithIOException(PARSER, input);
    }
    public static com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage parseDelimitedFrom(
        java.io.InputStream input,
        com.google.protobuf.ExtensionRegistryLite extensionRegistry)
        throws java.io.IOException {
      return com.google.protobuf.GeneratedMessageV3
          .parseDelimitedWithIOException(PARSER, input, extensionRegistry);
    }
    public static com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage parseFrom(
        com.google.protobuf.CodedInputStream input)
        throws java.io.IOException {
      return com.google.protobuf.GeneratedMessageV3
          .parseWithIOException(PARSER, input);
    }
    public static com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage parseFrom(
        com.google.protobuf.CodedInputStream input,
        com.google.protobuf.ExtensionRegistryLite extensionRegistry)
        throws java.io.IOException {
      return com.google.protobuf.GeneratedMessageV3
          .parseWithIOException(PARSER, input, extensionRegistry);
    }

    @java.lang.Override
    public Builder newBuilderForType() { return newBuilder(); }
    public static Builder newBuilder() {
      return DEFAULT_INSTANCE.toBuilder();
    }
    public static Builder newBuilder(com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage prototype) {
      return DEFAULT_INSTANCE.toBuilder().mergeFrom(prototype);
    }
    @java.lang.Override
    public Builder toBuilder() {
      return this == DEFAULT_INSTANCE
          ? new Builder() : new Builder().mergeFrom(this);
    }

    @java.lang.Override
    protected Builder newBuilderForType(
        com.google.protobuf.GeneratedMessageV3.BuilderParent parent) {
      Builder builder = new Builder(parent);
      return builder;
    }
    /**
     * <pre>
     * Data for a View processing by dest-driver
     * </pre>
     *
     * Protobuf type {@code driver.driver.WriteExternalStateMessage}
     */
    public static final class Builder extends
        com.google.protobuf.GeneratedMessageV3.Builder<Builder> implements
        // @@protoc_insertion_point(builder_implements:driver.driver.WriteExternalStateMessage)
        com.weaver.protos.driver.driver.Driver.WriteExternalStateMessageOrBuilder {
      public static final com.google.protobuf.Descriptors.Descriptor
          getDescriptor() {
        return com.weaver.protos.driver.driver.Driver.internal_static_driver_driver_WriteExternalStateMessage_descriptor;
      }

      @java.lang.Override
      protected com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
          internalGetFieldAccessorTable() {
        return com.weaver.protos.driver.driver.Driver.internal_static_driver_driver_WriteExternalStateMessage_fieldAccessorTable
            .ensureFieldAccessorsInitialized(
                com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage.class, com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage.Builder.class);
      }

      // Construct using com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage.newBuilder()
      private Builder() {
        maybeForceBuilderInitialization();
      }

      private Builder(
          com.google.protobuf.GeneratedMessageV3.BuilderParent parent) {
        super(parent);
        maybeForceBuilderInitialization();
      }
      private void maybeForceBuilderInitialization() {
        if (com.google.protobuf.GeneratedMessageV3
                .alwaysUseFieldBuilders) {
        }
      }
      @java.lang.Override
      public Builder clear() {
        super.clear();
        if (viewPayloadBuilder_ == null) {
          viewPayload_ = null;
        } else {
          viewPayload_ = null;
          viewPayloadBuilder_ = null;
        }
        if (ctxBuilder_ == null) {
          ctx_ = null;
        } else {
          ctx_ = null;
          ctxBuilder_ = null;
        }
        return this;
      }

      @java.lang.Override
      public com.google.protobuf.Descriptors.Descriptor
          getDescriptorForType() {
        return com.weaver.protos.driver.driver.Driver.internal_static_driver_driver_WriteExternalStateMessage_descriptor;
      }

      @java.lang.Override
      public com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage getDefaultInstanceForType() {
        return com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage.getDefaultInstance();
      }

      @java.lang.Override
      public com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage build() {
        com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage result = buildPartial();
        if (!result.isInitialized()) {
          throw newUninitializedMessageException(result);
        }
        return result;
      }

      @java.lang.Override
      public com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage buildPartial() {
        com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage result = new com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage(this);
        if (viewPayloadBuilder_ == null) {
          result.viewPayload_ = viewPayload_;
        } else {
          result.viewPayload_ = viewPayloadBuilder_.build();
        }
        if (ctxBuilder_ == null) {
          result.ctx_ = ctx_;
        } else {
          result.ctx_ = ctxBuilder_.build();
        }
        onBuilt();
        return result;
      }

      @java.lang.Override
      public Builder clone() {
        return super.clone();
      }
      @java.lang.Override
      public Builder setField(
          com.google.protobuf.Descriptors.FieldDescriptor field,
          java.lang.Object value) {
        return super.setField(field, value);
      }
      @java.lang.Override
      public Builder clearField(
          com.google.protobuf.Descriptors.FieldDescriptor field) {
        return super.clearField(field);
      }
      @java.lang.Override
      public Builder clearOneof(
          com.google.protobuf.Descriptors.OneofDescriptor oneof) {
        return super.clearOneof(oneof);
      }
      @java.lang.Override
      public Builder setRepeatedField(
          com.google.protobuf.Descriptors.FieldDescriptor field,
          int index, java.lang.Object value) {
        return super.setRepeatedField(field, index, value);
      }
      @java.lang.Override
      public Builder addRepeatedField(
          com.google.protobuf.Descriptors.FieldDescriptor field,
          java.lang.Object value) {
        return super.addRepeatedField(field, value);
      }
      @java.lang.Override
      public Builder mergeFrom(com.google.protobuf.Message other) {
        if (other instanceof com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage) {
          return mergeFrom((com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage)other);
        } else {
          super.mergeFrom(other);
          return this;
        }
      }

      public Builder mergeFrom(com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage other) {
        if (other == com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage.getDefaultInstance()) return this;
        if (other.hasViewPayload()) {
          mergeViewPayload(other.getViewPayload());
        }
        if (other.hasCtx()) {
          mergeCtx(other.getCtx());
        }
        this.mergeUnknownFields(other.unknownFields);
        onChanged();
        return this;
      }

      @java.lang.Override
      public final boolean isInitialized() {
        return true;
      }

      @java.lang.Override
      public Builder mergeFrom(
          com.google.protobuf.CodedInputStream input,
          com.google.protobuf.ExtensionRegistryLite extensionRegistry)
          throws java.io.IOException {
        com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage parsedMessage = null;
        try {
          parsedMessage = PARSER.parsePartialFrom(input, extensionRegistry);
        } catch (com.google.protobuf.InvalidProtocolBufferException e) {
          parsedMessage = (com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage) e.getUnfinishedMessage();
          throw e.unwrapIOException();
        } finally {
          if (parsedMessage != null) {
            mergeFrom(parsedMessage);
          }
        }
        return this;
      }

      private com.weaver.protos.common.state.State.ViewPayload viewPayload_;
      private com.google.protobuf.SingleFieldBuilderV3<
          com.weaver.protos.common.state.State.ViewPayload, com.weaver.protos.common.state.State.ViewPayload.Builder, com.weaver.protos.common.state.State.ViewPayloadOrBuilder> viewPayloadBuilder_;
      /**
       * <code>.common.state.ViewPayload view_payload = 1;</code>
       * @return Whether the viewPayload field is set.
       */
      public boolean hasViewPayload() {
        return viewPayloadBuilder_ != null || viewPayload_ != null;
      }
      /**
       * <code>.common.state.ViewPayload view_payload = 1;</code>
       * @return The viewPayload.
       */
      public com.weaver.protos.common.state.State.ViewPayload getViewPayload() {
        if (viewPayloadBuilder_ == null) {
          return viewPayload_ == null ? com.weaver.protos.common.state.State.ViewPayload.getDefaultInstance() : viewPayload_;
        } else {
          return viewPayloadBuilder_.getMessage();
        }
      }
      /**
       * <code>.common.state.ViewPayload view_payload = 1;</code>
       */
      public Builder setViewPayload(com.weaver.protos.common.state.State.ViewPayload value) {
        if (viewPayloadBuilder_ == null) {
          if (value == null) {
            throw new NullPointerException();
          }
          viewPayload_ = value;
          onChanged();
        } else {
          viewPayloadBuilder_.setMessage(value);
        }

        return this;
      }
      /**
       * <code>.common.state.ViewPayload view_payload = 1;</code>
       */
      public Builder setViewPayload(
          com.weaver.protos.common.state.State.ViewPayload.Builder builderForValue) {
        if (viewPayloadBuilder_ == null) {
          viewPayload_ = builderForValue.build();
          onChanged();
        } else {
          viewPayloadBuilder_.setMessage(builderForValue.build());
        }

        return this;
      }
      /**
       * <code>.common.state.ViewPayload view_payload = 1;</code>
       */
      public Builder mergeViewPayload(com.weaver.protos.common.state.State.ViewPayload value) {
        if (viewPayloadBuilder_ == null) {
          if (viewPayload_ != null) {
            viewPayload_ =
              com.weaver.protos.common.state.State.ViewPayload.newBuilder(viewPayload_).mergeFrom(value).buildPartial();
          } else {
            viewPayload_ = value;
          }
          onChanged();
        } else {
          viewPayloadBuilder_.mergeFrom(value);
        }

        return this;
      }
      /**
       * <code>.common.state.ViewPayload view_payload = 1;</code>
       */
      public Builder clearViewPayload() {
        if (viewPayloadBuilder_ == null) {
          viewPayload_ = null;
          onChanged();
        } else {
          viewPayload_ = null;
          viewPayloadBuilder_ = null;
        }

        return this;
      }
      /**
       * <code>.common.state.ViewPayload view_payload = 1;</code>
       */
      public com.weaver.protos.common.state.State.ViewPayload.Builder getViewPayloadBuilder() {
        
        onChanged();
        return getViewPayloadFieldBuilder().getBuilder();
      }
      /**
       * <code>.common.state.ViewPayload view_payload = 1;</code>
       */
      public com.weaver.protos.common.state.State.ViewPayloadOrBuilder getViewPayloadOrBuilder() {
        if (viewPayloadBuilder_ != null) {
          return viewPayloadBuilder_.getMessageOrBuilder();
        } else {
          return viewPayload_ == null ?
              com.weaver.protos.common.state.State.ViewPayload.getDefaultInstance() : viewPayload_;
        }
      }
      /**
       * <code>.common.state.ViewPayload view_payload = 1;</code>
       */
      private com.google.protobuf.SingleFieldBuilderV3<
          com.weaver.protos.common.state.State.ViewPayload, com.weaver.protos.common.state.State.ViewPayload.Builder, com.weaver.protos.common.state.State.ViewPayloadOrBuilder> 
          getViewPayloadFieldBuilder() {
        if (viewPayloadBuilder_ == null) {
          viewPayloadBuilder_ = new com.google.protobuf.SingleFieldBuilderV3<
              com.weaver.protos.common.state.State.ViewPayload, com.weaver.protos.common.state.State.ViewPayload.Builder, com.weaver.protos.common.state.State.ViewPayloadOrBuilder>(
                  getViewPayload(),
                  getParentForChildren(),
                  isClean());
          viewPayload_ = null;
        }
        return viewPayloadBuilder_;
      }

      private com.weaver.protos.common.events.Events.ContractTransaction ctx_;
      private com.google.protobuf.SingleFieldBuilderV3<
          com.weaver.protos.common.events.Events.ContractTransaction, com.weaver.protos.common.events.Events.ContractTransaction.Builder, com.weaver.protos.common.events.Events.ContractTransactionOrBuilder> ctxBuilder_;
      /**
       * <code>.common.events.ContractTransaction ctx = 2;</code>
       * @return Whether the ctx field is set.
       */
      public boolean hasCtx() {
        return ctxBuilder_ != null || ctx_ != null;
      }
      /**
       * <code>.common.events.ContractTransaction ctx = 2;</code>
       * @return The ctx.
       */
      public com.weaver.protos.common.events.Events.ContractTransaction getCtx() {
        if (ctxBuilder_ == null) {
          return ctx_ == null ? com.weaver.protos.common.events.Events.ContractTransaction.getDefaultInstance() : ctx_;
        } else {
          return ctxBuilder_.getMessage();
        }
      }
      /**
       * <code>.common.events.ContractTransaction ctx = 2;</code>
       */
      public Builder setCtx(com.weaver.protos.common.events.Events.ContractTransaction value) {
        if (ctxBuilder_ == null) {
          if (value == null) {
            throw new NullPointerException();
          }
          ctx_ = value;
          onChanged();
        } else {
          ctxBuilder_.setMessage(value);
        }

        return this;
      }
      /**
       * <code>.common.events.ContractTransaction ctx = 2;</code>
       */
      public Builder setCtx(
          com.weaver.protos.common.events.Events.ContractTransaction.Builder builderForValue) {
        if (ctxBuilder_ == null) {
          ctx_ = builderForValue.build();
          onChanged();
        } else {
          ctxBuilder_.setMessage(builderForValue.build());
        }

        return this;
      }
      /**
       * <code>.common.events.ContractTransaction ctx = 2;</code>
       */
      public Builder mergeCtx(com.weaver.protos.common.events.Events.ContractTransaction value) {
        if (ctxBuilder_ == null) {
          if (ctx_ != null) {
            ctx_ =
              com.weaver.protos.common.events.Events.ContractTransaction.newBuilder(ctx_).mergeFrom(value).buildPartial();
          } else {
            ctx_ = value;
          }
          onChanged();
        } else {
          ctxBuilder_.mergeFrom(value);
        }

        return this;
      }
      /**
       * <code>.common.events.ContractTransaction ctx = 2;</code>
       */
      public Builder clearCtx() {
        if (ctxBuilder_ == null) {
          ctx_ = null;
          onChanged();
        } else {
          ctx_ = null;
          ctxBuilder_ = null;
        }

        return this;
      }
      /**
       * <code>.common.events.ContractTransaction ctx = 2;</code>
       */
      public com.weaver.protos.common.events.Events.ContractTransaction.Builder getCtxBuilder() {
        
        onChanged();
        return getCtxFieldBuilder().getBuilder();
      }
      /**
       * <code>.common.events.ContractTransaction ctx = 2;</code>
       */
      public com.weaver.protos.common.events.Events.ContractTransactionOrBuilder getCtxOrBuilder() {
        if (ctxBuilder_ != null) {
          return ctxBuilder_.getMessageOrBuilder();
        } else {
          return ctx_ == null ?
              com.weaver.protos.common.events.Events.ContractTransaction.getDefaultInstance() : ctx_;
        }
      }
      /**
       * <code>.common.events.ContractTransaction ctx = 2;</code>
       */
      private com.google.protobuf.SingleFieldBuilderV3<
          com.weaver.protos.common.events.Events.ContractTransaction, com.weaver.protos.common.events.Events.ContractTransaction.Builder, com.weaver.protos.common.events.Events.ContractTransactionOrBuilder> 
          getCtxFieldBuilder() {
        if (ctxBuilder_ == null) {
          ctxBuilder_ = new com.google.protobuf.SingleFieldBuilderV3<
              com.weaver.protos.common.events.Events.ContractTransaction, com.weaver.protos.common.events.Events.ContractTransaction.Builder, com.weaver.protos.common.events.Events.ContractTransactionOrBuilder>(
                  getCtx(),
                  getParentForChildren(),
                  isClean());
          ctx_ = null;
        }
        return ctxBuilder_;
      }
      @java.lang.Override
      public final Builder setUnknownFields(
          final com.google.protobuf.UnknownFieldSet unknownFields) {
        return super.setUnknownFields(unknownFields);
      }

      @java.lang.Override
      public final Builder mergeUnknownFields(
          final com.google.protobuf.UnknownFieldSet unknownFields) {
        return super.mergeUnknownFields(unknownFields);
      }


      // @@protoc_insertion_point(builder_scope:driver.driver.WriteExternalStateMessage)
    }

    // @@protoc_insertion_point(class_scope:driver.driver.WriteExternalStateMessage)
    private static final com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage DEFAULT_INSTANCE;
    static {
      DEFAULT_INSTANCE = new com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage();
    }

    public static com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage getDefaultInstance() {
      return DEFAULT_INSTANCE;
    }

    private static final com.google.protobuf.Parser<WriteExternalStateMessage>
        PARSER = new com.google.protobuf.AbstractParser<WriteExternalStateMessage>() {
      @java.lang.Override
      public WriteExternalStateMessage parsePartialFrom(
          com.google.protobuf.CodedInputStream input,
          com.google.protobuf.ExtensionRegistryLite extensionRegistry)
          throws com.google.protobuf.InvalidProtocolBufferException {
        return new WriteExternalStateMessage(input, extensionRegistry);
      }
    };

    public static com.google.protobuf.Parser<WriteExternalStateMessage> parser() {
      return PARSER;
    }

    @java.lang.Override
    public com.google.protobuf.Parser<WriteExternalStateMessage> getParserForType() {
      return PARSER;
    }

    @java.lang.Override
    public com.weaver.protos.driver.driver.Driver.WriteExternalStateMessage getDefaultInstanceForType() {
      return DEFAULT_INSTANCE;
    }

  }

  private static final com.google.protobuf.Descriptors.Descriptor
    internal_static_driver_driver_WriteExternalStateMessage_descriptor;
  private static final 
    com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
      internal_static_driver_driver_WriteExternalStateMessage_fieldAccessorTable;

  public static com.google.protobuf.Descriptors.FileDescriptor
      getDescriptor() {
    return descriptor;
  }
  private static  com.google.protobuf.Descriptors.FileDescriptor
      descriptor;
  static {
    java.lang.String[] descriptorData = {
      "\n\023driver/driver.proto\022\rdriver.driver\032\020co" +
      "mmon/ack.proto\032\022common/query.proto\032\023comm" +
      "on/events.proto\032\022common/state.proto\"}\n\031W" +
      "riteExternalStateMessage\022/\n\014view_payload" +
      "\030\001 \001(\0132\031.common.state.ViewPayload\022/\n\003ctx" +
      "\030\002 \001(\0132\".common.events.ContractTransacti" +
      "on2\315\002\n\023DriverCommunication\022<\n\022RequestDri" +
      "verState\022\023.common.query.Query\032\017.common.a" +
      "ck.Ack\"\000\022E\n\016SubscribeEvent\022 .common.even" +
      "ts.EventSubscription\032\017.common.ack.Ack\"\000\022" +
      "^\n#RequestSignedEventSubscriptionQuery\022 " +
      ".common.events.EventSubscription\032\023.commo" +
      "n.query.Query\"\000\022Q\n\022WriteExternalState\022(." +
      "driver.driver.WriteExternalStateMessage\032" +
      "\017.common.ack.Ack\"\000Br\n\037com.weaver.protos." +
      "driver.driverZOgithub.com/hyperledger-la" +
      "bs/weaver-dlt-interoperability/common/pr" +
      "otos-go/driverb\006proto3"
    };
    descriptor = com.google.protobuf.Descriptors.FileDescriptor
      .internalBuildGeneratedFileFrom(descriptorData,
        new com.google.protobuf.Descriptors.FileDescriptor[] {
          com.weaver.protos.common.ack.AckOuterClass.getDescriptor(),
          com.weaver.protos.common.query.QueryOuterClass.getDescriptor(),
          com.weaver.protos.common.events.Events.getDescriptor(),
          com.weaver.protos.common.state.State.getDescriptor(),
        });
    internal_static_driver_driver_WriteExternalStateMessage_descriptor =
      getDescriptor().getMessageTypes().get(0);
    internal_static_driver_driver_WriteExternalStateMessage_fieldAccessorTable = new
      com.google.protobuf.GeneratedMessageV3.FieldAccessorTable(
        internal_static_driver_driver_WriteExternalStateMessage_descriptor,
        new java.lang.String[] { "ViewPayload", "Ctx", });
    com.weaver.protos.common.ack.AckOuterClass.getDescriptor();
    com.weaver.protos.common.query.QueryOuterClass.getDescriptor();
    com.weaver.protos.common.events.Events.getDescriptor();
    com.weaver.protos.common.state.State.getDescriptor();
  }

  // @@protoc_insertion_point(outer_class_scope)
}
