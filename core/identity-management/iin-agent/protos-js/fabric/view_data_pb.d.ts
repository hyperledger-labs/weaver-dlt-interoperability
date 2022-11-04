// package: fabric.view_data
// file: fabric/view_data.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as peer_proposal_response_pb from "../peer/proposal_response_pb";

export class FabricView extends jspb.Message { 

    hasResponse(): boolean;
    clearResponse(): void;
    getResponse(): peer_proposal_response_pb.Response | undefined;
    setResponse(value?: peer_proposal_response_pb.Response): FabricView;

    hasProposalResponsePayload(): boolean;
    clearProposalResponsePayload(): void;
    getProposalResponsePayload(): peer_proposal_response_pb.ProposalResponsePayload | undefined;
    setProposalResponsePayload(value?: peer_proposal_response_pb.ProposalResponsePayload): FabricView;
    clearEndorsementsList(): void;
    getEndorsementsList(): Array<peer_proposal_response_pb.Endorsement>;
    setEndorsementsList(value: Array<peer_proposal_response_pb.Endorsement>): FabricView;
    addEndorsements(value?: peer_proposal_response_pb.Endorsement, index?: number): peer_proposal_response_pb.Endorsement;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FabricView.AsObject;
    static toObject(includeInstance: boolean, msg: FabricView): FabricView.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FabricView, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FabricView;
    static deserializeBinaryFromReader(message: FabricView, reader: jspb.BinaryReader): FabricView;
}

export namespace FabricView {
    export type AsObject = {
        response?: peer_proposal_response_pb.Response.AsObject,
        proposalResponsePayload?: peer_proposal_response_pb.ProposalResponsePayload.AsObject,
        endorsementsList: Array<peer_proposal_response_pb.Endorsement.AsObject>,
    }
}
