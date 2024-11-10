---
title: My Java Guide - Spring
date: 2024-10-15 00:23:00
updated: 2024-11-10 22:16:00
categories: 
- 学习
tags: 
- Java
- Spring
keywords:
- Java
- Spring
description: Java, all in one！
cover: /img/spring_logo.png
top_img: /img/Java-tutorials-by-GeeksForGeeks.png
---

# <div align="center">------------------Spring------------------</div>

# Spring、Spring MVC 和 Spring Boot 的区别

**Spring**

Spring 是一个 IoC（Inversion of Control，控制反转）容器，主要用于管理 Bean。通过依赖注入（Dependency Injection, DI）的方式实现控制反转，使得应用程序组件之间的依赖关系更加清晰，同时也便于测试和维护。Spring 提供了 AOP（Aspect Oriented Programming，面向切面编程）机制来解决 OOP（Object-Oriented Programming，面向对象编程）中代码重复的问题，允许开发者将不同类和方法中的共同处理逻辑（如日志记录、事务管理等）抽象成为切面，并自动注入到方法执行过程中。

**Spring MVC**

Spring MVC 是 Spring 对 Web 应用程序开发提供的一个解决方案。它引入了一个前端控制器 Servlet，负责接收 HTTP 请求。Spring MVC 定义了一套路由策略，用于将 URL 映射到具体的处理器（Handler）。前端控制器根据路由信息调用相应的处理器，并将处理器的返回结果通过视图解析器转换为最终的 HTML 页面呈现给用户。

**Spring Boot**

Spring Boot 是 Spring 社区提供的一个快速应用开发框架，旨在简化 Spring 应用程序的搭建和开发过程。它通过提供一系列默认配置，减少了开发者手动配置的时间，并且通过 Starter 机制整合了常用的第三方库和技术栈（如 Redis、MongoDB、Elasticsearch 等），使得开发者能够开箱即用地使用这些技术。Spring Boot 的目标是让开发者能够专注于业务逻辑的编写，而不是繁琐的配置工作。

# 延迟加载是什么？实现原理是什么？

**延迟加载**：查询一个实体类的时候，暂时不查询将其一对多的数据，当需要的时候，再查询，这就是延迟加载。

**作用**：提高响应速度、避免资源浪费。

**实现原理**：

1. 使用**CGLIB**创建目标对象的代理对象
2. 当调用目标方法时，进入拦截器invoke方法，发现目标方法是null值，执行sql查询
3. 获取数据以后，调用set方法设置属性值，再继续查询目标方法，就有值了

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202404121947175.png" alt="image-20240412194719114" style="zoom:60%;" />

**开启方式**：开启方式由具体的框架决定。

# 常见注解

## Spring注解

| **注解**                                       | **说明**                                                     |
| ---------------------------------------------- | ------------------------------------------------------------ |
| @Component、@Controller、@Service、@Repository | 使用在类上用于实例化Bean                                     |
| @Autowired                                     | 使用在字段上用于根据类型依赖注入                             |
| @Qualifier                                     | 结合@Autowired一起使用用于根据名称进行依赖注入               |
| @Scope                                         | 标注Bean的作用范围                                           |
| @Configuration                                 | 指定当前类是一个 Spring 配置类，当创建容器时会从该类上加载注解 |
| @ComponentScan                                 | 用于指定 Spring  在初始化容器时要扫描的包                    |
| @Bean                                          | 使用在方法上，标注将该方法的返回值存储到Spring容器中         |
| @Import                                        | 使用@Import导入的类会被Spring加载到IOC容器中                 |
| @Aspect、@Before、@After、@Around、@Pointcut   | 用于切面编程（AOP）                                          |

## SpringMVC注解

| **注解**        | **说明**                                                     |
| --------------- | ------------------------------------------------------------ |
| @RequestMapping | 用于映射请求路径，可以定义在类上和方法上。用于类上，则表示类中的所有的方法都是以该地址作为父路径 |
| @RequestBody    | 注解实现接收http请求的json数据，将json转换为java对象         |
| @RequestParam   | 指定请求参数的名称                                           |
| @PathViriable   | 从请求路径下中获取请求参数(/user/{id})，传递给方法的形式参数 |
| @ResponseBody   | 注解实现将controller方法返回对象转化为json对象响应给客户端   |
| @RequestHeader  | 获取指定的请求头数据                                         |
| @RestController | @Controller + @ResponseBody                                  |

## Springboot注解

| **注解**                 | **说明**                                       |
| ------------------------ | ---------------------------------------------- |
| @SpringBootConfiguration | 组合了- @Configuration注解，实现配置文件的功能 |
| @EnableAutoConfiguration | 打开自动配置的功能，也可以关闭某个自动配置的选 |
| @ComponentScan           | Spring组件扫描                                 |

# Bean

## Bean的生命周期

Spring 中 Bean 的生命周期大致分为四个阶段：

1. 实例化（Instantiation）
2. 属性赋值（Populate）
3. 初始化（Initialization）
4. 销毁（Destruction）

Bean 生命周期大致分为 Bean 定义、Bean 的初始化、Bean的生存期和 Bean 的销毁4个部分。具体步骤如下：

1. 通过BeanDefinition获取bean的定义信息
2. 调用构造函数实例化bean
3. bean的依赖注入
4. 处理Aware接口（BeanNameAware、BeanFactoryAware、ApplicationContextAware）
5. Bean的后置处理器BeanPostProcessor#before
6. 初始化方法(InitializingBean、init-method)
7. Bean的后置处理器BeanPostProcessor#before
8. 销毁bean

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202404121907270.png" alt="image-20240412190726153" style="zoom:40%;" />

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202409301722710.png" alt="image-20240930172245510" style="zoom:70%;" />

## 创建Bean的三种方式

## 定义 `Bean `对象

```java
public class Orders implements BeanNameAware, BeanFactoryAware, ApplicationContextAware, InitializingBean {

    private String oname;

    public Orders() {
        System.out.println("# 第一步：实例化对象\n\t >> 执行构造方法");
    }

    public void setOname(String oname) {
        this.oname = oname;
        System.out.println("# 第二步：赋值\n\t >> 执行自定义setter方法");
    }

    @Override
    public void setBeanName(String name) {
        System.out.println("\t >> BeanNameAware -> setBeanName方法执行了...: " + name);
    }

    @Override
    public void setBeanFactory(BeanFactory beanFactory) {
        System.out.println("\t >> BeanFactoryAware -> setBeanFactory方法执行了...: " + beanFactory);
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) {
        System.out.println("\t >> ApplicationContextAware -> setApplicationContext方法执行了...: " + applicationContext);
    }

    @PostConstruct
    public void init() {
        System.out.println("// (干预点一) 初始化方法执行前...");
    }

    @Override
    public void afterPropertiesSet() {
        System.out.println("# 第三步：初始化\n\t >> InitializingBean -> afterPropertiesSet方法执行了...");
    }

    public void initMethod() {
        System.out.println("\t >> 执行自定义的初始化方法");
    }


    @PreDestroy
    public void destory() {
        System.out.println("// (干预点二) 销毁方法执行前...");
    }

    public void destroyMethod() {
        System.out.println("# 第五步：回收对象\n\t >> 执行自定义的销毁的方法");
    }

    @Override
    public String toString() {
        return "Orders{" + "oname='" + oname + '\'' + '}';
    }
}
```

