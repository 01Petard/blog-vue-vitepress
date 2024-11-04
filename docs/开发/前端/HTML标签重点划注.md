---
title: HTML标签重点划注
date: 2022-02-17 21:42:15
updated:
categories: 
- 学习
tags: 
- 前端
- HTML
keywords:
- 前端
- HTML
description: 不如elementUI和飞冰，但是基础还是要掌握的
cover: https://www.oxfordwebstudio.com/user/pages/06.da-li-znate/sta-je-html/sta-je-html.jpg
top_img: http://vimaj.com/images/html-dersleri.jpg
---

- 1、粗体：

```html
<strong>粗体</strong>
```

- 2、斜体

```html
<em>斜体</em>
```

- 3、特殊符号：

[HTML特殊字符符号大全](https://www.webhek.com/post/html-enerty-code.html)（查看更多）

![](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/Snipaste_2022-08-05_20-33-43.png)

- 4、锚链接

```html
<a id="top"></a>
...
<!--点击这个a标签就会回到上面那个a标签-->
<a href="#top"></a>

...
...
<!--点击这个a标签就会回到上面那个HelloWOrld.html那个网页的a标签-->
<a href="HelloWorld.html#top"></a>
```

- 5、功能性链接

```html
<!--点击这个a标签就会打开邮箱-->
<a href="mailto:1520394133@qq.com"></a>
```

例子：qq推广链接
https://shang.qq.com/v3/widget.html

```html
<!--qq推广链接-->
<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=&site=qq&menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2::51" alt="点击这里给我发消息" title="点击这里给我发消息"/></a>
```

注：51标准型，52简洁型，53扩展型

![](https://s3.bmp.ovh/imgs/2022/02/9b23f129b54f556b.png)

- 6、行内元素

```html
<a></a>
<strong></strong>
<em></em>
```

- 7、块元素

```html
<p></p>
<h1></h1>
...
<h6></h6>
```

+ 8、有序列表

```html
<ol>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ol>
```

- 9、无序列表

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
```

- 10、自定义列表

```html
<dl>
  <dt>课程</dt>
    <dd>语文</dd>
    <dd>数学</dd>
    <dd>英语</dd>
  <dt>老师</dt>
    <dd>王老师</dd>
    <dd>张老师</dd>
    <dd>刘老师</dd>
</dl>
```

- 11、表格

```html
<table>
  <tr>
    <!--跨列，横地占-->
    <td colspan="4">1-1</td>
    <td>1-2</td>
    <td>1-3</td>
  </tr>
  <tr>
    <!--跨行，竖地占-->
    <td rowspan=“2”>2-1</td>
    <td>2-2</td>
    <td>2-3</td>
   </tr>
  <tr>
    <td>3-1</td>
    <td>3-2</td>
    <td>3-3</td>
   </tr>
</table>
```

- 12、视频

```html
<!--
controls:控制跳
autoplay:自动播放
-->
<vedio src="" controls autoplay></vedio>
<audio src="" controls autoplay></audio>
```

- 13、页面结构分析

![](https://s3.bmp.ovh/imgs/2022/02/25a08233bf4835ff.png)

14、iframe（内联框架）

```html
<iframe src="" name="MyFrame"></iframe>
<!--点击这个a标签可以将a标签中的地址显示到上面这个iframe中-->
<a href="https://www.baidu.com" target="MyFrame"></a>
```

```html
<!--哔哩哔哩的内联框架，可以试试-->
<iframe src="//player.bilibili.com/player.html?aid=55631961&bvid=BV1x4411V75C&cid=97257967&page=11" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
```

- 15、表单的提交方式：

> get：不安全，但是高效

> post：安全，可以传输大文件

表单的属性

![](https://s3.bmp.ovh/imgs/2022/02/79ddff777a41e251.png)

- 16、一组单选框(type="radio")要指定name属性的值相同（组名）

![](https://s3.bmp.ovh/imgs/2022/02/c1a68c17e87266f2.png)

- 17、一组多选框(type="checkbox")“最好”指定name的属性值相同

![](https://s3.bmp.ovh/imgs/2022/02/7d6b158b0f7e785c.png)

- 18、表单中的四种按钮

![](https://s3.bmp.ovh/imgs/2022/02/5d635e77d6899fc9.png)

- 19、下拉框

![](https://s3.bmp.ovh/imgs/2022/02/09feae55302a2648.png)

其中，select标签的“name属性值”和option标签的“value属性值”将分别作为表单提交的“键”和“值”

![](https://s3.bmp.ovh/imgs/2022/02/41e2a032625f2fe1.png)

- 20、其他表单type属性

![](https://s3.bmp.ovh/imgs/2022/02/3e89985f2e35d6b8.png)

- 21、label标签，单击label标签内的文字，就可以编辑与for属性与id属性值相同的input标签，如此一来就可以增强鼠标可用性![](https://s3.bmp.ovh/imgs/2022/02/05aff21393b8aa9b.png)

- 22、pattern属性，利用正则表达式自定义格式

```html
<input type="text" pattern="这里输入正则表达式"/>
```
