DROP DATABASE IF EXISTS glossaryDB;
CREATE DATABASE glossaryDB;
USE glossaryDB;

CREATE TABLE glossary (
  _id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  definition VARCHAR(300) NOT NULL
);

INSERT INTO glossary (name, definition) VALUES ('hello', 'bozo');
INSERT INTO glossary (name, definition) VALUES ('hello1', 'bozo1');
INSERT INTO glossary (name, definition) VALUES ('hello2', 'bozo2');
INSERT INTO glossary (name, definition) VALUES ('hello3', 'bozo3');