## 定义 `BeanPostProcessor` 后置处理器

```java
@Component
public class MyBeanPostProcessor implements BeanPostProcessor {

    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) {
        if (bean instanceof Orders) {
            System.out.println("// (前置处理器) postProcessBeforeInitialization方法执行了... -> " + beanName + "对象初始化方法前开始增强....");
        }
        return bean;
    }

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) {
        if (bean instanceof Orders) {
            System.out.println("// (后置处理器) postProcessAfterInitialization方法执行了... -> " + beanName + "对象初始化方法后开始增强....");
        }
        return bean;
    }
}

```

## 1. 基于注解的方式

```java
@Configuration
@ComponentScan(basePackages = "com.company.spring5.bean") // 组件扫描
public class OrdersConfig {

    @Bean(initMethod = "initMethod", destroyMethod = "destroyMethod")
    @Qualifier
    public Orders orders() {
        Orders orders = new Orders();
        orders.setOname("手机");
        return orders;
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        // 加载 Spring 容器
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);

        // 获取 Orders bean 实例
        Orders orders = (Orders) context.getBean("orders");
        System.out.println("第四步，获取创建bean实例对象：" + orders);

        // 关闭容器，触发销毁方法
        context.close();
    }
}
```

## 2. 基于配置文件的方式

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">


    <bean id="orders" class="com.company.spring5.bean.Orders" init-method="initMethod" destroy-method="destroyMethod">
        <property name="oname" value="手机"/>
    </bean>

    <!--配置后置处理器，会为当前配置文件页面内的所有bean都添加后置处理器-->
    <bean id="myBeanPost" class="com.company.spring5.bean.MyBeanPost"/>


</beans>
```

```java
public class Main {
    public static void main(String[] args) {
        // 加载 Spring 容器
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);

        // 获取 Orders bean 实例
        Orders orders = (Orders) context.getBean("orders");
        System.out.println("第四步，获取创建bean实例对象：" + orders);

        // 关闭容器，触发销毁方法
        context.close();
    }
}

```

## *3. 基于 `BeanDefinition` 编程方式*

区别在于 `Bean` 的消息不是由 `xml配置文件` 定义，而是由 `BeanDefinition` 定义

```java
public class Main {
    public static void main(String[] args) {
        // 创建 ApplicationContext
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext();
        // 注册 BeanPostProcessor
        context.getBeanFactory().addBeanPostProcessor(new MyBeanPostProcessor());

        // 使用 BeanDefinitionBuilder 创建 BeanDefinition
        BeanDefinition beanDefinition = BeanDefinitionBuilder
                .genericBeanDefinition(Orders.class)
                .addPropertyValue("oname", "手机")
                .setInitMethodName("initMethod")  // 设置初始化方法
                .setDestroyMethodName("destroyMethod")  // 设置销毁方法
                .getBeanDefinition();

        // 获取 BeanFactory
        DefaultListableBeanFactory beanFactory = (DefaultListableBeanFactory) context.getBeanFactory();
        // 注册 BeanDefinition
        beanFactory.registerBeanDefinition("orders123", beanDefinition);

        // 刷新容器以使定义的 bean 生效
        context.refresh();

        // 获取 bean 实例
        Orders orders = (Orders) context.getBean("orders123");
        System.out.println("# 第四步：使用对象\n\t >> 获取创建bean实例对象：" + orders);

        // 关闭容器，触发销毁
        context.close();
    }
}

```

## Bean的生命周期哪些地方可以干预？

Bean的生命周期是由Spring容器自动管理的，其中有两个环节我们可以进行干预。 

1. 可以自定义**初始化**方法，增加`@PostConstruct`注解，会在**调用SetBeanFactory方法之后**调用该方法。
2. 可以自定义**销毁**方法，增加`@PreDestroy`注解，会在**自身销毁前调用**这个方法。

## Bean线程安全吗？如何解决线程不安全的Bean？

Bean不一定是线程安全的。

如果注入的对象是无状态的（String类），不需要线程安全问题的；

如果在bean中定义了**可修改的变量**，**需要考虑线程安全问题。**

**解决方案**：

1. 使用多例。
2. 使用加锁。
3. 使用`@Scope`注解，默认为`singleton`，改为`prototype`。

## 循环依赖及其解决办法

**循环依赖**：有多个类被Spring管理，它们在实例化时互相持有对方，最终形成闭环。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411071640490.png" alt="img" style="zoom:100%;" />

示例代码：

```java
@Service
public class A {
    @Autowired
    private B b;
}

@Service
public class B {
    @Autowired
    private A a;
}

