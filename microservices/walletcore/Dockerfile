FROM golang:1.23

WORKDIR /usr/src/app

COPY . .

RUN apt-get update && apt-get install -y librdkafka-dev

# CMD ["tail", "-f", "/dev/null"]

CMD ["go", "run", "cmd/walletcore/main.go"]
