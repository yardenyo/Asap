CREATE DATABASE IF NOT EXISTS asap;

DROP USER IF EXISTS 'asap_db_root'@'%';
-- password MD5('asap_db_root')
CREATE USER 'asap_db_root'@'%' IDENTIFIED WITH mysql_native_password BY '6855b1aecc09da47765f0ca8633f92a6';
GRANT ALL ON asap.* TO 'asap_db_root'@'%';
FLUSH PRIVILEGES;
