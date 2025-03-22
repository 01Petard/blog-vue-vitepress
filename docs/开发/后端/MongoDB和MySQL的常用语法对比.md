---
title: MongoDB和MySQL的常用语法对比
date: 2024-07-10 12:47:00
updated: 2024-08-10 18:52:00
categories: 
- 学习
tags: 
- MongoDB
- MySQL
keywords:
- MongoDB
- MySQL
description: MongoDB和MySQL的常用语法对比
cover: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410212156404.png
top_img: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410212156404.png
---
| 方法 | 说明    | 语法                                                         |
| ---- | ------- | ------------------------------------------------------------ |
| 新增 | MongoDB | db.getCollection('user').insert({"userId" : "014","uclass" : "B","name" : "Back","age" : 11,"email" : "b14@sina.com","birthday" : ISODate("2018-07-31T03:46:13.885Z"),"dataStatus" : 1}); |
|      | MySQL   | INSERT INTO `sz-temp`.`user` (`userId`, `uclass`, `name`, `age`, `email`, `birthday`, `dataStatus`) VALUES ('014', 'B', 'Back13', '20', 'b14@sina.com', '2013-07-31 11:46:13', '0'); |

| 方法 | 说明    | 语法                                               |
| ---- | ------- | -------------------------------------------------- |
| 删除 | MongoDB | db.getCollection('user').remove({"userId":"014"}); |
|      | MySQL   | delete from user where userId = '014';             |

| 方法 | 说明    | 语法                                                         |
| ---- | ------- | ------------------------------------------------------------ |
| 修改 | MongoDB | db.getCollection('user').update({"userId":"013"}, {$set:{"email":"b13@sina.com", "age":20}}); |
|      | MySQL   | update user set email = 'b13@sina.com', age = 20 where userId = '013'; |

| 方法               | 说明    | 语法                                                         |
| ------------------ | ------- | ------------------------------------------------------------ |
| 查询所有           | MongoDB | db.getCollection('user').find({});                           |
|                    | MySQL   | select * from user;                                          |
| 查询条件：=        | MongoDB | db.getCollection('user').find({"age":16});等效于db.getCollection('user').find({"age":{$eq:16}}); |
|                    | MySQL   | select * from user where age = 16;                           |
| 查询条件：like     | MongoDB | db.getCollection('user').find({"name":/Ba/});                |
|                    | MySQL   | select * from user where name like '%Ba%';                   |
| 查询条件：distinct | MongoDB | db.getCollection('user').distinct("name");                   |
|                    | MySQL   | select distinct uclass from user u;                          |
| 查询条件：>        | MongoDB | db.getCollection('user').find({"age":{$gt:16}});             |
|                    | MySQL   | select * from user where age >16;                            |
| 查询条件：>=       | MongoDB | db.getCollection('user').find({"age":{$gte:16}});            |
|                    | MySQL   | select * from user where age >= 16;                          |
| 查询条件：<        | MongoDB | db.getCollection('user').find({"age":{$lt:16}});             |
|                    | MySQL   | select * from user where age < 16;                           |
| 查询条件：<=       | MongoDB | db.getCollection('user').find({"age":{$lte:16}});            |
|                    | MySQL   | select * from user where age 16;                             |
| 查询条件：or       | MongoDB | db.getCollection('user').find({$or:[{"uclass":"A"},{"class":"B"}]}); |
|                    | MySQL   | select * from user where uclass = 'A' or uclass = 'B';       |
| 查询条件：时间     | MongoDB | db.getCollection('user').find({"birthday":{$gt: new Date("2008-08-14T06:24:40.110Z"), $lt: new Date("2015-08-14T06:14:40.089Z")}}); |
|                    | MySQL   | select * from user where birthday > '2008-08-14 06:24:40' and birthday < '2015-08-14 06:14:40'; |
| 查询条件：count    | MongoDB | db.getCollection('user').find({"uclass":"A"}).count();       |
|                    | MySQL   | select count(1) from user where uclass = 'A';                |
| 查询条件：sort升序 | MongoDB | db.getCollection('user').find({}).sort({"age":1});           |
|                    | MySQL   | select * from user order by age asc;                         |
| 查询条件：sort降序 | MongoDB | db.getCollection('user').find({}).sort({"age":-1});          |
|                    | MySQL   | select * from user order by age desc;                        |