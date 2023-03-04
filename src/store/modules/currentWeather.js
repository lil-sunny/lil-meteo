import axios from "axios";

export default {
  state: {
    onDayWeather: {
      current: 0,
      night: 0,
      morning: 0,
      day: 0,
      evening: 0,
      timeOfSunrise: 0,
      timeOfSunset: 0,
      visibility: 0,
      wind: 0,
      relativeHumidity: 0,
      currentDate: "",
    },
  },
  getters: {
    onDayWeather(state) {
      return state.onDayWeather;
    },
  },
  actions: {
    async getCurrentWeatherInfo(context, param) {
      await axios
        .get(
          "https://api.open-meteo.com/v1/forecast?latitude=49.98&longitude=36.25&hourly=temperature_2m,relativehumidity_2m,visibility,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=Europe%2FLondon&start_date=2023-03-01&end_date=2023-03-19"
        )
        .then((res) => {
          let data = res.data;
          context.commit("GET_CURRENT_WEATHER_INFO", {data, param} );
        });
    },
  },
  mutations: {
    GET_CURRENT_WEATHER_INFO(state, { data, param } ) {
      let currentDate = {
        h: new Date(param).getUTCHours(),
        d: new Date(param).getDate(),
        m: new Date(param).getMonth(),
        y: new Date(param).getFullYear(),
        min: new Date(param).getUTCMinutes(),
      };

      state.onDayWeather.currentDate = `${currentDate.d}.${currentDate.m + 1}.${
        currentDate.y
      }`;

      let currentValues = compareDate(param, data);
      state.onDayWeather.current = currentValues.current;
      state.onDayWeather.night = currentValues.night;
      state.onDayWeather.morning = currentValues.morning;
      state.onDayWeather.day = currentValues.day;
      state.onDayWeather.evening = currentValues.evening;
      state.onDayWeather.visibility = currentValues._visibility;
      state.onDayWeather.wind = currentValues._windspeed_10m;
      state.onDayWeather.relativeHumidity = currentValues._relativehumidity_2m;
    },
  },
};

function compareDate(param, data) {
  let weatherOnDay = {
    temperature_2m: [],
    visibility: [],
    windspeed_10m: [],
    relativehumidity_2m: [],
    current: 0,
    night: 0,
    morning: 0,
    day: 0,
    evening: 0,
    _visibility: 0,
    _windspeed_10m: 0,
    _relativehumidity_2m: 0,
  }
  for (let date of data.hourly.time) {
    if (
      new Date(date).getUTCMonth() == new Date(param).getUTCMonth() &&
      new Date(date).getDate() == new Date(param).getDate() &&
      new Date(date).getFullYear() == new Date(param).getFullYear()
    ) {
      weatherOnDay.temperature_2m.push(data.hourly.temperature_2m[data.hourly.time.indexOf(date)]);
      weatherOnDay.visibility.push(data.hourly.visibility[data.hourly.time.indexOf(date)]);
      weatherOnDay.windspeed_10m.push(data.hourly.windspeed_10m[data.hourly.time.indexOf(date)]);
      weatherOnDay.relativehumidity_2m.push(data.hourly.relativehumidity_2m[data.hourly.time.indexOf(date)]);

      if (new Date(date).getUTCHours() == new Date().getUTCHours()) {
        weatherOnDay.current = data.hourly.temperature_2m[data.hourly.time.indexOf(date)];
        weatherOnDay._visibility = data.hourly.visibility[data.hourly.time.indexOf(date)];
        weatherOnDay._windspeed_10m = data.hourly.windspeed_10m[data.hourly.time.indexOf(date)];
        weatherOnDay._relativehumidity_2m = data.hourly.relativehumidity_2m[data.hourly.time.indexOf(date)];
      }

      else if (new Date(date).getUTCHours() == 2) {
        weatherOnDay.night = data.hourly.temperature_2m[data.hourly.time.indexOf(date)];
      }

      else if (new Date(date).getUTCHours() == 5) {
        weatherOnDay.morning = data.hourly.temperature_2m[data.hourly.time.indexOf(date)];
      }

      else if (new Date(date).getUTCHours() == 13) {
        weatherOnDay.day = data.hourly.temperature_2m[data.hourly.time.indexOf(date)];
      }

      else if (new Date(date).getUTCHours() == 19) {
        weatherOnDay.evening = data.hourly.temperature_2m[data.hourly.time.indexOf(date)];
      }

      }
    }
    return weatherOnDay;
}