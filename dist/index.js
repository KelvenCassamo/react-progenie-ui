
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-progenie-ui.cjs.production.min.js')
} else {
  module.exports = require('./react-progenie-ui.cjs.development.js')
}
