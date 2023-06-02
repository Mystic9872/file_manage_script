create database EZWEB;
use EZWEB;
create table user(
	id	INT	NOT	NULL Primary Key,
    name	VARCHAR(20)	NOT NULL,
    password	VARCHAR(20)	NOT NULL
);

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234';
select * from user;
insert into user values(0,'admin','sunrin');
SELECT * FROM user WHERE id = '' OR 1=1;