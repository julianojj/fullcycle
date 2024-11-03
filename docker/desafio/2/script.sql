CREATE TABLE People(
    Id VARCHAR(36) PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO People(Id, Name) VALUES('0192e37b-96f4-743e-abaf-0e609882c3fa', 'Juliano');
INSERT INTO People(Id, Name) VALUES('f50b1a3b-7e5f-4c8f-9f7e-2f7487b0a4a3', 'Maria');
INSERT INTO People(Id, Name) VALUES('b1b845a0-8e91-41c1-92e7-5d8b8d7c5c5f', 'Carlos');
INSERT INTO People(Id, Name) VALUES('ef21e004-1f3e-4d5e-bb08-59eaf8a6b5c0', 'Ana');
INSERT INTO People(Id, Name) VALUES('4d5a77a4-34e0-4829-8e37-0a20c5aeeb72', 'Fernando');
INSERT INTO People(Id, Name) VALUES('9c1c4a1a-c847-4c3f-a44c-56b4f6b2a3d5', 'Sofia');
INSERT INTO People(Id, Name) VALUES('c2878b65-1e3b-4d1d-90d8-f3b8a7693a6c', 'Ricardo');
INSERT INTO People(Id, Name) VALUES('d3f04570-8d8c-4a61-a3b8-337a9a52730b', 'Tatiane');
INSERT INTO People(Id, Name) VALUES('6b8c5a6b-9c7e-43f3-bfbb-9d7e8b7c34aa', 'Lucas');
INSERT INTO People(Id, Name) VALUES('a9e1d85b-d8ef-4908-a9ec-aba9731e2b99', 'Camila');
