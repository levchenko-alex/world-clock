<template>
  <div class="panel">
    <div class="time">{{ time }}</div>
    <div class="timezone">{{ clock.timezone }}</div>
    <div class="description">{{ clock.description }}</div>
  </div>
</template>

<script>
  export default {
    name: "panel-item",
    props: ['clock'],
    data() {
      return {
        time: '',
      }
    },
    methods: {
      startTime() {
        const d = new Date();
        const { timezone: timeZone } = this.clock;

        this.time = d.toLocaleTimeString(false, { timeZone });

        setTimeout(this.startTime, 500);
      },
    },
    mounted() {
      this.startTime();
    }
  }
</script>

<style scoped>
  .panel {
    border: 1px solid black;
    margin-right: 10px;
    text-align: center;
    padding: 5px;
    min-height: 50px;
  }

  .panel:hover {
    cursor: pointer;
  }

  .time {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .timezone {
    margin-bottom: 15px;
    text-decoration: underline;
  }

  .description {
    color: darkgrey;
    font-style: italic;
  }
</style>
