<template>
  <div class="content pure-g">
    <div class="header pure-u-1-1">
      <button class="pure-button pure-button-primary" @click="create">Create</button>
      <div class="sort-by">
        <label>Sort by: </label>
        <v-select
          class="sort-select"
          :options="sortOptions"
          label="label"
          v-model="sortBy"
          placeholder="Chose sort type..."
        >
        </v-select>
      </div>
    </div>
    <div class="pure-u-1">
      <div class="panel-wrapper">
        <panel-item
          v-for="item in clocks"
          v-bind:clock="item"
          v-bind:key="item.id"
          :time="_time(item.offset)"
        >
        </panel-item>
      </div>
      <router-view class="pure-g"></router-view>
    </div>
  </div>
</template>

<script>
import PanelItem from "./Panel_item";
import vSelect from 'vue-select'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: { PanelItem, vSelect },
  name: 'Clocks',
  computed: {
    ...mapGetters([
      'clocks',
    ]),
    _time() {
      return function(offset) {
        return new Date(this.time + (3600000 * offset)).toLocaleTimeString();
      }
    },
  },
  data() {
    return {
      time: '',
      sortBy: '',
      sortOptions: [
        { label: 'description' },
        { label: 'timezone' },
      ]
    }
  },
  methods: {
    ...mapActions([
      'fetchClocks',
      'sortClocks',
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
        this.sortBy = '';
        this.fetchClocks();
      }
    },
    sortBy(value) {
      if (value) {
        this.sortClocks(value.label);
      }
    }
  }
};
</script>

<style scoped>
  .panel-wrapper {
    display: flex;
    flex-wrap: wrap;
  }

  .header {
    display: flex;
    margin-bottom: 20px;
  }

  .header button {
    margin-right: 30px;
  }

  .content {
    padding: 30px;
  }

  .sort-by {
    display: flex;
    align-items: center;
  }

  .sort-by label {
    margin-right: 5px;
  }

  .sort-select {
    width: 300px;
  }
</style>

