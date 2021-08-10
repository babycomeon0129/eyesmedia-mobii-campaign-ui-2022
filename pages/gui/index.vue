<template>
  <div>
    <nuxt-link :to="'/'" no-prefetch>前往首頁</nuxt-link>
    <button type="button" class="submit-button icon-ic_send">借用測試GTM</button>
    <br><br><br>
    gui
  </div>
</template>

<script>
export default {
  name: 'gui',
  middleware (context) {},
  head () {
    return {
      title: 'GUI'
    };
  },
  components: {},
  data () {
    return {};
  }
};
</script>
