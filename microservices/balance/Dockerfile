FROM golang:1.23

WORKDIR /usr/src/app

COPY . .

RUN apt-get update && apt-get install -y librdkafka-dev
RUN go mod tidy
# CMD ["tail", "-f", "/dev/null"]
