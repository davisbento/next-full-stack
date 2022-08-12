# sync prisma schema to database
update-db:
	npx prisma db push

# bring db changes to the codebase/prisma schemas
update-code:
	npx prisma db pull

create-account:
	curl -X POST \
		-H "Content-Type: application/json" \
		-d '{"email": "test@test.com", "password": "test"}' \
		http://localhost:3000/api/signup