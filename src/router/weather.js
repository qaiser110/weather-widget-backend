const express = require('express');
const router = express.Router();
const axios = require('axios');
const storage = require('node-persist');

const cityJson = require('../data/city');
const countryJson = require('../data/country');

const cacheConfig = {
  dir: '.cache/city',
  ttl: 3 * 60 * 60000,
  expiredInterval: 60 * 60000,
}

require('dotenv').config();
const appId = process.env.WEATHERMAP_APPID;
if (!appId) throw new Error('Please make sure you have the WEATHERMAP_APPID defined in .env file. If you do not have one, you can get it here: https://openweathermap.org/appid')

const forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily';

router.get('/forecast/:cityId', async (req, res, next) => {

  const cityId = Number(req.params.cityId)
  if (!cityId) return res.json(409, {
    msg: 'Invalid City ID (cityId must be a valid number)'
  })

  try {
    /* try cached data first */
    const cacheKey = `city-${cityId}`
    await storage.init(cacheConfig);
    const cacheData = await storage.getItem(cacheKey);

    if (cacheData) return res.json({ data: cacheData, cached: true });

    /* fetch data from Weather */
    const city = cityJson.find(city => city.id === cityId);
    if (!city) return res.json(404, {
      msg: 'City not found for the given ID'
    })

    const { data } = await axios.get(`${forecastUrl}?id=${city.id}&appid=${appId}`)

    data.city['countryName'] = countryJson[city.country]

    await storage.setItem(cacheKey, data)
    res.json({ data, cached: false });
  } catch (error) {
    res.status(500).json({ error });
  }

});

module.exports = router;
