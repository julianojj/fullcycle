CREATE TABLE Categories(
    Id VARCHAR(36) PRIMARY KEY,
    Name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE Products(
    Id          VARCHAR(36) PRIMARY KEY,
    Name        VARCHAR(255) UNIQUE NOT NULL,
    Quantity INT NOT NULL,
    Price       DECIMAL(10, 2)      NOT NULL,
    CategoryId  VARCHAR(36)         NOT NULL
)
