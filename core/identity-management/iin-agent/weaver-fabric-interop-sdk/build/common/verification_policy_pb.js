// source: common/verification_policy.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.common.verification_policy.Identifier', null, global);
goog.exportSymbol('proto.common.verification_policy.Policy', null, global);
goog.exportSymbol('proto.common.verification_policy.VerificationPolicy', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.common.verification_policy.VerificationPolicy = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.common.verification_policy.VerificationPolicy.repeatedFields_, null);
};
goog.inherits(proto.common.verification_policy.VerificationPolicy, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.common.verification_policy.VerificationPolicy.displayName = 'proto.common.verification_policy.VerificationPolicy';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.common.verification_policy.Policy = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.common.verification_policy.Policy.repeatedFields_, null);
};
goog.inherits(proto.common.verification_policy.Policy, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.common.verification_policy.Policy.displayName = 'proto.common.verification_policy.Policy';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.common.verification_policy.Identifier = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.common.verification_policy.Identifier, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.common.verification_policy.Identifier.displayName = 'proto.common.verification_policy.Identifier';
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.common.verification_policy.VerificationPolicy.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.common.verification_policy.VerificationPolicy.prototype.toObject = function(opt_includeInstance) {
  return proto.common.verification_policy.VerificationPolicy.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.common.verification_policy.VerificationPolicy} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.common.verification_policy.VerificationPolicy.toObject = function(includeInstance, msg) {
  var f, obj = {
    securitydomain: jspb.Message.getFieldWithDefault(msg, 1, ""),
    identifiersList: jspb.Message.toObjectList(msg.getIdentifiersList(),
    proto.common.verification_policy.Identifier.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.common.verification_policy.VerificationPolicy}
 */
proto.common.verification_policy.VerificationPolicy.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.common.verification_policy.VerificationPolicy;
  return proto.common.verification_policy.VerificationPolicy.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.common.verification_policy.VerificationPolicy} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.common.verification_policy.VerificationPolicy}
 */
proto.common.verification_policy.VerificationPolicy.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setSecuritydomain(value);
      break;
    case 2:
      var value = new proto.common.verification_policy.Identifier;
      reader.readMessage(value,proto.common.verification_policy.Identifier.deserializeBinaryFromReader);
      msg.addIdentifiers(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.common.verification_policy.VerificationPolicy.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.common.verification_policy.VerificationPolicy.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.common.verification_policy.VerificationPolicy} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.common.verification_policy.VerificationPolicy.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSecuritydomain();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getIdentifiersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.common.verification_policy.Identifier.serializeBinaryToWriter
    );
  }
};


/**
 * optional string securityDomain = 1;
 * @return {string}
 */
proto.common.verification_policy.VerificationPolicy.prototype.getSecuritydomain = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.common.verification_policy.VerificationPolicy} returns this
 */
proto.common.verification_policy.VerificationPolicy.prototype.setSecuritydomain = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated Identifier identifiers = 2;
 * @return {!Array<!proto.common.verification_policy.Identifier>}
 */
proto.common.verification_policy.VerificationPolicy.prototype.getIdentifiersList = function() {
  return /** @type{!Array<!proto.common.verification_policy.Identifier>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.common.verification_policy.Identifier, 2));
};


/**
 * @param {!Array<!proto.common.verification_policy.Identifier>} value
 * @return {!proto.common.verification_policy.VerificationPolicy} returns this
*/
proto.common.verification_policy.VerificationPolicy.prototype.setIdentifiersList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.common.verification_policy.Identifier=} opt_value
 * @param {number=} opt_index
 * @return {!proto.common.verification_policy.Identifier}
 */
proto.common.verification_policy.VerificationPolicy.prototype.addIdentifiers = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.common.verification_policy.Identifier, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.common.verification_policy.VerificationPolicy} returns this
 */
