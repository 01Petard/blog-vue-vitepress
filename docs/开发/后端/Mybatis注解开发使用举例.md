---
title: Mybatis注解开发使用举例
date: 2022-02-06 16:12:15
updated:
categories: 
- 学习
tags: 
- Mybatis
- 注解
keywords:
- Mybatis
- 注解
description: 有关Mybatis单表操作、多表操作，立即加载、延迟加载的操作
cover: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/1620.png
top_img: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/1620.jpg

---

单表操作

```java
public interface IUserDao {

    /**
     * 查询所有用户
     * @return
     */
    @Select(value = "select * from user")
    List<User> findAll();

    /**
     * 保存用户
     */
    @Insert(value = "insert into user(username,address,sex,birthday)values(#{username},#{address},#{sex},#{birthday})")
    void saverUser(User user);

    /**
     * 更新用户
     */
    @Update("update user set username = #{username},birthday = #{birthday},sex = #{sex},address = #{address} where uid = #{uid}")
    void updateUser(User user);


    /**
     * 删除用户
     */
    @Delete("delete from user where uid = #{uid}")
    void deleteUser(Integer id);


    /**
     * 根据id查询用户
     */
    @Select("select * from user where uid = #{uid}")
    User findById(Integer id);


    /**
     * 根据用户名称模糊查询
     */
//    @Select("select * from user where username like #{username}")//需要传百分号
    @Select("select * from user where username like '%${value}%'")//不需要传百分号
    List<User> findUserByName(String name);

    /**
     * 查询用户总数量
     */
    @Select("select count(*) from user")
    int findTotalUser();

}
```

多表操作（一对一，立即加载）

```java
public interface IAccountDao {

    /**
     * 查询所有账户，并且获取每个账户所属的用户信息
     * @return
     */
    @Select("select * from account")
    @Results(id = "accountMap",value = {
            @Result(id = true,property = "id",column = "id"),
            @Result(property = "uid",column = "uid"),
            @Result(property = "money",column = "money"),
            @Result(property = "user",column = "uid",
                    one = @One(select="com.itheima.dao.IUserDao.findById",fetchType= FetchType.EAGER))
    })
    List<Account> findAll();

    /**
     * 根据用户id查询账户信息
     * @param userId
     * @return
     */
    @Select("select * from account where uid = #{userId}")
    List<Account> findAccountByUid(Integer userId);


}
```

多表操作（一对多，延迟加载）

```java
//开启二级缓存
@CacheNamespace(blocking = true)

public interface IUserDao {
    /**
     * 查询所有用户
     *
     * @return
     */
    @Select(value = "select * from user")
    @Results(id = "userMap", value = {
            @Result(id = true, property = "userId", column = "uid"),
            @Result(property = "userName", column = "username"),
            @Result(property = "userSex", column = "sex"),
            @Result(property = "userAddress", column = "address"),
            @Result(property = "userBirthday", column = "birthday"),
            @Result(property = "accounts", column = "uid",
                    many = @Many(select = "com.itheima.dao.IAccountDao.findAccountByUid", fetchType = FetchType.LAZY))
    })
    List<User> findAll();

    /**
     * 根据uid查询用户
     */
    @Select("select * from user where uid = #{uid}")
    @ResultMap(value = {"userMap"})
    User findById(Integer uid);


    /**
     * 根据用户名称模糊查询
     */
    @Select("select * from user where username like #{username}")//需要传百分号
//    @Select("select * from user where username like '%${value}%'")//不需要传百分号
    @ResultMap(value = {"userMap"})
    List<User> findUserByName(String name);


}
```
