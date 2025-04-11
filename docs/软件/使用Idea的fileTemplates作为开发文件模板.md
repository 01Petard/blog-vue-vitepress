### 使用 IntelliJ IDEA 文件和代码模板的心得分享

在日常开发中，我们经常需要创建大量的类、接口、枚举等文件。如果每次都要手动编写重复的代码结构（如包声明、注释、构造器等），不仅耗时耗力，还容易出错。幸运的是，IntelliJ IDEA 提供了强大的 **文件和代码模板** 功能，可以帮助我们快速生成标准化的代码结构，提高开发效率。

在这篇博客中，我将分享我在使用 IntelliJ IDEA 文件和代码模板过程中的一些心得和技巧。

# 如何配置文件模板？

## 1. 打开模板设置

在 IntelliJ IDEA 中，可以通过以下步骤进入文件模板配置页面：

- 打开 `File` → `Settings`  /  `IntelliJ IDEA` → `Preferences`。
- 导航到 `Editor` → `File and Code Templates`。

## 2. 编辑模板

在 `File and Code Templates` 页面中，可以看到多个选项卡：

- **Files**：用于定义新文件的模板，例如类、接口、枚举等。
- **Includes**：用于定义可复用的代码片段（如文件头注释）。
- **Code**：用于定义代码片段模板。

你可以选择一个模板进行编辑，或者点击右侧的 `+` 按钮创建新的模板。

## 3. 使用模板的好处

1. **提高开发效率**：
   - 自动生成标准化的代码结构，减少手动输入的工作量。
   - 避免因手写代码而引入的语法错误。
2. **统一代码风格**：
   - 团队成员可以共享相同的模板，确保代码风格一致。
   - 自动添加注释、作者信息、日期等元数据，便于维护和追溯。
3. **减少重复劳动**：
   - 对于频繁使用的代码结构（如 DTO、VO、异常类等），可以直接通过模板生成，节省时间。
4. **支持扩展性**：
   - 可以根据项目需求定制模板，例如添加特定的注解、字段或方法。

## 4. 一些小技巧

1. **复用文件头注释**：
   - 在 `Includes` 标签下定义一个通用的文件头注释模板（如 `File Header.java`），然后在其他模板中通过 `#parse("File Header.java")` 引用。
2. **动态生成字段**：
   - 如果你的模板需要动态生成字段，可以通过 IDE 插件或脚本实现更复杂的逻辑。
3. **团队协作**：
   - 将模板导出为 `.jar` 文件，分享给团队成员，确保大家使用相同的模板。
4. **定期优化模板**：
   - 随着项目的进展，不断优化和调整模板，使其更贴合实际需求。

# 常见模板示例

以下是几种常见的模板示例，覆盖了不同类型的代码需求。

## 1. Class

类的使用广泛，不能写得太死，所以只需要提供毕业的头注释即可

```java
#if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};

#end
#parse("File Header.java")
/**
 * ${NAME}
 * 
 * @author ${USER}
 * @since ${YEAR}-${MONTH}-${DAY} ${HOUR}:${MINUTE}:${SECOND}
 */
public class ${NAME} {
}
```

## 2. Interface

接口的使用也广泛，虽然一般都是用于业务的接口，因此也不能写太死

```java
#if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")
package ${PACKAGE_NAME};

#end
#parse("File Header.java")
/**
 * ${NAME} 接口
 * 
 * @author ${USER}
 * @since ${YEAR}-${MONTH}-${DAY} ${HOUR}:${MINUTE}:${SECOND}
 */
public interface ${NAME} {
}
```

## 3. Enum

枚举一般定义常量值，比如异常值、业务关键字、常量等等，用到时往往需要回想怎么样，这就成了一件苦恼的事，所以这就需要配置模板了

```java
#if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")
package ${PACKAGE_NAME};

#end
#parse("File Header.java")
/**
 * ${NAME} 枚举类
 * 
 * @author ${USER}
 * @since ${YEAR}-${MONTH}-${DAY} ${HOUR}:${MINUTE}:${SECOND}
 */
public enum ${NAME} {
    
    // 枚举常量定义示例
    CONSTANT_ONE("Value1", "描述1"),
    CONSTANT_TWO("Value2", "描述2");

    // 枚举字段
    private final String value;
    private final String description;

    /**
     * 构造函数
     *
     * @param value        枚举值
     * @param description  描述信息
     */
    ${NAME}(String value, String description) {
        this.value = value;
        this.description = description;
    }

    /**
     * 获取枚举值
     *
     * @return 枚举值
     */
    public String getValue() {
        return value;
    }

    /**
     * 获取描述信息
     *
     * @return 描述信息
     */
    public String getDescription() {
        return description;
    }

    /**
     * 根据值获取对应的枚举对象
     *
     * @param value 枚举值
     * @return 对应的枚举对象，如果未找到则返回 null
     */
    public static ${NAME} fromValue(String value) {
        for (${NAME} constant : values()) {
            if (constant.getValue().equals(value)) {
                return constant;
            }
        }
        // 或者抛出异常：throw new IllegalArgumentException("未知的枚举值: " + value);
        return null;
    }

    /**
     * 返回枚举的描述信息（重写 toString 方法）
     *
     * @return 描述信息
     */
    @Override
    public String toString() {
        return this.description;
    }
}
```

## 4. Record

> Record，记录，是在 Java 14 中引入的一种特殊的类，旨在简化不可变数据对象的创建。它本质上是一个**不可变的数据载体**，用于存储一组相关的字段值，并自动生成常见的方法（如构造器、`toString()`、`equals()` 和 `hashCode()` 等）。使用 `record` 可以显著减少样板代码，更多Record的使用：[什么是Record类](./什么是Record类.md)

记录，一般用于构建配置类、DTO类、VO类，鉴于JDK1.8语法的限制，Record极度冷门，很多人也许是第一次听说，究其原因，我认为原因在于Lombok这个插件和@Data这个注解，实现了Record的效果，如果是技术追求进步的团队在将SpringBoot提到3.0后，也许会有人开始使用吧！


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

## 5. @Interface

注解类，很有用的一个东西，但是用的更少，因为自定义的注解往往被团队认为是危险的东西，而且注解也需要切面类配合使用，这需要项目引入额外的依赖，在此稍微备注一下吧，实际使用的话还是建议配合AI

```java
#if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")
package ${PACKAGE_NAME};

#end
#parse("File Header.java")
/**
 * ${NAME} 注解类
 * 
 * @author ${USER}
 * @since ${YEAR}-${MONTH}-${DAY} ${HOUR}:${MINUTE}:${SECOND}
 */
public @interface ${NAME} {

    /**
     * 默认值示例。
     * 如果注解需要支持默认值，可以在这里定义。
     *
     * @return 默认值
     */
    String value() default "";

    /**
     * 描述信息。
     * 用于提供额外的说明或元数据。
     *
     * @return 描述信息
     */
    String description() default "";

    /**
     * 是否启用某个功能。
     * 示例布尔类型的注解属性。
     *
     * @return 是否启用，默认为 true
     */
    boolean enabled() default true;

    /**
     * 配置优先级。
     * 示例整数类型的注解属性。
     *
     * @return 优先级，默认为 0
     */
    int priority() default 0;

    /**
     * 允许的选项列表。
     * 示例数组类型的注解属性。
     *
     * @return 选项列表
     */
    String[] options() default {};
}
```