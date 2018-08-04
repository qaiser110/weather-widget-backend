const request = require('supertest');
const app = require('../../app');

const filterBy = (field, array) => val =>
  array.filter(data => data[field] === val);

describe('Test the location API', () => {
  test('It should find/city by partial name', async () => {
    const response = await request(app).get('/location/find/city/aiden');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(7);

    const count = name => filterBy('country', response.body)(name).length;

    expect(count('United Kingdom')).toBe(3);
    expect(count('Germany')).toBe(2);
    expect(count('Australia')).toBe(1);
  });

  test('It should find city by name with spaces', async () => {
    const response = await request(app).get('/location/find/city/ f Indo ');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);

    expect(response.body[0]).toEqual({
      id: 1643084,
      name: 'Republic of Indonesia',
      country: 'Indonesia',
      coord: { lon: 120, lat: -5 },
      smallName: 'republic of indonesia'
    });
  });

  test('It should find city by name with spaces', async () => {
    const response = await request(app).get('/location/find/city/invalid');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(0);
  });
});
