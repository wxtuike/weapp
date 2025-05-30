<p align="center">
  <img alt="logo" src="https://foruda.gitee.com/avatar/1748589294764011609/15135660_xiaotuike_1748589294.png!avatar100" width="120" style="margin-bottom: 10px;">
</p>
<h3 align="center">轻量、可靠的微信推客小程序</h3>


#### 微信小店推客程序-小程序端
微信小店推客小程序是专门为推客机构提供的小程序，可以通过小程序显示推客机构授权合作的商家自营直播间、短视频或达人直播间、短视频，可以分享直播预约二维码海报、直播中海报，以及直接从小程序进入直播间、短视频分享，也支持将直播间购物袋的商品卡分享出去。3天+30天锁客延长期内（详计佣规则），用户和达人橱窗关联的订单，都可以获得佣金。

#### 功能特性
- 推客授权
- 商品分类展示
- 商品详情展示
- 商品卡海报、分享
- 商品优惠券领取
- 直播间列表
- 直播预约、直播海报生成、直播间分享
- 短视频查看、分享
- 会员管理
- 佣金管理
- 粉丝管理
- 订单管理


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

5. 编译运行

#### 小程序页面展示
<img src="https://foruda.gitee.com/images/1748597670474893522/19bdcb9b_126105.png" height="500" />&nbsp;
<img src="https://foruda.gitee.com/images/1748597698893814196/c07e5627_126105.png" height="500" />&nbsp;
<img src="https://foruda.gitee.com/images/1748597713385335896/1460da00_126105.png" height="500" />&nbsp;
<img src="https://foruda.gitee.com/images/1748597726838211860/d6b41722_126105.png" height="500" />&nbsp;
<img src="https://foruda.gitee.com/images/1748597740371512288/ed924599_126105.png" height="500" />&nbsp;
<img src="https://foruda.gitee.com/images/1748597753360162773/cfbc96e3_126105.png" height="500" />&nbsp;
<img src="https://foruda.gitee.com/images/1748597767198501795/0c06c22c_126105.png" height="500" />&nbsp;
<img src="https://foruda.gitee.com/images/1748597780094221557/ec0c6052_126105.png" height="500" />&nbsp;



#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request

