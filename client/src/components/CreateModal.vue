<template>
  <modal
    class="pure-u-1"
    height="auto"
    name="create"
    @closed="onCloseEvent"
    :clickToClose="false"
  >
    <div class="modal">
      <div class="pure-u-1">
        <h1>Create clock</h1>
      </div>
      <div class="pure-u-1">
        <v-select
          label="timezone"
          placeholder="Select timezone..."
          :options="timezones"
          v-model="timezone"
          class="select"
        >
        </v-select>
      </div>
      <div class="pure-u-1">
        <textarea
          v-focus
          name="description"
          v-model="description"
          v-validate="rules"
        >
        {{ description }}
        </textarea>
        <p class="help is-danger">{{ errors.first('description') }}</p>
      </div>
      <div class="pure-control-group">
        <button class="pure-button pure-button-primary" @click="onSubmit">Submit</button>
        <button class="pure-button pure-button-primary" @click="onClose">Cancel</button>
      </div>
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
        if (this.errors.has('description')) {
          return;
        }

        try {
          const values = Object.assign({}, this.timezone, { description: this.description } );
          await http.post('api/clock', values);

          this.$modal.hide('create');
        } catch({ message }) {
          this.$notify({
            group: 'app',
            title: 'Error',
            type: 'error',
            text: message,
          });
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