//或者自己依赖自己
@Service
public class A {
    @Autowired
    private A a;
}
```

解决做法：先创建 A，此时的 A 是不完整的（没有注入 B），用个 map 保存这个不完整的 A，再创建 B ，B 需要 A，所以从那个 map 得到“不完整”的 A，此时的 B 就完整了，然后 A 就可以注入 B，然后 A 就完整了，B 也完整了，且它们是相互依赖的。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410101052587.png" alt="image.png" style="zoom:90%;" />

关键就是**提前暴露未完全创建完毕的 Bean**。

在 Spring 中，只有同时满足以下两点才能解决循环依赖的问题：

1. 依赖的 Bean 必须都是单例
2. 依赖注入的方式，必须**不全是**构造器注入，且 beanName 字母序在前的不能是构造器注入

Spring无法解决**构造方法**上出现的循环依赖，**补救措施**：在构造方法的参数上使用`@Lazy`。

非构造方法Spring通过**三级缓存**解决循环依赖：

Spring为单例搞的三个 map，也就是三级依赖：

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202404121911396.png" alt="image-20240412191107333" style="zoom:45%;" />

| **缓存名称** |     **源码名称**      |                           返回结果                           |                           **作用**                           |
| :----------: | :-------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
|   一级缓存   |   singletonObjects    |        存储所有已创建完毕的单例 Bean （完整的 Bean）         | 单例池，缓存已经经历了完整的生命周期，已经初始化完成的bean对象，只实现了singleton scope，**解决不了循环依赖** |
|   二级缓存   | earlySingletonObjects |   存储所有仅完成实例化，但还未进行属性注入和初始化的 Bean    |            缓存早期的bean对象（生命周期还没走完）            |
|   三级缓存   |  singletonFactories   | 存储能建立这个 Bean 的一个工厂，通过工厂能获取这个 Bean，延迟化 Bean 的生成，工厂生成的 Bean 会塞入二级缓存 |   缓存的是ObjectFactory，表示对象工厂，用来创建某个对象的    |

**三级缓存的工作过程**:

1. 创建bean实例
2. 将创建的bean实例放入三级缓存
3. 填充属性
4. 如果发现循环依赖,尝试从三级缓存中获取
5. 没有循环依赖，将bean放入一级缓存

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202404121917148.png" alt="image-20240412191731029" style="zoom:45%;" />

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202404121917842.png" alt="image-20240412191748709" style="zoom:45%;" />

**二级缓存**和**三级缓存**解决循环依赖的过程：

1. 首先，获取单例 Bean 的时候会通过 BeanName 先去 singletonObjects（一级缓存） 查找完整的 Bean，如果找到则直接返回，否则进行步骤 2。
2. 看对应的 Bean 是否在创建中，如果不在创建中直接返回null，如果 Bean 正在创建中，则会去 earlySingletonObjects （二级缓存）查找 Bean，如果找到则返回，否则进行步骤 3
3. 去 singletonFactories （三级缓存）通过 BeanName 查找到对应的工厂，如果存在 Bean 对应的 Bean工厂，则通过Bean工厂创建 Bean ，并且将 Bean 放置到 earlySingletonObjects （二级缓存）中。
4. 如果三个缓存都没找到，则返回 null。

步骤 2 中如果查询发现 Bean 还未创建，就直接返回 null，返回 null 之后，说明这个 Bean 还未创建，这个时候会标记这个 Bean 正在创建中，然后再调用 `createBean` 来创建 Bean，而实际创建是调用方法 `doCreateBean`。doCreateBean 这个方法就会执行上面我们说的三步骤：实例化、属性注入初始化。在实例化 Bean 之后，**会往 三级缓存（singletonFactories）塞入一个工厂，而调用这个工厂的 `getObject` 方法，就能得到这个 Bean**。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411071641321.png" alt="image-20240911195840657.png" style="zoom:85%;" />

# IOC

## 什么是 IOC？IOC有什么好处

Spring 的 IOC（Inversion of Control，控制反转）是一种设计模式，用于减少代码间的耦合度，提高软件系统的可维护性、可扩展性和可测试性。在传统的程序设计中，对象的创建和依赖关系的管理是由对象自身负责的，而在使用 IOC 的情况下，这些职责被转移到了外部容器上，即 Spring 容器。

**IOC 的概念**：控制反转并不是一种具体的实现技术，而是一种设计理念。它描述的是对象的控制权从应用程序代码内部转移到外部容器的过程，即对象的创建和生命周期管理不再由程序员直接控制，而是交给框架来管理。

## IOC容器和Bean的关系

**1. IOC 容器**

IOC 容器是 Spring 框架的核心部分，负责管理应用程序中的所有 Bean 的生命周期和配置。

IOC 容器通过读取配置元数据（通常是 XML 文件、Java 配置类或注解）来了解如何创建和管理 Bean。

IOC 容器的主要职责包括：

- **Bean 的实例化**：根据配置信息创建 Bean 实例。
- **Bean 的装配**：管理 Bean 之间的依赖关系，即依赖注入（DI）。
- **Bean 生命周期管理**：控制 Bean 的初始化、销毁等生命周期行为。

Spring 提供了两种主要的 IOC 容器：

- **BeanFactory**：这是一个基础的容器接口，提供了基本的依赖注入支持。它是一个轻量级的容器，适合于简单的应用场景。
- **ApplicationContext**：它是 `BeanFactory` 的子接口，除了提供依赖注入功能外，还增加了许多企业级功能，如 AOP 支持、事件发布、国际化等。`ApplicationContext` 更适合于复杂的大型企业应用。

**2. Bean**

Bean 是由 IOC 容器管理的对象。这些对象是在应用程序中执行特定任务的 Java 对象，它们的创建、装配和生命周期都由 IOC 容器负责。

Bean 的定义通常包括以下信息：

- **类名**：Bean 所对应的 Java 类。
- **Bean 名称**：用于在容器中唯一标识 Bean。
- **作用域**：定义 Bean 的生命周期和范围，如单例（Singleton）、原型（Prototype）等。
- **依赖关系**：Bean 可能依赖的其他 Bean 或资源。
- **初始化和销毁方法**：指定在 Bean 创建和销毁时调用的方法。

**3. IOC 容器与 Bean 的关系**

- **Bean 的定义和注册**：开发者通过配置文件（XML、Java 配置类）或注解（如 `@Component`、`@Service`、`@Repository`、`@Controller`）来定义 Bean，并将其注册到 IOC 容器中。
- **Bean 的实例化**：IOC 容器根据配置信息创建 Bean 实例。
- **依赖注入**：IOC 容器管理 Bean 之间的依赖关系，通过构造器注入、设值方法注入或字段注入等方式将依赖对象注入到目标 Bean 中。
- **生命周期管理**：IOC 容器管理 Bean 的生命周期，包括初始化、使用和销毁等阶段。可以通过配置初始化方法和销毁方法来控制 Bean 的生命周期行为。

## 依赖注入

依赖注入（Dependency Injection, DI）是实现 IOC 的具体方式之一。通过**final+构造函数注入**、**set方法注入**或者**接口注入**等方式，将对象的依赖关系注入到对象中，而不是让对象自己创建或查找依赖对象。

## 依赖注入的目的

依赖注入的主要目的是为了减少代码之间的耦合度，提高代码的可复用性和可测试性。通过依赖注入，对象的依赖关系不是由对象自身来创建或查找，而是由外部的容器（如 Spring 容器）在运行时自动注入。

在项目中，一个对象（我们称其为客户端对象）可能需要引用另一个对象（服务对象）来完成某些任务。没有依赖注入的情况下，客户端对象通常会自己创建或查找服务对象的实例，这种方式会导致客户端和服务对象之间存在紧密的耦合。依赖注入通过外部容器来管理这些依赖关系，从而解耦客户端和服务对象。

## 依赖注入的方式

Spring 框架支持三种主要的依赖注入方式：

1. **构造器注入（Constructor Injection）**：

   在对象创建时通过构造函数传递依赖对象。确保了对象一旦创建后，其依赖项就是不可变的，并且总是处于已初始化状态。

   ```java
   public class Client {
       private final Service service;
       
       @Autowired
       public Client(Service service) {
           this.service = service;
       }
   }
   ```

2. **set方法注入（Setter Injection）**：

   通过对象的 setter 方法来注入依赖对象。灵活，允许在对象创建后修改依赖关系。

   ```java
   public class Client {
       private Service service;
       
       @Autowired
       public void setService(Service service) {
           this.service = service;
       }
   }
   ```

3. **字段注入（Field Injection）**：

   直接在对象的字段上使用 `@Autowired` 注解来注入依赖对象。简单，但灵活性较差，且不利于单元测试。

   ```java
   public class Client {
       @Autowired
       private Service service;
   }
   ```

4. **接口注入（Interface Injection）**：

   类似于set方法注入。通过实现特定的接口来注入依赖对象。这种方式在现代 Spring 应用中较少使用，但仍然是一种可行的注入方式。

   ```java
   public interface ServiceAware {
       void setService(Service service);
   }
   
   public class Client implements ServiceAware {
       private Service service;
       
       @Override
       public void setService(Service service) {
           this.service = service;
       }
   }
   ```

## IOC / 依赖注入的好处

1. **降低耦合度**：通过依赖注入，对象之间的依赖关系由 Spring 容器来管理，而不是硬编码在对象内部，这大大降低了对象之间的耦合度。

2. **增强灵活性**：由于依赖关系可以在运行时通过配置文件或注解动态设置，因此可以在不修改代码的情况下改变对象的行为，增加了系统的灵活性。

3. **易于测试**：依赖注入使得对象更容易被单元测试，因为可以通过注入模拟对象（mock objects）来测试对象的行为，而不需要关心实际的依赖对象。

4. **简化代码**：对象的创建和管理都被移到了容器中，减少了初始化代码量，使得业务代码更加简洁明了。

5. **集中管理**：所有的依赖关系和对象的生命周期都可以在一个地方进行配置和管理，这有助于团队协作开发，也便于后期维护。

总之，Spring 的 IOC 容器通过提供依赖注入功能，有效地帮助开发者构建松耦合、高内聚的应用程序，提高了代码的质量和开发效率。

## IOC容器启动过程

1. **加载配置文件**：Spring容器会读取并解析配置文件，或基于注解的配置类消息。
2. **创建容器**：Spring根据配置文件中定义的Bean信息，实例化并管理各个Bean对象。在容器启动过程中，Spring会创建一个BeanFactory或ApplicationContext容器对象。
3. **注册Bean定义**：Spring容器会根据配置文件中的Bean定义信息，将Bean对象注册到容器中，并配置Bean之间的依赖关系。
4. **实例化Bean**：容器启动后，会根据Bean定义信息实例化各个Bean对象，并根据需要填充Bean的属性。
5. **注册BeanPostProcessor**： Spring容器会注册BeanPostProcessor接口的实现类，这些类可以在Bean实例化之后、初始化之前和初始化之后对Bean进行处理。
6. **初始化Bean**：容器会调用Bean的初始化方法（如@PostConstruct注解标注的方法或实现initializingBean接口的方法）对Bean进行初始化。
7. **完成容器启动**：容器启动完成后，可以通过ApplicationContext接口提供的各种方法来获取和操作Bean对象。

总的来说，Spring的IOC容器启动过程就是将Bean注册到容器中、实例化Bean、初始化Bean、以及处理Bean之间的依赖关系等一系列操作。通过IOC容器，Spring实现了对象的创建、管理和协调，实现了松散耦合和可维护性，使得业务逻辑和对象的创建、销毁、依赖等不再紧密耦合在一起。

## IOC容器装配Bean的详细流程

- **加载配置信息**：创建 `BeanFactory` 实例，加载配置文件创建 `BeanDefination` 对象，并将其注册到 `BeanFactory` ；

- **实例化Bean**：`BeanFactory`根据 `BeanDefination` 的信息，  得到一个实例化的 `Bean`；

- **初始化Bean**：填充 `Bean` 属性，处理 `@Autowired` 、`@Value` 等注解，得到一个初始化的 `Bean`；

- **检查依赖关系**：检查 `Bean` 之间的依赖关系，确保依赖关系已满足；
- **注入容器中**：将 `Bean` 添加到单例池，对外提供使用。

# AOP

**AOP**：将对多个对象产生影响的公共行为和逻辑，抽取并封装为一个可重用的模块，这个模块被命名为“切面”（Aspect）。

**AOP的作用**：

- 减少系统中的重复代码
- 降低模块间的耦合度
- 提高系统的可维护性

**常见的AOP使用场景**：

- 记录日志

- 缓存处理

- 事务处理

**AOP的使用**（以记录操作日志为例）：使用**环绕通知+切点表达式**（找到要记录日志的方法），通过环绕通知的参数获取请求方法的参数（类、方法、注解、请求方式等），获取到这些参数以后，保存到数据库。例如以下步骤：

```java
@Around("pointcut()")
public Object around(ProceedingJoinPoint joinPoint) {
    //获取用户名
    //获取请求方式
    //获取访问结果
    //获取模块名称
    //登录IP
    //操作时间
    
    //保存到数据库（操作日志）
    return;
}
```

## 注解开发

为了使上面的 AOP 切面生效，我们需要在 Spring 应用上下文中启用 AOP 支持。

```java
@Configuration
public class AppConfig {

