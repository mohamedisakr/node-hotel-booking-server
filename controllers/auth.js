const showMessage = (req, res, next) => {
  res.status(200).json({message: 'welcome to home page'})
}

const register = async (req, res, next) => {
  console.log(req.body)
}

module.exports = {showMessage, register}
