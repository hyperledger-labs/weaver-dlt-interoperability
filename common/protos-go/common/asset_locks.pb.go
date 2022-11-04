// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.28.0
// 	protoc        v3.17.3
// source: common/asset_locks.proto

package common

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type LockMechanism int32

const (
	LockMechanism_HTLC LockMechanism = 0
)

// Enum value maps for LockMechanism.
var (
	LockMechanism_name = map[int32]string{
		0: "HTLC",
	}
	LockMechanism_value = map[string]int32{
		"HTLC": 0,
	}
)

func (x LockMechanism) Enum() *LockMechanism {
	p := new(LockMechanism)
	*p = x
	return p
}

func (x LockMechanism) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (LockMechanism) Descriptor() protoreflect.EnumDescriptor {
	return file_common_asset_locks_proto_enumTypes[0].Descriptor()
}

func (LockMechanism) Type() protoreflect.EnumType {
	return &file_common_asset_locks_proto_enumTypes[0]
}

func (x LockMechanism) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use LockMechanism.Descriptor instead.
func (LockMechanism) EnumDescriptor() ([]byte, []int) {
	return file_common_asset_locks_proto_rawDescGZIP(), []int{0}
}

type HashMechanism int32

const (
	HashMechanism_SHA256 HashMechanism = 0
	HashMechanism_SHA512 HashMechanism = 1
)

// Enum value maps for HashMechanism.
var (
	HashMechanism_name = map[int32]string{
		0: "SHA256",
		1: "SHA512",
	}
	HashMechanism_value = map[string]int32{
		"SHA256": 0,
		"SHA512": 1,
	}
)

func (x HashMechanism) Enum() *HashMechanism {
	p := new(HashMechanism)
	*p = x
	return p
}

func (x HashMechanism) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (HashMechanism) Descriptor() protoreflect.EnumDescriptor {
	return file_common_asset_locks_proto_enumTypes[1].Descriptor()
}

func (HashMechanism) Type() protoreflect.EnumType {
	return &file_common_asset_locks_proto_enumTypes[1]
}

func (x HashMechanism) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use HashMechanism.Descriptor instead.
func (HashMechanism) EnumDescriptor() ([]byte, []int) {
	return file_common_asset_locks_proto_rawDescGZIP(), []int{1}
}

type AssetLockHTLC_TimeSpec int32

const (
	AssetLockHTLC_EPOCH    AssetLockHTLC_TimeSpec = 0
	AssetLockHTLC_DURATION AssetLockHTLC_TimeSpec = 1
)

// Enum value maps for AssetLockHTLC_TimeSpec.
var (
	AssetLockHTLC_TimeSpec_name = map[int32]string{
		0: "EPOCH",
		1: "DURATION",
	}
	AssetLockHTLC_TimeSpec_value = map[string]int32{
		"EPOCH":    0,
		"DURATION": 1,
	}
)

func (x AssetLockHTLC_TimeSpec) Enum() *AssetLockHTLC_TimeSpec {
	p := new(AssetLockHTLC_TimeSpec)
	*p = x
	return p
}

func (x AssetLockHTLC_TimeSpec) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (AssetLockHTLC_TimeSpec) Descriptor() protoreflect.EnumDescriptor {
	return file_common_asset_locks_proto_enumTypes[2].Descriptor()
}

func (AssetLockHTLC_TimeSpec) Type() protoreflect.EnumType {
	return &file_common_asset_locks_proto_enumTypes[2]
}

func (x AssetLockHTLC_TimeSpec) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use AssetLockHTLC_TimeSpec.Descriptor instead.
func (AssetLockHTLC_TimeSpec) EnumDescriptor() ([]byte, []int) {
	return file_common_asset_locks_proto_rawDescGZIP(), []int{2, 0}
}

type AssetLock struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	LockMechanism LockMechanism `protobuf:"varint,1,opt,name=lockMechanism,proto3,enum=common.asset_locks.LockMechanism" json:"lockMechanism,omitempty"`
	LockInfo      []byte        `protobuf:"bytes,2,opt,name=lockInfo,proto3" json:"lockInfo,omitempty"`
}

func (x *AssetLock) Reset() {
	*x = AssetLock{}
	if protoimpl.UnsafeEnabled {
		mi := &file_common_asset_locks_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *AssetLock) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*AssetLock) ProtoMessage() {}

func (x *AssetLock) ProtoReflect() protoreflect.Message {
	mi := &file_common_asset_locks_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use AssetLock.ProtoReflect.Descriptor instead.
func (*AssetLock) Descriptor() ([]byte, []int) {
	return file_common_asset_locks_proto_rawDescGZIP(), []int{0}
}

func (x *AssetLock) GetLockMechanism() LockMechanism {
	if x != nil {
		return x.LockMechanism
	}
	return LockMechanism_HTLC
}

func (x *AssetLock) GetLockInfo() []byte {
	if x != nil {
		return x.LockInfo
	}
	return nil
}

type AssetClaim struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	LockMechanism LockMechanism `protobuf:"varint,1,opt,name=lockMechanism,proto3,enum=common.asset_locks.LockMechanism" json:"lockMechanism,omitempty"`
	ClaimInfo     []byte        `protobuf:"bytes,2,opt,name=claimInfo,proto3" json:"claimInfo,omitempty"`
}

