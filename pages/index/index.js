import {
  getWxCode
} from '../../utils/getPermission'
import {
  api
} from '../../utils/api'

const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    seconds: 3,
    name: '小推客'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    if (app.globalData.login) {
      that.getData()
    } else {
      app.checkLoginReadyCallback = res => {
        that.getData()
      }
    }
  },
  async getData() {
    try {
      let team = await api.post('/index/login/team', {})
      console.log(team)
      let name = team.data.name
      this.setData({
        seconds: 2,
        name
      })
    } catch (e) {
      console.log(e)
    }
    this.startJump()
  },
  go() {
    this.login()
    this.setData({
      seconds: 0
    })
    this.startJump()
  },
  async login() {
    let uid = wx.getStorageSync('share_code')
    let token = wx.getStorageSync('token') || ''
    if (!token) {
      let code = await getWxCode()
      if (code) {
        let res = await api.post('/index/login/index', {
          code,
          uid
        })
        token = res.data.token
        wx.setStorageSync('token', token)
        wx.setStorageSync('code', res.data.code)
        wx.setStorageSync('is_have_tid', res.data.tid) //是否绑定上级
      }
    } else {
      //已经登录
      let tid = wx.getStorageSync('is_have_tid')
      if (tid == 0 && uid != 0) {
        //没有上级并且有邀请码的
        let res = await api.post('/index/login/bind', {
          uid
        })
        wx.setStorageSync('is_have_tid', res.data.tid || 0)
      }
    }
  },
  //启动倒计时
  startJump() {
    const countdownTimer = setInterval(() => {
      if (this.data.seconds > 0) {
        this.setData({
          seconds: this.data.seconds - 1
        })
      } else {
        //取消由 setInterval 设置的定时器
        clearInterval(countdownTimer)
        //注意：switchTab 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
        wx.switchTab({
          url: '/pages/home/home',
        })
      }
    }, 1000)
  },
})