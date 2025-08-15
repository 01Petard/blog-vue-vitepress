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

3. 生成 Allure 报告（可选）：

```bash
pytest --alluredir=./report/allure-results
allure serve ./report/allure-results
```

