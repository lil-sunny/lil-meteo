<template>
  <li class="item">
    <router-link class="link" :to="`/${date}`">
      <div class="date">{{ new Date(date).getDate() }}</div>
      <div class="weather">
        <div class="icon">
          <iconify-icon icon="material-symbols:cloud"></iconify-icon>
        </div>
        <div class="temprature">{{ temprature }}°</div>
      </div>
    </router-link>
  </li>
</template>

<script>
export default {
  props: {
    date: Number,
    temprature: Number,
  },
};
</script>

<style scoped>
.item {
  display: block;
  text-align: center;
  position: relative;
}

.item .link {
  display: block;
  min-width: 80px;
  color: #fff;
  text-decoration: none;
}

.item .link:hover {
  text-decoration: none;
}

.item:hover {
  cursor: pointer;
  background: rgba(206, 206, 206, 0.527);
  border-radius: 10px;
}

.item .date {
  font-size: 2.9em;
  font-weight: 600;
  margin: 0 auto;
}

.item .weather {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6em;
  font-weight: 800;
}

.item .dateHelper {
  position: absolute;
  width: 100%;
  top: 0;
  font-size: 1.1em;
}

.item.now {
  color: #326ad9;
}

.nextDaysList .item .weather .icon {
  margin-right: 0.5em;
}
</style>