 @Bean
 public AspectJAnnotationAutoProxyCreator aspectJAnnotationAutoProxyCreator() {
     return new AspectJAnnotationAutoProxyCreator();
 }
}
```

## 例：防重复提交（`环绕通知`）

**代码实现**

```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface HzxNoRepeatCommit {
    long lockTime() default 5;
}
```

```java
@Aspect
@Component
@Slf4j
public class HzxNoRepeatCommitAspect {

    @Autowired
    private JwtProperties jwtProperties;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private StringRedisTemplate redisTemplate;

    // 定义切入点表达式
    @Pointcut("@annotation(com.hzx.common.annotation.HzxNoRepeatCommit)")
    public void hzxNoRepeatCommitPointcut() {
        // 这里不需要任何逻辑，只是一个占位符
    }

    // 环绕通知
    @Around("hzxNoRepeatCommitPointcut()")
    public Object around(ProceedingJoinPoint joinPoint) throws Throwable {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        HzxNoRepeatCommit annotation = signature.getMethod().getAnnotation(HzxNoRepeatCommit.class);

        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();

        String token = request.getHeader(jwtProperties.getUserTokenName());
        Claims claims = jwtUtil.parseJWT(jwtProperties.getUserSecretKey(), token);
        Long userId = Long.valueOf(claims.get(JwtClaimsConstant.USER_ID).toString());
        String key = userId + request.getRequestURI() + request.getClass() + request.getMethod() + request.getParameterMap();
        key = DigestUtils.md5DigestAsHex(key.getBytes(StandardCharsets.UTF_8));

        if (Boolean.FALSE.equals(redisTemplate.hasKey(key))) {
            redisTemplate.opsForValue().setIfAbsent(key, "", annotation.lockTime(), TimeUnit.SECONDS);

            try {
                return joinPoint.proceed();
            } catch (Throwable throwable) {
                redisTemplate.delete(key);
                log.error("处理异常，请重试！");
                return throwable;
            }
        } else {
            log.error("请勿重复提交！");
            return "请勿重复提交！";
        }
    }

}
```

**使用示例**

```java
@PostMapping("/submit")
@HzxNoRepeatCommit(lockTime = 10)
public Result<String> submitBill() {
    return Result.success("submit success!");
}
```

## 例：分布式锁（`环绕通知`）

**代码实现**

```java
@Documented
@Inherited
@Target(ElementType.METHOD) // 表示该注解只能用于方法级别
@Retention(RetentionPolicy.RUNTIME) // 运行时保留，这样才能在运行时通过反射读取
public @interface HzxRedisLock {
    // 锁名称
    String name() default "";
    // 锁等待时间
    long waitTime() default 5;
    // 锁超时释放时间（默认-1：会出发自动续期）
    long leaseTime() default -1;
}
```

```java
@Aspect // 标记为切面
@Component // 注册为Spring Bean
@Slf4j
public class HzxRedisLockAspect {
    private static final ParameterNameDiscoverer parameterNameDiscoverer = new DefaultParameterNameDiscoverer();

