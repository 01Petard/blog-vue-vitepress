# Python数据分析常用模块学习点梳理

## 一、整体关系

```text
NumPy
  ↓ 提供底层数组和数值计算
pandas
  ↓ 提供 Series、DataFrame 数据处理
Matplotlib
  ↓ 提供基础绘图能力
Seaborn
  ↓ 基于 Matplotlib，提供统计图表
SciPy
  ↓ 提供科学计算和统计方法
scikit-learn
  ↓ 提供机器学习与数据预处理
PyTorch
  ↓ 提供神经网络和深度学习
```

对数据分析项目，可以理解成：

```text
数据读取 → pandas
数值计算 → NumPy
数据清洗 → pandas
统计分析 → pandas + SciPy
数据可视化 → Matplotlib + Seaborn
传统机器学习 → scikit-learn
神经网络训练 → PyTorch
```

------

## 二、模块用处

| 工具         | 类型            | 主要用途                       | 是否必须       |
| ------------ | --------------- | ------------------------------ | -------------- |
| NumPy        | Python 库       | 数组、矩阵、向量化计算         | 必学           |
| pandas       | Python 库       | 表格数据读取、清洗、转换、统计 | 必学           |
| Series       | pandas 数据结构 | 一维带索引数据                 | 必学           |
| DataFrame    | pandas 数据结构 | 二维表格数据                   | 必学           |
| Matplotlib   | Python 库       | 基础绘图和精细控制             | 必学基础       |
| Seaborn      | Python 库       | 统计分析图表                   | 建议学         |
| SciPy        | Python 库       | 科学计算、优化、统计检验       | 按需学习       |
| scikit-learn | Python 库       | 传统机器学习、预处理、评估     | 做机器学习必学 |
| PyTorch      | Python 库       | 神经网络和深度学习             | 做深度学习再学 |
| Jupyter      | 开发工具        | 交互式分析、实验和展示         | 建议掌握       |

## 三、模块介绍

### NumPy

NumPy 的核心是多维数组：

```python
import numpy as np

values = np.array([10.2, 11.5, 9.8, 12.1])

print(values.mean())
print(values.max())
print(values.std())
```

主要学习：

- `ndarray`
- 一维、二维、多维数组
- `shape`、`dtype`、`ndim`
- 索引和切片
- 布尔筛选
- 广播机制
- 向量化计算
- 缺失值 `NaN`
- 聚合计算
- 数组变形
- 随机数
- 矩阵运算

**为什么不用普通 List**

普通方式：

```python
result = [item * 2 for item in values]
```

NumPy 方式：

```python
result = values * 2
```

NumPy 的优势不只是代码短，而是：

- 底层连续内存
- 批量向量化计算
- 避免大量 Python 循环
- 是 pandas、SciPy、scikit-learn、PyTorch 等工具的基础

但普通业务代码没必要强行用 NumPy。它主要适合大量同类型数值计算。

### pandas

pandas 是 Python 表格数据处理的核心库。

例如读取 CSV：

```python
import pandas as pd

df = pd.read_csv("sensor_data.csv")
```

读取后得到的通常就是 `DataFrame`。

**pandas 重点内容**

你需要掌握：

1. CSV、Excel、JSON、SQL、Parquet 读取
2. 行列选择：`loc`、`iloc`
3. 条件筛选
4. 缺失值处理
5. 重复值处理
6. 数据类型转换
7. 字符串处理
8. 日期时间处理
9. 排序
10. 分组聚合
11. 透视表
12. 多表合并
13. 滚动窗口
14. 重采样
15. 数据导出

对于工业时序数据，下面这些特别重要：

```python
df["time"] = pd.to_datetime(df["time"])
df = df.set_index("time")

# 每分钟取平均值
df.resample("1min").mean()

# 计算最近 10 个点的滚动平均值
df["rolling_mean"] = df["temperature"].rolling(10).mean()

# 与上一条记录的差值
df["diff"] = df["temperature"].diff()
```

### Series

`Series` 是一维数据，可以理解为数据库表的一列：

```python
temperature = pd.Series(
    [23.5, 24.1, 22.8],
    name="temperature"
)
```

它包含：

```text
索引 + 数据 + 数据类型 + 名称
```

例如：

```text
0    23.5
1    24.1
2    22.8
```

常见操作：

```python
temperature.mean()
temperature.max()
temperature.isna()
temperature > 23
```

从 `DataFrame` 选择单列，通常得到 `Series`：

```python
temperature = df["temperature"]
```

### DataFrame

`DataFrame` 是二维表格，可以类比数据库查询结果：

