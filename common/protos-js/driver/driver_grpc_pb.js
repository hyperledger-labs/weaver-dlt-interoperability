// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var driver_driver_pb = require('../driver/driver_pb.js');
var common_ack_pb = require('../common/ack_pb.js');
var common_query_pb = require('../common/query_pb.js');
var common_events_pb = require('../common/events_pb.js');
var common_state_pb = require('../common/state_pb.js');

function serialize_common_ack_Ack(arg) {
  if (!(arg instanceof common_ack_pb.Ack)) {
    throw new Error('Expected argument of type common.ack.Ack');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_common_ack_Ack(buffer_arg) {
  return common_ack_pb.Ack.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_common_events_EventSubscription(arg) {
  if (!(arg instanceof common_events_pb.EventSubscription)) {
    throw new Error('Expected argument of type common.events.EventSubscription');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_common_events_EventSubscription(buffer_arg) {
  return common_events_pb.EventSubscription.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_common_query_Query(arg) {
  if (!(arg instanceof common_query_pb.Query)) {
    throw new Error('Expected argument of type common.query.Query');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_common_query_Query(buffer_arg) {
  return common_query_pb.Query.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_driver_driver_WriteExternalStateMessage(arg) {
  if (!(arg instanceof driver_driver_pb.WriteExternalStateMessage)) {
    throw new Error('Expected argument of type driver.driver.WriteExternalStateMessage');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_driver_driver_WriteExternalStateMessage(buffer_arg) {
  return driver_driver_pb.WriteExternalStateMessage.deserializeBinary(new Uint8Array(buffer_arg));
}


var DriverCommunicationService = exports.DriverCommunicationService = {
  // Data Sharing 
// the remote relay sends a RequestDriverState request to its driver with a
// query defining the data it wants to receive
requestDriverState: {
    path: '/driver.driver.DriverCommunication/RequestDriverState',
    requestStream: false,
    responseStream: false,
    requestType: common_query_pb.Query,
    responseType: common_ack_pb.Ack,
    requestSerialize: serialize_common_query_Query,
    requestDeserialize: deserialize_common_query_Query,
    responseSerialize: serialize_common_ack_Ack,
    responseDeserialize: deserialize_common_ack_Ack,
  },
  // Events Subscription
// the src-relay uses this endpoint to forward the event subscription request from dest-relay to driver
subscribeEvent: {
    path: '/driver.driver.DriverCommunication/SubscribeEvent',
    requestStream: false,
    responseStream: false,
    requestType: common_events_pb.EventSubscription,
    responseType: common_ack_pb.Ack,
    requestSerialize: serialize_common_events_EventSubscription,
    requestDeserialize: deserialize_common_events_EventSubscription,
    responseSerialize: serialize_common_ack_Ack,
    responseDeserialize: deserialize_common_ack_Ack,
  },
  // Recommended to have TLS mode on for this unsafe endpoint
// Relay uses this to get Query.requestor_signature and 
// Query.certificate required for event subscription
requestSignedEventSubscriptionQuery: {
    path: '/driver.driver.DriverCommunication/RequestSignedEventSubscriptionQuery',
    requestStream: false,
    responseStream: false,
    requestType: common_events_pb.EventSubscription,
    responseType: common_query_pb.Query,
    requestSerialize: serialize_common_events_EventSubscription,
    requestDeserialize: deserialize_common_events_EventSubscription,
    responseSerialize: serialize_common_query_Query,
    responseDeserialize: deserialize_common_query_Query,
  },
  // Events Publication
// the dest-relay calls the dest-driver on this end point to write the remote network state to the local ledger
writeExternalState: {
    path: '/driver.driver.DriverCommunication/WriteExternalState',
    requestStream: false,
    responseStream: false,
    requestType: driver_driver_pb.WriteExternalStateMessage,
    responseType: common_ack_pb.Ack,
    requestSerialize: serialize_driver_driver_WriteExternalStateMessage,
    requestDeserialize: deserialize_driver_driver_WriteExternalStateMessage,
    responseSerialize: serialize_common_ack_Ack,
    responseDeserialize: deserialize_common_ack_Ack,
  },
};

exports.DriverCommunicationClient = grpc.makeGenericClientConstructor(DriverCommunicationService);