func (x *AssetClaim) Reset() {
	*x = AssetClaim{}
	if protoimpl.UnsafeEnabled {
		mi := &file_common_asset_locks_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *AssetClaim) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*AssetClaim) ProtoMessage() {}

func (x *AssetClaim) ProtoReflect() protoreflect.Message {
	mi := &file_common_asset_locks_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use AssetClaim.ProtoReflect.Descriptor instead.
func (*AssetClaim) Descriptor() ([]byte, []int) {
	return file_common_asset_locks_proto_rawDescGZIP(), []int{1}
}

func (x *AssetClaim) GetLockMechanism() LockMechanism {
	if x != nil {
		return x.LockMechanism
	}
	return LockMechanism_HTLC
}

func (x *AssetClaim) GetClaimInfo() []byte {
	if x != nil {
		return x.ClaimInfo
	}
	return nil
}

type AssetLockHTLC struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	HashMechanism  HashMechanism          `protobuf:"varint,1,opt,name=hashMechanism,proto3,enum=common.asset_locks.HashMechanism" json:"hashMechanism,omitempty"`
	HashBase64     []byte                 `protobuf:"bytes,2,opt,name=hashBase64,proto3" json:"hashBase64,omitempty"`
	ExpiryTimeSecs uint64                 `protobuf:"varint,3,opt,name=expiryTimeSecs,proto3" json:"expiryTimeSecs,omitempty"`
	TimeSpec       AssetLockHTLC_TimeSpec `protobuf:"varint,4,opt,name=timeSpec,proto3,enum=common.asset_locks.AssetLockHTLC_TimeSpec" json:"timeSpec,omitempty"`
}

func (x *AssetLockHTLC) Reset() {
	*x = AssetLockHTLC{}
	if protoimpl.UnsafeEnabled {
		mi := &file_common_asset_locks_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *AssetLockHTLC) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*AssetLockHTLC) ProtoMessage() {}

func (x *AssetLockHTLC) ProtoReflect() protoreflect.Message {
	mi := &file_common_asset_locks_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use AssetLockHTLC.ProtoReflect.Descriptor instead.
func (*AssetLockHTLC) Descriptor() ([]byte, []int) {
	return file_common_asset_locks_proto_rawDescGZIP(), []int{2}
}

func (x *AssetLockHTLC) GetHashMechanism() HashMechanism {
	if x != nil {
		return x.HashMechanism
	}
	return HashMechanism_SHA256
}

func (x *AssetLockHTLC) GetHashBase64() []byte {
	if x != nil {
		return x.HashBase64
	}
	return nil
}

func (x *AssetLockHTLC) GetExpiryTimeSecs() uint64 {
	if x != nil {
		return x.ExpiryTimeSecs
	}
	return 0
}

func (x *AssetLockHTLC) GetTimeSpec() AssetLockHTLC_TimeSpec {
	if x != nil {
		return x.TimeSpec
	}
	return AssetLockHTLC_EPOCH
}

type AssetClaimHTLC struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	HashMechanism      HashMechanism `protobuf:"varint,1,opt,name=hashMechanism,proto3,enum=common.asset_locks.HashMechanism" json:"hashMechanism,omitempty"`
	HashPreimageBase64 []byte        `protobuf:"bytes,2,opt,name=hashPreimageBase64,proto3" json:"hashPreimageBase64,omitempty"`
}

func (x *AssetClaimHTLC) Reset() {
	*x = AssetClaimHTLC{}
	if protoimpl.UnsafeEnabled {
		mi := &file_common_asset_locks_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *AssetClaimHTLC) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*AssetClaimHTLC) ProtoMessage() {}

func (x *AssetClaimHTLC) ProtoReflect() protoreflect.Message {
	mi := &file_common_asset_locks_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use AssetClaimHTLC.ProtoReflect.Descriptor instead.
func (*AssetClaimHTLC) Descriptor() ([]byte, []int) {
	return file_common_asset_locks_proto_rawDescGZIP(), []int{3}
}

func (x *AssetClaimHTLC) GetHashMechanism() HashMechanism {
	if x != nil {
		return x.HashMechanism
	}
	return HashMechanism_SHA256
}

func (x *AssetClaimHTLC) GetHashPreimageBase64() []byte {
	if x != nil {
		return x.HashPreimageBase64
	}
	return nil
}

type AssetExchangeAgreement struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Type      string `protobuf:"bytes,1,opt,name=type,proto3" json:"type,omitempty"`
	Id        string `protobuf:"bytes,2,opt,name=id,proto3" json:"id,omitempty"`
	Locker    string `protobuf:"bytes,3,opt,name=locker,proto3" json:"locker,omitempty"`
	Recipient string `protobuf:"bytes,4,opt,name=recipient,proto3" json:"recipient,omitempty"`
}

func (x *AssetExchangeAgreement) Reset() {
	*x = AssetExchangeAgreement{}
	if protoimpl.UnsafeEnabled {
		mi := &file_common_asset_locks_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *AssetExchangeAgreement) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*AssetExchangeAgreement) ProtoMessage() {}

