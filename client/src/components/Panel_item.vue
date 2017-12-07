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
    props: ['clock', 'time'],
    methods: {
      update() {
        this.$router.push(`update/${this.clock.id}`)
      }
    },
  }
</script>

<style scoped>
  .panel {
    border: 1px solid black;
    margin-right: 10px;
    margin-bottom: 10px;
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
