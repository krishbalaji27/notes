create table user_details (name varchar(20), mail varchar(30), password varchar(20), profession varchar(20));
select * from user_details;
alter table user_details add id int(5) primary key auto_increment;

create table topics (
 id int primary key auto_increment,
 name varchar(20),
 parentId int,
 constraint cname FOREIGN KEY (parentId)
REFERENCES topics(id) ON UPDATE CASCADE ON DELETE CASCADE
 );

 create table content (
  id int primary key auto_increment,
  topicId int,
  category varchar(20),
  value varchar(200),
  userId int,
  constraint topicId_ckn FOREIGN KEY (topicId)
REFERENCES topics(id) ON UPDATE CASCADE ON DELETE CASCADE,
constraint userId_ckn FOREIGN KEY (userId)
REFERENCES user_details(id) ON UPDATE CASCADE ON DELETE CASCADE
);

create table topicActivation (
 id int primary key auto_increment,
  topicId int,
  userId int,
  constraint topicId_ckn_1 FOREIGN KEY (topicId)
REFERENCES topics(id) ON UPDATE CASCADE ON DELETE CASCADE,
constraint userId_ckn_1 FOREIGN KEY (userId)
REFERENCES user_details(id) ON UPDATE CASCADE ON DELETE CASCADE
 );