---
title: MySql数据库命令
date: 2022-01-26 16:13:15
updated:
categories: 
- 学习
tags: 
- Mysql
keywords:
- Mysql
description: 涵盖了能用得到Mysql命令
cover: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd40RJxu6f27D-WN-Y2l5khctyeGywaWZWB0Ma6vP9pSaaYMKFLgT_efTeLQUQsjS4x9I&usqp=CAU
top_img: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrBtVoNNXsOC0nXSRP3HGLVgFaB0zBI0nOsPck1D1KfopBKLGz-vx2MCVfO4x2FLXe2g&usqp=CAU

---

开启数据库服务

```shell
# 先将路径放进环境变量中
export PATH=/usr/local/mysql/support-files:$PATH
# 完成以上操作后就可以直接用命令了⬇️⬇️
sudo mysql.server start
```

关闭数据库服务

```shell
sudo mysql.server stop
```

登陆数据库

```shell
cd /usr/local/MySQL/bin
mysql -u root -p12345678
```

显示数据库

```sql
show databases;
```

创建数据库

```sql
create databases 数据库名;
```

删除数据库

```sql
drop database 表名;
```

打开数据库

```sql
use 数据库名;
```

显示当前数据库内的表

```sql
show tables;
```

查看表结构

```sql
desc 表名;
```

查询表的索引

```sql
show index form 表名;
```

![image-20220127160432110](https://tva1.sinaimg.cn/large/e6c9d24egy1gznt0gfadxj21xe06sabx.jpg)

![img](https://img2020.cnblogs.com/blog/1436863/202005/1436863-20200507100522709-1803986961.png)

新建（唯一）索引

```sql
create (unique) index 索引名 on 表名(列名);
```

删除索引

```sql
--当索引被引用时不能删除，必须先删除所有引用了索引的约束--
alter table 表名 drop index 索引名 (on 表名);
```

创建表

```sql
--可加可不加--
drop table 表名 if exist;
create table 表名(
    integer(整型) not null primary key auto_increment,
    varchar(字符串类型，必须要跟最大字符串),
    text(大文本),
    float(单精度，即7-8位有效数字),
    double(双精度，即15-16位有效数字),
    date(只有年月日),
    time（只有时分秒),
    datetime(既有年月日，又有时分秒),
);
eg1.主键+外键
CREATE table course(
    cno char(7) not null PRIMARY KEY,
    cname VARCHAR(7) not null,
    ccredit int(2) not null,
    cpno char(7) REFERENCES course(con)
);
eg2.复合主键+复合外键（多对多情况）
CREATE table sc(
    sno char(7),
    cno char(7),
    score DECIMAL(4,1),
    point DECIMAL(2,1)
    PRIMARY key(sno,cno),
    FOREIGN key sno REFERENCES students(sno),
    FOREIGN key cno REFERENCES course(cno)
);
```

查看新建表的命令/查看表约束和索引

```sql
 show create table 表名;
```

查询表

```sql
select 列名 form 表名 (join 从表 on 条件) where 条件 having 条件 group by 列名 order by 列名 (asc) limit 数量;
```

插入表

```sql
insert into 表名(列名1,列名2,...) values(value1,value2,...);
```

修改表

```sql
1、添加列
alter table 表名 add 列名 类型;
2、修改列
alter table 表名 change 列名 (新列名) 类型;
3、删除列
alter table 表名 drop 列名;
4、添加主键约束
(4.1)、单主键
alter table 表名 add constraint primary key(列名);
(4.2)、复合主键（注意顺序）
alter table 表名 add constraint primary key(列名1,列名2,...);
5、添加外键约束
(5.1)、单外键（单外键可以和复合主键中的单键相连，但是这样会不稳定）
alter table 表名 add foreign key(列名) references 外表(主键);
(5.2)、复合外键（注意顺序）
alter table 表名 add foreign key(列名1,列名2,...) references 外表(主键1,主键2,...);
6、删除主键约束（主键在链接了外键的情况下不能删除）
alter table 表名 drop primary key;
7、删除外键约束
alter table 表名 drop constraint 约束名 (on 表名)；
```

复合主/外键内部是有顺序的，请注意！顺序由创建时决定![image-20220127172122931](https://tva1.sinaimg.cn/large/e6c9d24egy1gznt0ihzehj2142070dgb.jpg)

![image-20220127172640923](https://tva1.sinaimg.cn/large/e6c9d24egy1gznt0f7tr3j212g05ujs8.jpg)

单键可以和复合主键的单键相连，但是不建议这么做![image-20220127171218341](https://tva1.sinaimg.cn/large/e6c9d24egy1gznt15c5g2j213i05udgn.jpg)

删除表

```sql
drop table 表名;
```

清空表

```sql
delete from 表名;
```
