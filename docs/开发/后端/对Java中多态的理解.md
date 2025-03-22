---
title: 对Java中多态的理解
date: 2022-02-25 21:59:15
updated:
categories: 
- 学习
tags: 
- Java
- 多态
keywords:
- Java
- 多态
description: 理解Java中的多态
cover: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410212221954.png
top_img: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410212222914.png
---

### 一、“多态”的理解

先看Java代码：

```java
public class Example {
    public static void main(String[] args) {
        System.out.println("====人====");
        Person person = new Person("叽里呱啦","默认皮肤");
        person.say();
        person.showSkin();
        person.walk();
        person.eat();
        person.sleep();

        //多态
        System.out.println("====中国人====");
        Person chinese = new Chinese("中文","黄皮肤");
        chinese.say();
        chinese.showSkin();
        chinese.walk();
        chinese.eat();
        chinese.sleep();
				
        System.out.println("====美国人====");
        Person american = new American("英文","白皮肤");
        american.say();
        american.showSkin();
        american.walk();
        american.eat();
        american.sleep();
    }
}
class Person {
    String language;
    String skinColor;
    public Person() {}
    public Person(String language, String skinColor) {
        this.language = language;
        this.skinColor = skinColor;
    }
    public void say(){
        System.out.println("说"+this.language);
    }
    public void showSkin(){
        System.out.println(this.skinColor);
    }
    public void walk(){
        System.out.println("人走路");
    }
    public void eat(){
        System.out.println("人吃饭");
    }
    public void sleep(){
        System.out.println("人睡觉");
    }
}
class Chinese extends Person {
    public Chinese(){}
    public Chinese(String language, String skinColor) {
        super(language,skinColor);
    }
}
class American extends Person {
    public American(){}
    public American(String language, String skinColor) {
        super(language,skinColor);
    }
}
```

运行结果：

![image-20220225175107033](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/e6c9d24ely1gzpwleppjpj211e0nutad.jpg)

#### 总结：多态的意义就是，当new出来的对象中自己“独特的”方法时，默认采用申明类型中“普遍的”方法，“多态”这一词的含义就来源于这种用于对创造的对象的广泛性的意义。



### 二、“向上转型”和“向下转型”的用法

```java
class Animal{
	public void shout() {
		System.out.println("动物叫");
	}
	public void eat(){
		System.out.println("动物吃");
	}
}
class Dog extends Animal{
	@Override
	public void shout() {
		System.out.println("狗叫");
	}
	public void home() {
		System.out.println("狗看门");
	}
	
}
class Cat extends Animal{
	@Override
	public void shout() {
		System.out.println("猫叫");
	}
	public void sleep() {
		System.out.println("猫趴窝");
	}
}

public class AnimalInf{
	//public static void shout(Animal an) {
	//	an.shout();
	//}
	public static void main(String[] args) {
		Dog dog1 = new Dog();
		Animal dog2 = new Dog();//向上转型后只会调用父类中方法
		System.out.print("dog1.shout():");
		dog2.shout();
		System.out.print("dog2.shout():");
		dog2.shout();//虽然转型成了Animal类，但是因为Dog类中重写了shout方法，所以是“狗叫”，这就叫《方法的调用看父类，运行结果看子类，重写的方法看子类》
		System.out.print("dog1.home():");
		dog1.home();
		System.out.print("dog2.eat():");
		dog2.eat();//调用了Animal类中的方法，
//		dog2.home();//这里会报错，因为向上转型调用方法看左边，结果看重写，而Animal类中没有home方法

		Dog dog3 = (Dog)dog2;//向下转型后，dog2才成为了一个Dog类的对象
		System.out.print("dog3.shout():");
		dog3.shout();
		System.out.print("dog3.home():");
		dog3.home();
		System.out.print("dog3.eat():");
		dog3.eat();

		//用instaceof测试一个对象是否为一个类的实例
		Animal cat1 = new Cat();
		System.out.println(dog1 instanceof Dog);//true
		System.out.println(dog2 instanceof Animal);//true
		System.out.println(cat1 instanceof Dog);//false
		System.out.println(cat1 instanceof Cat);//true，因为cat1是Cat的间接子类
		System.out.println(cat1 instanceof Animal);//true
		
		/*
		会报错ClassCastException的异常，因为不能由子类(Dog)推出父类(Animal)中的细节，多态因该是由上到下的"抽象模糊形态"
		Dog dog = (Dog) new Animal();
		dog.eat();
		*/

	}
}

```

#### 总结：向上转型和向下转型还是Java多态中比较重要的一个知识点！