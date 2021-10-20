<template>
  <div v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
      <div v-for="banner in bannerImg" :key="banner.id" class="swiper-slide" :class="slideClass">
        <a :class="aClass" :href="banner.url" :target="'_' + banner.target">
          <div
            :class="contBackground"
            :style="{ backgroundImage: `url(${banner.img})` }"
          />
        </a>
      </div>
    </div>
    <!-- Add Pagination -->
    <div v-if="pagination" class="swiper-pagination" />
    <!-- Add Arrows -->
    <div v-if="arrows" class="swiper-button-next" />
    <div v-if="arrows" class="swiper-button-prev" />
  </div>
</template>

<script>
import { directive } from 'vue-awesome-swiper';

export default {
  name: 'SwiperBanner',
  directives: {
    swiper: directive
  },
  props: {
    /** swiper初始選項 */
    swiperOption: {
      type: Object,
      required: true
    },
    /** 圖片 */
    bannerImg: {
      type: Array,
      required: true
    },
    /** swiper <swiper-slide> class設定 */
    slideClass: {
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
    /** swiper是否顯示左右分頁(true顯示,false隱藏)  */
    arrows: {
      type: Boolean,
      default: true,
      required: false
    },
    /** swiper是否顯示點點分頁(true顯示,false隱藏) */
    pagination: {
      type: Boolean,
      default: true,
      required: false
    },
    /** swiper顯示圖片還是顯示背景圖片(true顯示圖片,false隱藏而顯示背景圖片,與contImg擇一使用) */
    contImg: {
      type: Boolean,
      required: true
    },
    /** 圖片為背景圖片時，<div> 所需的class */
    contBackground: {
      type: String,
      default: '',
      required: false
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
