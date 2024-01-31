CREATE DATABASE task_backend;

USE task_backend;

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  uid NVARCHAR(255),
  title NVARCHAR(255),
  `status` TINYINT(0) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO
  tasks(title)
VALUES
  ('ReactJs');

SELECT
  *
FROM
  tasks