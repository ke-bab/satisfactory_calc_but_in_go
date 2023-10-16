test:
	go test -coverprofile cover.out ./...
test-html:
	go tool cover -html cover.out -o coverage.html
watch:
	npm run watch
test-front:
	npm test
download-images:
	cd ./cmd/image_downloader; go run main.go
