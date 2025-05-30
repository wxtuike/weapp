import {
  api
} from '../../utils/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    triggered: false,
    visible: false,
    ptitle: '',
    qrimg: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  async onRefresh(e) {
    console.info('@@@ onRefresh', e)
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

  show(e) {
    let item = e.currentTarget.dataset.item
    console.log(item)
    let ptitle = item.title
    let qrimg = this.getRandomElement(item.imgs)
    this.setData({
      visible: true,
      ptitle,
      qrimg
    })
  },
  getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },

  onVisibleChange(e) {
    this.setData({
      visible: e.detail.visible,
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  async getData() {
    let res = await api.post('/index/login/contact', {})
    if (res.code == 200) {
      console.log(res)
      this.setData({
        list: res.data
      })
    }
  }
})