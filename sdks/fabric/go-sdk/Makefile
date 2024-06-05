run-vendor:
	go mod edit -replace github.com/hyperledger-labs/weaver-dlt-interoperability/common/protos-go=../../../common/protos-go/
	go mod vendor

undo-vendor:
	rm -rf vendor
	go mod edit -dropreplace github.com/hyperledger-labs/weaver-dlt-interoperability/common/protos-go

build-local: run-vendor build undo-vendor

build:
	cd helpers && go build -v .
	cd asset-manager && go build -v .
	cd interoperablehelper && go build -v .

test-local: run-vendor test undo-vendor

test:
	cd helpers && go test -v .
	cd asset-manager && go test -v .
	cd interoperablehelper && go test -v .

clean:
	rm -rf vendor