create database kdt;
use kdt;

create table users (
	id int auto_increment primary key,
    username varchar(50) unique not null,
    password varchar(500) not null,
    name varchar(20) not null,
    email varchar(50) not null,
    url varchar(200)
);

drop table users;
select * from users;

create table tweets (
	id int auto_increment primary key,
    userId int not null,
    createdAt datetime default now(),
    text varchar(2000) not null,
    foreign key(userid) references users(id)
);

select * from tweets;

SELECT u.id, u.username, u.name, u.url, tw.userId, tw.text, tw.createdAt FROM users as u
JOIN tweets as tw ON u.id =tw.userId ORDER BY tw.createAt DESC;

drop table tweets;