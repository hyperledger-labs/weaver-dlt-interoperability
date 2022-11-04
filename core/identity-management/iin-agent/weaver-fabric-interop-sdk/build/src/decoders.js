/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var fabproto6 = require("fabric-protos");
// Input parameter: 'peer.Proposal' protobuf in bytes
var deserializeRemoteProposal = function (proposalBytes) { return fabproto6.protos.Proposal.decode(proposalBytes); };
// Input parameter: 'peer.ProposalResponse' protobuf in bytes
var deserializeRemoteProposalResponse = function (proposalResponseBytes) {
    return fabproto6.protos.ProposalResponse.decode(proposalResponseBytes);
};
// Input parameter: 'peer.Proposal' protobuf encoded in Hex
var deserializeRemoteProposalHex = function (proposalBytesHex) {
    return fabproto6.protos.Proposal.decode(Buffer.from(proposalBytesHex, "hex"));
};
// Input parameter: 'peer.ProposalResponse' protobuf encoded in Hex
var deserializeRemoteProposalResponseHex = function (proposalResponseBytesHex) {
    return fabproto6.protos.ProposalResponse.decode(Buffer.from(proposalResponseBytesHex, "hex"));
};
// Input parameter: 'peer.Proposal' protobuf encoded in Base64
var deserializeRemoteProposalBase64 = function (proposalBytes64) {
    return fabproto6.protos.Proposal.decode(Buffer.from(proposalBytes64, "base64"));
};
// Input parameter: 'peer.ProposalResponse' protobuf encoded in Base64
var deserializeRemoteProposalResponseBase64 = function (proposalResponseBytes64) {
    return fabproto6.protos.ProposalResponse.decode(Buffer.from(proposalResponseBytes64, "base64"));
};
// Input parameter: 'peer.ProposalResponse' protobuf structure
var serializeRemoteProposalResponse = function (proposalResponse) {
    return fabproto6.protos.ProposalResponse.encode(proposalResponse).finish();
};
module.exports = {
    deserializeRemoteProposal: deserializeRemoteProposal,
    deserializeRemoteProposalResponse: deserializeRemoteProposalResponse,
    deserializeRemoteProposalHex: deserializeRemoteProposalHex,
    deserializeRemoteProposalResponseHex: deserializeRemoteProposalResponseHex,
    deserializeRemoteProposalBase64: deserializeRemoteProposalBase64,
    deserializeRemoteProposalResponseBase64: deserializeRemoteProposalResponseBase64,
    serializeRemoteProposalResponse: serializeRemoteProposalResponse,
};
