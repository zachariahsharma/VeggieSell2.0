show databases;
create database MyDemo;
use MyDemo;
create table student(Grade int, Namer varchar(10));
insert into student values(5, 'rahul');
insert into student values(6, 'ZACH');
insert into student values(4, 'Sahil');
select * from student;
show tables;
desc student;
select Grade from student;
select * from student where Grade = 6;
select * from student order by Grade;
select * from student;
delete from student where Grade = 4 and Namer = 'Sahil';
create table signindata(email varchar(100) unique key, pwd varchar(100));
insert into signindata values('zachariah.sharma@gmail.com', 'bla')