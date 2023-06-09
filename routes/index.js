const express = require('express')
const router = express.Router()
const { calculateAge, getZodiacName } = require('../controllers')

router.get('/', (req, res)=>{
  res.render('index', { 
      title: 'Apps' 
  })
})

router.post('/process', async(req, res)=>{
  const { name, date } = req.body
  if (name) {
    if (date) {
      const valueDate = new Date(date)
      const formattedDate = valueDate.toLocaleDateString(undefined, { month: '2-digit', day: '2-digit' })
      const zodiacName = await getZodiacName(formattedDate)
      const age = calculateAge(date);
      res.status(200).json({
        code: 200,
        status: 'success',
        data: {
          name,
          zodiacName,
          age
        }
      })
    } else {
      res.status(303).json({
        code: 303,
        status: 'failed',
        message: 'date not found'
      })
    }
  } else {
    res.status(303).json({
      code: 303,
      status: 'failed',
      message: 'name not found'
    })
  }
  
})

module.exports = router
