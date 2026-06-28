const { handleServerError } = require('./responseHelpers')

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(() => handleServerError(res))
}

module.exports = asyncHandler
