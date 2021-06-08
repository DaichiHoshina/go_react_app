backend-test:
	docker-compose exec backend go test -v ./usecase/interactor

# staticcheck
backend-lint:
	docker-compose exec backend staticcheck ./...
