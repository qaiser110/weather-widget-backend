const express = require('express');
const router = express.Router();

const cityJson = require('../data/city');
const countryJson = require('../data/country');

const cityNameFilter = name => city =>
  city.smallName.includes(name.toLowerCase());

router.get('/find/city/:name', (req, res) => {
  const cities = cityJson.filter(cityNameFilter(req.params.name.trim()));
  res.json(
    cities.map(city => ({ ...city, country: countryJson[city.country] }))
  );
});

module.exports = router;
