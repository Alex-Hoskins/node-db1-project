const Account = require('./accounts-model')

exports.checkAccountPayload = async (req, res, next) => {
  let name = req.body.name.trim();
  let budget = req.body.budget;
  req.body.name= name
  if (!name || !budget){
    next({ status: 400, message: "name and budget are required" })
  }
  else if(typeof(name) !== 'string'){
    next({ status: 400, message: "name of account must be a string" })
  }
  else if(name.length < 3 || name.length >100){
    next({ status: 400, message: "name of account must be between 3 and 100" })
  }
  else if(typeof(budget) !== 'number' && Number.isFinite(budget)){
    next({ status: 400, message: "budget of account must be a number" })
  }
  else if(budget < 0 || budget > 1000000){
    next({ status: 400, message: "budget of account is too large or too small" })
  }
  else {
    next();
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await Account.getByName(req.body.name)
    if(account){
      next({ status: 400, message: "that name is taken" })
    }
    else{
      next()
    }
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
