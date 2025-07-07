<p align="center">
  <img alt="logo" src="https://foruda.gitee.com/avatar/1748600250044327169/15135660_xiaotuike_1748600249.png" style="margin-bottom: 10px;">
</p>
<h3 align="center">轻量、可靠的微信推客小程序</h3>


#### 微信小店推客程序-小程序端
微信小店推客小程序是专门为推客机构提供的小程序，可以通过小程序显示推客机构授权合作的商家自营直播间、短视频或达人直播间、短视频，可以分享直播预约二维码海报、直播中海报，以及直接从小程序进入直播间、短视频分享，也支持将直播间购物袋的商品卡分享出去。3天+30天锁客延长期内（详计佣规则），用户和达人橱窗关联的订单，都可以获得佣金。

#### 功能特性
- [x] 推客授权
- [x] 商品分类展示
- [x] 商品详情展示
- [x] 商品卡海报、分享
- [x] 商品优惠券领取
- [x] 直播间列表
- [x] 直播预约、直播海报生成、直播间分享
- [x] 短视频查看、分享
- [x] 会员管理
- [x] 佣金管理
- [x] 粉丝管理
- [x] 订单管理
- [x] 对接DeepSeek生成爆款文案
- [ ] 品牌馆
- [ ] 爆款素材
- [ ] 运营专题页自动生成
- [ ] 小程序界面自定义
- [ ] 由专业UI设计师，重新设计小程序UI
- [ ] 推客服务商功能

#### 技术栈
- [微信小程序Skyline 渲染引擎](https://developers.weixin.qq.com/miniprogram/dev/framework/runtime/skyline/introduction.html)
- [TDesign 微信小程序组件库](https://tdesign.tencent.com/miniprogram/overview)
- [Painter 2.0小程序生成图片库](https://github.com/Kujiale-Mobile/Painter/)


#### 快速开始

##### 前置要求
1. 微信开发者工具（最新版本）[下载地址](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
2. 已注册并且备案好的微信小程序账号【[微信小程序注册](https://mp.weixin.qq.com/)】
3. 小程序 AppID
4. [微信推客联盟机构](https://channels.weixin.qq.com/ec-mcn/auth/login)注册并交纳保证金
5. 微信推客联盟机构 AppId

#### 安装步骤
1. 部署微信推客程序服务端

【[微信推客服务端](https://gitee.com/xiaotuike/tuike)】

2. 克隆本项目到本地：

```
git clone https://gitee.com/xiaotuike/tuike-weapp.git
```
3. 在微信开发者工具中导入项目：

- 选择项目目录
- 填写你的 AppID
- 选择 "小程序" 项目类型


4.  修改文件project.config.js中的内容

```
module.exports = {
  appid: 'wxcf3e5e4ce600000', //您申请的推客机构的appid
  apiUrl: 'https://tuike.qq.cn',//第一步部署的微信推客程序服务端域名
};
```
可以用我已经配置好的服务端：https://tuike.rlma.cn，因为每个小程序的appid不同这个登录会失败，但是首页、商品页、直播页这些不涉及登录的页面可以正常显示。

5.  修改微信开发者工具设置，如下图

<img src="https://foruda.gitee.com/images/1748599650439564376/a1fb2b18_126105.png" height="500" />

6. 小程序管理后台设置
-  [小程序管理后台](https://mp.weixin.qq.com/) -> 管理 -> 开发管理 -> 服务器域名 -> request合法域名
-  [小程序管理后台](https://mp.weixin.qq.com/) -> 管理 -> 开发管理 -> downloadFile合法域名
域名如下：
```
https://store.mp.video.tencent-cloud.com
https://wst.wxapp.tc.qq.com
https://wx.qlogo.cn
http://mmbiz.qpic.cn
https://res.wx.qq.com
```
7. 编译运行

#### 小程序页面展示
<img src="https://foruda.gitee.com/images/1748918087296228705/de9cfb9c_126105.jpeg" height="500" />&nbsp;
<img src="https://foruda.gitee.com/images/1748918175084783188/67dee5ac_126105.jpeg" height="500" />&nbsp;
<img src="https://foruda.gitee.com/images/1748918206114189923/2e8b02fc_126105.jpeg" height="500" />&nbsp;



#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request


#### 官方相关文档
- 《[微信小店联盟官方接口文档](https://developers.weixin.qq.com/doc/store/leagueheadsupplier/)》
- 《[微信推客带货资料库](https://doc.weixin.qq.com/doc/w3_ATAAHwZ5AJc9IuP42XTS7yRqcATLf)》
- 《[微信小程序开发指南](https://developers.weixin.qq.com/miniprogram/dev/framework/)》

### 如何加入
- 请发送申请邮件至13834563@qq.com
- 添加微信：wander，备注“推客”,添加后拉您入群。

![添加微信](https://foruda.gitee.com/images/1748587024440552091/b9d154a8_126105.png "微信二维码")


### 联系我
- wechat：wander
- 邮箱：13834563@qq.com



### 免责声明
任何用户在使用由开源项目前，请您仔细阅读并透彻理解本声明。您可以选择不使用此项目，若您一旦使用，您的使用行为即被视为对本声明全部内容的认可和接受。

本项目是一款开源免费的微信推客程序 ，主要用于微信推客联盟机构更快速、便捷开发微信小店推客程序。

您承诺秉着合法、合理的原则使用本开源程序，不利用本开源程序进行任何违法、侵害他人合法利益等恶意的行为，亦不将本开源项目用于任何违反我国法律法规的行为。

任何单位或个人因下载使用本开源项目代码而产生的任何意外、疏忽、合约毁坏、诽谤、版权或知识产权侵犯及其造成的损失 (包括但不限于直接、间接、附带或衍生的损失等)，本人不承担任何法律责任。

用户明确并同意本声明条款列举的全部内容，对使用本开源程序可能存在的风险和相关后果将完全由用户自行承担，本人不承担任何法律责任。

任何单位或个人在阅读本免责声明后，应在《MIT 开源许可证》所允许的范围内进行合法的发布、传播和使用本开源项目等行为，若违反本免责声明条款或违反法律法规所造成的法律责任(包括但不限于民事赔偿和刑事责任），由违约者自行承担。

如果本声明的任何部分被认为无效或不可执行，则该部分将被解释为反映本人的初衷，其余部分仍具有完全效力。不可执行的部分声明，并不构成我们放弃执行该声明的权利。

本人有权随时对本声明条款及附件内容进行单方面的变更，并以消息推送、网页公告等方式予以公布，公布后立即自动生效，无需另行单独通知；若您在本声明内容公告变更后继续使用的，表示您已充分阅读、理解并接受修改后的声明内容。