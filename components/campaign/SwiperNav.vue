<template>
  <div v-swiper:mySwiper="swiperNavOption" class="nav-tabs-box" :class="template">
    <ul class="swiper-wrapper nav nav-tabs nav-swiper">
      <li
        v-for="nav in navData"
        :key="nav.id"
        class="swiper-slide"
        @click="tabClick(nav.id)"
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
    /** 資料類型 */
    dataType: {
      type: Number,
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
    tabClick (id) {
      this.tabId = id;
      // this.$store.commit('campaign/setNewTab', this.dataType, userDefineCode);
      // this.$store.commit({
      //   type: 'campaign/setNewTab',
      //   typeCode: this.dataType,
      //   code: userDefineCode
      // });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
