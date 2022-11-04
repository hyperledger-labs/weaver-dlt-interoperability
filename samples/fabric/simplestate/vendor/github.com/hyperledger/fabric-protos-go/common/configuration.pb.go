// Code generated by protoc-gen-go. DO NOT EDIT.
// source: common/configuration.proto

package common

import (
	fmt "fmt"
	proto "github.com/golang/protobuf/proto"
	math "math"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.ProtoPackageIsVersion3 // please upgrade the proto package

// HashingAlgorithm is encoded into the configuration transaction as a
// configuration item of type Chain with a Key of "HashingAlgorithm" and a
// Value of HashingAlgorithm as marshaled protobuf bytes
type HashingAlgorithm struct {
	// SHA256 is currently the only supported and tested algorithm.
	Name                 string   `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *HashingAlgorithm) Reset()         { *m = HashingAlgorithm{} }
func (m *HashingAlgorithm) String() string { return proto.CompactTextString(m) }
func (*HashingAlgorithm) ProtoMessage()    {}
func (*HashingAlgorithm) Descriptor() ([]byte, []int) {
	return fileDescriptor_cba1ec2883858369, []int{0}
}

func (m *HashingAlgorithm) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_HashingAlgorithm.Unmarshal(m, b)
}
func (m *HashingAlgorithm) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_HashingAlgorithm.Marshal(b, m, deterministic)
}
func (m *HashingAlgorithm) XXX_Merge(src proto.Message) {
	xxx_messageInfo_HashingAlgorithm.Merge(m, src)
}
func (m *HashingAlgorithm) XXX_Size() int {
	return xxx_messageInfo_HashingAlgorithm.Size(m)
}
func (m *HashingAlgorithm) XXX_DiscardUnknown() {
	xxx_messageInfo_HashingAlgorithm.DiscardUnknown(m)
}

var xxx_messageInfo_HashingAlgorithm proto.InternalMessageInfo

func (m *HashingAlgorithm) GetName() string {
	if m != nil {
		return m.Name
	}
	return ""
}

// BlockDataHashingStructure is encoded into the configuration transaction as a configuration item of
// type Chain with a Key of "BlockDataHashingStructure" and a Value of HashingAlgorithm as marshaled protobuf bytes
type BlockDataHashingStructure struct {
	// width specifies the width of the Merkle tree to use when computing the BlockDataHash
	// in order to replicate flat hashing, set this width to MAX_UINT32
	Width                uint32   `protobuf:"varint,1,opt,name=width,proto3" json:"width,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *BlockDataHashingStructure) Reset()         { *m = BlockDataHashingStructure{} }
func (m *BlockDataHashingStructure) String() string { return proto.CompactTextString(m) }
func (*BlockDataHashingStructure) ProtoMessage()    {}
func (*BlockDataHashingStructure) Descriptor() ([]byte, []int) {
	return fileDescriptor_cba1ec2883858369, []int{1}
}

func (m *BlockDataHashingStructure) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_BlockDataHashingStructure.Unmarshal(m, b)
}
func (m *BlockDataHashingStructure) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_BlockDataHashingStructure.Marshal(b, m, deterministic)
}
func (m *BlockDataHashingStructure) XXX_Merge(src proto.Message) {
	xxx_messageInfo_BlockDataHashingStructure.Merge(m, src)
}
func (m *BlockDataHashingStructure) XXX_Size() int {
	return xxx_messageInfo_BlockDataHashingStructure.Size(m)
}
func (m *BlockDataHashingStructure) XXX_DiscardUnknown() {
	xxx_messageInfo_BlockDataHashingStructure.DiscardUnknown(m)
}

var xxx_messageInfo_BlockDataHashingStructure proto.InternalMessageInfo

func (m *BlockDataHashingStructure) GetWidth() uint32 {
	if m != nil {
		return m.Width
	}
	return 0
}

