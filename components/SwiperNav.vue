<template>
  <div v-swiper:mySwiper="swiperNavOption" class="nav-tabs-box" :class="template">
    <ul class="swiper-wrapper nav nav-tabs nav-swiper">
      <li
        v-for="nav in navData"
        :key="nav.UserDefine_Code"
        class="swiper-slide"
        @click="tabClick(nav.UserDefine_Code)"
      >
        <a :class="{'active':nav.UserDefine_Code === tabCheckNum }" class="tablist-link">{{ nav.UserDefine_Name }}</a>
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
      tabCheckNum: this.navData[0].UserDefine_Code
    };
  },
  actions: {
    ...mapActions('activity', ['setNewsTab'])
  },
  methods: {
    /** 點擊tab時 */
    tabClick (userDefineCode) {
      this.tabCheckNum = userDefineCode;
      // this.$store.commit('activity/setNewTab', this.dataType, userDefineCode);
      this.$store.commit({
        type: 'activity/setNewTab',
        typeCode: this.dataType,
        code: userDefineCode
      });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
