<template>
  <div>
    <div class="header">
      <button @click="create">Create</button>
    </div>
    <div class="panel-wrapper">
      <panel-item
        v-for="item in clocks"
        v-bind:clock="item"
        v-bind:key="item.id"
        :time="_time(item.offset)"
      >
      </panel-item>
      <router-view></router-view>
    </div>
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
    _time() {
      return function(offset) {
        return new Date(this.time + (3600000 * offset)).toLocaleTimeString();
      }
    }
  },
  data() {
    return {
      time: '',
    }
  },
  methods: {
    ...mapActions([
      'fetchClocks',
    ]),
    calculateTime() {
      const d = new Date();
      return d.getTime() + (d.getTimezoneOffset() * 60000);
    },
    startTime() {
      this.time = this.calculateTime();

      setTimeout(this.startTime, 500);
    },
    create() {
      this.$router.push('/create-clock');
    },
  },
  created() {
    this.fetchClocks();
  },
  mounted() {
    this.startTime();
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
  .panel-wrapper {
    display: flex;
    flex-direction: row;
  }

  .header {
    margin-bottom: 20px;
  }
</style>

