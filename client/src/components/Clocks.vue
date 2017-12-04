<template>
  <div class="wrapper">
    <panel-item
      v-for="item in clocks"
      v-bind:clock="item"
      v-bind:key="item.id"
    >
    </panel-item>
  </div>
</template>

<script>
import PanelItem from "./Panel_item";
import http from '@/http';

export default {
  components: { PanelItem },
  name: 'Clocks',
  data() {
    return {
      clocks: [],
    };
  },
  async created() {
    try {
      const { clocks } = await http.get('api/clocks');
      this.clocks = clocks;
    } catch({ message }) {
      console.log(message);
    }
  }
};
</script>

<style scoped>
  .wrapper {
    display: flex;
    flex-direction: row;
  }
</style>

