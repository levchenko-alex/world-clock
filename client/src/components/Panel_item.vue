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
    min-height: 50px;
    max-width: 300px;
    min-width: 100px;
    margin: 0 10px 10px 0;
    padding: 10px;
    border: 1px solid black;
    text-align: center;
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
    margin-bottom: 30px;
    text-align: left;
    word-wrap: break-word;
  }
</style>
