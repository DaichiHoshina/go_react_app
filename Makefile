backend-migrate:
	docker-compose exec backend go run ./tools/migrate.go

backend-test:
	docker-compose exec backend go test -v ./...

# staticcheck
backend-lint:
	docker-compose exec backend staticcheck ./...
