FROM golang:1.22.5-alpine AS build
WORKDIR /usr/src/app
COPY go.mod .
COPY main.go .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-s -w" -o app main.go

FROM scratch
COPY --from=build /usr/src/app/app /usr/local/bin/app
CMD ["/usr/local/bin/app"]
