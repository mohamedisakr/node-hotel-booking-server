const createConnectAccount = async (req, res, next) => {
  console.log(
    `req user from requireSignin middleware : ${JSON.stringify(req.user)}`,
  )
  //   console.log(
  //     `req user from requireSignin middleware : ${JSON.stringify(
  //       req.headers.authorization,
  //     )}`,
  //   )
  console.log(`You hit create connect account endpoint`)
}

module.exports = {createConnectAccount}
