const Profile = require('../model/Profile')

module.exports = {
  async index(req, res) { // Use async/await for the "Profile.get()"
    return res.render('profile', { profile: await Profile.get()})
  },

  async update(req, res) { // Use async/await for the "Profile.get()"
    const data = req.body
    const weeksPerYear = 52
    const weeksPerMonth = (weeksPerYear - data['vacation-per-year']) / 12
    const weekTotalHours = data['hours-per-day'] * data['days-per-week']
    const monthlyTotalHours = weekTotalHours * weeksPerMonth

    const valueHour = data['value-hour'] = data['monthly-budget'] / monthlyTotalHours

    await Profile.update({
      ... await Profile.get(),
      ...req.body,
      'value-hour': valueHour
    })

    return res.redirect('/profile')
  }
};