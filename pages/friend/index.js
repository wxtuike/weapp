import {
  api
} from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    index: 0,
    qr: '',
    user: {}
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  async getData() {
    let res = await api.post('/index/user/card', {})
    if (res.code == 200) {
      console.log(res)
      this.setData({
        list: res.data.card,
        qr: res.data.url,
        user: res.data.user
      })
    }
  },
  show(e) {
    let index = e.currentTarget.dataset.index
    this.share(index)
  },
  tapShare() {
    let index = this.data.index
    this.share(index)
  },
  onSwiperChange(e) {
    let index = e.detail.current
    // this.share(index)
    this.setData({
      index
    })
  },
  share(view) {
    this.createSelectorQuery().select("#view" + view)
      .node().exec(res => {
        const node = res[0].node
        node.takeSnapshot({
          // arraybuffer,type: 'file' 且 format: 'png' 时，可直接导出成临时文件
          type: 'arraybuffer',
          format: 'png',
          success: (res) => {
            const f = `${wx.env.USER_DATA_PATH}/${view}.png`
            const fs = wx.getFileSystemManager();
            fs.writeFileSync(f, res.data, 'binary')
            wx.showShareImageMenu({
              path: f,
              success(e) {},
              fail(err) {}
            })
          }
        })
      })
  }
})