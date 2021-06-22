backend-migrate:
	docker-compose exec backend go run ./tools/migrate.go

backend-test:
	docker-compose exec backend go test -v ./...

front-test:
	docker-compose exec front yarn test

front-lint:
	docker-compose exec front yarn lint

backend-lint:
	docker-compose exec backend staticcheck ./...
