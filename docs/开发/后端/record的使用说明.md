# 什么是 `record`？

在 Java 14 中引入的 `record` 是一种特殊的类，旨在简化不可变数据对象的创建。它本质上是一个**不可变的数据载体**，用于存储一组相关的字段值，并自动生成常见的方法（如构造器、`toString()`、`equals()` 和 `hashCode()` 等）。使用 `record` 可以显著减少样板代码。

## `record` 的主要用途
1. **数据载体**：用于表示简单的数据结构，例如 DTO（数据传输对象）、VO（值对象）等。
2. **不可变性**：`record` 的字段是 `final` 的，确保对象的状态不可变。
3. **自动生成方法**：自动提供构造器、`toString()`、`equals()` 和 `hashCode()` 方法。
4. **替代传统 POJO**：替代传统的 POJO（Plain Old Java Object），减少样板代码。

## 使用 `record` 的意义

- 减少样板代码。
- 自动生成常用方法（如 `toString()`、`equals()` 和 `hashCode()`）。
- 强制不可变性，适合用作数据载体。

## 可以使用 `record` 的场景

- 数据传输对象（DTO）。
- 值对象（VO）。
- 不需要复杂行为的简单数据结构。

---

# 如何使用 `record`？

以下是一个简单的例子，展示如何定义和使用 `record`：

```java
public record Person(String name, int age) {
}

class Main {
    public static void main(String[] args) {
        // 创建一个 Person 对象
        Person person = new Person("Alice", 30);

        // 访问字段
        System.out.println("Name: " + person.name());
        System.out.println("Age: " + person.age());

        // 调用自动生成的方法
        System.out.println(person); // 输出: Person[name=Alice, age=30]
        System.out.println(person.equals(new Person("Alice", 30))); // 输出: true
    }
}
```

## 输出结果
```
Name: Alice
Age: 30
Person[name=Alice, age=30]
true
```

---

# 完善后的 `record` 模板

以下是改进后的 `record` 模板，包含了注释和一些常见功能的扩展：

```java
#if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")
package ${PACKAGE_NAME};

#end
#parse("File Header.java")
/**
 * ${NAME} 数据载体类
 * 
 * @author ${USER}
 * @since ${YEAR}-${MONTH}-${DAY} ${HOUR}:${MINUTE}:${SECOND}
 */
public record ${NAME}(
    #if (${FIELDS} && ${FIELDS} != "")
    ${FIELDS}
    #else
    String field1,
    int field2
    #end
) {

    /**
     * 构造器示例。
     * 如果需要对字段进行额外验证或初始化，可以在此处添加紧凑构造器。
     */
    public ${NAME} {
        // 示例：字段验证
        if (field1 == null || field1.isEmpty()) {
            throw new IllegalArgumentException("field1 不能为空");
        }
        if (field2 <= 0) {
            throw new IllegalArgumentException("field2 必须大于 0");
        }
    }

    /**
     * 示例方法：根据字段生成某种格式的字符串。
     *
     * @return 格式化后的字符串
     */
    public String toFormattedString() {
        return String.format("Field1: %s, Field2: %d", field1, field2);
    }

    /**
     * 示例静态工厂方法：创建 ${NAME} 实例。
     *
     * @param field1 字段1
     * @param field2 字段2
     * @return 新的 ${NAME} 实例
     */
    public static ${NAME} of(String field1, int field2) {
        return new ${NAME}(field1, field2);
    }
}
```


## 模板说明
1. **字段定义**：
   - 模板中预定义了两个字段 `field1` 和 `field2`，您可以根据需要替换为实际的字段名。
   - 如果您在 IDE 中支持动态字段输入（例如 `${FIELDS}`），可以根据实际情况传入字段列表。

2. **紧凑构造器**：
   - 在 `record` 中，紧凑构造器允许对字段进行验证或初始化。例如，检查字段是否为空或是否符合某些条件。

3. **示例方法**：
   - 提供了一个 `toFormattedString` 方法，用于生成格式化的字符串。
   - 这种方法可以用于日志记录或调试。

4. **静态工厂方法**：
   - 提供了一个静态工厂方法 `of`，用于创建 `record` 实例。这在某些场景下比直接调用构造器更灵活。

5. **注释**：
   - 添加了详细的注释，便于理解每个部分的功能。

---

## 使用示例

假设我们定义了一个 `Product` `record`，用于表示商品信息：

```java
package com.example.records;

/**
 * Product 数据载体类
 *
 * @author Qwen
 * @since 2025-04-10 09:40:00
 */
public record Product(
    String name,
    double price
) {

    /**
     * 验证商品名称和价格是否有效。
     */
    public Product {
        if (name == null || name.isEmpty()) {
            throw new IllegalArgumentException("商品名称不能为空");
        }
        if (price <= 0) {
            throw new IllegalArgumentException("商品价格必须大于 0");
        }
    }

    /**
     * 格式化商品信息。
     *
     * @return 格式化后的字符串
     */
    public String toFormattedString() {
        return String.format("商品名称: %s, 价格: %.2f", name, price);
    }

    /**
     * 静态工厂方法：创建 Product 实例。
     *
     * @param name  商品名称
     * @param price 商品价格
     * @return 新的 Product 实例
     */
    public static Product of(String name, double price) {
        return new Product(name, price);
    }
}
```


## 测试代码

```java
package com.example;

import com.example.records.Product;

public class Main {
    public static void main(String[] args) {
        // 使用构造器创建 Product 对象
        Product product1 = new Product("Laptop", 999.99);
        System.out.println(product1.toFormattedString());

        // 使用静态工厂方法创建 Product 对象
        Product product2 = Product.of("Smartphone", 499.99);
        System.out.println(product2);

        // 测试字段访问
        System.out.println("商品名称: " + product1.name());
        System.out.println("商品价格: " + product1.price());
    }
}
```


## 输出结果
```
商品名称: Laptop, 价格: 999.99
Product[name=Smartphone, price=499.99]
商品名称: Laptop
商品价格: 999.99
```

---