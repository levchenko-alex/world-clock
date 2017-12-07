<template>
  <modal
    height="auto"
    name="update"
    @closed="onCloseEvent"
    :clickToClose="false"
  >
    <div class="modal">
      <h1>Update clock</h1>
      <v-select
        v-if="selectedClock"
        label="timezone"
        :options="timezones"
        v-model="timezone"
        class="select"
      ></v-select>
      <textarea
        v-focus
        name="description"
        v-if="selectedClock"
        cols="30"
        v-model="description"
        rows="10"
        v-validate="rules"
      >
        {{ selectedClock.description }}
      </textarea>
      <p v-show="errors.has('description')" class="help is-danger">{{ errors.first('description') }}</p>
      <button @click="onClose">Cancel</button>
      <button @click="onSubmit">Submit</button>
    </div>
  </modal>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import vSelect from 'vue-select'
  import http from '@/utils/http';
  import { focus } from "@/utils/directives";
  import { descriptionsRules } from "@/utils/validation_config";


  export default {
    components: { vSelect },
    directives: { focus },
    name: "update-modal",
    data() {
      return {
        isSubmit: true,
        ownClocks: [],
        description: '',
        timezone: null,
        rules: descriptionsRules,
      }
    },
    computed: {
      ...mapGetters([
        'clocks',
        'timezones',
      ]),
      selectedClock() {
        /**
         * ownClocks - data when user go to component via URL (example - '/update/4')
         * clocks    - data when user go to component via clicking to clock panel from root url ('/')
         */
        return this.ownClocks.length ? this.getClock(this.ownClocks) : this.getClock(this.clocks);
      },
    },
    methods: {
      ...mapActions([
        'fetchTimezones',
      ]),
      onCloseEvent() {
        this.$router.push({ name: 'root', params: { isSubmit: this.isSubmit } });
      },
      onClose() {
        this.isSubmit = false;
        this.$modal.hide('update');
      },
      async onSubmit() {
        if (this.errors.has('description')) {
          return;
        }

        try {
          const values = Object.assign({}, this.timezone, { description: this.description });
          const id = Number(this.$route.params['id']);

          await http.put(`api/clock/${id}`, values);
          this.$modal.hide('update');
        } catch({ message }) {
          console.log(message); // TODO notification
        }
      },
      getClock(clocks) {
        const id = Number(this.$route.params['id']);
        const clock =  clocks.filter(clock => clock.id === id)[0];

        if (clock) {
          const { timezone, offset } = clock;

          this.description = clock.description;
          this.timezone = { timezone, offset };
        }

        return clock;
      },
    },
    mounted() {
      this.$modal.show('update');
    },
    watch: {
      clocks(value) {
        this.ownClocks = value;
      },
    },
    created() {
      this.fetchTimezones();
    }
  }
</script>

<style scoped>
  .modal {
    padding: 30px;
  }
  .select {
    width: 350px;
  }
</style>
