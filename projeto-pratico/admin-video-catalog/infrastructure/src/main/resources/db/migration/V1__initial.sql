CREATE TABLE Category (
    Id VARCHAR(36) PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description TEXT,
    IsActive BOOLEAN NOT NULL,
    CreatedAt DATETIME NOT NULL,
    UpdatedAt DATETIME NOT NULL,
    DeletedAt DATETIME
);
