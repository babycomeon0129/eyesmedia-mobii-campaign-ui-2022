import Vue from 'vue';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import SwiperCore, { Autoplay, EffectCube, Pagination, Navigation } from 'swiper';

Vue.use(VueAwesomeSwiper);
SwiperCore.use([Autoplay, EffectCube, Pagination, Navigation]);