// OrdererAddresses is encoded into the configuration transaction as a configuration item of type Chain
// with a Key of "OrdererAddresses" and a Value of OrdererAddresses as marshaled protobuf bytes
type OrdererAddresses struct {
	Addresses            []string `protobuf:"bytes,1,rep,name=addresses,proto3" json:"addresses,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *OrdererAddresses) Reset()         { *m = OrdererAddresses{} }
func (m *OrdererAddresses) String() string { return proto.CompactTextString(m) }
func (*OrdererAddresses) ProtoMessage()    {}
func (*OrdererAddresses) Descriptor() ([]byte, []int) {
	return fileDescriptor_cba1ec2883858369, []int{2}
}

func (m *OrdererAddresses) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_OrdererAddresses.Unmarshal(m, b)
}
func (m *OrdererAddresses) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_OrdererAddresses.Marshal(b, m, deterministic)
}
func (m *OrdererAddresses) XXX_Merge(src proto.Message) {
	xxx_messageInfo_OrdererAddresses.Merge(m, src)
}
func (m *OrdererAddresses) XXX_Size() int {
	return xxx_messageInfo_OrdererAddresses.Size(m)
}
func (m *OrdererAddresses) XXX_DiscardUnknown() {
	xxx_messageInfo_OrdererAddresses.DiscardUnknown(m)
}

var xxx_messageInfo_OrdererAddresses proto.InternalMessageInfo

func (m *OrdererAddresses) GetAddresses() []string {
	if m != nil {
		return m.Addresses
	}
	return nil
}

// Consortium represents the consortium context in which the channel was created
type Consortium struct {
	Name                 string   `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *Consortium) Reset()         { *m = Consortium{} }
func (m *Consortium) String() string { return proto.CompactTextString(m) }
func (*Consortium) ProtoMessage()    {}
func (*Consortium) Descriptor() ([]byte, []int) {
	return fileDescriptor_cba1ec2883858369, []int{3}
}

func (m *Consortium) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_Consortium.Unmarshal(m, b)
}
func (m *Consortium) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_Consortium.Marshal(b, m, deterministic)
}
func (m *Consortium) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Consortium.Merge(m, src)
}
func (m *Consortium) XXX_Size() int {
	return xxx_messageInfo_Consortium.Size(m)
}
func (m *Consortium) XXX_DiscardUnknown() {
	xxx_messageInfo_Consortium.DiscardUnknown(m)
}

var xxx_messageInfo_Consortium proto.InternalMessageInfo

func (m *Consortium) GetName() string {
	if m != nil {
		return m.Name
	}
	return ""
}

// Capabilities message defines the capabilities a particular binary must implement
// for that binary to be able to safely participate in the channel.  The capabilities
// message is defined at the /Channel level, the /Channel/Application level, and the
// /Channel/Orderer level.
//
// The /Channel level capabilties define capabilities which both the orderer and peer
// binaries must satisfy.  These capabilties might be things like a new MSP type,
// or a new policy type.
//
// The /Channel/Orderer level capabilties define capabilities which must be supported
// by the orderer, but which have no bearing on the behavior of the peer.  For instance
// if the orderer changes the logic for how it constructs new channels, only all orderers
// must agree on the new logic.  The peers do not need to be aware of this change as
// they only interact with the channel after it has been constructed.
//
// Finally, the /Channel/Application level capabilities define capabilities which the peer
// binary must satisfy, but which have no bearing on the orderer.  For instance, if the
// peer adds a new UTXO transaction type, or changes the chaincode lifecycle requirements,
// all peers must agree on the new logic.  However, orderers never inspect transactions
// this deeply, and therefore have no need to be aware of the change.
//
// The capabilities strings defined in these messages typically correspond to release
// binary versions (e.g. "V1.1"), and are used primarilly as a mechanism for a fully
// upgraded network to switch from one set of logic to a new one.
//
// Although for V1.1, the orderers must be upgraded to V1.1 prior to the rest of the
// network, going forward, because of the split between the /Channel, /Channel/Orderer
// and /Channel/Application capabilities.  It should be possible for the orderer and
// application networks to upgrade themselves independently (with the exception of any
// new capabilities defined at the /Channel level).
type Capabilities struct {
	Capabilities         map[string]*Capability `protobuf:"bytes,1,rep,name=capabilities,proto3" json:"capabilities,omitempty" protobuf_key:"bytes,1,opt,name=key,proto3" protobuf_val:"bytes,2,opt,name=value,proto3"`
	XXX_NoUnkeyedLiteral struct{}               `json:"-"`
	XXX_unrecognized     []byte                 `json:"-"`
	XXX_sizecache        int32                  `json:"-"`
}

