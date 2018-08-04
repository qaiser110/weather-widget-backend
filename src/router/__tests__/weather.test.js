const request = require('supertest');
const app = require('../../app');
const cityJson = require('../../data/city');
const countryJson = require('../../data/country');

let validIds = [2017370, 384848, 464176, 1271231, 464737, 803611, 874652, 2045761];
let invalidIds = [2033444, 'abcdefg'];

const findCity = cityId => cityJson.find(city => city.id === cityId);

describe('Test the weather API', () => {
  
  test('It should get weather by a valid city ID', async () => {
    const cityId = validIds[Math.floor(Math.random() * 8)];

    const response = await request(app).get(`/weather/forecast/${cityId}`);
// console.log('----response---')
// console.log(response)
    expect(response.statusCode).toBe(200);
    const {data} = response.body

    const expectedCity = findCity(cityId)

    expect(data.list.length).toBe(7)
    expect(data.city).toEqual(expect.objectContaining({
        id: expectedCity.id,
        name: expectedCity.name,
        country: expectedCity.country,
        countryName: countryJson[expectedCity.country],
      })
    )
  });

  test('It should return 409 for an invalid city ID (not a number)', async () => {

    const response = await request(app).get(`/weather/forecast/${invalidIds[1]}`);

    expect(response.statusCode).toBe(409);
    expect(response.body.msg).toBe('Invalid City ID (cityId must be a valid number)')
  });

  test('It should return 404 for an invalid city ID (valid number)', async () => {

    const response = await request(app).get(`/weather/forecast/${invalidIds[0]}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.msg).toBe('City not found for the given ID')
  });
});
