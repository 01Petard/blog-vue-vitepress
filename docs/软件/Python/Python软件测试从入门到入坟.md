# 从测试入门到自动化测开

软件测试这东西，说简单也简单，说复杂也复杂。它的本质就是一句话：**验证软件是否按照预期工作，并在各种情况下都表现合理**。我给你梳理几个核心概念，帮你建立清晰的地图：

### 1. 软件测试的定义

软件测试是**在受控条件下运行软件**，通过观察输出结果和行为，来判断它是否满足需求规范，能否在各种环境下可靠运行。换句话说，就是“找 bug”+“确认没 bug”。

### 2. 软件测试的目标

- **验证**：软件功能和设计需求一致（做了该做的事）。
- **确认**：软件在实际业务和用户使用中能跑得动（能解决实际问题）。
- **提高质量**：通过测试发现缺陷，推动修复，降低上线风险。

### 3. 测试的分类

常见的几种维度：

**（1）按测试方法：**

- **黑盒测试**：只看输入和输出，不管内部逻辑。就像按电视遥控器，不需要知道电路怎么连的。
- **白盒测试**：关心内部实现，比如分支覆盖、循环测试。更像拆开电视去看芯片逻辑。
- **灰盒测试**：介于两者之间，既参考设计文档，又关注输入输出。

**（2）按测试层级：**

- **单元测试（Unit Test）**：最小颗粒度，通常是函数、类。
- **集成测试（Integration Test）**：不同模块拼在一起跑，看能否协同工作。
- **系统测试（System Test）**：整个系统整体功能是否符合需求。
- **验收测试（Acceptance Test）**：用户或客户来验证，能否满足业务目标。

**（3）按执行方式：**

- **手工测试**：人亲自操作、点点点。
- **自动化测试**：写脚本或工具来跑，适合回归、重复性强的测试。

**（4）按目的：**

- **功能测试**：验证功能是否正确。    
- **性能测试**：压力测试、负载测试，看在高并发、大数据量下的表现。
- **安全测试**：找漏洞，比如 SQL 注入、越权访问。
- **兼容性测试**：不同浏览器、设备、操作系统下是否都能正常跑。

### 4. 测试的生命周期（典型流程）

1. **需求分析**：理解要测什么。
2. **测试计划**：制定范围、方法、资源。
3. **测试设计**：编写测试用例。
4. **测试执行**：跑用例、记录结果。
5. **缺陷管理**：提交 bug、跟踪修复。
6. **测试报告**：总结质量、风险、结论。

### 5. 测试用例与缺陷

- **测试用例（Test Case）**：一条具体的“怎么测”的步骤，包含输入、操作、期望结果。
- **缺陷（Bug/Defect）**：软件表现与期望不一致时，记录下来的问题。

### 6. 软件测试和质量保证（QA）

测试是发现问题，**质量保证（QA）**更大一层，它包含过程改进、规范、工具、评审等，确保整个软件生命周期都在可控范围。可以理解为：**测试是补救，QA是预防。**

---

其实，测试并不只是找 bug，更重要的是：**提升软件的可靠性、可维护性和用户体验**。这也是为什么现在测试和开发界限越来越模糊，单元测试、CI/CD、自动化测试已经成了标配。


# Pytest学习与使用
<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202508151922147.png" alt="img" style="zoom:40%;" />

## 一、建立 Pytest 思维框架

- **定位**：轻量、插件化的 Python 测试框架
  
- **优势**：写法简洁（不需要类）、fixture 强大、插件丰富、可与 CI/CD 结合
  
- **核心理念**：测试代码应像生产代码一样干净、可维护
  

**官方文档**

