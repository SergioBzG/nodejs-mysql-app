--Archivo de creacion de la base de datos
CREATE DATABASE links_db;

USE links_db;
--User table
CREATE TABLE user(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

ALTER TABLE user ADD PRIMARY KEY (id);

ALTER TABLE user MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

--Links table
CREATE TABLE link(
    id INT(11) NOT NULL,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT(11),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FOREIGN KEY (user_id) REFERENCES user(id)
);

 --El campo created_at se llena automaticamente con la fecha y hora actual (DEFAULT CURRENT_TIMESTAMP)
ALTER TABLE link ADD PRIMARY KEY (id);

ALTER TABLE link MODIFY id INT(11) NOT NULL AUTO_INCREMENT;