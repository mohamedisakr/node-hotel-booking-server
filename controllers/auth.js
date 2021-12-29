const showMessage = (req, res, next) => {
  res.status(200).json({message: 'welcome to home page'})
}

module.exports = {showMessage}
