<template>
  <div class="default-banner container">
    <div v-swiper:mySwiper="BannerOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img src="../assets/image/default-banner.png" class="rwdimgmax">
        </div>
        <div class="swiper-slide">
          <img src="../assets/image/default-banner.png" class="rwdimgmax">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { directive } from 'vue-awesome-swiper';

export default {
  name: 'DefualeBanner',
  directives: {
    swiper: directive
  },
  props: {
    slidesPerView: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      BannerOption: {
        slidesPerView: this.slidesPerView,
        spaceBetween: 10,
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        }
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.default-banner {
  &.container {
    padding: 0;
  }
}
</style>
