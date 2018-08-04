# Weather Widget API

This project serves as the backend for the Weather Widget.

## OpenWeatherMap APPID Setup 

1. The API fetches the weather data from [openweathermap.org](https://openweathermap.org). The API requires an [APPID](https://openweathermap.org/appid) to authenticate the user requests. Here is what you should do get the APPID and use it in the project:

2. Create and account on https://openweathermap.org.

3. Login to your openweathermap account, and copy your [APPID](https://home.openweathermap.org/api_keys)

4. Create a `.env` file in the project root, and paste the APPID into it. If your APPID is 12345, your .env file content would be:

```
WEATHERMAP_APPID=12345
```

Now we're ready do run our API server.

## Install and start the server

We first need to install the dependencies. Open the project root in teh terminal and run the following command:
```
npm i && npm start
```

## API Endpoints

**/location/find/city/:name**

Find a city by name

Accepts:

- Exact Name of city
- Partial Name of city

Returns:

An array of matching cities. Following information is included for each city:

- id: City ID to fetch data from [openweathermap.org](https://openweathermap.org)
- name: Name of City
- country: Name of parent country
- coord: Location `lon/lat` coordinates

**/weather/forecast/:cityId**

Accepts:

- City ID to find weather information for

Returns:

- city: the city information, including the country name
- list: Weather information (7-day forecast) for the city

Returns:

## Running the tests

To run the tests, run the following command:
```
npm test
```

To run the tests and watch for changes, run the following command:
```
npm test:watch
```

## City and Country data

The City and Country data is stored as JSON files in `src/data` directory.

## Caching the requests

The OpenWeatherMap API requires the data to be fetched only once in every  minutes. This is why we're caching the data on the server. We do this using [node-persist](https://github.com/simonlast/node-persist) -- a server-side file-based caching library.

