const expres = require('express')
const changeCase = require('change-case')
const routesV1 = require('require-dir')('./v1')

const router = expres.Router()

router.get('/', (req, res) => res.send(`API for Konexi BE test`));

Object.keys(routesV1).forEach((routeName) => {
  router.use(`/v1/${changeCase.paramCase(routeName)}`, require(`./v1/${routeName}`)())
})


module.exports = router