func (m *Capabilities) Reset()         { *m = Capabilities{} }
func (m *Capabilities) String() string { return proto.CompactTextString(m) }
func (*Capabilities) ProtoMessage()    {}
func (*Capabilities) Descriptor() ([]byte, []int) {
	return fileDescriptor_cba1ec2883858369, []int{4}
}

func (m *Capabilities) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_Capabilities.Unmarshal(m, b)
}
func (m *Capabilities) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_Capabilities.Marshal(b, m, deterministic)
}
func (m *Capabilities) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Capabilities.Merge(m, src)
}
func (m *Capabilities) XXX_Size() int {
	return xxx_messageInfo_Capabilities.Size(m)
}
func (m *Capabilities) XXX_DiscardUnknown() {
	xxx_messageInfo_Capabilities.DiscardUnknown(m)
}

var xxx_messageInfo_Capabilities proto.InternalMessageInfo

func (m *Capabilities) GetCapabilities() map[string]*Capability {
	if m != nil {
		return m.Capabilities
	}
	return nil
}

// Capability is an empty message for the time being.  It is defined as a protobuf
// message rather than a constant, so that we may extend capabilities with other fields
// if the need arises in the future.  For the time being, a capability being in the
// capabilities map requires that that capability be supported.
type Capability struct {
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *Capability) Reset()         { *m = Capability{} }
func (m *Capability) String() string { return proto.CompactTextString(m) }
func (*Capability) ProtoMessage()    {}
func (*Capability) Descriptor() ([]byte, []int) {
	return fileDescriptor_cba1ec2883858369, []int{5}
}

func (m *Capability) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_Capability.Unmarshal(m, b)
}
func (m *Capability) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_Capability.Marshal(b, m, deterministic)
}
func (m *Capability) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Capability.Merge(m, src)
}
func (m *Capability) XXX_Size() int {
	return xxx_messageInfo_Capability.Size(m)
}
func (m *Capability) XXX_DiscardUnknown() {
	xxx_messageInfo_Capability.DiscardUnknown(m)
}

var xxx_messageInfo_Capability proto.InternalMessageInfo

func init() {
	proto.RegisterType((*HashingAlgorithm)(nil), "common.HashingAlgorithm")
	proto.RegisterType((*BlockDataHashingStructure)(nil), "common.BlockDataHashingStructure")
	proto.RegisterType((*OrdererAddresses)(nil), "common.OrdererAddresses")
	proto.RegisterType((*Consortium)(nil), "common.Consortium")
	proto.RegisterType((*Capabilities)(nil), "common.Capabilities")
	proto.RegisterMapType((map[string]*Capability)(nil), "common.Capabilities.CapabilitiesEntry")
	proto.RegisterType((*Capability)(nil), "common.Capability")
}

func init() { proto.RegisterFile("common/configuration.proto", fileDescriptor_cba1ec2883858369) }

