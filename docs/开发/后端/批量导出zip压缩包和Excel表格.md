---
title: 批量导出zip压缩包和Excel表格
date: 2024-06-28 14:31:00
updated: 2024-08-10 18:40:00
categories: 
- 学习
tags: 
- 文件操作
- 压缩包
- 表格
- 导入
- 导出
keywords:
- 文件操作
- 压缩包
- 表格
- 导入
- 导出
description: 批量导出zip压缩包和Excel表格
cover: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410212200646.png
top_img: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410212201073.png
---

## 批量导出压缩包

> 前提：需要导出的文件都有url，且保存在文件服务器上

总的来说使用Redis和MQ完成，共分为三步：

1. 前端发送需要导出的id集合对象，后端将请求对象序列化后发送到mq触发**后台任务**，返回给前端一个uuid；
   - **后台任务**：向文件服务器查询需要下载的文件url，获取所有文件后使用 `File.createTempFile()`方法生成一个临时压缩文件，使用`ZipEntry`将文件转化成Zip文件类型，再用`ZipOutPutStream`将所有文件合并成一个压缩包，然后使用`HttpRequest.post(URL)`向文件服务器发起请求，获得请求体，解析后获得压缩包的url，缓存该url到”业务字段+uuid“。
2. 前端再根据uuid向服务端查询url地址，后端根据”业务字段+uuid“查询缓存，返回文件url；
3. 前端最后根据url向文件服务器发送下载请求，用户端实现在浏览器中下载文件。



## 批量导出表格

> 前提：准备枚举类`ExportExcelEnum`和常量类`ExportExcelHeaderConstant`，枚举类保存Excel模板类型，常量类保存表格模板的列名

使用EasyExcel完成

1. 前端发送需要导出的id集合对象和`HttpServletResponse`对象；
2. 后端根据请求对象中的导出类型选择模板、根据请求对象中的id列表获取导出Excel所需的数据并封装在响应对象中，包括文件名、表头列表和数据行列表；
3. 使用EasyExcel写入数据；

   - 调用`EasyExcel.write(httpServletResponse.getOutputStream())`开始写入Excel文件到HTTP响应的输出流中；
   - 注册`LongestMatchColumnWidthStyleStrategy`处理器来自适应列宽，确保数据能完整显示；
   - 为`EasyExcel`配置不自动关闭输出流（因为在响应结束后，容器会负责关闭）；
   - 指定Excel的工作表名称、表头和数据行，最终通过`doWrite`方法完成写入。
4. 设置`HttpServletResponse`对象。
   - 设置响应的`Content-Type`为`Excel`文件类型；
   - 使用`URLEncoder.encode`方法对文件名进行编码，防止中文乱码；

   - 设置`Content-Disposition`头以指示浏览器将响应内容作为附件下载，同时指定下载的文件名。



## 批量导入表格

> 前提：准备好表格传输类ExcelImportDTO，里面定义好接收Excel每列数据的字段

使用EasyExcel读取表格内容

1. 前端上传一个Excel文件
2. 后端使用`@RequestPart("file") MultipartFile file`接收文件
3. 使用`EasyExcel.read(file.getInputStream())`读取文件
