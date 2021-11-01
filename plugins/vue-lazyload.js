import Vue from 'vue';
import VueLazyLoad from 'vue-lazyload';
Vue.use(VueLazyLoad, {
  preload: 1,
  // error: '../images/common/loading.jpg',
  // loading: '../images/common/loading.jpg',
  attempt: 1
});
