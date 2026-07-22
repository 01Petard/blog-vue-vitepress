# TDengine核心SQL

## 一、库操作

1. 创建库

```sql
CREATE DATABASE IF NOT EXISTS axiom KEEP 365 DAYS 10 REPLICA 1;
```

1. 切换库（**无 database 关键字**）

```sql
USE axiom;
```

1. 查看当前库

```sql
SELECT current_database();
```

1. 删除整库（清空所有表 / 流 / CQ，测试环境快速重置）

```sql
DROP DATABASE IF EXISTS axiom;
```

1. 查看所有库

```sql
SHOW DATABASES;
```

## 二、超级表 STABLE（核心）

### 1. 创建超级表

```sql
CREATE STABLE IF NOT EXISTS axiom.hzx_1234 (
  ts TIMESTAMP,
  val FLOAT,
  msg NCHAR(64)
) TAGS (
  device_id NCHAR(32),
  line_no INT
);
```

### 2. 查看表结构

```sql
DESC axiom.hzx_1234;
SHOW CREATE STABLE axiom.hzx_1234;
```

### 3. 修改超级表 ALTER STABLE

```sql
-- 新增普通列
ALTER STABLE axiom.hzx_1234 ADD COLUMN temp DOUBLE;
-- 删除普通列（3.0+）
ALTER STABLE axiom.hzx_1234 DROP COLUMN temp;
-- 扩容字段长度
ALTER STABLE axiom.hzx_1234 MODIFY COLUMN msg NCHAR(128);

-- 新增标签
ALTER STABLE axiom.hzx_1234 ADD tag type NCHAR(16);
-- 删除标签（3.0+）
ALTER STABLE axiom.hzx_1234 DROP tag type;

-- 修改存储属性
ALTER STABLE axiom.hzx_1234 KEEP 730 DAYS 15;
-- 重命名超级表
ALTER STABLE axiom.hzx_1234 RENAME TO axiom.hzx_new;
```

### 4. 删除超级表

- 3.0+ 级联删子表（推荐，必须带库前缀避免报错）

```sql
DROP STABLE IF EXISTS axiom.hzx_1234 CASCADE;
```

- 2.x 无 CASCADE，需先删子表再删 STABLE

```sql
DROP STABLE IF EXISTS axiom.hzx_1234;
```

### 5. 查询全部超级表

```sql
SELECT stable_name FROM information_schema.ins_stables WHERE db_name='axiom';
-- 批量生成删除语句
SELECT CONCAT('DROP STABLE IF EXISTS axiom.',stable_name,' CASCADE;') drop_sql
FROM information_schema.ins_stables WHERE db_name='axiom';
```

## 三、子表 TABLE（测点表，依附 STABLE）

1. 创建子表绑定超级表 + 标签

```sql
CREATE TABLE IF NOT EXISTS axiom.tb_001 USING axiom.hzx_1234 TAGS('dev001',1);
```

1. 删除子表

```sql
DROP TABLE IF EXISTS axiom.tb_001;
```

1. 查询某超级表下所有子表

```sql
SELECT tb_name FROM information_schema.ins_tables WHERE db_name='axiom' AND stable_name='hzx_1234';
```

1. 更新子表标签值

```sql
UPDATE axiom.tb_001 SET device_id='dev002';
```

## 四、增删改查 DML

1. 插入单条

```sql
INSERT INTO axiom.tb_001 VALUES(NOW,25.5,'正常');
```

1. 批量插入多行

```sql
INSERT INTO axiom.tb_001 VALUES
('2026-01-01 00:00:00',24,'A'),
('2026-01-01 00:01:00',26,'B');
```

1. 查询（支持聚合、标签过滤、窗口）

```sql
SELECT ts,val FROM axiom.hzx_1234 WHERE device_id='dev001' AND ts >= NOW - 1h;
-- 10分钟滚动均值
SELECT AVG(val) FROM axiom.hzx_1234 INTERVAL(10m);
```

1. 更新 / 删除（仅支持按主键 ts 精准操作，不支持大范围批量删）

```sql
UPDATE axiom.tb_001 SET val=28 WHERE ts='2026-01-01 00:00:00';
DELETE FROM axiom.tb_001 WHERE ts='2026-01-01 00:00:00';
```

## 五、流 Stream / 连续查询 CQ（实时计算）

```sql
-- 创建流
CREATE STREAM stream_hzx INTO axiom.hzx_stat AS
SELECT ts,AVG(val) avg_val FROM axiom.hzx_1234 INTERVAL(5m);

SHOW STREAMS;
STOP STREAM stream_hzx;
DROP STREAM IF EXISTS stream_hzx;

-- 连续查询CQ
SHOW CQ;
DROP CQ IF EXISTS cq_name;
```

## 六、常见避坑规则

1. `USE 库名;` 多行批量执行时上下文易丢失，DDL 建议**表前加库前缀** `axiom.xxx`；
2. 3.0 删除 STABLE 带`CASCADE`自动清理所有子表，2.x 不支持该关键字；
3. 修改字段仅允许**扩容 / 向上兼容类型**，不能缩长度、降级数值类型；
4. 存在 Stream/CQ/ 订阅时，无法删除 STABLE，需先停删流、CQ；
5. 不支持大范围 DELETE，海量数据删除依赖 TTL 自动过期或删表重建；
6. 报错 `Database not specified` 统一解决方案：放弃 use，全限定表名书写 SQL。