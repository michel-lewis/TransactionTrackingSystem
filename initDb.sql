-- Création de la base de données
CREATE DATABASE TransactionDB;

-- Utilisation de la base de données
USE TransactionDB;

-- Création de la table Transaction
CREATE TABLE Transactions (
    id CHAR(36) NOT NULL PRIMARY KEY,  -- UUID (stocké sous forme de chaîne de 36 caractères)
    value INT NOT NULL,                -- Valeur de la transaction
    receiver VARCHAR(255) NOT NULL,    -- Destinataire de la transaction
    sender VARCHAR(255) NOT NULL,      -- Expéditeur de la transaction
    timestamp BIGINT NOT NULL,         -- Timestamp de la transaction
    confirmed BOOLEAN DEFAULT FALSE    -- Confirmation de la transaction, valeur par défaut FALSE
);