    private static final ExpressionParser parser = new SpelExpressionParser();

    @Resource
    private RedissonClient redissonClient;

    @Around("@annotation(redisLock)")
    public Object around(ProceedingJoinPoint joinPoint, HzxRedisLock redisLock) throws Throwable {
        log.info("进入分布式锁");
        String lockName = this.getLockName(joinPoint, redisLock);
        RLock lock = redissonClient.getLock(lockName);
        boolean isLocked = false;
        try {
            isLocked = lock.tryLock(redisLock.waitTime(), redisLock.leaseTime(), TimeUnit.SECONDS);
            if (!isLocked) {
                throw new RuntimeException("获取分布式锁失败！");
            }
            // 返回方法
            return joinPoint.proceed();
        } finally {
            if (isLocked && lock.isHeldByCurrentThread()) {
                lock.unlock();
            }
        }
    }

    private String getLockName(ProceedingJoinPoint joinPoint, HzxRedisLock redisLock) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = resolveMethod(signature, joinPoint.getTarget());
        EvaluationContext context = new MethodBasedEvaluationContext(
                TypedValue.NULL,
                method,
                joinPoint.getArgs(),
                parameterNameDiscoverer);
        Expression expression = parser.parseExpression(redisLock.name());
        return expression.getValue(context, String.class);
    }

    private Method resolveMethod(MethodSignature signature, Object target) {
        Class<?> targetClass = target.getClass();
        try {
            return targetClass.getMethod(signature.getName(), signature.getMethod().getParameterTypes());
        } catch (NoSuchMethodException e) {
            throw new IllegalStateException("无法处理目标方法" + signature.getName(), e);
        }
    }

}
```

**使用示例**

```java
@RestController
@RequestMapping("redis/")
public class RedisLockController {

    @HzxRedisLock(name = "'xxBusinessLock-' + #user.account", waitTime = 10, leaseTime = 20)
    @GetMapping("/test")
    public Result<String> testConfig() throws InterruptedException {
        Thread.sleep(120000);
        return Result.success("RedisLock");
    }

}
```

## 例：统计接口调用次数（`环绕通知`）

**代码实现**

```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface TrackApiCalls {
    String value(); // 接口的名称
}
```

```java
@Aspect
@Component
public class ApiCallTrackerAspect {

    @Autowired
    private Jedis jedis;

    @Around("@annotation(trackApiCalls)")
    public Object trackApiCalls(ProceedingJoinPoint joinPoint, TrackApiCalls trackApiCalls) throws Throwable {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();
        String interfaceName = trackApiCalls.value();

        // 增加接口调用次数
        jedis.incr(interfaceName);
        jedis.expire(interfaceName, 60); // 设置过期时间为一分钟

        // 继续执行原始方法
        return joinPoint.proceed();
    }
}
```

**使用示例**

```java
@RestController
@RequestMapping("/api")
public class MyController {

    @TrackApiCalls(value = "getUsers")
    @GetMapping("/users")
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @TrackApiCalls(value = "getUserById")
    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable Long id) {
        return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User not found"));
    }
}
```

**获取调用次数**

编写方法来获取某个接口在过去一分钟内的调用次数。

```java
public class RedisApiCallCounter {
    
    @Resource
    private Jedis jedis;

    public long getCallCount(String interfaceName) {
        return jedis.get(interfaceName) != null ? Long.parseLong(jedis.get(interfaceName)) : 0;
    }
}
```

**测试**

编写单元测试来验证注解是否正确地记录了接口的调用次数。

```java
@WebMvcTest(MyController.class)
public class MyControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Jedis jedis;

    @Test
    public void testGetUsersCallCount() throws Exception {
        mockMvc.perform(get("/api/users"))
                .andExpect(status().isOk());

        long callCount = new RedisApiCallCounter(jedis).getCallCount("getUsers");
        assert callCount == 1;
    }
}
```

过滤器也能实现



## 例：日志记录（`前置通知`、`后置通知`）

**代码实现**

```java
@Target(ElementType.METHOD) // 表示该注解只能用于方法级别
@Retention(RetentionPolicy.RUNTIME) // 运行时保留，这样才能在运行时通过反射读取
public @interface HzxLog {
    String value() default "执行@HzxLog"; // 可以添加一些描述信息，默认为空
}
```

```java
@Aspect // 标记为切面
@Component // 注册为Spring Bean
@Slf4j
public class HzxLogAspect {

    @Pointcut("@annotation(com.hzx.common.annotation.HzxLog)")
    public void HzxLogAspect() {
    }


    @Before("HzxLogAspect()")
    public void beforeHzxLog(JoinPoint joinPoint) {
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();


        HttpServletRequest request = requestAttributes.getRequest();

        String declaringTypeName = joinPoint.getSignature().getDeclaringTypeName();
        String methodName = joinPoint.getSignature().getName();

        log.info("============================================ 执行方法: {}.{}() begin ============================================", declaringTypeName, methodName);
        //执行时间
        String time = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(System.currentTimeMillis());
        log.info("Time          :{}", time);
        //打印请求 URL
        log.info("URL           :{}", request.getRequestURL());
        //打印请求 方法
        log.info("HTTP Method   :{}", request.getMethod());
        //打印Controller 的全路径以及执行方法
        log.info("Class Method  :{}", declaringTypeName + "." + methodName);
        // 打印请求的 IP
        log.info("IP            :{}", request.getRemoteHost());
        // 打印请求入参
        log.info("Request Args  :{}", JSON.toJSONString(joinPoint.getArgs()));
        log.info("Controller方法执行中...");

    }


