test:
	go test -coverprofile cover.out ./...
test-html:
	go tool cover -html cover.out -o coverage.html
front-watch:
	npm run watch
front-test:
	npm test
