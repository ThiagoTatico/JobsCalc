const Profile = require('../model/Profile')
const Job = require('../model/Job')

module.exports = {
  index(req, res) {
    const Jobs = Job.get();

    const updatedJobs = Jobs.map((job) => {
    const remaining = Job.services.remainingDays(job)
    const status = remaining <= 0 ? 'done' : 'progress'
    
    return {
      ...job,
      remaining,
      status,
      budget: Job.services.calculateBudget(job, Profile.get()['value-hour'])
    }
  });
    return res.render('index', {jobs: updatedJobs})
  },

  create(req, res) {
    return res.render('job');
  },

  save(req, res) {
    // req.body = { name: 'Thiago', dailyHours: '5', totalHours: '7'}
    const lastId = Job.data[Job.data.length - 1]?.id || 0
  
    Job.data.push({
      id: lastId + 1,
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      createdAt: Date.now()
    })

    return res.redirect('/');
  },

  show(req, res) {
    const jobId = req.params.id

    const job = Job.data.find(job => Number(job.id) === Number(jobId))

    if (!job) {
      return res.send('Job not found')
    }

    job.budget = Job.services.calculateBudget(job, Profile.get()['value-hour'])

    return res.render('job-edit', { job })
  },

  update(req, res) {
    const jobId = req.params.id

    const job = Job.data.find(job => Number(job.id) === Number(jobId))

    if (!job) {
      return res.send('Job not found')
    }

    const updatedJob = {
      ...job,
      name: req.body.name,
      'total-hours': req.body['total-hours'],
      'daily-hours': req.body['daily-hours']
    }

    Job.data = Job.data.map(job => {

      if(Number(job.id) === Number(jobId)) {
        job = updatedJob
      }

      return job
    })

    res.redirect('/job/' + jobId)
  },

  delete(req, res) {
    const jobId = req.params.id

    Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))

    return res.redirect('/')
  }
};