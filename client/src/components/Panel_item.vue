<template>
  <div class="panel" @click="update">
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
      calculateTime(offset) {
        const d = new Date();
        const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        const localDate = new Date(utc + (3600000 * offset));

        return localDate.toLocaleTimeString();
      },
      startTime() {
        const { offset } = this.clock;

        this.time = this.calculateTime(offset);

        setTimeout(this.startTime, 500);
      },
      update() {
        this.$router.push(`update/${this.clock.id}`)
      }
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
