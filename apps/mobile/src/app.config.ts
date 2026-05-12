export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/calendar/index',
    'pages/records/index',
    'pages/statistics/index',
    'pages/profile/index',
    'pages/record-create/index'
  ],
  window: {
    backgroundTextStyle: 'dark',
    backgroundColor: '#f7f8fa',
    navigationBarBackgroundColor: '#f7f8fa',
    navigationBarTitleText: '图新健身',
    navigationBarTextStyle: 'black',
    navigationStyle: 'custom'
  }
})