| time  | temperature | pressure |
| ----- | ----------- | -------- |
| 10:00 | 23.5        | 101.2    |
| 10:01 | 24.1        | 100.9    |
| 10:02 | 22.8        | 101.4    |

创建方式：

```python
df = pd.DataFrame({
    "temperature": [23.5, 24.1, 22.8],
    "pressure": [101.2, 100.9, 101.4],
})
```

常见操作：

```python
# 查看前几行
df.head()

# 查看字段类型和非空数量
df.info()

# 描述性统计
df.describe()

# 选择一列，返回 Series
df["temperature"]

# 选择多列，返回 DataFrame
df[["temperature", "pressure"]]

# 条件筛选
df[df["temperature"] > 23]

# 新增字段
df["temperature_diff"] = df["temperature"].diff()

# 按字段分组
df.groupby("device_id")["temperature"].mean()

# 按关联字段合并
pd.merge(left, right, on="device_id")
```

### Matplotlib

Matplotlib 是 Python 最基础的绘图库。

```python
import matplotlib.pyplot as plt

plt.plot(df["time"], df["temperature"])
plt.xlabel("Time")
plt.ylabel("Temperature")
plt.title("Temperature Trend")
plt.show()
```

它适合：

- 折线图
- 柱状图
- 散点图
- 直方图
- 饼图
- 多子图
- 自定义坐标轴
- 精细控制图表内容
- 保存 PNG、SVG、PDF

需要掌握：

```python
fig, ax = plt.subplots()

ax.plot(x, y)
ax.set_title("Temperature")
ax.set_xlabel("Time")
ax.set_ylabel("Value")

fig.savefig("temperature.png", dpi=300)
```

建议使用面向对象写法：

```python
fig, ax = plt.subplots()
```

少依赖全局式的：

```python
plt.plot(...)
```

复杂项目中，面向对象写法更容易管理多个图表。

### Seaborn

Seaborn 基于 Matplotlib，主要用于统计可视化。

```python
import seaborn as sns

sns.histplot(data=df, x="temperature")
```

常见图表：

```python
# 数据分布
sns.histplot(data=df, x="temperature", kde=True)

# 箱线图，识别离群值
sns.boxplot(data=df, x="temperature")

# 两个变量之间的关系
sns.scatterplot(
    data=df,
    x="temperature",
    y="pressure",
)

# 相关系数热力图
sns.heatmap(
    df.corr(numeric_only=True),
    annot=True,
    cmap="coolwarm",
)
```

它适合分析：

- 数据分布
- 异常值
- 变量相关性
- 分类之间的差异
- 多变量关系
- 回归趋势

Matplotlib 和 Seaborn 的区别：

| 对比项         | Matplotlib     | Seaborn             |
| -------------- | -------------- | ------------------- |
| 定位           | 通用基础绘图库 | 统计可视化库        |
| 精细控制       | 强             | 基于 Matplotlib     |
| 默认样式       | 相对基础       | 更美观              |
| DataFrame 支持 | 一般           | 很方便              |
| 统计图表       | 需要手动配置   | 开箱即用            |
| 是否能互相替代 | 不能完全替代   | 底层依赖 Matplotlib |

一般用法是：

```text
Seaborn 快速生成统计图
Matplotlib 调整标题、坐标轴和布局
```

### SciPy

SciPy 在 NumPy 之上提供更专业的科学计算能力：

- 统计分布
- 假设检验
- 插值
- 信号处理
- 数值积分
- 优化算法
- 距离计算
- 傅里叶变换

例如比较两个设备的温度均值是否存在显著差异：

```python
from scipy import stats

result = stats.ttest_ind(device_a, device_b)
print(result.statistic)
print(result.pvalue)
```

工业时序场景可能用到：

```python
from scipy.signal import find_peaks

peaks, properties = find_peaks(
    values,
    height=10,
    distance=5,
)
```

不需要从头到尾系统学完整个 SciPy。它体量很大，应根据具体任务学习。

### scikit-learn

scikit-learn 负责传统机器学习。

主要包含：

- 数据标准化
- 类别编码
- 特征选择
- 训练集和测试集切分
- 回归
- 分类
- 聚类
- 降维
- 模型评估
- 参数搜索
- Pipeline

例如：

```python
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error

X = df[["temperature", "pressure", "humidity"]]
y = df["target"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
)

model = RandomForestRegressor(random_state=42)
model.fit(X_train, y_train)

prediction = model.predict(X_test)
print(mean_absolute_error(y_test, prediction))
```

必须掌握的重要概念：

- 特征 `X`
- 标签 `y`
- 训练集、验证集、测试集
- 过拟合和欠拟合
- 标准化
- 数据泄漏
- 交叉验证
- 评价指标
- Pipeline
- 超参数

