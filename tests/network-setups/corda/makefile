.PHONY: start
start: github.properties
	./scripts/generate.sh
	./scripts/get-cordapps.sh
	./scripts/start-nodes.sh

.PHONY: start-house
start-house:
	./gradlew clean prepareDockerNodes
	./scripts/get-house-cordapps.sh
	./scripts/get-cordapps.sh
	./scripts/start-house-nodes.sh

.PHONY: start-house-local
start-house-local:
	./gradlew clean prepareDockerNodes
	./scripts/get-house-cordapps.sh local
	./scripts/get-cordapps.sh local
	./scripts/start-house-nodes.sh

.PHONY: start-local
start-local:
	./scripts/generate.sh
	./scripts/get-cordapps.sh local
	./scripts/start-nodes.sh

.PHONY: restart-with-new-interop-app
restart-with-new-interop-app: stop
	cd ../../../core/network/corda-interop-app && ./gradlew clean jar
	./scripts/get-cordapps.sh local
	./scripts/start-nodes.sh

.PHONY:	stop
stop: 
	docker-compose down

.PHONY: clean
clean:	stop
	./gradlew clean
	rm shared/artifacts/*.jar || true
