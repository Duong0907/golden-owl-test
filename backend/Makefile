run_db:
	docker run -d --name golden-owl-test -p 5434:5432 -e POSTGRES_PASSWORD=mysecretpassword -e POSTGRES_DB=entrance_exam -e PGDATA=/var/lib/postgresql/data/pgdata -v /postgresql/data:/var/lib/postgresql/data postgres:12-alpine

gen_seed:
	npx sequelize-cli seed:generate --name seed-candidates

seed:
	npx sequelize-cli db:seed:all

migrate:
	npx sequelize-cli db:migrate
