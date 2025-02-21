CREATE TABLE Clients(
    Id VARCHAR(36) PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    CreatedAt TIMESTAMP DEFAULT NOW(),
    UpdatedAt TIMESTAMP DEFAULT NOW()
);

CREATE TABLE Accounts(
    Id VARCHAR(36) PRIMARY KEY,
    ClientId VARCHAR(36) NOT NULL,
    Balance DECIMAL(10, 2) DEFAULT 0.00,
    CreatedAt TIMESTAMP DEFAULT NOW(),
    UpdatedAt TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (ClientId) REFERENCES Clients(Id)
);

CREATE TABLE Transactions(
    Id VARCHAR(36) PRIMARY KEY,
    AccountFromId VARCHAR(36) NOT NULL,
    AccountToId VARCHAR(36) NOT NULL,
    Amount DECIMAL(10, 2) NOT NULL,
    CreatedAt TIMESTAMP DEFAULT NOW()
);


INSERT INTO Clients(Id, Name, Email) VALUES('ee8005e3-0c60-4973-838d-1ce2cc13d93d', 'Juliano', 'juliano@test.com');
INSERT INTO Clients(Id, Name, Email) VALUES('706300ef-bb46-446a-a7cf-5b990cb7a3b3', 'Silva', 'silva@test.com');

INSERT INTO Accounts(Id, ClientId,  Balance) VALUES('81cff9a2-bf2b-48dc-b7fb-69e29d3fcf3c', 'ee8005e3-0c60-4973-838d-1ce2cc13d93d', 1000);
INSERT INTO Accounts(Id, ClientId, Balance) VALUES('d8003477-60e6-4899-8c83-e0d0cbde07d7', '706300ef-bb46-446a-a7cf-5b990cb7a3b3', 0);
