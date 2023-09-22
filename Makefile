test:
	go test -coverprofile cover.out ./...
test-html:
	go tool cover -html cover.out -o coverage.html
build-front:
	npm run build