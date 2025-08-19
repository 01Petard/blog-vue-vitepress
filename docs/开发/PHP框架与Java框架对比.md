##  PHP 框架核心对照表

### 总结一句话

- **Laravel**：比较像 PHP 世界里的 **Spring Boot + Django**，偏规范、偏大厂风格。
- **ThinkPHP**：更像 **Express + 一点 ORM**，灵活，国内公司小项目、外包系统常见。

| 功能点              | Laravel (国际主流)                                           | ThinkPHP (国内常见)                           | 类比（Java / Python / JS）                                 |
| ------------------- | ------------------------------------------------------------ | --------------------------------------------- | ---------------------------------------------------------- |
| **核心架构**        | MVC（Model-View-Controller），强约束，优雅风格               | MVC，但约束松，代码风格因人而异               | Spring MVC / Django / Express                              |
| **依赖管理**        | Composer（类似 npm/pip/maven）                               | Composer（同样用）                            | Maven（Java）、pip（Python）、npm（JS）                    |
| **ORM**             | Eloquent ORM，链式调用强大，和 ActiveRecord 模式结合         | 自带 ORM（简单），常有人直接写 SQL            | Hibernate（Java）、Django ORM、Sequelize                   |
| **路由**            | 基于闭包或控制器映射，语法简洁                               | 路由规则灵活（URL 模式化强）                  | Spring Boot @RequestMapping、Flask 路由、Express 路由      |
| **模板引擎**        | Blade（有 @if、@foreach 语法糖）                             | 原生模板或内置简化语法                        | Thymeleaf（Java）、Jinja2（Python）、EJS（JS）             |
| **依赖注入 / 容器** | 有 Service Container，支持依赖注入                           | 支持，但用得少                                | Spring IoC / NestJS                                        |
| **中间件**          | 内置支持，比如认证、日志、跨域                               | 有，但用得不多                                | Spring Filter、Flask Middleware、Express Middleware        |
| **认证 / 权限**     | Laravel Passport、Sanctum 等官方方案                         | 需要自己写或第三方扩展                        | Spring Security、Django Rest Auth、Passport.js             |
| **生态**            | Nova（后台）、Horizon（队列监控）、Cashier（支付）、Scout（搜索） | 中文文档、国内社区活跃，但生态没 Laravel 丰富 | Spring Cloud、Django REST + 插件、Next.js + npm            |
| **风格**            | “优雅优先”，架构清晰，适合大中型系统                         | “实用主义”，上手快，适合快速交付              | Laravel ≈ Spring Boot / Django；ThinkPHP ≈ Express / Flask |

## 项目结构对比

### 快速映射

- Laravel 的 **Controller** = Spring 的 `@RestController`
- Laravel 的 **Model** = Spring 的 `@Entity + JPA Repository`
- Laravel 的 **Migration** = Flyway/Liquibase 脚本
- Laravel 的 **Service** = 你自己建个 `app/Services/`，和 Spring Boot 的 service 层一样
- Laravel 的 **routes 文件** = Spring 的注解路由（只是换了个地方集中写）

### 项目结构对照

| 框架 / 功能模块 | 应用核心                     | 控制器                    | 模型 / 实体                                         | 服务层                   | 路由定义                                | 配置文件                             | 模板 / 视图            | 静态资源            | 数据库迁移                           | 数据填充                  | 国际化            | 测试             | 依赖管理                   | 命令行工具                                |
| --------------- | ---------------------------- | ------------------------- | --------------------------------------------------- | ------------------------ | --------------------------------------- | ------------------------------------ | ---------------------- | ------------------- | ------------------------------------ | ------------------------- | ----------------- | ---------------- | -------------------------- | ----------------------------------------- |
| **Laravel**     | `app/`                       | `app/Http/Controllers/`   | `app/Models/`                                       | `app/Services/` (可自建) | `routes/web.php`, `routes/api.php`      | `config/` + `.env`                   | `resources/views/`     | `public/`           | `database/migrations/`               | `database/seeders/`       | `resources/lang/` | `tests/`         | `composer.json`            | `artisan`                                 |
| **ThinkPHP**    | `application/`               | `application/controller/` | `application/model/` 或 `application/common/model/` | `application/service/`   | `route/`                                | `config/` + `.env`                   | `application/view/`    | `public/`           | `database/migrations/`               | `database/seeds/`         | `lang/`           | `tests/`         | `composer.json`            | `think`                                   |
| **Spring Boot** | `src/main/java/com/example/` | `controller/` 包          | `entity/` + `repository/`                           | `service/` 包            | 注解：`@RequestMapping` / `@GetMapping` | `src/main/resources/application.yml` | `resources/templates/` | `resources/static/` | `db/migration/` (Flyway / Liquibase) | `data.sql` / `import.sql` | `resources/i18n/` | `src/test/java/` | `pom.xml` / `build.gradle` | `mvn spring-boot:run` / `gradlew bootRun` |

### 总结风格差异

- **Laravel**：国际范，像 **Spring Boot + Django**，约束清晰、目录分明、生态齐全。
- **ThinkPHP**：更贴近国内团队习惯，目录更自由，很多项目会随意改动，风格上像 **Express + ORM**。
- **Spring Boot**：更“强工程化”，通过包结构 + 注解约束来组织项目。