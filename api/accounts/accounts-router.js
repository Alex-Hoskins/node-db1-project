const router = require('express').Router()
const Account = require('./accounts-model')
const {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId
}=require('./accounts-middleware')

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const accounts = await Account.getAll()
    res.status(200).json(accounts)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await Account.getById(req.params.id)
    res.status(200).json(account)
  } catch (err) {
    next(err)
  }
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await Account.create({name:req.body.name.trim(), budget:req.body.budget})
    res.status(201).json(account)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', checkAccountPayload, checkAccountId, checkAccountNameUnique, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const numberOfUpdates = await Account.updateById(req.params.id, req.body)
    res.status(200).json(numberOfUpdates)
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const numberDeleted = await Account.deleteById(req.params.id, req.body)
    res.status(200).json(numberDeleted)
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    message: err.message
  })
})

module.exports = router;