    @After("HzxLogAspect()")
    public void afterHzxLog(JoinPoint joinPoint) {
        String declaringTypeName = joinPoint.getSignature().getDeclaringTypeName();
        String methodName = joinPoint.getSignature().getName();
        log.info("============================================ 执行方法: {}.{}() end ============================================", declaringTypeName, methodName);
    }

}
```

**使用示例**

```java
@GetMapping("/list")
@HzxLog
public Result<PageResult> page(@RequestBody UserPageQueryDto userPageQueryDto) {
    log.info("用户分页查询，参数为：{}", userPageQueryDto);
    PageResult pageResult = userService.pageQuery(userPageQueryDto);
    return Result.success(pageResult);
}
```

## AOP 和 AspectJ 有什么区别？

Spring AOP 和 AspectJ 都是实现面向切面编程（AOP）的技术，但它们之间存在一些关键的区别，包括设计目的、实现机制、功能范围等方面：

**设计目的与定位**

- **Spring AOP**：
  - 主要目的是为了提供一种简单易用的 AOP 实现，特别适合于那些只需要基本的 AOP 功能的应用程序。
  - 它是 Spring 框架的一部分，因此与 Spring 的其他组件（如依赖注入）高度集成，使用起来更加方便。
  - Spring AOP 更加关注于应用程序的服务层，特别是事务管理等横切关注点。
- **AspectJ**：
  - 是一个完整的 AOP 框架，旨在提供更加强大和灵活的 AOP 功能。
  - AspectJ 不仅限于服务层，还可以用于整个应用程序的任何部分，包括 UI 层和数据访问层。
  - 它是一个独立的框架，可以独立于任何应用框架使用，也可以与 Spring 等其他框架集成。

**实现机制**

- **Spring  AOP**：
  - 基于代理模式实现，即通过创建目标对象的代理对象来实现切面逻辑的织入。
  - 支持两种代理方式：JDK 动态代理和 CGLIB 动态代理。
  - 只能在方法调用级别上应用通知（advice），不能在字段级别或构造函数级别上应用。
- **AspectJ**：
  - 使用编译时织入（compile-time weaving）或加载时织入（load-time weaving）技术，可以在编译期或加载期将切面逻辑直接织入到目标类的字节码中。
  - 提供了更多的切入点表达式（pointcut expression），能够匹配更复杂的场景，例如方法调用、字段访问、构造函数执行等。
  - 支持更广泛的切面类型，如前置通知（before advice）、后置通知（after advice）、环绕通知（around advice）等。

**功能范围**

- **Spring AOP**：
  - 提供了基本的 AOP 功能，如事务管理、安全控制等。
  - 由于其设计上的限制，无法支持一些高级特性，例如字段级别的拦截。
- **AspectJ**：
  - 提供了更为丰富的 AOP 特性，包括但不限于环绕通知、异常通知、引介通知等。
  - 允许开发者定义更细粒度的切入点，从而更好地控制哪些代码应该被切面所影响。

**性能考虑**

- **Spring AOP**：
  - 由于是基于代理的，所以在性能上可能会稍微逊色于 AspectJ，特别是在需要大量代理的情况下。
  - 但是，对于大多数企业级应用来说，这种性能差异通常是可接受的。
- **AspectJ**：
  - 因为它是在编译期或加载期直接修改字节码，所以理论上可以提供更好的运行时性能。
  - 编译时织入可能会增加构建过程的时间，但这通常是一次性的成本。



# Spring事务

Spring 的事务管理控制事务的开始、提交和回滚。

Spring 事务管理具有以下特点：

1. **统一的事务管理接口**：Spring 提供了一个抽象的事务管理接口 `PlatformTransactionManager`，它支持多种事务管理系统，如 JPA、Hibernate、JDBC 等。
2. **编程式事务管理**：通过手动调用 `PlatformTransactionManager` 的方法来管理事务的开始、提交和回滚。
3. **声明式事务管理**：通过 XML 或注解的方式，在方法级别声明事务属性，使得事务管理更加简洁和灵活。

## 事务的使用方式

事务分为**编程式事务**和**声明式事务**：

- 编程式事务控制：需使用TransactionTemplate来进行实现，对业务代码**有侵入性**，项目中很少使用。

- **声明式事务管理**：声明式事务管理建立在AOP之上的。其原理是**通过AOP功能，对方法前后进行拦截，将事务处理的功能编织到拦截的方法中，也就是在目标方法开始之前加入一个事务，在执行完目标方法之后根据执行情况提交或者回滚事务**。

## 事务失效的场景和原因

| 事务失效场景 |                             原因                             |                           解决办法                           |
| ------------ | :----------------------------------------------------------: | :----------------------------------------------------------: |
| 异常捕获处理 | 代码自己处理了异常，没有抛出异常，Transactional没有知悉异常，就会失效。 |   手动抛出异常，在catch块添加throw new RuntimeException(e)   |
| 抛出检查异常 | Transactional默认只会回滚非检查异常，当代码抛出检查异常（例如：FileNotFoundException ）时就会失效。 | 配置rollbackFor属性@Transactional(rollbackFor=Exception.class) |
| 非public方法 |       Spring 只能为 public 方法创建代理、添加事务通知        |                       改为 public 方法                       |

## 传播行为（Propagation）

事务的传播行为说白了就是多个方法都有进行写操作时，对于事物的控制，作为事物的传播级别，在Spring中体现为一个叫 `Propagation` 的类中。

`Propagation` 类定义了当一个方法被另一个事务性的方法调用时，应该如何处理事务。常见的传播行为包括：

- `REQUIRED`：如果有事务活动，就加入当前事务；如果没有，就创建一个新的事务。

  > 最简单的事物传播机制，将方法中所有执行的过程全部作为一个事物，要么成功，要么失败，一次只占用一个数据库连接。

  <img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411092123712.png" alt="image-20241109212341682" style="zoom:67%;" />

- `REQUIRES_NEW`：总是创建一个新的事务，无论当前是否存在事务。

  > 每次执行方法，都会新开一个数据库连接，每次方法的执行都是独立的，不受任何影响。（可以预见的性能很差）

  <img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411092125052.png" alt="image-20241109212529011" style="zoom:67%;" />

- `NESTED`：如果存在事务，则在嵌套事务内执行；如果没有，则行为类似于 `PROPAGATION_REQUIRED`。

  > 此模式下会利用数据库的**存档点机制**，即使事务运行过程中失败了，也会回滚到之前的存档点。

  <img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411092121831.png" alt="image-20241109212153782" style="zoom:67%;" />

- `SUPPORTS`：如果有事务活动，就加入当前事务；如果没有，就以非事务方式运行。

- `NOT_SUPPORTED`：以非事务方式运行，并挂起任何存在的事务。

- `MANDATORY`：必须在现有的事务上下文中执行；如果没有事务，则抛出异常。

- `NEVER`：以非事务方式运行，如果存在事务，则抛出异常。

## 隔离级别（Isolation Level）

隔离级别定义了事务如何与其他事务相互作用，以防止不同的事务相互影响。常见的隔离级别包括：

- `ISOLATION_DEFAULT`：使用底层数据库的默认隔离级别。
- `ISOLATION_READ_UNCOMMITTED`：最低的隔离级别，事务可以看到其他未提交事务所做的更改。
- `ISOLATION_READ_COMMITTED`：事务只能看到其他已提交事务所做的更改。
- `ISOLATION_REPEATABLE_READ`：事务可以多次读取同一数据，并且得到相同的结果，即使有其他事务在此期间进行了修改。
- `ISOLATION_SERIALIZABLE`：最高的隔离级别，事务之间完全隔离，就像按顺序执行一样。

## 只读事务（Read-Only Transactions）

只读事务是指那些只读取数据而不进行任何写操作的事务。标记为只读的事务可以带来性能上的好处，因为数据库可以优化只读事务的执行。

# <div align="center">--------------SpringBoot--------------</div>

# 自动配置原理

SpringBoot的自动配置通过注解 `@SpringBootApplication` 实现，这个注解是对三个注解进行了封装，分别是：

- `@SpringBootConfiguration`：声明当前是一个配置类，与 @Configuration 注解作用相同。
- `@ComponentScan`：组件扫描，默认扫描当前引导类所在包及其子包。
- `@EnableAutoConfiguration`：SpringBoot实现自动化配置的核心注解，该注解通过 `@Import` 导入对应的配置选择器，它的核心是`META-INF`文件夹下的 `spring.factories` 文件，里面存放了需要扫描注解的类。在内部它读取了该项目和该项目引用的jar包的的classpath路径下 `META-INF/spring.factories` 文件中的所配置的类的全类名。 在这些配置类中所定义的Bean会根据条件注解所指定的条件来决定是否需要将其导入到Spring容器中。条件判断会有像 `@ConditionalOnClass` 或 `@ConditionalOnMissingBean` 这样的注解，判断是否有对应的class文件或bean对象，如果有则加载该类，把这个配置类的所有的Bean放入Spring容器中使用。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202404121934450.png" alt="image-20240412193405294" style="zoom: 60%;" />

# SpringBoot为什么默认使用CGlib？

- **不需要实现接口**：JDK动态代理要求目标类必须实现一个接口，而CGLib动态代理可以直接代理普通类（非接口）。这意味着CGLib可以对那些没有接口的类进行代理，提供更大的灵活性。
- **代理对象的创建**：JDK动态代理只能代理实现了接口的类，它是通过**Proxy类**和**lnvocationHandler接口**来创建代理对象。而CGLib动态代理可以代理任意类，它是通过**Enhancer类**来创建代理对象，无需接口。
- **性能更好**：CGLib动态代理比JDK动态代理更快。JDK动态代理是通过反射来实现的，而CGLib动态代理使用字节码生成技术，直接操作字节码。JDK动态代理对代理方法的调用是通过InvocationHandler来转发的，而CGLib动态代理对代理方法的调用是通过FastClass机制来直接调用目标方法的，这也是CGLib性能较高的原因之一。

> **JDK 动态代理**是基于接口的，所以要求代理类一定是有定义接口的。
>
> **CGLIB** 基于 ASM 字节码生成工具，它是通过继承的方式生成目标类的子类来实现代理类，所以要注意 final 方法。

# <div align="center">--------------SpringMVC--------------</div>

# SpringMVC

## 执行流程

Springmvc的执行流程分为老的和新的：

- 视图阶段（老旧JSP年代）
  1. 用户发送出请求到前端控制器DispatcherServlet
  2. DispatcherServlet收到请求调用HandlerMapping（处理器映射器）
  3. HandlerMapping找到具体的处理器，生成处理器对象及处理器拦截器(如果有)，再一起返回给DispatcherServlet。
  4. DispatcherServlet调用HandlerAdapter（处理器适配器）
  5. HandlerAdapter经过适配调用具体的处理器（Handler/Controller）
  6. Controller执行完成返回ModelAndView对象
  7. HandlerAdapter将Controller执行结果ModelAndView返回给DispatcherServlet
  8. DispatcherServlet将ModelAndView传给ViewReslover（视图解析器）
  9. ViewReslover解析后返回具体View（视图）
  10. DispatcherServlet根据View进行渲染视图（即将模型数据填充至视图中）
  11. DispatcherServlet响应用户

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202404121921126.png" alt="image-20240412192120003" style="zoom: 50%;" />

- 前后端分离阶段（接口开发，异步）
  1. 用户发送出请求到前端控制器DispatcherServlet
  2. DispatcherServlet收到请求调用HandlerMapping（处理器映射器）
  3. HandlerMapping找到具体的处理器，生成处理器对象及处理器拦截器(如果有)，再一起返回给DispatcherServlet。
  4. DispatcherServlet调用HandlerAdapter（处理器适配器）
  5. HandlerAdapter经过适配调用具体的处理器（Handler/Controller）
  6. 方法上添加了@ResponseBody
  7. 通过HttpMessageConverter来返回结果转换为JSON并响应

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202404121921353.png" alt="image-20240412192132239" style="zoom:50%;" />

## 过滤器、拦截器

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410012125541.png" alt="image-20241001212521342" style="zoom: 100%;" />

## 区别

- **生命周期管理**：Filter的生命周期由Servlet容器管理；Interceptor则是由Spring MVC框架管理。
- **依赖关系**：Filter依赖于Servlet容器；Interceptor依赖于Spring MVC框架。
- **作用范围**：Filter可以拦截所有web资源（包括JSP页面、Servlet和其他静态资源）；Interceptor则主要针对Spring MVC Controller请求。 

## 过滤器(Filter)

1. **用途**：编码处理、视图响应、请求参数处理、URL重定向。
2. **配置**：
   - 实现`jakarta.servlet.Filter`接口来创建自定义过滤器。
   - 重写`doFilter()`方法来实现过滤逻辑。
   - 可以创建注解来帮助配置过滤器的作用范围。
   - 在启动类使用注解启用过滤器`@ServletComponentScan(basePackages = "com.hzx.filter")`

## 拦截器(Interceptor)

1. **用途**：身份认证与授权、接口的性能监控、跨域处理目志记录。
2. **配置**：
   - 实现`org.springframework.web.servlet.HandlerInterceptor`接口来创建自定义拦截器。
   - 实现`preHandle()`、`postHandle()`、`afterCompletion()`等方法来定义拦截逻辑。
   - 在配置类中实现`WebMvcConfigurer`接口，并重写`addInterceptors()`方法来注册拦截器。

## Restful 风格的接口

RESTful 接口的设计目标是使 Web 服务更加简单、直观和易于理解。以下是 RESTful 风格接口的主要特点和设计原则：

**主要特点**

1. **无状态**：每次请求都是独立的，服务器不保存任何客户端的状态信息。每个请求都包含所有必要的信息，服务器可以根据这些信息处理请求。
2. **客户端-服务器架构**：客户端和服务器是分离的，客户端负责用户界面和用户交互，服务器负责数据存储和业务逻辑。
3. **无会话**：服务器不保存客户端的会话状态，每个请求都包含所有必要的信息。
4. **可缓存**：响应可以被标记为可缓存的，客户端可以缓存这些响应以提高性能。
5. **分层系统**：客户端和服务器之间可以有中间层（如代理、网关），这些中间层可以改进系统的可伸缩性和性能。
6. **按需编码**（可选）：服务器可以发送可执行代码（如 JavaScript）给客户端，客户端可以在运行时执行这些代码。

**设计原则**

1. **资源**：RESTful 接口的核心概念是资源。资源可以是任何东西，如用户、订单、文章等。资源通过 URI（Uniform Resource Identifier）来标识。
2. **HTTP 方法**：使用标准的 HTTP 方法来操作资源。常见的 HTTP 方法包括：
   - `GET`：用于获取资源。
   - `POST`：用于创建资源。
   - `PUT`：用于更新资源。
   - `DELETE`：用于删除资源。
   - `PATCH`：用于部分更新资源。
3. **HTTP 状态码**：使用标准的 HTTP 状态码来表示请求的结果。常见的状态码包括：
   - `200 OK`：请求成功。
   - `201 Created`：资源已创建。
   - `204 No Content`：请求成功，但没有返回内容。
   - `400 Bad Request`：请求无效。
   - `401 Unauthorized`：未授权。
   - `403 Forbidden`：禁止访问。
   - `404 Not Found`：资源未找到。
   - `405 Method Not Allowed`：请求方法不被允许。
   - `500 Internal Server Error`：服务器内部错误。
4. **媒体类型**：使用标准的媒体类型（如 JSON、XML）来表示资源的格式。常见的媒体类型包括：
   - `application/json`
   - `application/xml`

**优点**

1. **简洁**：RESTful 接口设计简洁，易于理解和实现。
2. **标准化**：遵循标准的 HTTP 方法和状态码，提高了互操作性。
3. **无状态**：每个请求都是独立的，服务器不需要保存客户端的状态信息，提高了可伸缩性。
4. **可缓存**：响应可以被缓存，提高了性能。

**缺点**

1. **复杂性**：对于复杂的业务逻辑，RESTful 接口可能不够灵活，需要更多的设计和实现工作。
2. **安全性**：RESTful 接口依赖于 HTTP 方法和状态码，可能存在安全风险，需要采取适当的措施来保护接口。

# <div align="center">---------------ORM框架---------------</div>

## Mybatis的执行流程

1. 读取MyBatis配置文件：mybatis-config.xml加载运行环境和映射文件
2. 构造会话工厂SqlSessionFactory
3. 会话工厂创建SqlSession对象（包含了执行SQL语句的所有方法）
4. 操作数据库的接口，Executor执行器，同时负责查询缓存的维护
5. Executor接口的执行方法中有一个MappedStatement类型的参数，封装了映射信息
6. 输入参数映射
7. 输出结果映射

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202404121939016.png" alt="image-20240412193916911" style="zoom:40%;" />

MapperStatement对象的结构：

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202404121940933.png" alt="image-20240412194031857" style="zoom: 50%;" />

## MyBatis中 `#` 和 `$` 区别

