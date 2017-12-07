<template>
  <div id="app">
    <router-view />
    <notifications class="notify" position="top center" group="app" />
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
  textarea {
    height: 200px;
    width: 100%;
    padding: 5px 0 0 5px;
    resize: none;
  }

  .is-danger {
    color: red;
  }

  .help {
    height: 30px;
  }

  .select {
    width: 350px;
    margin-bottom: 10px;
  }

  .modal {
    padding: 30px;
  }

  .notify {
    margin-top: 20px;
  }
</style>
