const _ = require('lodash')
const createError = require('http-errors')

const validations = {
  blank: (_params) => {
    const emptyParams = []
    Object.keys(_params).map((key) => {
      if (!_params[key]) emptyParams.push(key)
    })
    if (emptyParams.length > 0) throw new Error(createError(400, `${_.join(emptyParams, ', ')} ${emptyParams.length > 1 ? 'are' : 'is'} blank`))
  }
}

module.exports = validations