func (x *AssetExchangeAgreement) ProtoReflect() protoreflect.Message {
	mi := &file_common_asset_locks_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use AssetExchangeAgreement.ProtoReflect.Descriptor instead.
func (*AssetExchangeAgreement) Descriptor() ([]byte, []int) {
	return file_common_asset_locks_proto_rawDescGZIP(), []int{4}
}

func (x *AssetExchangeAgreement) GetType() string {
	if x != nil {
		return x.Type
	}
	return ""
}

func (x *AssetExchangeAgreement) GetId() string {
	if x != nil {
		return x.Id
	}
	return ""
}

func (x *AssetExchangeAgreement) GetLocker() string {
	if x != nil {
		return x.Locker
	}
	return ""
}

func (x *AssetExchangeAgreement) GetRecipient() string {
	if x != nil {
		return x.Recipient
	}
	return ""
}

type FungibleAssetExchangeAgreement struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Type      string `protobuf:"bytes,1,opt,name=type,proto3" json:"type,omitempty"`
	NumUnits  uint64 `protobuf:"varint,2,opt,name=numUnits,proto3" json:"numUnits,omitempty"`
	Locker    string `protobuf:"bytes,3,opt,name=locker,proto3" json:"locker,omitempty"`
	Recipient string `protobuf:"bytes,4,opt,name=recipient,proto3" json:"recipient,omitempty"`
}

func (x *FungibleAssetExchangeAgreement) Reset() {
	*x = FungibleAssetExchangeAgreement{}
	if protoimpl.UnsafeEnabled {
		mi := &file_common_asset_locks_proto_msgTypes[5]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *FungibleAssetExchangeAgreement) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*FungibleAssetExchangeAgreement) ProtoMessage() {}

func (x *FungibleAssetExchangeAgreement) ProtoReflect() protoreflect.Message {
	mi := &file_common_asset_locks_proto_msgTypes[5]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use FungibleAssetExchangeAgreement.ProtoReflect.Descriptor instead.
func (*FungibleAssetExchangeAgreement) Descriptor() ([]byte, []int) {
	return file_common_asset_locks_proto_rawDescGZIP(), []int{5}
}

func (x *FungibleAssetExchangeAgreement) GetType() string {
	if x != nil {
		return x.Type
	}
	return ""
}

func (x *FungibleAssetExchangeAgreement) GetNumUnits() uint64 {
	if x != nil {
		return x.NumUnits
	}
	return 0
}

func (x *FungibleAssetExchangeAgreement) GetLocker() string {
	if x != nil {
		return x.Locker
	}
	return ""
}

func (x *FungibleAssetExchangeAgreement) GetRecipient() string {
	if x != nil {
		return x.Recipient
	}
	return ""
}

type AssetContractHTLC struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	ContractId string                  `protobuf:"bytes,1,opt,name=contractId,proto3" json:"contractId,omitempty"`
	Agreement  *AssetExchangeAgreement `protobuf:"bytes,2,opt,name=agreement,proto3" json:"agreement,omitempty"`
	Lock       *AssetLockHTLC          `protobuf:"bytes,3,opt,name=lock,proto3" json:"lock,omitempty"`
	Claim      *AssetClaimHTLC         `protobuf:"bytes,4,opt,name=claim,proto3" json:"claim,omitempty"`
}

func (x *AssetContractHTLC) Reset() {
	*x = AssetContractHTLC{}
	if protoimpl.UnsafeEnabled {
		mi := &file_common_asset_locks_proto_msgTypes[6]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *AssetContractHTLC) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*AssetContractHTLC) ProtoMessage() {}

func (x *AssetContractHTLC) ProtoReflect() protoreflect.Message {
	mi := &file_common_asset_locks_proto_msgTypes[6]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use AssetContractHTLC.ProtoReflect.Descriptor instead.
func (*AssetContractHTLC) Descriptor() ([]byte, []int) {
	return file_common_asset_locks_proto_rawDescGZIP(), []int{6}
}

func (x *AssetContractHTLC) GetContractId() string {
	if x != nil {
		return x.ContractId
	}
	return ""
}

func (x *AssetContractHTLC) GetAgreement() *AssetExchangeAgreement {
	if x != nil {
		return x.Agreement
	}
	return nil
}

func (x *AssetContractHTLC) GetLock() *AssetLockHTLC {
	if x != nil {
		return x.Lock
	}
	return nil
}

func (x *AssetContractHTLC) GetClaim() *AssetClaimHTLC {
	if x != nil {
		return x.Claim
	}
	return nil
}

type FungibleAssetContractHTLC struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	ContractId string                          `protobuf:"bytes,1,opt,name=contractId,proto3" json:"contractId,omitempty"`
	Agreement  *FungibleAssetExchangeAgreement `protobuf:"bytes,2,opt,name=agreement,proto3" json:"agreement,omitempty"`
	Lock       *AssetLockHTLC                  `protobuf:"bytes,3,opt,name=lock,proto3" json:"lock,omitempty"`
	Claim      *AssetClaimHTLC                 `protobuf:"bytes,4,opt,name=claim,proto3" json:"claim,omitempty"`
}

func (x *FungibleAssetContractHTLC) Reset() {
	*x = FungibleAssetContractHTLC{}
	if protoimpl.UnsafeEnabled {
		mi := &file_common_asset_locks_proto_msgTypes[7]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *FungibleAssetContractHTLC) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*FungibleAssetContractHTLC) ProtoMessage() {}

