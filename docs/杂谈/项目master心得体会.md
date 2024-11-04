---
title: 项目master心得体会
date: 2024-07-30 15:28:00
updated: 2024-08-10 19:03:00
categories: 
- 学习
tags: 
- 项目管理
keywords:
- 项目管理
description: 项目master心得体会
cover: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9lPZ-n2E0T41tD3W9svFuyeDdIr6sqSwUkQ&s
top_img: https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/30818e4a6953433ca27a6d55f1c70eaf~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp
---

一、项目流程及注意事项
①.需求
1、该阶段scrum master提前跟产品对接需求（1.提前了解内容，提供建议和帮助2.了解人员分配情况），如需人员调配，及时跟项目经理沟通，在需求评审前确认好团队成员（至少一天，团队成员提前需要了解需求）详情可参照https://confluence.leke.cn/pages/viewpage.action?pageId=92237327

2、scrum master应提醒产品经理提前至少1天将需求发至相关参会人员，所有参会人员提前查阅需求，在需求评审会前把问题发给产品

3、会议结束后，scrum master需提醒产品经理，发送会议纪要邮件到团队成员。confluence上也需要同步记录（对应迭代文档中）

4、如需求在讨论后，有较大或较多的地方变更，需要发送邮件至部门领导、团队成员、技术总监、pmo。详情可参照https://confluence.leke.cn/pages/viewpage.action?pageId=126353430

5、master需每天了解团队人员工作进度，对项目整体进度进行把控（可每天定时开早会，方便问题沟通）

②.梳理需求，估时
1、该阶段团队成员需要1-2天的需求梳理时间（按需求大小而定），如果需求涉及比较复杂，可向项目经理说明缘由，酌情延长。

2、梳理需求完成，UI需给出设计时间、开发需给出技术设计时间（前端需UI设计图出来，方可定设计时间）、测试需给出测试估时。

③.评审
1、UI设计时间一般不会太久，如特殊情况页面较多、复杂，一时无法给出设计，master可根据项目情况，让UI分批出图，让前端技术设计先做起来。尽可能不耽误项目进度。

2、UI设计如无需评审（项目或需要设计的页面比较简单），团队内部商量确认，master跟进

3、技术评审需提前半天到两天发送评审邮件至专业线主管及经理。评审中，领导给出意见，主持会议人员自行记录。评审末尾，技术需给出开发估时，master进行记录。会后技术人员给出评审时给出的意见修改回复邮件，详情及邮件内容可参照https://confluence.leke.cn/pages/viewpage.action?pageId=120619636

4、如不需要技术评审，则需要在迭代不需要产物登记表中记录并跟主管及经理沟通，master跟进。
可参照：https://confluence.leke.cn/pages/viewpage.action?pageId=106467637

5、技术设计应参照规范进行，master可将链接发送团队成员，自行get。各部门技术设计规范
可参照：https://confluence.leke.cn/pages/viewpage.action?pageId=125862823

6、测试用例评审可在技术评审之后进行，不宜过晚。用例设计中，可能会给开发更多的逻辑判断方向，从而提高代码质量。具体时间看项目情况，团队商议决定，master跟进。

7、由于有些项目导致前端冒烟用例较多，master跟团队商议，适当进行调配，看情况而定，冒烟时间不宜过长。

8、master需要把控项目时间及各阶段节点。项目较大，周期性过长时，可以采取分段提测方案（方案应尽早提出，尽可能不打乱开发工作节奏）。

这就必须要求团队协作能力。master将项目拆分好，让前端先做A页面，那么后端也必须先开发并提供A页面所需的接口，完成后进行联调，联调完成交给测试去测。

9、技术评审和用例评审完成需将任务拆分到禅道，拆分任务粒度不可跨天，拆分后的任务，每天做完要及时更新。

④.开发&测试
1、master需每天关注禅道更新情况，如遇未更新，需进行提醒，有问题时，及时找对应人员进行沟通，保证项目进度

2、新来的开发如不知道流程的情况下，master可将开发阶段流程图发给开发查阅
可参考：https://confluence.leke.cn/pages/viewpage.action?pageId=92241263

3、开发过程中，开发预知到，开发难度比想象中要复杂很多，再预期时间内无法完成（已经在加班中）。master可让开发记录问题点及难度，及时跟项目经理沟通，项目时间是否可延期。

4、开发过程中，如遇阻碍，master提前了解，可报备项目经理，进行团队内部协调支援或平行部门同事协助。

5、开发完成后，根据冒烟内容进行提测，通过后，需发邮件通知。测试收到邮件后，进行冒烟测试，冒烟通过/不通过，发邮件通知。详情可参照https://confluence.leke.cn/pages/viewpage.action?pageId=92237844

6、测试阶段，master需跟进测试进度，优先协助测试处理阻碍进度性问题

⑤验收&发版
1、测试一轮完成后，可以跟测试人员讨论，是否可以让UI提前介入验收。有困难的情况下，可以在二轮进行。测试完成后，交给产品验收。

2、产品验收，如需平行部门介入，可参照【平行部门验收】https://confluence.leke.cn/pages/viewpage.action?pageId=92238199 流程规范，产品自行get，master跟进，必要时协助

3、验收完成，UI和产品会给出问题，master需提前查阅，登记confluence，同开发、测试对接，分配任务，直至结束，结束后，测试需写产品交付报告

4、master根据项目预定发版时间，进行发版计划及发版人员安排（如：1.新项目，需运维同事线上配置。2.后端接口脚本需要提前执行3.disconf需要修改配置文件4.发版应用确认等），谨防遗漏，导致发版出现问题

5、发布前（至少半天），master跟项目经理沟通发布事项，确认发布时间点。测试写发版邮件并在confluence记录，【发版协调群】同步发送
发布上线参考：https://confluence.leke.cn/pages/viewpage.action?pageId=92232072
发布前准备check清单：https://confluence.leke.cn/pages/viewpage.action?pageId=92232787
发版记录：https://confluence.leke.cn/pages/viewpage.action?pageId=92233022

6、发版中，master跟进发版进度，把控每个环节都在计划之内

7、发版后，master需完善所有跟进文档。测试需同步所有测试环境

8、如遇发版延期，需要发送延期邮件，格式参照：https://confluence.leke.cn/pages/viewpage.action?pageId=103909772

9、如遇不可抗力因素（eg：1.需要第三方支持走文件流程2.需要财务审批沟通3.走公司内部审批流程等）导致无法发版，无需发邮件进行说明，第一时间告知pmo，迭代在正常时间点封板即可。

⑥.文档
1、迭代进度报告https://confluence.leke.cn/pages/viewpage.action?pageId=103909772 里面包含了整个项目流程的迭代文档

2、全流程规范文档https://confluence.leke.cn/pages/viewpage.action?pageId=102859075 里面包含了，不同角色，在每个环节的职责