proto.common.verification_policy.VerificationPolicy.prototype.clearIdentifiersList = function() {
  return this.setIdentifiersList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.common.verification_policy.Policy.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.common.verification_policy.Policy.prototype.toObject = function(opt_includeInstance) {
  return proto.common.verification_policy.Policy.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.common.verification_policy.Policy} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.common.verification_policy.Policy.toObject = function(includeInstance, msg) {
  var f, obj = {
    type: jspb.Message.getFieldWithDefault(msg, 1, ""),
    criteriaList: (f = jspb.Message.getRepeatedField(msg, 2)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.common.verification_policy.Policy}
 */
proto.common.verification_policy.Policy.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.common.verification_policy.Policy;
  return proto.common.verification_policy.Policy.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.common.verification_policy.Policy} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.common.verification_policy.Policy}
 */
proto.common.verification_policy.Policy.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setType(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.addCriteria(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.common.verification_policy.Policy.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.common.verification_policy.Policy.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.common.verification_policy.Policy} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.common.verification_policy.Policy.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getType();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getCriteriaList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      2,
      f
    );
  }
};


/**
 * optional string type = 1;
 * @return {string}
 */
proto.common.verification_policy.Policy.prototype.getType = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.common.verification_policy.Policy} returns this
 */
proto.common.verification_policy.Policy.prototype.setType = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated string criteria = 2;
 * @return {!Array<string>}
 */
proto.common.verification_policy.Policy.prototype.getCriteriaList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.common.verification_policy.Policy} returns this
 */
proto.common.verification_policy.Policy.prototype.setCriteriaList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.common.verification_policy.Policy} returns this
 */
proto.common.verification_policy.Policy.prototype.addCriteria = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.common.verification_policy.Policy} returns this
 */
proto.common.verification_policy.Policy.prototype.clearCriteriaList = function() {
  return this.setCriteriaList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.common.verification_policy.Identifier.prototype.toObject = function(opt_includeInstance) {
  return proto.common.verification_policy.Identifier.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.common.verification_policy.Identifier} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.common.verification_policy.Identifier.toObject = function(includeInstance, msg) {
  var f, obj = {
    pattern: jspb.Message.getFieldWithDefault(msg, 1, ""),
    policy: (f = msg.getPolicy()) && proto.common.verification_policy.Policy.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.common.verification_policy.Identifier}
 */
proto.common.verification_policy.Identifier.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.common.verification_policy.Identifier;
  return proto.common.verification_policy.Identifier.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.common.verification_policy.Identifier} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.common.verification_policy.Identifier}
 */
proto.common.verification_policy.Identifier.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setPattern(value);
      break;
    case 2:
      var value = new proto.common.verification_policy.Policy;
      reader.readMessage(value,proto.common.verification_policy.Policy.deserializeBinaryFromReader);
      msg.setPolicy(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.common.verification_policy.Identifier.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.common.verification_policy.Identifier.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.common.verification_policy.Identifier} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.common.verification_policy.Identifier.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPattern();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getPolicy();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.common.verification_policy.Policy.serializeBinaryToWriter
    );
  }
};


/**
 * optional string pattern = 1;
 * @return {string}
 */
proto.common.verification_policy.Identifier.prototype.getPattern = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.common.verification_policy.Identifier} returns this
 */
proto.common.verification_policy.Identifier.prototype.setPattern = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional Policy policy = 2;
 * @return {?proto.common.verification_policy.Policy}
 */
proto.common.verification_policy.Identifier.prototype.getPolicy = function() {
  return /** @type{?proto.common.verification_policy.Policy} */ (
    jspb.Message.getWrapperField(this, proto.common.verification_policy.Policy, 2));
};


/**
 * @param {?proto.common.verification_policy.Policy|undefined} value
 * @return {!proto.common.verification_policy.Identifier} returns this
*/
proto.common.verification_policy.Identifier.prototype.setPolicy = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.common.verification_policy.Identifier} returns this
 */
proto.common.verification_policy.Identifier.prototype.clearPolicy = function() {
  return this.setPolicy(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.common.verification_policy.Identifier.prototype.hasPolicy = function() {
  return jspb.Message.getField(this, 2) != null;
};


goog.object.extend(exports, proto.common.verification_policy);
