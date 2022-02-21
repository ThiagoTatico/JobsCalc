const express = require('express')
const routes = express.Router()

const views = __dirname + '/views/'

const profile = {
  name: 'Thiago Tatico',
  avatar: 'https://avatars.githubusercontent.com/u/86478479?v=4/',
  'monthly-budget': 3000,
  'days-per-week': 5,
  'hours-per-day': 5,
  'vacation-per-year': 4
}

const jobs = [
  {
    id: 1,
    name: "Pizzaria Guloso",
    "daily-hours": 2,
    "total-hours": 60,
    createdAt: Date.now()
  },
  {
    id: 2,
    name: "OneTwo Project",
    "daily-hours": 3,
    "total-hours": 47,
    createdAt: Date.now()
  }
]

routes.get('/', (req, res) => {
  const updatedJobs = jobs.map((job) => {
    const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()

    const createdDate = new Date(job.createdAt)
    const dueDay = createdDate.getDate() + Number(remainingDays)
    const dueDateInMs = createdDate.setDate(dueDay)

    const timeDiffInMs = dueDateInMs - Date.now()

    //Transforming Mile seconds in Days
    const dayInMs = 1000 * 60 * 60 * 24

    return job
  })

  return res.render(views + 'index', {jobs})
})

routes.get('/job', (req, res) => res.render(views + 'job'))

routes.post('/job', (req, res) => {
  // req.body = { name: 'Thiago', dailyHours: '5', totalHours: '7'}
  const lastId = jobs[jobs.length - 1]?.id || 1
 
  jobs.push({
    id: lastId + 1,
    name: req.body.name,
    "daily-hours": req.body["daily-hours"],
    "total-hours": req.body["total-hours"],
    createdAt: Date.now()
  })

  return res.redirect('/')
})

routes.get('/job/edit', (req, res) => res.render(views + 'job-edit'))
routes.get('/profile', (req, res) => res.render(views + 'profile', { profile }))

module.exports = routes