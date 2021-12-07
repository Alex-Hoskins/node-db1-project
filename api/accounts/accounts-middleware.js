const Account = require('./accounts-model')

exports.checkAccountPayload = async (req, res, next) => {
  // DO YOUR MAGIC
  if (!req.body.name || !req.body.budget) {
    next({ status: 400, message: "missing required field" });
  } else {
    next();
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await Account.getByName(req.body.name)
    if(!account){next()}
    else(next({ status: 400, message: "Name already in use" }))
    
  } catch (err) {
    next(err)
  }
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  const validAccount = await Account.getById(req.params.id)
    .then(res=>{
      if(res){
        next()
      }
      else{
        next({ status: 404, message: "account not found" })
      }
    })
    .catch(err=>{
      next(err)
    })

}
