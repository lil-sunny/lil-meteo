<template>
  <div class="backgroundApp">
    <div class="meteocenterWrapper">
      <div class="wetherNowPannel">
        <div class="locationInfo">
          <span class="title">Сьогодні в Харкові</span>
          <div class="locationInformation">
            <span class="locate"> Україна, Харків </span>
            <span class="time"> 15:38 </span>
            <span class="date"> {{ onDayWeather.currentDate }} </span>
          </div>
          <div class="duringWeather">
            <div class="icon">
              <iconify-icon icon="material-symbols:cloud"></iconify-icon>
            </div>
            <div class="temprature">{{ onDayWeather.current }}°C</div>
          </div>
        </div>
      </div>
      <div class="duringDayPannel">
        <div class="fullWeatherDay">
          <div class="container d-flex">
            <ul class="weatherList">
              <li class="item">
                <div class="name">Ніч</div>
                <div class="weather">
                  <div class="icon">
                    <iconify-icon icon="material-symbols:cloud"></iconify-icon>
                  </div>
                  <div class="temprature">{{ onDayWeather.night }}°</div>
                </div>
              </li>
              <li class="item">
                <div class="name">Ранок</div>
                <div class="weather">
                  <div class="icon">
                    <iconify-icon icon="material-symbols:cloud"></iconify-icon>
                  </div>
                  <div class="temprature">{{ onDayWeather.morning }}°</div>
                </div>
              </li>
              <li class="item">
                <div class="name">День</div>
                <div class="weather">
                  <div class="icon">
                    <iconify-icon icon="material-symbols:cloud"></iconify-icon>
                  </div>
                  <div class="temprature">{{ onDayWeather.day }}°</div>
                </div>
              </li>
              <li class="item">
                <div class="name">Вечір</div>
                <div class="weather">
                  <div class="icon">
                    <iconify-icon icon="material-symbols:cloud"></iconify-icon>
                  </div>
                  <div class="temprature">{{ onDayWeather.evening }}°</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- <div class="sunChanging">
                    <ul class="sunChangingList">
                        <li class="item">
                            <span class="title">Схід</span>
                            <div class="timeWrapper">
                                <iconify-icon class="icon" icon="mdi:weather-sunset-up"></iconify-icon>
                                <span>{{ onDayWeather.timeOfSunrise }}</span>
                            </div>
                        </li>
                        <li class="item">
                            <span class="title">Захід</span>
                            <div class="timeWrapper">
                                <iconify-icon class="icon" icon="mdi:weather-sunset-down"></iconify-icon>
                                <span>{{ onDayWeather.timeOfSunset }}</span>
                            </div>
                        </li>
                    </ul>
                </div> -->
      </div>
      <div class="additionalInformationPannel">
        <div class="container p-0 m-0">
          <ul class="additionalInfoList d-flex flex-wrap">
            <li class="item col-2">
              <div class="title">Відносна вологість</div>
              <div class="value">{{ onDayWeather.relativeHumidity }} %</div>
            </li>
            <li class="item col-2">
              <div class="title">Вітер</div>
              <div class="value">{{ onDayWeather.relativeHumidity }} км/г</div>
            </li>
            <li class="item col-2">
              <div class="title">Видимість</div>
              <div class="value">{{ onDayWeather.visibility }} м</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="nextDaysPannel">
        <div class="container p-0 m-0">
          <ul class="nextDaysList">
            <day-item
              v-for="d in weekDates"
              :key="d.date"
              :date="d.date"
              :temprature="d.temprature"
            />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayItem from "@/components/day-item.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: { dayItem },
  computed: {
    ...mapGetters(["msg", "onDayWeather", "weekDates"]),
  },
  methods: {
    ...mapActions(["getCurrentWeatherInfo", "getWeekDates"]),
  },
  mounted() {
    this.getCurrentWeatherInfo(this.$route.params.date);
    this.getWeekDates();
  },
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

.app {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10px;
}

.backgroundApp {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background: rgb(1, 0, 72);
  background: radial-gradient(
    circle,
    rgba(1, 0, 72, 1) 0%,
    rgba(1, 0, 35, 1) 100%
  );
}

.meteocenterWrapper {
  width: 789px;
  border-radius: 20px;
  transform: translateY(-12px);
  overflow: hidden;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(4);
}

.wetherNowPannel {
  max-height: 180px;
  padding: 3em 4.5em;
}

.locationInfo .title {
  display: flex;
  font-size: 2.9em;
  font-weight: 800;
  color: #fff;
  margin-bottom: 0.2em;
}

.locationInformation {
  display: flex;
  font-size: 1.1em;
  color: #fff;
}

.locationInformation span {
  border-right: 1px solid #fff;
  padding: 0 10px;
}

.locationInformation span:nth-child(1) {
  padding-left: 0;
}

.locationInformation span:last-child {
  border-right: none;
}

.duringWeather {
  display: flex;
  font-size: 4.8em;
  font-weight: 800;
  align-items: center;
  color: #fff;
}

.duringWeather .icon {
  display: block;
  margin-right: 0.5em;
}

.duringWeather .temprature {
  font-weight: 600;
  display: block;
}

/* the wether on during day */

.duringDayPannel {
  /* height: 115px; */
  display: flex;
  background: rgba(255, 255, 255, 0.2);
}

.fullWeatherDay {
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 2em 0;
  background: rgba(255, 255, 255, 0.2);
}

.weatherList {
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
}

.weatherList .item {
  display: block;
  margin: 0 3em;
  text-align: center;
}

.weatherList .item .name {
  font-size: 1.8em;
  font-weight: 600;
  color: #fff;
}

.weatherList .item .weather {
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 2.9em;
  font-weight: 800;
}

.weatherList .item .weather .icon {
  margin-right: 0.5em;
}

.sunChanging {
  padding: 2em;
}

.sunChangingList {
  padding: 0;
  margin: 0;
  list-style: none;
  font-size: 1.1em;
  color: #fff;
}

.sunChangingList .timeWrapper {
  display: flex;
  font-size: 1.1em;
  align-items: center;
}

.sunChangingList .timeWrapper .icon {
  font-size: 2em;
  margin-right: 0.2em;
}

.additionalInformationPannel {
  padding: 2em 4em;
}

.additionalInfoList {
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}

.additionalInfoList .item {
  padding: 0 0.5em;
  text-align: center;
  border-right: 1px solid #fff;
  border-left: 1px solid #fff;
}

.additionalInfoList .item div {
  text-align: center;
  color: #fff;
}

.additionalInfoList .item .value {
  margin-top: 0.2em;
  font-weight: 700;
  font-size: 1.1em;
}

/* for next days */
.nextDaysPannel {
  padding: 1.8em 2em;
  background: rgba(255, 255, 255, 0.4);
}

.nextDaysList {
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-x: scroll;
}
</style>
