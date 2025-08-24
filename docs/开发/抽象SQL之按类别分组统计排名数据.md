最近在牛客上看到了一道有意思的sql题

# 建表语句
先看库表语句
```sql
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for order_info
-- ----------------------------
DROP TABLE IF EXISTS `order_info`;
CREATE TABLE `order_info` (
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `order_date` date NOT NULL,
  `total_amount` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_info_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product_info` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of order_info
-- ----------------------------
BEGIN;
INSERT INTO `order_info` (`order_id`, `product_id`, `order_date`, `total_amount`) VALUES (101, 1, '2024-04-15', 5000.00);
INSERT INTO `order_info` (`order_id`, `product_id`, `order_date`, `total_amount`) VALUES (102, 1, '2024-05-20', 3000.00);
INSERT INTO `order_info` (`order_id`, `product_id`, `order_date`, `total_amount`) VALUES (103, 2, '2024-04-10', 7000.00);
INSERT INTO `order_info` (`order_id`, `product_id`, `order_date`, `total_amount`) VALUES (104, 3, '2024-06-05', 10000.00);
INSERT INTO `order_info` (`order_id`, `product_id`, `order_date`, `total_amount`) VALUES (105, 2, '2024-07-01', 6000.00);
COMMIT;

-- ----------------------------
-- Table structure for product_info
-- ----------------------------
DROP TABLE IF EXISTS `product_info`;
CREATE TABLE `product_info` (
  `product_id` int NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `category` varchar(50) NOT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of product_info
-- ----------------------------
BEGIN;
INSERT INTO `product_info` (`product_id`, `product_name`, `category`) VALUES (1, 'iPhone 15', '手机');
INSERT INTO `product_info` (`product_id`, `product_name`, `category`) VALUES (2, 'Galaxy S24', '手机');
INSERT INTO `product_info` (`product_id`, `product_name`, `category`) VALUES (3, 'MacBook Pro', '电脑');
COMMIT;

-- ----------------------------
-- Table structure for supplier_info
-- ----------------------------
DROP TABLE IF EXISTS `supplier_info`;
CREATE TABLE `supplier_info` (
  `product_id` int NOT NULL,
  `supplier_name` varchar(100) NOT NULL,
  PRIMARY KEY (`product_id`),
  CONSTRAINT `supplier_info_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product_info` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of supplier_info
-- ----------------------------
BEGIN;
INSERT INTO `supplier_info` (`product_id`, `supplier_name`) VALUES (1, 'Apple Inc.');
INSERT INTO `supplier_info` (`product_id`, `supplier_name`) VALUES (2, 'Samsung');
INSERT INTO `supplier_info` (`product_id`, `supplier_name`) VALUES (3, 'Apple Inc.');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
```

# 题目

题目是这样的：查询2024年第二季度所有类别的商品的销售额排名

# 结果

两个sql的结果都是一样的

```
product_id product_name q2_2024_sales_total supplier_name  category_rank
1	        iPhone 15	    8000.00	           Apple Inc.	    1
2	        Galaxy S24	    7000.00	           Samsung	        2
3	        MacBook Pro.   	10000.00	       Apple Inc.	    1
```

# 逆天sql
题目中等难度，但是当我看到下面的sql时，有点懵😳
```sql
SELECT 
    product_id,
    product_name,
    SUM(COALESCE(total_amount, 0)) AS q2_2024_sales_total,
    supplier_name,
    RANK() OVER (
        PARTITION BY category 
        ORDER BY COALESCE(SUM(total_amount), 0) DESC
    ) AS category_rank
FROM product_info s1
LEFT JOIN (
    SELECT * 
    FROM order_info 
    WHERE DATE_FORMAT(order_date, '%y%m') BETWEEN 2404 AND 2406
) s2 USING (product_id)
LEFT JOIN supplier_info s3 USING (product_id)
GROUP BY 1, 2, category, 4
ORDER BY 1;
```

# 批判
我猛的一看，发现这sql不简单，太不讲武德了，上来就是一个`COALESCE()`函数和`RANK()`函数，还自带`PARTITION BY`的分组，还好我都防住了😅，结果后面就不讲武德了，你看看左连接的是个什么玩意儿
```sql
LEFT JOIN (
    SELECT * 
    FROM order_info 
    WHERE DATE_FORMAT(order_date, '%y%m') BETWEEN 2404 AND 2406
) s2 USING (product_id)
```
先不提`DATE_FORMAT()`函数会让索引失效吧，你把这东西作为连表的内容，你是觉得让人看懂你的关联条件太简单了不行是吧，还搞`USING()`函数……😅
你直接这样不就行了吗：
```sql
LEFT JOIN order_info o 
    ON p.product_id = o.product_id
   AND o.order_date >= '2024-04-01'
   AND o.order_date <  '2024-07-01'
```
然后就是分组了，我就不明白，为什么好好的group by要写数字，你写列名不好吗？👎
```sql
GROUP BY 1, 2, category, 4
```
就不能改成这样吗：
```sql
GROUP BY 
    p.product_id, 
    p.product_name, 
    p.category, 
    s.supplier_name
```

不得不承认，上面这个查询sql是有点炫技的成分，但是如果是项目中写了这样的sql出来，只会让人很生气

# 合理sql
最后，直接让它现回原形吧：
```sql
SELECT 
    p.product_id,
    p.product_name,
    COALESCE(SUM(o.total_amount), 0) AS q2_2024_sales_total,
    s.supplier_name,
    RANK() OVER (
        PARTITION BY p.category 
        ORDER BY COALESCE(SUM(o.total_amount), 0) DESC
    ) AS category_rank
FROM product_info p
LEFT JOIN order_info o 
    ON p.product_id = o.product_id
   AND o.order_date >= '2024-04-01'
   AND o.order_date <  '2024-07-01'
LEFT JOIN supplier_info s
    ON p.product_id = s.product_id
GROUP BY 
    p.product_id, 
    p.product_name, 
    p.category, 
    s.supplier_name
ORDER BY p.product_id;
```

