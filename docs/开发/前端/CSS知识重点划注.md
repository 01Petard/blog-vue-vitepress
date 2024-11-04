---
title: CSS知识重点划注
date: 2022-02-20 22:03:15
updated:
categories: 
- 学习
tags: 
- 前端
- CSS
keywords:
- 前端
- CSS
description: CSS重点知识记录，虽然我也不喜欢写CSS……
cover: https://www.sun-exp.com/images/article/main/09f925c3-0d59-482f-8374-49a402ce461b.png
top_img: http://www.tastones.com/img/Tutorial/CSS/css-illustration.png

---

### 一、引入CSS的方式

**1、行内样式（优先级最高）**

```html
<h1 style="color: red">一级标签</h1>
```

**2、内部样式（优先级：覆盖原则）**

```html
<style>
  h1{
    color: green;
  }
</style>
```

**3、外部样式（优先级：覆盖原则）**

```html
<link rel="stylesheet" href="css/style.css">
```

```css
h1{
  color: yellow;
}
```

### 二、选择器

#### 2.1 基本选择器

**1、标签选择器**，特点：选择一类标签

**2、类选择器（.class）**，特点：选择所有class属性一致的标签，跨标签

**3、id选择器（#id）**，***id必须保证全局唯一***

**优先级：id选择器>类选择器>标签选择器**

#### 2.2 层次选择器

**1、后代选择器（后代，所有）**

```css
/*对象：选中元素下的所有对象。例子中是选中了body下的所有p标签*/
body p{
    background: red;
}
```

**2、子选择器（儿子，所有）**

```css
/*对象：选中对象下的所有子级标签。例子中是选中了body下的所有子级p标签*/
body > p{
    background: red;
}
```

**3、相邻弟级选择器（同辈，一个）**

```css
/*对象：选中对象下的一个弟标签。例子中是选中了class名为bro下面的一个弟级p标签*/
.bro + p{
    background: red;
}
```

**4、通用弟级选择器（同辈，所有）**

```css
/*对象：选中对象下的所有弟级标签。例子中是选中了class为bro下面的所有弟级p标签*/
.bro ~ p{
    background: red;
}
```

#### 2.3 结构、伪类选择器（了解即可）

**1、选择第一个子元素**

```css
/*ul的第一个子元素*/
ul li:first-child{
  background: red;
}
```

**2、选择最后一个子元素**

```css
/*ul的最后一个子元素*/
ul li:last-child{
  background: yellow;
}
```

**3、层级选择**

```css
/*选择当前层级的父元素模型中的第n个子元素标签*/
p:nth-child(n){
  background: green;
}
/*选择当前层级的父元素模型中的第n个同类型的标签*/
p:nth-of-type(n){
  background: blue;
}
```

**4、伪类选择器**

```css
/*悬浮的样式，重要‼️*/
a:hover{
  color: orange;
}
/*被选择的样式，重要‼️*/
a:active{
  color: green;
}
/*未访问的样式*/
a:link{
  color: green;
}
/*已访问的样式*/
a:visited{
  color: purple;
}
```

#### 2.4 属性选择器（把id和class结合了）

**1、id选择器**（=绝对等于）

```css
a[id="first"]{
  background:red;
}
```

**2、类选择器**（*=包含等于）

```css
a[class*="links"]{
  background:yellow;
}
```

**3、选择href中以http开头的元素**（^=以这个开头）

```css
a[href^=http]{
  backfround: green;
}
```

**4、选择href中以jpg结尾的元素**（$=以这个开头）

```css
a[href$=http]{
  backfround: blue;
}
```

### 三、美化网页元素

文字排版、背景图片……

### 四、渐变

也略了，没什么好说的，直接网页拿就行了⬇️

> [Grabient快速获取渐变css代码](https://www.grabient.com/)

### 五、盒子模型（重要‼️）

**margin：外边距**

**border：边框**

**padding：内边距**

**块级元素：**独占一行

> h1~h6     p     div     列表……

**行内元素：**只有内容的大小

> span     a     img    strong

行内元素可以被包含在块级元素中，反之，则不可以～

**display：**可以修改标签的块级/行内属性

**float：**可以让元素悬浮，脱离父级元素

**position：**可以规定元素的定位类型，可能的值有relative、absolute、fixed
