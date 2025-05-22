## 项目结构

```
ldap-stack/
├── docker-compose.yml
└── ldap/
    └── bootstrap.ldif
```

### `docker-compose.yml`

```dockerfile
version: "3.8"

services:
  openldap:
    image: osixia/openldap:1.5.0
    container_name: openldap
    environment:
      - LDAP_ORGANISATION=HzxOrg
      - LDAP_DOMAIN=www.codebox.icu
      - LDAP_ADMIN_PASSWORD=admin123
      - LDAP_TLS=false
      - LDAP_CONFIG_PASSWORD=config123
    ports:
      - "389:389"
      - "636:636"
    volumes:
      - ./ldap/bootstrap.ldif:/container/environment/99-custom/bootstrap.ldif:ro
      - ldap-data:/var/lib/ldap
      - ldap-config:/etc/ldap/slapd.d

  phpldapadmin:
    image: osixia/phpldapadmin:0.9.0
    container_name: phpldapadmin
    environment:
      - PHPLDAPADMIN_LDAP_HOSTS=openldap
      - PHPLDAPADMIN_HTTPS=false
    ports:
      - "8080:80"
    depends_on:
      - openldap

volumes:
  ldap-data:
  ldap-config:
```

### `bootstrap.ldif`

```
dn: ou=users,dc=www,dc=codebox,dc=icu
objectClass: organizationalUnit
ou: users

dn: ou=groups,dc=www,dc=codebox,dc=icu
objectClass: organizationalUnit
ou: groups

##########################
# 👤 用户: adminuser
##########################
dn: uid=adminuser,ou=users,dc=www,dc=codebox,dc=icu
objectClass: inetOrgPerson
objectClass: posixAccount
cn: 管理员
sn: 用户
uid: adminuser
uidNumber: 10001
gidNumber: 20001
homeDirectory: /home/adminuser
loginShell: /bin/bash
userPassword: {SSHA}Vh5Lz4vvO16JORLujo9yKOyEFvVC1QET

##########################
# 👤 用户: devuser
##########################
dn: uid=devuser,ou=users,dc=www,dc=codebox,dc=icu
objectClass: inetOrgPerson
objectClass: posixAccount
cn: 开发者
sn: 用户
uid: devuser
uidNumber: 10002
gidNumber: 20002
homeDirectory: /home/devuser
loginShell: /bin/bash
userPassword: {SSHA}4UKLb3cGgsFAHiY4jp6LrWYCY5D/KweC

##########################
# 👤 用户: audituser
##########################
dn: uid=audituser,ou=users,dc=www,dc=codebox,dc=icu
objectClass: inetOrgPerson
objectClass: posixAccount
cn: 审计员
sn: 用户
uid: audituser
uidNumber: 10003
gidNumber: 20003
homeDirectory: /home/audituser
loginShell: /bin/bash
userPassword: {SSHA}rrBCZO29j1isiKWn1WYcKKQMaHHXeGXn

##########################
# 👤 用户: testuser
##########################
dn: uid=testuser,ou=users,dc=www,dc=codebox,dc=icu  # 用户的唯一标识路径，作为登录 DN 使用
objectClass: inetOrgPerson                           # 支持 name、email 等属性（人类用户）
objectClass: posixAccount                            # 用于 Unix 系统集成，支持 uidNumber/gidNumber
cn: 测试用户                                          # common name，一般显示用
sn: 用户                                              # surname，姓
uid: testuser                                         # 用户名
uidNumber: 10001                                      # 唯一用户编号
gidNumber: 10001                                      # 所属组编号
homeDirectory: /home/testuser                         # 模拟 Unix 系统路径
loginShell: /bin/bash                                 # 模拟登录 Shell
userPassword: {SSHA}pRC7nY7mahZNxffOCIbeZ8ybd+C79DIy  # 密文密码


##########################
# 👥 用户组: admins
##########################
dn: cn=admins,ou=groups,dc=www,dc=codebox,dc=icu
objectClass: posixGroup
cn: admins
gidNumber: 20001
memberUid: adminuser

##########################
# 👥 用户组: devs
##########################
dn: cn=devs,ou=groups,dc=www,dc=codebox,dc=icu
objectClass: posixGroup
cn: devs
gidNumber: 20002
memberUid: devuser

##########################
# 👥 用户组: tests
##########################
dn: cn=tests,ou=groups,dc=www,dc=codebox,dc=icu
objectClass: posixGroup
cn: tests
gidNumber: 10001
memberUid: testuser
```

## LDAP 客户端登录

> 记得开放服务器389、636、8080端口

以`phpldapadmin`为例：

| 用户名      | 登录 DN                             | 密码       |
| ----------- | ----------------------------------- | ---------- |
| `adminuser` | `cn=admin,dc=www,dc=codebox,dc=icu` | `admin123` |

## 认证

生成密码：

```shell
slappasswd -s test123
```

进入容器：

```shell
docker exec -it openldap bash
```

运行如下命令：

```shell
ldapsearch -x -H ldap://localhost -b dc=www,dc=codebox,dc=icu -D "cn=admin,dc=www,dc=codebox,dc=icu" -w admin123
```

🌐 查询 LDAP 是否连通（匿名绑定尝试）

```shell
ldapsearch -x -H ldap://localhost:389 -b "dc=www,dc=codebox,dc=icu"
```

> 不带 `-D` 和 `-w` 是匿名绑定，仅限开放的 LDAP 服务端可用。

## TODO

当前依然有许多问题，比如：

- `bootstrap.ldif`中注册的用户不知道怎么登录
- LDAP 客户端`phpldapadmin`界面太古老了，且没有中文，学习曲线陡峭
- openldap的命令学习曲线陡峭，缺乏文档
- 暂时不知道如何接入公司的中台项目中