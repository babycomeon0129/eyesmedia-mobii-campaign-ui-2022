<template>
  <div v-swiper:mySwiper="swiperNavOption" class="nav-tabs-box" :class="template">
    <ul class="swiper-wrapper nav nav-tabs nav-swiper">
      <li
        v-for="(nav, index) in navData"
        :key="nav.id"
        class="swiper-slide"
        @click="tabClick(nav.id, index)"
      >
        <!-- active -->
        <a :class="{'active':nav.id === tabId }" class="tablist-link">{{ nav.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { directive } from 'vue-awesome-swiper';
import { mapActions } from 'vuex';

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
    /** Css樣版 */
    template: {
      type: String,
      default: '',
      required: false
    },
    /** 資料類型 card:卡片 voucher:優惠券 product:商品 */
    dataType: {
      type: String,
      default: '',
      required: true
    }
  },
  data () {
    return {
      /** 點選Tab狀態 */
      tabId: this.navData[0].id
    };
  },
  actions: {
    ...mapActions('campaign', ['setNewsTab'])
  },
  methods: {
    /** 點擊tab時 */
    tabClick (id, idx) {
      this.tabId = id;
      console.log(this.tabId, idx);
      this.$store.commit({
        type: 'campaign/setTabIndex',
        typeCode: 'product',
        index: idx
      });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
