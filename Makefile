DB_URL=postgresql://root:secret@localhost:5432/next-full-stack?sslmode=disable

# sync prisma schema to database
migrateup:
	npx prisma generate && npx prisma db push

# bring db changes to the codebase/prisma schemas
update-code:
	npx prisma db pull

seed:
	npx ts-node src/prisma/seed/index.ts

postgres:
	docker run --name postgres -p 5432:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret -d postgres:12-alpine

psql:
	 docker exec -it postgres psql -d next-full-stack

createdb:
	docker exec -it postgres createdb --username=root --owner=root next-full-stack

create-account:
	curl -X POST \
		-H "Content-Type: application/json" \
		-d '{"name": "John Doe", "email": "test@test.com", "password": "test"}' \
		http://localhost:3000/api/signup

test:
	npx jest --coverage