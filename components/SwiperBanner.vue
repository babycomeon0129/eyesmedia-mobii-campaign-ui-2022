<template>
  <div v-swiper:mySwiper="BannerOption">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <a>
          <div
            class="rwdimg-cover"
            :style="{ backgroundImage: `url(${bannerImg})` }"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { directive } from 'vue-awesome-swiper';
import backgroundUrl from '@/assets/image/default-banner.png';

export default {
  name: 'SwiperBanner',
  directives: {
    swiper: directive
  },
  props: {
    /** 一次輪播機張 */
    slidesPerView: {
      type: Number,
      default: 1,
      required: false
    },
    /** 圖片 */
    bannerImg: {
      type: String,
      required: true
    },
    /** swiper <swiper-slide> class設定 */
    swiperClass: {
      type: String,
      default: '',
      required: false
    },
    /** swiper <a> class設定 */
    aClass: {
      type: String,
      default: '',
      required: false
    },
    /** swiper初始選項 */
    swiperOption: {
      type: String,
      default: '',
      required: false
    }
  },
  data () {
    return {
      backgroundUrl,
      BannerOption: {
        slidesPerView: this.slidesPerView,
        spaceBetween: 10,
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
        // ,
        // autoplay: {
        //   delay: 3000,
        //   disableOnInteraction: false
        // }
      }
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
