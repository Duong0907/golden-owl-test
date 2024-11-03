run_db:
	docker run -d --name go-db -p 5434:5432 -e POSTGRES_PASSWORD=mysecretpassword -e POSTGRES_DB=entrance_exam -e PGDATA=/var/lib/postgresql/data/pgdata -v /postgresql/data:/var/lib/postgresql/data postgres:12-alpine

gen_seed:
	npx sequelize-cli seed:generate --name seed-candidates

seed:
	npx sequelize-cli db:seed:all

migrate:
	npx sequelize-cli db:migrate

build_be:
	docker build -t go-be .

run_be:
	docker run --name go-be -p 8080:8080 -e DB_HOST=172.17.0.2 -e DB_USER=postgres -e DB_PASSWORD=mysecretpassword -e DB=entrance_exam -e DB_DIALECT=postgres -e DB_PORT=5432 -e SSL_MODE=false go-be