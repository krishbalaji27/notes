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

 13/08/22

insert into topics values (null,'Data Structures' , Null);
insert into topics values (null, 'Array' , 1);
select * from topics;
insert into topicActivation values (null,1,1);
insert into topicActivation values (null,2,1);
insert into content values (null,2,'Definition','it is the simplest data structure where each data element can be accessed directly by only using its index number.',1);
select * from content;