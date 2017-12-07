<template>
  <modal
    height="auto"
    name="create"
    @closed="onCloseEvent"
    :clickToClose="false"
  >
    <div class="modal">
      <h1>Create clock</h1>
      <v-select
        label="timezone"
        placeholder="Select timezone..."
        :options="timezones"
        v-model="timezone"
        class="select"
      >
      </v-select>
      <textarea cols="30" v-model="description" rows="10">{{ description }}</textarea>
      <button @click="onClose">Cancel</button>
      <button @click="onSubmit">Submit</button>
    </div>
  </modal>
</template>

<script>
  import vSelect from 'vue-select'
  import { mapGetters, mapActions } from 'vuex';
  import http from '@/http';

  export default {
    components: { vSelect },
    name: "create-modal",
    data() {
      return {
        isSubmit: true,
        timezone: null,
        description: '',
      }
    },
    computed: {
      ...mapGetters([
        'timezones',
      ])
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
        this.$modal.hide('create');
      },
      async onSubmit() {
        try {
          const values = Object.assign({}, this.timezone, { description: this.description } );

          await http.post('api/clock', values);

          this.$modal.hide('create');
        } catch({ message }) {
          // TODO: notification
          console.log(message);
        }
      }
    },
    mounted() {
      this.$modal.show('create');
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
</style>
