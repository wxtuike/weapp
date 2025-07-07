import {
  api,
  wxtkBind
} from '../../utils/api'
import {
  deepseek_key
} from '../../project.config'

const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bg: "https://store.mp.video.tencent-cloud.com/161/20304/snscosdownload/SH/reserved/68178bfb0008bde22176bab2ebca1715000000a100004f50",
    id: '',
    goods_info: {},
    store_product: {},
    is_bind_wxtk: 0,
    triggered: false,
    canvas_data: {},
    canvas_image: '',
    share_data: {},
    share_image: '',
    loading: true,
    visible: false,
    wenan: '',
    wenan_btn: '生成文案',
    copy_show: false,
    wa_index: 0,
    wa: '',
    start: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let id = options.id
    this.setData({
      id,
    })
    console.log(app.getCurrentPagePath())
  },

  async getData() {
    let id = this.data.id || 'wxf0511ad7ab4210b5_10000231234170_1'
    let res = await api.get('/index/goods/detail', {
      id
    })
    const data = res.data
    if (res.code == 200) {
      this.setData({
        id: data.goods_info.goods_id,
        gid: data.goods_info.id,
        goods_info: data.goods_info,
        store_product: data.store_product,
        loading: false,
        is_bind_wxtk: data.is_bind_wxtk
      })
      console.log(this.data)
      this.createCanvas(data)
      this.createShareImg()
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    let title = this.data.goods_info.title
    let img = this.data.share_image
    console.log(img)
    let params = app.shareMessage(title, img)
    console.log(params)
    return params
  },
  onShareTimeline() {
    let title = this.data.goods_info.title
    return app.shareTimeLine(title)
  },
  goHome() {
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  onRefresh(e) {
    // 自己定义刷新事件
    var self = this
    // 自己定义刷新事件
    self.setData({
      triggered: true, // 将triggered属性设置为true，表示下拉刷新已经被触发
    })
    this.getData()
    self.setData({
      triggered: false
    })
  },
  previewImage(e) {
    let {
      index,
      type
    } = e.currentTarget.dataset
    let urls = this.data.goods_info.head_imgs
    if (type == 'detail') {
      urls = this.data.goods_info.desc_imgs
    }
    if (urls.length) {
      wx.previewImage({
        current: urls[index], // 当前显示图片的http链接
        urls, // 需要预览的图片http链接列表
      })
    }
  },
  async getPhoneNumber(e) {
    let code = e.detail?.code || ''
    if (code == '') return true
    let res = await api.post('/index/login/mobile', {
      code
    })
    if (res.code = 200) {
      this.setData({
        visible: false
      })
      this.bindTuike()
    }
  },
  bindTuike() {
    let that = this
    wxtkBind(function (res) {
      that.setData({
        visible: false
      })
      that.getData()
      // wx.showToast({
      //   title: '绑定成功！',
      // })
    })
  },
  buy() {
    this.setData({
      visible: true
    })
  },
  onVisibleChange(e) {
    this.setData({
      visible: e.detail.visible,
    })
  },
  share() {
    if (this.data.is_bind_wxtk != 1) {
      this.setData({
        visible: true
      })
      return true
    }
    if (this.data.canvas_image == '') {
      wx.showToast({
        title: '海报生成中,请稍候再点击...',
        duration: 1000
      })
      return true
    } else {
      let path = this.data.canvas_image
      wx.showShareImageMenu({
        path: path,
        success(e) {},
        fail(err) {}
      })
    }
  },
  onscroll(e) {
    console.log(e)
    let rate = e.detail.scrollTop / 200
    rate = rate > 1 ? 1 : rate
    let navbar_background = `rgba(7, 193, 96, ${rate})`
    let title = ''
    if (e.detail.scrollTop > 100) {
      title = '商品详情'
    } else {
      if (navbar_background != '') {
        navbar_background = ''
        title = ''
      }
    }
    this.setData({
      navbar_background,
      title
    })
  },
  onImgOK(e) {
    this.imagePath = e.detail.path;
    this.setData({
      canvas_image: this.imagePath,
    })
  },
  onShareImgOK(e) {
    let imgPath = e.detail.path;
    this.setData({
      share_image: imgPath,
    })
  },
  createShareImg() {
    let data = {
      width: "500px",
      height: '400px',
      background: "#07c160",
      views: [{
        type: 'rect',
        css: {
          width: '480px',
          height: '300px',
          left: '10px',
          top: '90px',
          color: '#ffffff',
          borderRadius: '10px'
        }
      }, {
        type: "image",
        url: this.data.goods_info.thumb,
        css: {
          width: "280px",
          height: "280px",
          mode: "scaleToFill",
          top: "100px",
          left: "20px",
          borderRadius: '10px'
        },
      }, {
        type: "text",
        text: this.data.goods_info.price,
        css: {
          left: "360px",
          fontSize: "40px",
          top: "180px",
          color: 'red'
        },
      }, {
        type: "text",
        text: '¥',
        css: {
          left: "346px",
          fontSize: "20px",
          top: "200px",
          color: 'red'
        },
      }, {
        type: "text",
        text: '去看看',
        css: {
          left: "365px",
          fontSize: "20px",
          top: "250px",
          color: '#ffffff',
          background: '#07c160',
          padding: "5px 20px 20px 20px"
        },
      }, {
        type: "text",
        text: '小推客',
        css: {
          top: "20px",
          width: '500px',
          fontSize: "40px",
          textAlign: 'center',
          color: '#ffffff',
        },
      }]
    }
    this.setData({
      share_data: data
    })
  },
  createCanvas(goods) {
    let data = {
      width: "750px",
      height: '1334px',
      views: [{
        type: "image",
        url: 'https://store.mp.video.tencent-cloud.com/161/20304/snscosdownload/SH/reserved/68178bfb0008bde22176bab2ebca1715000000a100004f50',
        css: {
          width: '750px',
          height: '1334px',
        }
      }, {
        id: "title",
        type: "text",
        text: goods.goods_info.title,
        css: {
          width: "610px",
          left: "80px",
          top: "180px",
          fontSize: "32px",
          lineHeight: "50px",
          maxLines: 2
        }
      }, {
        type: "text",
        text: '¥',
        css: {
          width: "10px",
          left: "80px",
          top: "calc(title.bottom + 32px)",
          fontSize: "20px",
          color: "red"
        }
      }, {
        id: 'price',
        type: "text",
        text: goods.goods_info.price,
        css: {
          width: "200px",
          left: "100px",
          top: "calc(title.bottom + 5px)",
          fontSize: "48px",
          color: "red",
          fontWeight: 'bold'
        }
      }, {
        type: "image",
        url: goods.goods_info.thumb,
        css: {
          top: "calc(price.bottom + 30px)",
          left: "80px",
          width: '590px',
          height: '590px',
          borderRadius: '20px'
        }
      }, {
        type: "image",
        url: goods.store_product.qrcode_url,
        css: {
          bottom: "80px",
          left: "400px",
          width: '200px',
          height: '200px'
        }
      }]
    }
    this.setData({
      canvas_data: data
    })
  },
  /** 以打字机形式逐字显示文案 */
  printText(text) {
    let index = 0;
    this.setData({
      wenan: ''
    })
    this.data.timer = setInterval(() => {
      if (index < text.length) {
        this.setData({
          wenan: this.data.wenan + text[index]
        });
        index++;
      } else {
        clearInterval(this.data.timer)
        let wenan = this.data.wenan + '\n' + this.data.store_product.short_link
        this.setData({
          wenan_btn: '重新生成文案',
          copy_show: true,
          start: false,
          wenan
        })
      }
    }, 100);
  },
  deepseek() {
    let start = this.data.start
    console.log(start)
    if (start) {
      return true
    }
    this.setData({
      start: true,
      copy_show: false,
      wenan_btn: '正在生成文案...',
    })
    this.getAi()
  },

  getDeepseek() {
    let that = this
    that.setData({
      wenan: '文案生成中...',
      wenan_btn: '正在生成文案...',
      copy_show: false,
    })
    // this.printText(wenan)
    // return true

    let title = this.data.goods_info.title + '，价格：' + this.data.goods_info.price
    console.log(title)
    const requestTask = wx.request({
      url: 'https://api.deepseek.com/chat/completions',
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + deepseek_key
      },
      data: {
        messages: [{
            content: "你是一个商品文案编写专家，善于根据商品的基本信息，为用户生成一个最合适的商品爆款推广文案。要求只返回推广文案，不要写与商品无关的描述，多用感叹号和emoji表情，字数不超过100字。",
            role: "system"
          },
          {
            content: title,
            role: "user"
          }
        ],
        model: "deepseek-chat",
        stream: true
      },
      enableChunked: true, //开启transfer-encoding chunked
    })
    requestTask.onChunkReceived(res => {
      //在微信开发者工具和真机上接收到的对象格式是不同的，以下代码是针对不同格式进行解码处理
      let type = Object.prototype.toString.call(res.data);
      let text;
      if (type === "[object Uint8Array]")
        text = decodeURIComponent(escape(String.fromCharCode(...res.data)))
      if (type === "[object ArrayBuffer]") {
        let uint8Array = new Uint8Array(res.data);
        text = decodeURIComponent(escape(String.fromCharCode(...uint8Array)))
      }
      //将解码后的文本分割成字符串数组，数组中的每个元素就是即时接收到的流式文本
      let list = text.split('\n');
      for (var i = 0; i < list.length; i++) {
        if (list[i]) {
          if (list[i].trim().search(/^data.*\}$/) > -1) { //过滤掉空行和其他不规则数据行
            let delta = JSON.parse(list[i].substring(6)).choices[0].delta;
            //如果开启了“深度思考”，返回的对象中delta.reasoning_content为深度思考内容，
            //delta.content为主体应答内容
            let content = delta.reasoning_content ? delta.reasoning_content : delta.content;
            console.log(content)
            if (content == '。') {
              // content += '\n'
            }
            let wenan = that.data.wenan
            if (wenan == '文案生成中...') {
              wenan = ''
            }
            wenan = wenan + content
            that.setData({
              wenan
            })
          }
          if (list[i] == 'data: [DONE]') {
            that.saveAi(that.data.wenan)
            let wenan = that.data.wenan + '\n' + that.data.store_product.short_link
            that.setData({
              wenan,
              wenan_btn: '重新生成文案',
              copy_show: true,
              start: false
            })
            requestTask.abort()
          }
        }
      }
    })
  },
  async saveAi(content) {
    let id = this.data.gid
    let res = await api.post('/index/goods/saveAi', {
      id,
      content
    })
    console.log(res)
  },
  async getAi() {
    let id = this.data.gid
    let res = await api.post('/index/goods/getAi', {
      id
    })
    if (res.data.length < 5) {
      this.getDeepseek()
    } else {
      let randomIndex = Math.floor(Math.random() * res.data.length)
      let wenan = res.data[randomIndex].content
      console.log(wenan)
      this.printText(wenan)
    }
  },
  copy() {
    wx.setClipboardData({
      data: this.data.wenan,
    })
  }
})