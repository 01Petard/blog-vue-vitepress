---
title: SpringMVC注解和配置+fastjson的简单使用
date: 2022-02-14 20:47:15
updated:
categories: 
- 学习
tags: 
- SpringMVC
- 注解
- 配置
- fastjson
keywords:
- SpringMVC
- fastjson
description: Controller层常用注解、fastjson简单上手使用
cover: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/7a46220cec7e445508245e0e7cebccbf62dff0b2.png_320w_200h_1c.jpg
top_img: https://www.yht7.com/upload/image/20200519/2024393-20200518230425868-1113585406.jpg
---

```java
@Controller
```

@Controller负责处理前端控制器(DispatcherServlet )发过来的请求，经过业务逻辑层处理之后封装层一个model，并将其返回给view进行展示

```java
@RestController
```

@RestController = @Controller + @ResponseBody（@ResponseBody 注解是将返回的数据结构转换为 JSON 格式）

```java
@RequestMapping(value="/hello",method={RequestMethod.GET})
```

@RequestMapping用来处理请求地址映射

```java
@RequestParam(value="username",required=true,defaultValue=null)
```

@RequestParam获取请求参数，可以用在对象属性名与方法参数名不一样的场景中

```java
@PathVariable
```

@PathVariable注解用来获取 URL 参数，**用于支持Restful风格的 URL，请求的URL也需要相应地有所改变。**

例如：GetMapping(“user/{id}”)

```java
@ResponseBody
```

@ResponseBody要写在方法名上。如果加上@ResponseBody注解，就不会走视图解析器，不会返回页面，返回的是json数据（所以你应该return字符串，而不是URL地址）。如果不加@ResponseBody，就走视图解析器，返回页面

```java
@RequestBody
```

@RequestBody用于接收前端传来的实体，要写在方法的参数前，**只能发送POST请求。**

```javascript
<!--前端JSON和js对象之间的转换-->
<script type="text/javascript">
   //编写一个js的对象
   var user = {
       name:"秦疆",
       age:3,
       sex:"男"
  };
   //将js对象转换成json字符串
   var str = JSON.stringify(user);
   console.log(str);

   //将json字符串转换为js对象
   var user2 = JSON.parse(str);
   console.log(user2.age,user2.name,user2.sex);

</script>
```

统一解决JSON在SpringMVC中的乱码问题

```xml
<mvc:annotation-driven>
   <mvc:message-converters register-defaults="true">
       <bean class="org.springframework.http.converter.StringHttpMessageConverter">
           <constructor-arg value="UTF-8"/>
       </bean>
       <bean class="org.springframework.http.converter.json.MappingJackson2HttpMessageConverter">
           <property name="objectMapper">
               <bean class="org.springframework.http.converter.json.Jackson2ObjectMapperFactoryBean">
                   <property name="failOnEmptyBeans" value="false"/>
               </bean>
           </property>
       </bean>
   </mvc:message-converters>
</mvc:annotation-driven>
```

fastJSON部分方法的使用

```java
public class FastJsonDemo {
   public static void main(String[] args) {
       //创建一个对象
       User user1 = new User("秦疆1号", 3, "男");
       User user2 = new User("秦疆2号", 3, "男");
       User user3 = new User("秦疆3号", 3, "男");
       User user4 = new User("秦疆4号", 3, "男");
       List<User> list = new ArrayList<User>();
       list.add(user1);
       list.add(user2);
       list.add(user3);
       list.add(user4);

       System.out.println("*******Java对象 转 JSON字符串*******");
       String str1 = JSON.toJSONString(list);//返回数组的JSON字符串
       System.out.println("JSON.toJSONString(list)==>"+str1);
       String str2 = JSON.toJSONString(user1);//返回对象的JSON字符串
       System.out.println("JSON.toJSONString(user1)==>"+str2);

       System.out.println("\n****** JSON字符串 转 Java对象*******");
       User jp_user1=JSON.parseObject(str2,User.class);//把User的JSON字符串转换成Java对象
       System.out.println("JSON.parseObject(str2,User.class)==>"+jp_user1);

       System.out.println("\n****** Java对象 转 JSON对象 ******");
       JSONObject jsonObject1 = (JSONObject) JSON.toJSON(user2);//把一个User对象转换成JSON对象
       System.out.println("(JSONObject) JSON.toJSON(user2)==>"+jsonObject1.getString("name"));//获取JSON对象某个属性的值

       System.out.println("\n****** JSON对象 转 Java对象 ******");
       User to_java_user = JSON.toJavaObject(jsonObject1, User.class);//将一个JSON对象转成一个指定的java对象
       System.out.println("JSON.toJavaObject(jsonObject1, User.class)==>"+to_java_user);
  }
}
```

输入结果：

![img](https://s3.bmp.ovh/imgs/2022/02/cb141f0b46e77708.png)

lombok依赖要引入的几个必要注解：

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class person(){

}
```
