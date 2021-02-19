module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/evidencias.github.io/'
    : '/',
  "transpileDependencies": [
    "vuetify"
  ]
}