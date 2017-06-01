module.exports = function(env) {
  var env = process.env.NODE_ENV;
  return require(`./build/webpack.${env}.config.js`)
}
