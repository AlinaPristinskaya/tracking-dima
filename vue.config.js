module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/f.tracking/'
    : '/',
  transpileDependencies: [
    'vuetify'
  ]
}
