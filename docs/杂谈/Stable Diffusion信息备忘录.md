---
title: Stable Diffusion信息备忘录
date: 2023-07-04 22:20:15
updated: 2024-11-03 21:54:00
categories:
  - ACG
tags:
  - Stable Diffusion
keywords:
  - Stable Diffusion
description: AI绘图关键词记录
cover: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411030525724.png
top_img: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411032155256.jpeg
---

# 返回信息的域名

> [https://www.paddlepaddle.org.cn/paddle/visualdl/service/server/](https://www.paddlepaddle.org.cn/paddle/visualdl/service/server/)

会返回以下信息：

`{"code":"000000","msg":"hello world!"}`

# 简单上手

 <img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/3aa78ec6a51b882cf06ee69ae7c3f88a8aee3017.jpg@1256w_!web-article-pic.webp" alt="img" style="zoom: 67%;" />

`正向Prompt`

 ```
 Best quality, masterpiece, ultra high res, (photorealistic:1.4), raw hoto, 1girl, in the dark, deep shadow, low key, cold light
 ```

`反向Prompt`

 ```
 ng_deepnegative_v1_75t, badhandv4 (worst quality:2), (low quality:2), (normal quality:2), lowres, bad anatomy, bad hands, normal quality, ((monochrome)), ((grayscale))
 ```

 <img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/cab21a9d282acc94a857a41576a5d882dfdfbdbe.jpg@1256w_!web-article-pic.webp" alt="img" style="zoom:67%;" />

`正向Prompt`

 ```
 Best quality, masterpiece, ultra high res, (photorealistic:1.4), 1girl, offshoulder, deep shadow, shiny skin
 ```

`反向Prompt`

 ```
 ng_deepnegative_v1_75t, badhandv4, (worst quality:2), (low quality:2), (normal quality:2), lowres, ((monochrome)), ((grayscale)), watermark
 ```

泰🔥🌶，当然这些只是[C站](https://civitai.com)的冰山一角而已……

````
# 通用 Negative Prompts

```
lowers, bad anatomy, bad hands, bad feet, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, low resolution, grainy, pixelated, oversaturated colors, poor lighting, bad composition, deformed, disfigured, extra limbs, missing limbs, mutated, unnatural body shape, missing face, double face, badly drawn face, asymmetrical eyes, extra fingers, poorly defined features, cartoonish, anime, childish, old-fashioned, low-poly, robotic, creepy, doll-like
```

##示例：赛博雨夜

```
((best quality)), ((masterpiece)) , ((ultra-detailed)), (illustration), (detailed light), (an extremely delicate and beautiful), ((1girl)), ((solo)), (beautiful detailed eyes), shiny hair,(((cyberpunk city))), light pollution, ((leotard)), rainy night, wet, (((cropped shoulders))), depth of field, extremely detailed CG unity 8k wallpaper, black long hair, cute face, adult girl, happy, skirt dress, flower pattern in dress, solo, gown, art of light novel, in field, full body, nsfw
```

```
ugly, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, bad feet, disfigured, poorly drawn face, (((long neck)))

```

```
Steps: 28, Sampler: Euler a, CFG scale: 7, Seed: 3632138942, Size: 1280x448, Model hash: 925997e9, Clip skip: 2, ENSD: 31337
```

## 示例：幻星耀梦

```
((panorama)),oil painting,best quality,extremely detailed CG unity 8k wallpaper,(masterpiece),(amazing)((dreamlike and picturesque)),dreamy,((unreal)),((((in the dreamy sky with blue-pink clouds)))),there are some stars in the sky,a glass-like lake,((a big blue meteor streaked across the sky and fall into the lake)) 
```

```
((land)),(mountain),((plant)),((tree))
```

```
Steps:20, Sampler: DPM2 a Karras, CFG scale: 7, Seed: 318503494, Size: 1024x512, Model hash: e6e8e1fc, Clip skip: 2
```

> **以下所有内容均摘自网络**，出处不可考，用得愉快！

# 在线绘图网站

[众神之谷-魔法小屋](https://www.kamiya.dev/)(支持NSFW)token：`GJRED8Qkpb=tj#YC`

[魔法草屋 | 秋葉aaaki](https://ai.anzu.link/)

[绘世法师见闻录——Novel AI 秋葉社区魔法收录](https://docs.qq.com/doc/DR3JBeWJEZE1IWWtR)

# R18关键词示例

正面关键词：

`extremely detailed CG unity 8k wallpaper, black long hair, cute face, adult girl, happy, skirt dress, flower pattern in dress, solo, gown, art of light novel, in field, full body, nsfw`

负面排除关键词：

`lowers, bad anatomy, bad hands, bad feet, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry`

# R18基础关键词

`特殊词条：`thornsdance T5

`必须术式：`nsfw, 1girl,

`基础术式：`masterpiece, highly detailed, solo,

`基础咒语：`full body, gyaru, maid, thighs, muscular, u-446, u-738, ubanis, u-88, kujya, in an onsen,

`做爱术式:`pussy, vaginal, sex, penis,

`骑乘位术式：`girl_on_top, straddling,

`倒骑术式：`doggystyle, sex_from_behind, ass, ass_focus,

`正常位术式：`missionary, lying, on_bed,

`口交术式：`fellatio, oral, licking_penis, large_penis, solo_focus,

`主视角术式：`pov,

`射精术式：`cum_in_mouth, cum_on_tongue, facial, bukkake,

`俯视角术式：`from_below,

`开脚术式：`spread leg,

`腋术式：`armpits,

`汗术式：`sweating,

`大腿袜术式：`thighs,

## 示例关键词

`示例咒语：`

> nsfw，masterpiece，masterpiece portrait，1girl，medium breasts，nude，nipples，breasts，navel，white hair，hair，long hair，wavy hair，bob cut，bangs，blunt bangs，cum，hetero，pussy，vaginal，sweat，sex，1boy，penis，

`茶色头发美女咒语：`

> `{{(masterpiece}}})，blonde hair，long hair，small breasts，sweat，steam，nsfw，nipples，1girl，upper body，`

`ram召唤咒语：`

> `{{(masterpiece}}}，{{(1girl}}})}，ram(re:zero)，pink hair，red eyes，tsurime，small breasts，sweat，nsfw，nipples，upper body，short hair，evil smile，`

`心眼咒语：`

> nsfw，nude，ribbon，sweat，steam，silver hair，large breasts，upper body，；q, heart-shaped pupils,

`融合咒语：`

> 基本角色名、想追加的角色名、想留下的身体要素、1girl、solo、想追加的身体要素、场所

`黑魔法：`

> `nsfw，masterpiece，highly detailed，1girl，solo，full body，dark-skinned female，gyaru，maid，thighs，muscular，(((huge testicles)))，u-446，zheng，u-738，ubanis，u-88，kujya，(((futanari))in onsen`

## 可选关键词

, bare shoulders, 裸露的肩膀

, blush, 脸红

, breasts, 乳房

, breasts out, 乳房出来

, high ponytail, 高马尾辫

, large breasts, 大乳房

, long hair, 长发

, low-tied long hair, 低扎长发

, nipples, 乳头

, penis, 阴茎

, sex from behind, 从背后 做爱

, standing sex, 站立性

, standing, 站立

, X-ray, X 射线

, completely nude, 完全裸体

, ejaculation, 射精

, leg grab, 抓腿

, legs up, 双腿向上

, nude, 裸体

, piercing, 刺穿

, girl on top, 女孩在上面

, tongue out, 吐舌头

, breast grab, 乳房 抓手

, grabbing from behind, 从后面抓

, grey hair, 白发

, reverse upright straddle, 反向直立跨骑

, rape, 强奸

, blonde hair, 金发

, pantyhose, 连裤袜

, reverse cowgirl position, 反向女牛仔位置

, spread legs, 张开双腿

, torn clothes, 撕裂的衣服 ,

torn legwear, 撕裂的裤子

, anal, 肛门

, black legwear, 黑色 紧身裤

, bodysuit, 紧身连衣裤、

, double penetration, 双穴

, reverse suspended congress, 反向抓双脚

, arms behind back, 手臂在背后

, arms up, 手在上面

, cross-section, 横向的画面

, facing viewer, 面对观众 , 脚向上

, garter straps, 吊袜带

, internal cumshot, 内部 射液

, slave, 奴隶

, milking, 挤奶

, nipple piercing, 乳头穿刺

, nipple penetration, 乳头渗透

, blindfold, 眼罩

, breast bondage, 乳房 束缚

, force-feeding, 机械固定

, multiple insertions, 触手机械多次插入

, sex machine, 性爱机器

, shirt removed, 脱掉衬衫

, bound legs, 束缚 腿 ,

bound wrists, 绑定手腕

, linked piercing , 连环穿孔

, leaning forward, 身体前倾

, barbell piercing, 杠铃穿刺

, bit gag, 位堵嘴

, cleavage cutout, 乳沟镂空 ,

, clothing cutout, 服装镂空

, tentacle_sex, 触手性

, tentacles_under_clothes, 衣服下的触手

, pubic tattoo, 淫纹

, framed breasts, 被框住的乳房 
````