- [pytest 官方](https://docs.pytest.org/en/stable)
  
- [pytest 中文文档](https://www.osgeo.cn/pytest/)
  

**关键词**：fixture、mark、parametrize、hook、plugin

## 二、基础用法

1. **文件与函数命名**
   
    - 文件：`test_*.py` 或 `*_test.py`
      
    - 函数：`test_xxx`
    
2. **断言**
   
    - 直接用 `assert`，pytest 自动输出详细对比
    
3. **测试执行与分类**
   
    - 基本执行：`pytest test_xxx.py`
      
    - 按关键字：`-k`
      
    - 按标记：`-m`
    
4. **Fixture**
   
    - `@pytest.fixture` 做 setup/teardown
      
    - 作用域：function、class、module、session
    
5. **参数化**
   
    - `@pytest.mark.parametrize` 支持数据驱动
      

**练习目标**：写一个用 `requests` 测试 GET/POST 接口的用例

## 三、进阶功能

- **Mark 标记**：`@pytest.mark.smoke`、`skip`、`xfail`
  
- **conftest.py**：放公共 fixture，例如登录、数据库连接
  
- **Hook 函数**：动态处理用例执行，如 `pytest_runtest_setup`
  
- **pytest.ini**：统一管理运行参数与 mark
  
- **插件**
  
    - `pytest-html`：生成 HTML 报告
      
    - `allure-pytest`：生成可视化报告
      
    - `pytest-xdist`：并发执行测试
      

**练习目标**：用 conftest + fixture + allure 搭建小型接口测试框架

## 四、结合项目场景

- **接口测试**：`requests` + pytest + allure，支持 YAML/CSV/Excel 参数化
  
- **UI 自动化**（可选）：`selenium` / `playwright` + pytest
  
- **Mock 外部依赖**：`pytest-mock`
  
- **数据库校验**：`pymysql` / `sqlalchemy`
  

## 五、工程化与 CI/CD

- 将 pytest 嵌入 Jenkins / GitLab CI / GitHub Actions
  
- 测试报告归档
  
- 失败用例重跑：`pytest-rerunfailures` 插件
  

## 六、两周学习路径

**第一周：基础 + 简单实战**

- Day1-2：pytest 基础（断言、执行、fixture、参数化）
  
- Day3：接口测试脚本（requests）
  
- Day4-5：conftest.py、pytest.ini、mark
  
- Day6：pytest-html 生成报告
  
- Day7：复盘 + 整理笔记
  

**第二周：进阶 + 工程化**

- Day8-9：allure-pytest，美化报告
  
- Day10：hook、自定义命令行参数
  
- Day11-12：数据库验证、mock
  
- Day13：整合成小型测试框架
  
- Day14：在 CI/CD 上跑 pytest
  

## 七、接口自动化骨架示例

### 目录结构

```
tests/
├── conftest.py           # 公共 fixture
├── test_demo_api.py      # 示例接口用例
├── data/
│   └── api_data.yaml     # 测试数据
pytest.ini                # pytest 配置
requirements.txt
```
### requirements.txt

```txt
pytest
requests
allure-pytest
PyYAML
```
### pytest.ini

```ini
[pytest]
addopts = -vs --alluredir=./report/allure-results
testpaths = tests
python_files = test_*.py
python_classes = Test*
python_functions = test_*
markers =
    smoke: 冒烟测试
    regression: 回归测试
```
### data/api_data.yaml

```yaml
get_user:
  url: "https://jsonplaceholder.typicode.com/users/1"
  method: "GET"
  expected_status: 200
  expected_name: "Leanne Graham"
```
### conftest.py

```python
import pytest, yaml, os

@pytest.fixture(scope="session")
def load_data():
    """加载测试数据"""
    data_path = os.path.join(os.path.dirname(__file__), "data", "api_data.yaml")
    with open(data_path, encoding="utf-8") as f:
        return yaml.safe_load(f)
```
### test_demo_api.py

```python
import requests, pytest

@pytest.mark.smoke
def test_get_user(load_data):
    case = load_data["get_user"]
    resp = requests.request(method=case["method"], url=case["url"])
    assert resp.status_code == case["expected_status"], f"状态码错误: {resp.status_code}"
    assert resp.json()["name"] == case["expected_name"], f"用户名不匹配: {resp.json()['name']}"
```

## 八、运行方式

1. 安装依赖：

```bash
pip install -r requirements.txt
```

```shell
brew install allure
```

2. 运行测试：

```bash
pytest -vs
```

3. 生成 allure 报告：

```bash
pytest --alluredir=./report/allure-results
allure serve ./report/allure-results
```

# 企业级测试框架——allure

`@allure`是 **allure 测试报告框架** 中用于标记测试用例元数据的注解（通常在 Java、Python 等语言的测试框架如 pytest、TestNG 里配合使用 ），作用是给测试用例分类、分层、添加标题，让测试报告更清晰易读，用法核心区别和场景如下：

**层级关系（从大到小）**：  
`epic`（史诗）→ `feature`（功能）→ `story`（用户故事）→ `title`（用例标题），层层细化，让测试报告结构化，方便团队从不同维度（大模块→小场景）梳理测试覆盖情况，也能快速筛选、定位用例 。

## 1. `@allure.epic`

- **作用**：标记**最顶层的需求 / 史诗级模块**，一般用于划分大的业务领域（比如一个产品的不同大板块）。
- **场景**：  
    比如做电商系统，可定义 `@allure.epic("电商平台")`，把 “购物车”“订单”“商品详情” 等测试用例都归属到这个大 epic 下，方便从最高维度筛选、统计测试范围。

## 2. `@allure.feature`

- **作用**：标记**功能模块**，比 `epic` 更细一层，聚焦单个大功能。
- **场景**：  
    延续电商例子，“电商平台” epic 下，可用 `@allure.feature("购物车功能")` 标记购物车相关用例（如 “添加商品到购物车”“修改购物车数量” ），用来筛选、组织同一功能的测试用例。

## 3. `@allure.story`

- **作用**：标记**用户故事 / 业务场景**，是 `feature` 的细分，描述具体的用户交互流程。
- **场景**：  
    在 “购物车功能” feature 下，用 `@allure.story("用户添加商品到购物车并结算")` 标记一条用例，说明这是一个完整的用户操作场景，报告里能清晰体现功能→场景的层级。

## 4. `@allure.title`

- **作用**：**给测试用例设置标题**，让报告里的用例名称更直观（替代代码里默认的用例方法名）。
- **场景**：  
    代码里测试方法叫 `test_add_to_cart()`，用 `@allure.title("验证商品成功加入购物车，库存扣减正确")` 后，报告里显示的标题更易懂，直接体现测试意图。
  

# Web自动化测试

selenium