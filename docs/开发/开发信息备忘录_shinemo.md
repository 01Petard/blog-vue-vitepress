# 公司

## 基础设施

[动态密码](Wciw8EVPjNX)

### 公司邮箱

```
huangzexiao@shinemo.com
```

客户端密码：`zSSJhrTVzeBsh7Zg`，密码用途：`办公PC`

日报：`日&周报接收人：组长-部门经理-HRBP-事业部负责人-HRD-CEO`

审批：`请假3天以内：组长-部门经理-事业部负责人-HRD；请假超过3天：组长-部门经理-事业部负责人-HRD-CEO`

### Jira

```
https://jira.shinemo.com
```

### wiki

```
https://wiki.shinemo.com
```

### ci

```
https://ci.uban360.com
```

### IM（OA）

```
https://saas.uban360.com/portal/#/portal/web-im
```

### tokenpony

```
4u4DhSY4a8g1kcbw  李强
6pgdSTao0pxtKTGo  张苏波
3FiWX92PJBLm0lyi  苏林
7PISaNT9ZV8nHcbm  黄泽校
3OcjOWSAy1qvxVV7  田博文
3M41iSdA52cfikRa  陆佳豪
VQdwPAo2NkGZHMhq  秦延宾
529ylFOFH0kz6pWl  易鹏
6dpe6eIn5Bq2C8O1  刘俊杰
1GfUEkGS2m8z8X6E  黄志磊
```

# 研发

## ai-plaza-hub

测试账号

```shell
shinemoadmin
Shinemo123
```



### AI选品

```
https://10.2.31.10:21006/ai-open-platform/#/login?portal=1
```

```
管理员账号：lq/Shinemo@12
```

```
我的账号：hzx/Shinemo@12
```

> [【智能体一体机】站点、租户、账号、权限管理](https://wiki.shinemo.com/pages/viewpage.action?pageId=229217827)

**数据库**

```
host: 10.2.31.10
db: shinemo_im
user: root
password: mjCMYzXxskfTWbY7vGzs
```





常用 tag 相关命令：

```shell
# 创建本地 tag 
git tag <tagname>
#例如( -m 参数可以添加描述)： 
git tag tag-20210510-lightioc -m "轻量 IOC prd地址: https://wiki.shinemo.com/pages/viewpage.action?pageId=74191105"
# 推送到远程仓库 
git push origin <tagname>
#例如
git push origin tag-20210510-lightioc
# 基于 tag 生成新的分支 fix-20210607-lightioc
git checkout tag-20210510-lightioc -b fix-20210607-lightioc
##########################################################################
# 删除本地 tag 
git tag -d <tagname>
# 查看本地 tag 列表(按 q 退出查看)
git tag
# 查看 tag 详情
git show tag-20210510-lightioc 
# 删除远程 tag 
git push origin :refs/tags/<tagname>
#查看远程 tag 列表 
git ls-remote --tags origin
```













```
# 编译检查                                                                                                       
  mvn clean compile -DskipTests                                                                                            
  # 代码格式化                                                                                                          
  mvn spotless:apply                                                                                                       
  2. 使用 Git 工作流                                                                                                   
  # 开发新功能                                                                                                          
  git checkout -b feature/your-feature                                                                        
  # 提交代码                                                                                                                                                                                                                                  
  git add .                                                                                                                                                                                                                                   
  git commit -m "feat: 添加xxx功能"                                                                                       
  # 推送                                                                                                                                                                                                                                      
  git push origin feature/your-feature                                                                                                                                                                                                                                                                                                               
  # 创建 PR                                                                                                               
  3. 推送到测试环境后的验证                                                                                                                                                                                                             
  - 查看测试环境日志                                                                                                                                                                                                                          
  - 使用测试环境的数据库和服务                                                                                                                                                                                                                
  - 通过 API 测试功能            
```









































































# -
# -
# 关系人

![image-20260224100047988](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202602241000084.png)

![image-20260224100057855](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202602241000907.png)

