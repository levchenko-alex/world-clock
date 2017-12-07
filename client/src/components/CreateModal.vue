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
      <textarea
        v-focus
        name="description"
        cols="30"
        v-model="description"
        rows="10"
        v-validate="rules"
      >
        {{ description }}
      </textarea>
      <p v-show="errors.has('description')" class="help is-danger">{{ errors.first('description') }}</p>
      <br><button @click="onClose">Cancel</button>
      <br><button @click="onSubmit">Submit</button>
    </div>
  </modal>
</template>

<script>
  import vSelect from 'vue-select'
  import { mapGetters, mapActions } from 'vuex';
  import http from '@/utils/http';
  import { focus } from "@/utils/directives";
  import { descriptionsRules } from "@/utils/validation_config";

  export default {
    components: { vSelect },
    directives: { focus },
    name: "create-modal",
    data() {
      return {
        isSubmit: true,
        timezone: null,
        description: '',
        rules: descriptionsRules,
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
          if (this.errors.has('description')) {
            console.log('error');
            return;
          }
          const values = Object.assign({}, this.timezone, { description: this.description } );
          console.log('succ');
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
