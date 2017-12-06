<template>
  <div class="wrapper">
    <panel-item
      v-for="item in clocks"
      v-bind:clock="item"
      v-bind:key="item.id"
    >
    </panel-item>
    <router-view></router-view>
  </div>
</template>

<script>
import PanelItem from "./Panel_item";
import { mapGetters, mapActions } from 'vuex'

export default {
  components: { PanelItem },
  name: 'Clocks',
  computed: {
    ...mapGetters([
      'clocks',
    ]),
  },
  methods: {
    ...mapActions([
      'fetchClocks',
    ]),
  },
  created() {
    this.fetchClocks();
  },
  watch: {
    $route() {
      const { isSubmit } = this.$route.params;

      if (this.$route.path === '/' && isSubmit) {
        this.fetchClocks();
      }
    },
  }
};
</script>

<style scoped>
  .wrapper {
    display: flex;
    flex-direction: row;
  }
</style>