func (x *FungibleAssetContractHTLC) ProtoReflect() protoreflect.Message {
	mi := &file_common_asset_locks_proto_msgTypes[7]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use FungibleAssetContractHTLC.ProtoReflect.Descriptor instead.
func (*FungibleAssetContractHTLC) Descriptor() ([]byte, []int) {
	return file_common_asset_locks_proto_rawDescGZIP(), []int{7}
}

func (x *FungibleAssetContractHTLC) GetContractId() string {
	if x != nil {
		return x.ContractId
	}
	return ""
}

func (x *FungibleAssetContractHTLC) GetAgreement() *FungibleAssetExchangeAgreement {
	if x != nil {
		return x.Agreement
	}
	return nil
}

func (x *FungibleAssetContractHTLC) GetLock() *AssetLockHTLC {
	if x != nil {
		return x.Lock
	}
	return nil
}

func (x *FungibleAssetContractHTLC) GetClaim() *AssetClaimHTLC {
	if x != nil {
		return x.Claim
	}
	return nil
}

var File_common_asset_locks_proto protoreflect.FileDescriptor

var file_common_asset_locks_proto_rawDesc = []byte{
	0x0a, 0x18, 0x63, 0x6f, 0x6d, 0x6d, 0x6f, 0x6e, 0x2f, 0x61, 0x73, 0x73, 0x65, 0x74, 0x5f, 0x6c,
	0x6f, 0x63, 0x6b, 0x73, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x12, 0x63, 0x6f, 0x6d, 0x6d,
	0x6f, 0x6e, 0x2e, 0x61, 0x73, 0x73, 0x65, 0x74, 0x5f, 0x6c, 0x6f, 0x63, 0x6b, 0x73, 0x22, 0x70,
	0x0a, 0x09, 0x41, 0x73, 0x73, 0x65, 0x74, 0x4c, 0x6f, 0x63, 0x6b, 0x12, 0x47, 0x0a, 0x0d, 0x6c,
	0x6f, 0x63, 0x6b, 0x4d, 0x65, 0x63, 0x68, 0x61, 0x6e, 0x69, 0x73, 0x6d, 0x18, 0x01, 0x20, 0x01,
	0x28, 0x0e, 0x32, 0x21, 0x2e, 0x63, 0x6f, 0x6d, 0x6d, 0x6f, 0x6e, 0x2e, 0x61, 0x73, 0x73, 0x65,
	0x74, 0x5f, 0x6c, 0x6f, 0x63, 0x6b, 0x73, 0x2e, 0x4c, 0x6f, 0x63, 0x6b, 0x4d, 0x65, 0x63, 0x68,
	0x61, 0x6e, 0x69, 0x73, 0x6d, 0x52, 0x0d, 0x6c, 0x6f, 0x63, 0x6b, 0x4d, 0x65, 0x63, 0x68, 0x61,
	0x6e, 0x69, 0x73, 0x6d, 0x12, 0x1a, 0x0a, 0x08, 0x6c, 0x6f, 0x63, 0x6b, 0x49, 0x6e, 0x66, 0x6f,
	0x18, 0x02, 0x20, 0x01, 0x28, 0x0c, 0x52, 0x08, 0x6c, 0x6f, 0x63, 0x6b, 0x49, 0x6e, 0x66, 0x6f,
	0x22, 0x73, 0x0a, 0x0a, 0x41, 0x73, 0x73, 0x65, 0x74, 0x43, 0x6c, 0x61, 0x69, 0x6d, 0x12, 0x47,
	0x0a, 0x0d, 0x6c, 0x6f, 0x63, 0x6b, 0x4d, 0x65, 0x63, 0x68, 0x61, 0x6e, 0x69, 0x73, 0x6d, 0x18,
	0x01, 0x20, 0x01, 0x28, 0x0e, 0x32, 0x21, 0x2e, 0x63, 0x6f, 0x6d, 0x6d, 0x6f, 0x6e, 0x2e, 0x61,
	0x73, 0x73, 0x65, 0x74, 0x5f, 0x6c, 0x6f, 0x63, 0x6b, 0x73, 0x2e, 0x4c, 0x6f, 0x63, 0x6b, 0x4d,
	0x65, 0x63, 0x68, 0x61, 0x6e, 0x69, 0x73, 0x6d, 0x52, 0x0d, 0x6c, 0x6f, 0x63, 0x6b, 0x4d, 0x65,
	0x63, 0x68, 0x61, 0x6e, 0x69, 0x73, 0x6d, 0x12, 0x1c, 0x0a, 0x09, 0x63, 0x6c, 0x61, 0x69, 0x6d,
	0x49, 0x6e, 0x66, 0x6f, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0c, 0x52, 0x09, 0x63, 0x6c, 0x61, 0x69,
	0x6d, 0x49, 0x6e, 0x66, 0x6f, 0x22, 0x8d, 0x02, 0x0a, 0x0d, 0x41, 0x73, 0x73, 0x65, 0x74, 0x4c,
	0x6f, 0x63, 0x6b, 0x48, 0x54, 0x4c, 0x43, 0x12, 0x47, 0x0a, 0x0d, 0x68, 0x61, 0x73, 0x68, 0x4d,
	0x65, 0x63, 0x68, 0x61, 0x6e, 0x69, 0x73, 0x6d, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0e, 0x32, 0x21,
	0x2e, 0x63, 0x6f, 0x6d, 0x6d, 0x6f, 0x6e, 0x2e, 0x61, 0x73, 0x73, 0x65, 0x74, 0x5f, 0x6c, 0x6f,
	0x63, 0x6b, 0x73, 0x2e, 0x48, 0x61, 0x73, 0x68, 0x4d, 0x65, 0x63, 0x68, 0x61, 0x6e, 0x69, 0x73,
	0x6d, 0x52, 0x0d, 0x68, 0x61, 0x73, 0x68, 0x4d, 0x65, 0x63, 0x68, 0x61, 0x6e, 0x69, 0x73, 0x6d,
	0x12, 0x1e, 0x0a, 0x0a, 0x68, 0x61, 0x73, 0x68, 0x42, 0x61, 0x73, 0x65, 0x36, 0x34, 0x18, 0x02,
	0x20, 0x01, 0x28, 0x0c, 0x52, 0x0a, 0x68, 0x61, 0x73, 0x68, 0x42, 0x61, 0x73, 0x65, 0x36, 0x34,
	0x12, 0x26, 0x0a, 0x0e, 0x65, 0x78, 0x70, 0x69, 0x72, 0x79, 0x54, 0x69, 0x6d, 0x65, 0x53, 0x65,
	0x63, 0x73, 0x18, 0x03, 0x20, 0x01, 0x28, 0x04, 0x52, 0x0e, 0x65, 0x78, 0x70, 0x69, 0x72, 0x79,
	0x54, 0x69, 0x6d, 0x65, 0x53, 0x65, 0x63, 0x73, 0x12, 0x46, 0x0a, 0x08, 0x74, 0x69, 0x6d, 0x65,
	0x53, 0x70, 0x65, 0x63, 0x18, 0x04, 0x20, 0x01, 0x28, 0x0e, 0x32, 0x2a, 0x2e, 0x63, 0x6f, 0x6d,
	0x6d, 0x6f, 0x6e, 0x2e, 0x61, 0x73, 0x73, 0x65, 0x74, 0x5f, 0x6c, 0x6f, 0x63, 0x6b, 0x73, 0x2e,
	0x41, 0x73, 0x73, 0x65, 0x74, 0x4c, 0x6f, 0x63, 0x6b, 0x48, 0x54, 0x4c, 0x43, 0x2e, 0x54, 0x69,
	0x6d, 0x65, 0x53, 0x70, 0x65, 0x63, 0x52, 0x08, 0x74, 0x69, 0x6d, 0x65, 0x53, 0x70, 0x65, 0x63,
	0x22, 0x23, 0x0a, 0x08, 0x54, 0x69, 0x6d, 0x65, 0x53, 0x70, 0x65, 0x63, 0x12, 0x09, 0x0a, 0x05,
	0x45, 0x50, 0x4f, 0x43, 0x48, 0x10, 0x00, 0x12, 0x0c, 0x0a, 0x08, 0x44, 0x55, 0x52, 0x41, 0x54,
	0x49, 0x4f, 0x4e, 0x10, 0x01, 0x22, 0x89, 0x01, 0x0a, 0x0e, 0x41, 0x73, 0x73, 0x65, 0x74, 0x43,
	0x6c, 0x61, 0x69, 0x6d, 0x48, 0x54, 0x4c, 0x43, 0x12, 0x47, 0x0a, 0x0d, 0x68, 0x61, 0x73, 0x68,
	0x4d, 0x65, 0x63, 0x68, 0x61, 0x6e, 0x69, 0x73, 0x6d, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0e, 0x32,
	0x21, 0x2e, 0x63, 0x6f, 0x6d, 0x6d, 0x6f, 0x6e, 0x2e, 0x61, 0x73, 0x73, 0x65, 0x74, 0x5f, 0x6c,
	0x6f, 0x63, 0x6b, 0x73, 0x2e, 0x48, 0x61, 0x73, 0x68, 0x4d, 0x65, 0x63, 0x68, 0x61, 0x6e, 0x69,
	0x73, 0x6d, 0x52, 0x0d, 0x68, 0x61, 0x73, 0x68, 0x4d, 0x65, 0x63, 0x68, 0x61, 0x6e, 0x69, 0x73,
	0x6d, 0x12, 0x2e, 0x0a, 0x12, 0x68, 0x61, 0x73, 0x68, 0x50, 0x72, 0x65, 0x69, 0x6d, 0x61, 0x67,
	0x65, 0x42, 0x61, 0x73, 0x65, 0x36, 0x34, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0c, 0x52, 0x12, 0x68,
	0x61, 0x73, 0x68, 0x50, 0x72, 0x65, 0x69, 0x6d, 0x61, 0x67, 0x65, 0x42, 0x61, 0x73, 0x65, 0x36,
	0x34, 0x22, 0x72, 0x0a, 0x16, 0x41, 0x73, 0x73, 0x65, 0x74, 0x45, 0x78, 0x63, 0x68, 0x61, 0x6e,
	0x67, 0x65, 0x41, 0x67, 0x72, 0x65, 0x65, 0x6d, 0x65, 0x6e, 0x74, 0x12, 0x12, 0x0a, 0x04, 0x74,
	0x79, 0x70, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x74, 0x79, 0x70, 0x65, 0x12,
	0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x02, 0x69, 0x64, 0x12,
	0x16, 0x0a, 0x06, 0x6c, 0x6f, 0x63, 0x6b, 0x65, 0x72, 0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x52,
	0x06, 0x6c, 0x6f, 0x63, 0x6b, 0x65, 0x72, 0x12, 0x1c, 0x0a, 0x09, 0x72, 0x65, 0x63, 0x69, 0x70,
	0x69, 0x65, 0x6e, 0x74, 0x18, 0x04, 0x20, 0x01, 0x28, 0x09, 0x52, 0x09, 0x72, 0x65, 0x63, 0x69,
	0x70, 0x69, 0x65, 0x6e, 0x74, 0x22, 0x86, 0x01, 0x0a, 0x1e, 0x46, 0x75, 0x6e, 0x67, 0x69, 0x62,
	0x6c, 0x65, 0x41, 0x73, 0x73, 0x65, 0x74, 0x45, 0x78, 0x63, 0x68, 0x61, 0x6e, 0x67, 0x65, 0x41,
	0x67, 0x72, 0x65, 0x65, 0x6d, 0x65, 0x6e, 0x74, 0x12, 0x12, 0x0a, 0x04, 0x74, 0x79, 0x70, 0x65,
	0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x74, 0x79, 0x70, 0x65, 0x12, 0x1a, 0x0a, 0x08,
	0x6e, 0x75, 0x6d, 0x55, 0x6e, 0x69, 0x74, 0x73, 0x18, 0x02, 0x20, 0x01, 0x28, 0x04, 0x52, 0x08,
	0x6e, 0x75, 0x6d, 0x55, 0x6e, 0x69, 0x74, 0x73, 0x12, 0x16, 0x0a, 0x06, 0x6c, 0x6f, 0x63, 0x6b,
	0x65, 0x72, 0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x52, 0x06, 0x6c, 0x6f, 0x63, 0x6b, 0x65, 0x72,
	0x12, 0x1c, 0x0a, 0x09, 0x72, 0x65, 0x63, 0x69, 0x70, 0x69, 0x65, 0x6e, 0x74, 0x18, 0x04, 0x20,
	0x01, 0x28, 0x09, 0x52, 0x09, 0x72, 0x65, 0x63, 0x69, 0x70, 0x69, 0x65, 0x6e, 0x74, 0x22, 0xee,
	0x01, 0x0a, 0x11, 0x41, 0x73, 0x73, 0x65, 0x74, 0x43, 0x6f, 0x6e, 0x74, 0x72, 0x61, 0x63, 0x74,
	0x48, 0x54, 0x4c, 0x43, 0x12, 0x1e, 0x0a, 0x0a, 0x63, 0x6f, 0x6e, 0x74, 0x72, 0x61, 0x63, 0x74,
	0x49, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0a, 0x63, 0x6f, 0x6e, 0x74, 0x72, 0x61,
	0x63, 0x74, 0x49, 0x64, 0x12, 0x48, 0x0a, 0x09, 0x61, 0x67, 0x72, 0x65, 0x65, 0x6d, 0x65, 0x6e,
	0x74, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x2a, 0x2e, 0x63, 0x6f, 0x6d, 0x6d, 0x6f, 0x6e,
	0x2e, 0x61, 0x73, 0x73, 0x65, 0x74, 0x5f, 0x6c, 0x6f, 0x63, 0x6b, 0x73, 0x2e, 0x41, 0x73, 0x73,
	0x65, 0x74, 0x45, 0x78, 0x63, 0x68, 0x61, 0x6e, 0x67, 0x65, 0x41, 0x67, 0x72, 0x65, 0x65, 0x6d,
	0x65, 0x6e, 0x74, 0x52, 0x09, 0x61, 0x67, 0x72, 0x65, 0x65, 0x6d, 0x65, 0x6e, 0x74, 0x12, 0x35,
	0x0a, 0x04, 0x6c, 0x6f, 0x63, 0x6b, 0x18, 0x03, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x21, 0x2e, 0x63,
	0x6f, 0x6d, 0x6d, 0x6f, 0x6e, 0x2e, 0x61, 0x73, 0x73, 0x65, 0x74, 0x5f, 0x6c, 0x6f, 0x63, 0x6b,
	0x73, 0x2e, 0x41, 0x73, 0x73, 0x65, 0x74, 0x4c, 0x6f, 0x63, 0x6b, 0x48, 0x54, 0x4c, 0x43, 0x52,
	0x04, 0x6c, 0x6f, 0x63, 0x6b, 0x12, 0x38, 0x0a, 0x05, 0x63, 0x6c, 0x61, 0x69, 0x6d, 0x18, 0x04,
	0x20, 0x01, 0x28, 0x0b, 0x32, 0x22, 0x2e, 0x63, 0x6f, 0x6d, 0x6d, 0x6f, 0x6e, 0x2e, 0x61, 0x73,
	0x73, 0x65, 0x74, 0x5f, 0x6c, 0x6f, 0x63, 0x6b, 0x73, 0x2e, 0x41, 0x73, 0x73, 0x65, 0x74, 0x43,
	0x6c, 0x61, 0x69, 0x6d, 0x48, 0x54, 0x4c, 0x43, 0x52, 0x05, 0x63, 0x6c, 0x61, 0x69, 0x6d, 0x22,
	0xfe, 0x01, 0x0a, 0x19, 0x46, 0x75, 0x6e, 0x67, 0x69, 0x62, 0x6c, 0x65, 0x41, 0x73, 0x73, 0x65,
	0x74, 0x43, 0x6f, 0x6e, 0x74, 0x72, 0x61, 0x63, 0x74, 0x48, 0x54, 0x4c, 0x43, 0x12, 0x1e, 0x0a,
	0x0a, 0x63, 0x6f, 0x6e, 0x74, 0x72, 0x61, 0x63, 0x74, 0x49, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28,
	0x09, 0x52, 0x0a, 0x63, 0x6f, 0x6e, 0x74, 0x72, 0x61, 0x63, 0x74, 0x49, 0x64, 0x12, 0x50, 0x0a,
	0x09, 0x61, 0x67, 0x72, 0x65, 0x65, 0x6d, 0x65, 0x6e, 0x74, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b,
	0x32, 0x32, 0x2e, 0x63, 0x6f, 0x6d, 0x6d, 0x6f, 0x6e, 0x2e, 0x61, 0x73, 0x73, 0x65, 0x74, 0x5f,
	0x6c, 0x6f, 0x63, 0x6b, 0x73, 0x2e, 0x46, 0x75, 0x6e, 0x67, 0x69, 0x62, 0x6c, 0x65, 0x41, 0x73,
	0x73, 0x65, 0x74, 0x45, 0x78, 0x63, 0x68, 0x61, 0x6e, 0x67, 0x65, 0x41, 0x67, 0x72, 0x65, 0x65,
	0x6d, 0x65, 0x6e, 0x74, 0x52, 0x09, 0x61, 0x67, 0x72, 0x65, 0x65, 0x6d, 0x65, 0x6e, 0x74, 0x12,
	0x35, 0x0a, 0x04, 0x6c, 0x6f, 0x63, 0x6b, 0x18, 0x03, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x21, 0x2e,
	0x63, 0x6f, 0x6d, 0x6d, 0x6f, 0x6e, 0x2e, 0x61, 0x73, 0x73, 0x65, 0x74, 0x5f, 0x6c, 0x6f, 0x63,
	0x6b, 0x73, 0x2e, 0x41, 0x73, 0x73, 0x65, 0x74, 0x4c, 0x6f, 0x63, 0x6b, 0x48, 0x54, 0x4c, 0x43,
	0x52, 0x04, 0x6c, 0x6f, 0x63, 0x6b, 0x12, 0x38, 0x0a, 0x05, 0x63, 0x6c, 0x61, 0x69, 0x6d, 0x18,
	0x04, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x22, 0x2e, 0x63, 0x6f, 0x6d, 0x6d, 0x6f, 0x6e, 0x2e, 0x61,
	0x73, 0x73, 0x65, 0x74, 0x5f, 0x6c, 0x6f, 0x63, 0x6b, 0x73, 0x2e, 0x41, 0x73, 0x73, 0x65, 0x74,
	0x43, 0x6c, 0x61, 0x69, 0x6d, 0x48, 0x54, 0x4c, 0x43, 0x52, 0x05, 0x63, 0x6c, 0x61, 0x69, 0x6d,
	0x2a, 0x19, 0x0a, 0x0d, 0x4c, 0x6f, 0x63, 0x6b, 0x4d, 0x65, 0x63, 0x68, 0x61, 0x6e, 0x69, 0x73,
	0x6d, 0x12, 0x08, 0x0a, 0x04, 0x48, 0x54, 0x4c, 0x43, 0x10, 0x00, 0x2a, 0x27, 0x0a, 0x0d, 0x48,
	0x61, 0x73, 0x68, 0x4d, 0x65, 0x63, 0x68, 0x61, 0x6e, 0x69, 0x73, 0x6d, 0x12, 0x0a, 0x0a, 0x06,
	0x53, 0x48, 0x41, 0x32, 0x35, 0x36, 0x10, 0x00, 0x12, 0x0a, 0x0a, 0x06, 0x53, 0x48, 0x41, 0x35,
	0x31, 0x32, 0x10, 0x01, 0x42, 0x77, 0x0a, 0x24, 0x63, 0x6f, 0x6d, 0x2e, 0x77, 0x65, 0x61, 0x76,
	0x65, 0x72, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x73, 0x2e, 0x63, 0x6f, 0x6d, 0x6d, 0x6f, 0x6e,
	0x2e, 0x61, 0x73, 0x73, 0x65, 0x74, 0x5f, 0x6c, 0x6f, 0x63, 0x6b, 0x73, 0x5a, 0x4f, 0x67, 0x69,
	0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x68, 0x79, 0x70, 0x65, 0x72, 0x6c, 0x65,
	0x64, 0x67, 0x65, 0x72, 0x2d, 0x6c, 0x61, 0x62, 0x73, 0x2f, 0x77, 0x65, 0x61, 0x76, 0x65, 0x72,
	0x2d, 0x64, 0x6c, 0x74, 0x2d, 0x69, 0x6e, 0x74, 0x65, 0x72, 0x6f, 0x70, 0x65, 0x72, 0x61, 0x62,
	0x69, 0x6c, 0x69, 0x74, 0x79, 0x2f, 0x63, 0x6f, 0x6d, 0x6d, 0x6f, 0x6e, 0x2f, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x73, 0x2d, 0x67, 0x6f, 0x2f, 0x63, 0x6f, 0x6d, 0x6d, 0x6f, 0x6e, 0x62, 0x06, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_common_asset_locks_proto_rawDescOnce sync.Once
	file_common_asset_locks_proto_rawDescData = file_common_asset_locks_proto_rawDesc
)

func file_common_asset_locks_proto_rawDescGZIP() []byte {
	file_common_asset_locks_proto_rawDescOnce.Do(func() {
		file_common_asset_locks_proto_rawDescData = protoimpl.X.CompressGZIP(file_common_asset_locks_proto_rawDescData)
	})
	return file_common_asset_locks_proto_rawDescData
}

var file_common_asset_locks_proto_enumTypes = make([]protoimpl.EnumInfo, 3)
var file_common_asset_locks_proto_msgTypes = make([]protoimpl.MessageInfo, 8)
var file_common_asset_locks_proto_goTypes = []interface{}{
	(LockMechanism)(0),                     // 0: common.asset_locks.LockMechanism
	(HashMechanism)(0),                     // 1: common.asset_locks.HashMechanism
	(AssetLockHTLC_TimeSpec)(0),            // 2: common.asset_locks.AssetLockHTLC.TimeSpec
	(*AssetLock)(nil),                      // 3: common.asset_locks.AssetLock
	(*AssetClaim)(nil),                     // 4: common.asset_locks.AssetClaim
	(*AssetLockHTLC)(nil),                  // 5: common.asset_locks.AssetLockHTLC
	(*AssetClaimHTLC)(nil),                 // 6: common.asset_locks.AssetClaimHTLC
	(*AssetExchangeAgreement)(nil),         // 7: common.asset_locks.AssetExchangeAgreement
	(*FungibleAssetExchangeAgreement)(nil), // 8: common.asset_locks.FungibleAssetExchangeAgreement
	(*AssetContractHTLC)(nil),              // 9: common.asset_locks.AssetContractHTLC
	(*FungibleAssetContractHTLC)(nil),      // 10: common.asset_locks.FungibleAssetContractHTLC
}
var file_common_asset_locks_proto_depIdxs = []int32{
	0,  // 0: common.asset_locks.AssetLock.lockMechanism:type_name -> common.asset_locks.LockMechanism
	0,  // 1: common.asset_locks.AssetClaim.lockMechanism:type_name -> common.asset_locks.LockMechanism
	1,  // 2: common.asset_locks.AssetLockHTLC.hashMechanism:type_name -> common.asset_locks.HashMechanism
	2,  // 3: common.asset_locks.AssetLockHTLC.timeSpec:type_name -> common.asset_locks.AssetLockHTLC.TimeSpec
	1,  // 4: common.asset_locks.AssetClaimHTLC.hashMechanism:type_name -> common.asset_locks.HashMechanism
	7,  // 5: common.asset_locks.AssetContractHTLC.agreement:type_name -> common.asset_locks.AssetExchangeAgreement
	5,  // 6: common.asset_locks.AssetContractHTLC.lock:type_name -> common.asset_locks.AssetLockHTLC
	6,  // 7: common.asset_locks.AssetContractHTLC.claim:type_name -> common.asset_locks.AssetClaimHTLC
	8,  // 8: common.asset_locks.FungibleAssetContractHTLC.agreement:type_name -> common.asset_locks.FungibleAssetExchangeAgreement
	5,  // 9: common.asset_locks.FungibleAssetContractHTLC.lock:type_name -> common.asset_locks.AssetLockHTLC
	6,  // 10: common.asset_locks.FungibleAssetContractHTLC.claim:type_name -> common.asset_locks.AssetClaimHTLC
	11, // [11:11] is the sub-list for method output_type
	11, // [11:11] is the sub-list for method input_type
	11, // [11:11] is the sub-list for extension type_name
	11, // [11:11] is the sub-list for extension extendee
	0,  // [0:11] is the sub-list for field type_name
}

func init() { file_common_asset_locks_proto_init() }
func file_common_asset_locks_proto_init() {
	if File_common_asset_locks_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_common_asset_locks_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*AssetLock); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_common_asset_locks_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*AssetClaim); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_common_asset_locks_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*AssetLockHTLC); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_common_asset_locks_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*AssetClaimHTLC); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_common_asset_locks_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*AssetExchangeAgreement); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_common_asset_locks_proto_msgTypes[5].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*FungibleAssetExchangeAgreement); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_common_asset_locks_proto_msgTypes[6].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*AssetContractHTLC); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_common_asset_locks_proto_msgTypes[7].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*FungibleAssetContractHTLC); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_common_asset_locks_proto_rawDesc,
			NumEnums:      3,
			NumMessages:   8,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_common_asset_locks_proto_goTypes,
		DependencyIndexes: file_common_asset_locks_proto_depIdxs,
		EnumInfos:         file_common_asset_locks_proto_enumTypes,
		MessageInfos:      file_common_asset_locks_proto_msgTypes,
	}.Build()
	File_common_asset_locks_proto = out.File
	file_common_asset_locks_proto_rawDesc = nil
	file_common_asset_locks_proto_goTypes = nil
	file_common_asset_locks_proto_depIdxs = nil
}