做时序数据时，不能默认随机切分数据，否则容易把未来数据泄漏给过去。通常应按时间切分：

```python
train = df[df["time"] < "2026-06-01"]
test = df[df["time"] >= "2026-06-01"]
```

### PyTorch

PyTorch 适合：

- 神经网络
- 深度学习
- GPU 训练
- 自定义模型
- 时序预测模型
- 文本模型
- 图像模型

基础模块：

| 模块          | 用途           |
| ------------- | -------------- |
| `torch`       | 张量和数学计算 |
| `torch.nn`    | 神经网络层     |
| `torch.optim` | 优化器         |
| `Dataset`     | 定义数据集     |
| `DataLoader`  | 分批加载数据   |
| `torchvision` | 图像处理       |
| `torchaudio`  | 音频处理       |

如果不做图像，就不需要优先学习 `torchvision`。时序数据通常主要使用：

```python
import torch
from torch import nn
from torch.utils.data import Dataset, DataLoader
```

不过不要一上来就用 LSTM、Transformer。对普通表格和工业时序预测，建议先建立：

- 线性回归
- 随机森林
- XGBoost/LightGBM
- 滞后特征模型

传统模型跑不动或者确实需要复杂序列建模，再上 PyTorch。直接深度学习经常只是把简单问题复杂化。

------

## 四、其他常用工具

| 工具        | 用途                    | 学习优先级   |
| ----------- | ----------------------- | ------------ |
| JupyterLab  | 交互式数据分析          | 高           |
| openpyxl    | 读写 Excel 格式和样式   | 中           |
| PyArrow     | Parquet、Arrow 数据格式 | 中高         |
| Polars      | 高性能 DataFrame 处理   | 后期         |
| statsmodels | 统计模型、时间序列分析  | 按需         |
| Plotly      | 交互式图表              | 按需         |
| XGBoost     | 梯度提升树              | 机器学习阶段 |
| LightGBM    | 高效梯度提升树          | 机器学习阶段 |
| joblib      | 保存 sklearn 模型       | 中           |
| MLflow      | 实验和模型版本管理      | 工程化阶段   |
| Pydantic    | 数据校验和接口模型      | FastAPI 必学 |
| SQLAlchemy  | 数据库访问              | 服务端按需   |
| pytest      | 单元测试                | 工程化必学   |

------

## 五、建议学习范围

### Python 数据处理基础

```text
Python 基础
NumPy
pandas
Jupyter
```

目标：

- 能读取 CSV、JSON、Excel 和数据库数据
- 能完成缺失值、重复值和异常值处理
- 能进行筛选、聚合、合并
- 能完成工业时序重采样和滚动窗口计算

### 数据分析与可视化

```text
Matplotlib
Seaborn
基础统计学
SciPy 部分功能
```

目标：

- 分析数据分布
- 找出异常点
- 分析变量相关性
- 绘制趋势图和统计图
- 理解均值、方差、分位数、相关系数

### 传统机器学习

```text
scikit-learn
XGBoost 或 LightGBM
```

目标：

- 完成特征工程
- 建立分类、回归、聚类模型
- 正确划分数据集
- 评估模型效果
- 保存和加载模型

### 深度学习

```text
PyTorch
```

目标：

- 理解 Tensor
- 编写 `Dataset`、`DataLoader`
- 编写网络、损失函数和训练循环
- 使用 CPU、CUDA 或 MPS
- 保存和加载模型

### 接入 FastAPI

```text
FastAPI
Pydantic
模型推理
异步任务
测试和部署
```

目标：

```text
训练模型
  → 保存模型产物
  → FastAPI 启动时加载
  → 接收请求
  → 数据预处理
  → 执行推理
  → 返回预测结果
```

------

## 六、适合你的最小技术栈

针对数据分析和机器学习服务，第一批建议安装：

```bash
uv add numpy pandas scipy scikit-learn matplotlib seaborn pyarrow
uv add fastapi uvicorn pydantic pydantic-settings
uv add --dev jupyterlab pytest ruff
```

深度学习有明确需求后再安装：

```bash
uv add torch
```

如果要处理 Excel：

```bash
uv add openpyxl
```

推荐学习顺序：

```text
NumPy
→ pandas（Series、DataFrame）
→ Matplotlib
→ Seaborn
→ 基础统计学
→ scikit-learn
→ 时序特征工程
→ PyTorch
→ FastAPI 模型服务化
```

最核心的是 **pandas + scikit-learn**。NumPy 要理解底层逻辑，Matplotlib 和 Seaborn 掌握常用图即可。SciPy、PyTorch 不要为了“技术栈完整”硬学，等具体任务需要再深入。