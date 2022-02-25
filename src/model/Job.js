let data = [
  {
    id: 1,
    name: 'Pizzaria Guloso',
    'daily-hours': 2,
    'total-hours': 1,
    createdAt: Date.now()
  },
  {
    id: 2,
    name: 'OneTwo Project',
    'daily-hours': 3,
    'total-hours': 47,
    createdAt: Date.now()
  }
]

module.exports = {
  get() {
    return data
  }
};
