<template>
  <div v-swiper:mySwiper="swiperNavOption" class="nav-tabs-box" :class="template">
    <ul class="swiper-wrapper nav nav-tabs nav-swiper">
      <li v-for="nav in navData" :key="nav.UserDefine_Code" class="swiper-slide">
        <a :class="{'active':nav.UserDefine_Code === tabCheck }" class="tablist-link">{{ nav.UserDefine_Name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { directive } from 'vue-awesome-swiper';

export default {
  name: 'SwiperNav',
  directives: {
    swiper: directive
  },
  props: {
    /** swiper Option設定 */
    swiperNavOption: {
      type: Object,
      required: true
    },
    /** 資料源  */
    navData: {
      type: Array,
      required: true
    },
    /** 樣版 */
    template: {
      type: String,
      default: '',
      required: false
    }
  },
  data () {
    return {
      /** 點選Tab狀態 */
      tabCheck: this.navData[0].UserDefine_Code
    };
  }
};
</script>

<style lang="scss" scoped>

</style>
