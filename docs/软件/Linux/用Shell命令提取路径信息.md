# 提取`文件夹`的路径信息


> /Users/hzx/Desktop/my_folder
>
> 如何分别获得"my_folder"?

```shell
folder_path="/Users/hzx/Desktop/my_folder"

# 提取目录名称
folder_name=$(basename "$folder_path")
echo "文件夹名称: $folder_name"

# 提取父目录路径名称
parent_folder_path=$(dirname "$folder_path")/
echo "父目录路径: $parent_folder_path"
```

**输出结果**

```shell
文件夹名称: my_folder
父目录路径: /Users/hzx/Desktop/
```

**原理**

- $(basename "$folder_path")

  提取路径中最后的部分，可能是文件名，也可能是文件夹名。basename 会找到路径中最后一个 /，并返回它之后的部分。

- $(dirname "$folder_path")/

  提取路径中除最后一部分外的目录路径，并在结果末尾加上一个 /。

# 提取`文件`的路径信息

> /Users/hzx/Desktop/123.png
>
> 如何分别获得"123"、"png"、"123.png"和“/Users/hzx/Desktop/”?

**代码示例**

```shell
file_path="/Users/hzx/Desktop/123.png"

# 获取完整文件名 (包括扩展名)
file_name=$(basename "$file_path")
echo "完整文件名: $file_name"

# 获取文件扩展名
file_ext="${file_name##*.}"
echo "文件扩展名: $file_ext"

# 获取文件名 (不包括扩展名)
file_base="${file_name%.*}"
echo "文件名: $file_base"

# 获取父目录路径
parent_folder_path=$(dirname "$file_path")/
echo "父目录路径: $parent_folder_path"
```

**输出结果**

```shell
完整文件名: 123.png
文件扩展名: png
文件名: 123
父目录路径: /Users/hzx/Desktop/
```

**原理解析**

- basename "$file_path"

  提取路径中最后的部分，可能是文件名，也可能是文件夹名。

- "${file_name##*.}"

  提取文件名中最后一个 . 之后的内容，即扩展名。

  这里的 ## 是一种模式匹配操作，表示匹配最长的模式（.*）并删除。

- "${file_name%.*}"

  提取文件名中最后一个 . 之前的内容，不包括扩展名。

  这里的 % 是模式匹配操作，表示匹配最短的模式（.*）并删除。

