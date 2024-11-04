---
title: Juint5断言的代码使用
date: 2024-07-02 11:08:00
updated: 2024-08-10 18:48:00
categories: 
- 学习
tags: 
- Juint
- 断言
keywords:
- Juint
- 断言
description: Juint5断言的代码使用
cover: https://media.licdn.com/dms/image/D4D12AQETC9Kq3s452A/article-cover_image-shrink_720_1280/0/1675287063027?e=2147483647&v=beta&t=iHwyGvQNKHlxJhLcooHzt6Ofgep20A6xJ94LoMLxNpY
top_img: https://miro.medium.com/v2/resize:fit:982/0*2E4rp0xfGhVJx94Q.png
---

## JUnit5断言

> 断言，简单理解就是用来判断的语句。判断待测试的代码的结果和我们期望的结果是否一致。如果不一致，则说明这个UT失败了。JUnit5的断言非常丰富，下面举例几个工作中常用的断言，还有第三方库断言也会介绍下。

直接看代码，不多废话

```java
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

class AssertionTests {

    @Test
    void testEquality() {
        int actual = 5;
        int expected = 10;
        assertEquals(expected, actual, "两端的值应该相等"); // 验证两个值是否相等
    }

    @Test
    void testInequality() {
        int value1 = 5;
        int value2 = 5;
        assertNotEquals(value1, value2, "两端的值不应该相等"); // 验证两个值是否不相等
    }


    Object object1 = new Object();
    Object object2 = object1;
    Object object3 = new Object();

    @Test
    void testSameReference() {
        assertSame(object1, object3, "引用了不同的对象"); // 验证是否引用同一个对象
    }

    @Test
    void testDifferentReferences() {
        assertNotSame(object1, object2, "引用了相同的对象"); // 验证不是引用同一个对象
    }


    Object nullableObject = null;
    Object notNullableObject = new Object();

    @Test
    void testIsNull() {
        assertNull(notNullableObject, "对象应该为空"); // 验证对象是否为null
    }

    @Test
    void testIsNotNull() {
        assertNotNull(nullableObject, "对象不能为空"); // 验证对象不为null
    }


    @Test
    void testTrueCondition() {
        boolean condition = false;
        assertTrue(condition, "判断不是True"); // 验证条件为真
    }

    @Test
    void testFalseCondition() {
        boolean condition = true;
        assertFalse(condition, "判断不是False"); // 验证条件为假
    }


    @Test
    void testExceptionThrown() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
//            throw new IllegalArgumentException("预期异常");
        }, "应该抛出异常的代码"); // 验证是否抛出指定异常
    }


    @Test
    void testNoExceptionThrown() {
        assertDoesNotThrow(() -> {
            int i = 1 / 0;
            // 这里执行不应该抛出异常的代码
        }, "不应该抛出异常的代码"); // 验证没有异常被抛出
    }


    @Test
    void testMultipleAssertions() {

        Person person = new Person();
        person.setName("John1");
        person.setAge(29);
        person.setEmployed(false);

        assertAll("Person properties",
                () -> assertEquals("John", person.getName(), "name 不匹配"),
                () -> assertEquals(30, person.getAge(), "age 不匹配"),
                () -> assertTrue(person.isEmployed(), "employed 不匹配")
        ); // 执行多个断言，任何一个失败则整体测试失败
    }

    // 假设有一个Person类
    static class Person {
        String name;
        int age;
        boolean employed;

        // 省略构造函数和getter


        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public int getAge() {
            return age;
        }

        public void setAge(int age) {
            this.age = age;
        }

        public boolean isEmployed() {
            return employed;
        }

        public void setEmployed(boolean employed) {
            this.employed = employed;
        }
    }


    @Test
    void testAssertThat() {
        assertThat(testAdd(1, 2)).isEqualTo(3);
        assertThat(testAdd(1, 2)).isNotEqualTo(4);
        assertThat(testAdd(0, 0)).isZero();
        assertThat(testAdd(1, 2)).isNotZero();
        assertThat(returnNull()).isNull();
        assertThat(testAdd(1, 2)).isNotNull();
        assertThat(returnTrue()).isTrue();
        assertThat(returnFalse()).isFalse();
        assertThat(new ArrayList<>().isEmpty());
        assertThat(getStringList().contains("A"));
        assertThat(Optional.of("A")).hasValue("A");
        assertThat("I am good").containsPattern("I am");
    }
    public Object returnNull() {return null;}
    public int testAdd(int a, int b) {return a + b;}
    public boolean returnTrue() {return true;}
    public boolean returnFalse() {return false;}
    public List<String> getStringList() {return Arrays.asList(new String[]{"A", "B", null});}


}

```

