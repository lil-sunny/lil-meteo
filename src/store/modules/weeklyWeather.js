import axios from "axios";

export default {
  state: {
    weekDates: [],
  },
  getters: {
    weekDates(state) {
      return state.weekDates;
    },
  },
  actions: {
    getWeekDates(context) {
      axios
        .get(
          "https://api.open-meteo.com/v1/forecast?latitude=49.98&longitude=36.25&hourly=temperature_2m,relativehumidity_2m,visibility,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=Europe%2FLondon&start_date=2023-03-01&end_date=2023-03-19"
        )
        .then((res) => {
          res.data.daily.time.forEach((date) => {
            let dayDate = {
              d: new Date(date).getDate(),
              m: new Date(date).getUTCMonth(),
              y: new Date(date).getFullYear(),
            };
            if (
              new Date().getUTCMonth() <= dayDate.m &&
              new Date().getDate() <= dayDate.d &&
              new Date().getFullYear() <= dayDate.y
            ) {
              let tempratures = [];
              for (let t of res.data.hourly.time) {
                if (
                  new Date(t).getUTCMonth() == dayDate.m &&
                  new Date(t).getDate() == dayDate.d &&
                  new Date(t).getFullYear() == dayDate.y
                ) {
                  tempratures.push(
                    res.data.hourly.temperature_2m[
                      res.data.hourly.time.indexOf(t)
                    ]
                  );
                }
              }
              context.commit(
                "UPDATE_WEEK_DATES",
                countMiddleTemprature(tempratures, date)
              );
            }
          });
        });
    },
  },

  mutations: {
    GET_WEEK_DATES(state, payload) {
      state.weekDates = payload;
    },
    UPDATE_WEEK_DATES(state, payload) {
      state.weekDates.push(payload);
    },
  },
};

function countMiddleTemprature(tempratures, date) {
    let total = 0;
    tempratures.forEach((tempratureOnDay) => {
        total += tempratureOnDay;
    });
    let middleValue = total / tempratures.length;
    return {
      temprature: middleValue.toFixed(1),
      date: date,
    };
  }
