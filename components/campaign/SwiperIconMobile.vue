<template>
  <div class="icon-box">
    <div class="index-icon">
      <div class="swiper-wrapper">
        <div
          v-for="(icon, idx) in icons"
          :key="icon.id"
          :class="['swiper-slide', {'d-none': icons.length > 10 && idx > 8}]"
        >
          <div class="item">
            <!-- if Function_IsActive == 0,  <a> class add 'disable'-->
            <a :href="icon.url" :target="'_' + icon.target">

              <div class="img-box">
                <img v-lazy="icon.img" :alt="icon.name">
              </div>
              {{ icon.name }}
            </a>
          </div>
        </div>
        <div v-if="icons.length > 10" class="swiper-slide">
          <a @click="setDrawerOpen(true)">
            <div class="img-box">
              <img
                src="@/static/images/campaign/icon/category3_more.png"
                alt="more"
              >
            </div>
            <p>更多服務</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { directive } from 'vue-awesome-swiper';

export default {
  name: 'SwiperIconMobile',
  directives: {
    swiper: directive
  },
  props: {
    /** 服務icon資料 */
    icons: {
      type: Array,
      required: true
    }
  },
  methods: {
    ...mapMutations('campaign', {
      setDrawerOpen: 'setDrawerOpen'
    })
  }
};
</script>

<style lang="scss" scoped>
.icon-box {
  position: relative;
  font-size: $default-txt-size;
  background: #fff;
  box-shadow: 0px 2px 7px -1px rgba(147, 137, 117, 0.2);
  border-radius: 30px;
  padding: 1em 1.5em;
  margin: 0;
  font-size: small;
  border-radius: 30px;
  margin: 0 1em;
  .img-box {
    img {
      width: $imgbox-img;
      height: $imgbox-img;
    }
  }
  .swiper-wrapper {
    flex-wrap: wrap;
  }
  .swiper-slide {
    width: 20%;
    background: #fff;
    padding: 0.5em 0.5em;
    white-space: nowrap;
    img {
      width: auto;
      height: 3.2em;
    }
    a {
      color: $alink-color;
      &.disable {
        color: gray;
        img {
          filter: grayscale(100%);
          opacity: 0.4;
        }
      }
    }
  }
}
</style>
