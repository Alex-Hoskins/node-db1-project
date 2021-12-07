const db = require('../../data/db-config')

async function getAll() {
  const rows = await db('accounts')
    .select('id', 'name', 'budget')
    .orderBy('id', 'asc')
  return rows
}

async function getById(id) {
  const [account] = await db('accounts')
    .where('id', id)
    return account
}
async function getByName(name) {
  const [account] = await db('accounts')
    .where('name', name)
    return account
}

async function create(body){
  // DO YOUR MAGIC
  const accountid = await db('accounts')
    .insert(body)
  const account = await getById(accountid)
  return account
}

async function updateById(id, account){
  // DO YOUR MAGIC
  const numberAffected = await db('accounts')
    .where('id', id)
    .update(account)
  const newaccount = await getById(id)
  return newaccount
}

async function deleteById(id) {
  // DO YOUR MAGIC\
  const numberAffected = await db('accounts')
  .where('id', id)
  .delete()
return numberAffected
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  getByName
}
