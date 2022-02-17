// index.js
const app = getApp()

Page({
  data: {
    message: "Hello"
  },
  onLoad: function () {
    setTimeout(() => {
      this.setData({ message: app.globalData.name }, () => { 
        console.log(this.data);
      })
    }, 2000);
  }
});  