test:
	go test -coverprofile cover.out ./...
test-html:
	go tool cover -html cover.out -o coverage.html
front-watch:
	npm run watch
front-test:
	npm test
image-downloader-install:
	cd ./cmd/image_downloader; go install
image-downloader-run:
	cd ./cmd/image_downloader; go run main.go