var fileDescriptor_cba1ec2883858369 = []byte{
	// 318 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x6c, 0x91, 0x41, 0x6b, 0xf2, 0x40,
	0x10, 0x86, 0x89, 0x7e, 0x0a, 0x8e, 0x7e, 0x60, 0x97, 0x1e, 0xac, 0xf4, 0x10, 0x42, 0x91, 0x5c,
	0x4c, 0x5a, 0x7b, 0x29, 0xbd, 0xa9, 0x2d, 0x94, 0x5e, 0x0a, 0x11, 0x7a, 0xe8, 0x6d, 0x93, 0xac,
	0x9b, 0xc5, 0x64, 0x57, 0x66, 0x77, 0x5b, 0xf2, 0xab, 0xfa, 0x17, 0x8b, 0x59, 0x8b, 0x8a, 0xbd,
	0xcd, 0x33, 0xf3, 0xbc, 0x93, 0x09, 0x0b, 0xe3, 0x4c, 0x55, 0x95, 0x92, 0x71, 0xa6, 0xe4, 0x5a,
	0x70, 0x8b, 0xd4, 0x08, 0x25, 0xa3, 0x2d, 0x2a, 0xa3, 0x48, 0xd7, 0xcd, 0x82, 0x09, 0x0c, 0x5f,
	0xa8, 0x2e, 0x84, 0xe4, 0xf3, 0x92, 0x2b, 0x14, 0xa6, 0xa8, 0x08, 0x81, 0x7f, 0x92, 0x56, 0x6c,
	0xe4, 0xf9, 0x5e, 0xd8, 0x4b, 0x9a, 0x3a, 0xb8, 0x83, 0xab, 0x45, 0xa9, 0xb2, 0xcd, 0x13, 0x35,
	0x74, 0x1f, 0x58, 0x19, 0xb4, 0x99, 0xb1, 0xc8, 0xc8, 0x25, 0x74, 0xbe, 0x44, 0x6e, 0x8a, 0x26,
	0xf1, 0x3f, 0x71, 0x10, 0xdc, 0xc2, 0xf0, 0x0d, 0x73, 0x86, 0x0c, 0xe7, 0x79, 0x8e, 0x4c, 0x6b,
	0xa6, 0xc9, 0x35, 0xf4, 0xe8, 0x2f, 0x8c, 0x3c, 0xbf, 0x1d, 0xf6, 0x92, 0x43, 0x23, 0xf0, 0x01,
	0x96, 0x4a, 0x6a, 0x85, 0x46, 0xd8, 0xbf, 0xcf, 0xf8, 0xf6, 0x60, 0xb0, 0xa4, 0x5b, 0x9a, 0x8a,
	0x52, 0x18, 0xc1, 0x34, 0x79, 0x85, 0x41, 0x76, 0xc4, 0xcd, 0xce, 0xfe, 0x6c, 0x12, 0xb9, 0xdf,
	0x8b, 0x8e, 0xdd, 0x13, 0x78, 0x96, 0x06, 0xeb, 0xe4, 0x24, 0x3b, 0x5e, 0xc1, 0xc5, 0x99, 0x42,
	0x86, 0xd0, 0xde, 0xb0, 0x7a, 0x7f, 0xc4, 0xae, 0x24, 0x21, 0x74, 0x3e, 0x69, 0x69, 0xd9, 0xa8,
	0xe5, 0x7b, 0x61, 0x7f, 0x46, 0xce, 0xbe, 0x55, 0x27, 0x4e, 0x78, 0x6c, 0x3d, 0x78, 0xc1, 0x00,
	0xe0, 0x30, 0x58, 0xbc, 0xc3, 0x8d, 0x42, 0x1e, 0x15, 0xf5, 0x96, 0x61, 0xc9, 0x72, 0xce, 0x30,
	0x5a, 0xd3, 0x14, 0x45, 0xe6, 0x9e, 0x45, 0xef, 0x77, 0x7d, 0x44, 0x5c, 0x98, 0xc2, 0xa6, 0x3b,
	0x8c, 0x8f, 0xe4, 0xd8, 0xc9, 0x53, 0x27, 0x4f, 0xb9, 0x8a, 0x9d, 0x9f, 0x76, 0x9b, 0xce, 0xfd,
	0x4f, 0x00, 0x00, 0x00, 0xff, 0xff, 0x3b, 0xe7, 0x4b, 0x89, 0xf3, 0x01, 0x00, 0x00,
}
