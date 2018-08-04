const fs = require('fs')
const cities = require('../src/data/city')

const smallCase = cities.map(city => ({
  ...city, smallName: city.name.toLowerCase()
}))

fs.writeFileSync('./src/data/city.json', JSON.stringify(smallCase, null, 2))