**`#{}` 和 `${}` 的区别**:

- `#{}` 是预编译处理，会将参数替换为`?`
- `${}` 是字符串替换，直接将参数值拼接到SQL中

**使用场景**:

- `#{}` 用于SQL语句中的值
- `${}` 用于动态表名、列名等

**安全性**:

- `#{}` 可以防止SQL注入
- `${}` 不能防止SQL注入

## Mybatis一级缓存、二级缓存

- **一级缓存**（默认开启）：**基于 PerpetualCache 的 HashMap 存储**，其存储作用域为 当前的Session，当Session写操作或关闭后（commit、rollback、update、delete），一级缓存就将清空。
- **一级缓存的转移**：当前Session提交或者关闭以后，一级缓存会转移到二级缓存。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202404121951400.png" alt="image-20240412195111353" style="zoom: 50%;" />

- **二级缓存**：**基于namespace和mapper的作用域**，不依赖于SQL session，**默认也采用 PerpetualCache 的 HashMap 存储**。使用二级缓存的数据**需要实现Serializable接口**。当某一个作用域Session的操作写操作后，默认该作用域下所有 select 中的缓存将被 clear。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202404121951987.png" alt="image-20240412195131930" style="zoom:50%;" />

- **二级缓存开启方式**：

  1. 全局配置文件

  ```xml
  <settings>
      <setting name="cacheEnabled" value="true/>
  </settings>
  ```

  2. 映射文件

  ```xml
  使用<cache/>标签让mapper.xml映射文件生效二级缓存
  ```

