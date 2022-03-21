const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
  async index(req, res) { // Use async/await for the "Profile.get()"
    const jobs = await Job.get()
    const profile = await Profile.get()

    //status amounts
    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length
    }

    let jobTotalHours = 0

    const freeHours = profile['hours-per-day'] - jobTotalHours;

    const updatedJobs = jobs.map(job => {
      const remaining = JobUtils.remainingDays(job)
      const status = remaining <= 0 ? 'done' : 'progress'

      // Sum status amount
      statusCount[status] += 1;

      // Total hours for each job in progress
      jobTotalHours = status == 'progress' ? jobTotalHours + Number( job['daily-hours'] ) : jobTotalHours

      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile['value-hour'])
      }
    })

    return res.render('index', {
      jobs: updatedJobs,
      profile: profile,
      statusCount: statusCount,
      freeHours: freeHours
    })
  }
}
