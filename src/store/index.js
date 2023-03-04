import { createStore } from "vuex";
import currentWeather from "./modules/currentWeather";
import weeklyWeather from "./modules/weeklyWeather";
export const store = createStore({
 modules: {
    currentWeather,
    weeklyWeather
 }
});