## Mybatis一二级缓存的脏数据问题

多 SqlSession 或者分布式环境下，就可能有脏数据的情况发生，建议将一级缓存级别设置为 statement。

**一级缓存有脏数据的情况**，因为不同 SqlSession 之间的修改不会影响彼此，比如 SqlSession1 读了数据 A，SqlSession2 将数据改为 B，此时 SqlSession1 再读还是得到 A，这就出现了脏数据的问题。

**二级缓存也会有脏数据的情况**，比如多个命名空间进行多表查询，各命名空间之间数据是不共享的，所以存在脏数据的情况。

例如 A、B 两张表进行联表查询，表 A 缓存了这次联表查询的结果，则结果存储在表 A 的 namespace 中，此时如果表 B 的数据更新了，是不会同步到表 A namespace 的缓存中，因此就会导致脏读的产生。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410081502315.png" style="zoom: 60%;" />

可以看到 mybaits 缓存还是不太安全，**在分布式场景下肯定会出现脏数据**。

建议生产上使用 redis 结合 spring cache 进行数据的缓存，或者利用 guava、caffeine 进行本地缓存。

## MyBatis 延迟加载的实现原理是什么？

**实现原理**

1. **代理对象**：MyBatis 使用动态代理技术来实现延迟加载。当查询一个对象时，MyBatis 并不会立即加载关联的对象，而是返回一个代理对象。
2. **拦截器**：当访问代理对象中的属性时，代理对象会拦截这些访问请求，并在第一次访问时触发实际的数据库查询。
3. **缓存**：查询结果会被缓存起来，以便后续访问时不再需要进行数据库查询。

## MyBatis 如何实现db和pojo类的类型转换？

MyBatis 使用**类型处理器（TypeHandlers）**来实现数据库类型和 Java 类型之间的转换。类型处理器是一些实现了 `org.apache.ibatis.type.TypeHandler` 接口的类，它们负责将 Java 类型转换为数据库类型，反之亦然。

1. **内置类型处理器**：MyBatis 提供了许多内置的类型处理器，用于处理常见的数据类型转换，如 `IntegerTypeHandler`、`StringTypeHandler` 等。
2. **自定义类型处理器**：用户可以自定义类型处理器来处理特定的数据类型转换。自定义类型处理器需要实现 `TypeHandler` 接口，并在 MyBatis 配置文件中注册。

## MyBatis 的优点和缺点？

**优点**

1. **简单易学**：MyBatis 的 API 设计简洁，易于学习和使用。
2. **灵活性高**：MyBatis 允许开发者编写 SQL 语句，提供了很大的灵活性。
3. **支持动态 SQL**：MyBatis 支持动态 SQL，可以根据条件动态生成 SQL 语句。
4. **延迟加载**：支持延迟加载，提高性能。
5. **类型处理器**：支持自定义类型处理器，方便处理复杂的数据类型转换。

**缺点**

1. **SQL 分离**：SQL 语句写在 XML 文件中，与业务逻辑分离，不利于维护。
2. **性能问题**：对于复杂的查询，MyBatis 可能不如一些 ORM 框架优化得那么好。
3. **学习曲线**：虽然简单易学，但对于初学者来说，理解和掌握所有特性仍需时间。
