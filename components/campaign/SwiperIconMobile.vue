<template>
  <div class="icon-box">
    <div class="index-icon">
      <div class="swiper-wrapper">
        <div
          v-for="(icon, idx) in icons"
          :key="icon.id"
          class="swiper-slide"
          :class="{'d-none': idx > 8}"
        >
          <div class="item">
            <!-- if Function_IsActive == 0,  <a> class add 'disable'-->
            <a :href="icon.url" :target="'_'+ icon.target">
              <div class="img-box">
                <img :src="icon.img" :alt="icon.name">
              </div>
              {{ icon.name }}
            </a>
          </div>
        </div>
        <div class="swiper-slide">
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
  font-size: medium;
  background: #ffffff;
  box-shadow: 0px 2px 7px -1px rgba(147, 137, 117, 0.2);
  border-radius: 30px;
  padding: 1em 1.5em;
  margin: 0;
  .swiper-container {
    background-color: #fff;
    border-radius: 10px;
    padding: 0;
    //border: 1px solid #b0b0b0;
  }
  .swiper-wrapper {
    flex-wrap: wrap;
  }
  .swiper-slide {
    width: 20%;
    text-align: center;
    background: #fff;
    height: calc((100% - 30px) / 2);
    padding: 0.5em 0.5em;
    white-space: nowrap;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    img {
      width: auto;
      height: 3.2em;
    }
    a {
      color: #182b56;
      &.disable {
        color: gray;
        img {
          filter: grayscale(100%);
          opacity: 0.4;
        }
      }
    }
  }
  .swiper-button-next {
    top: 60%;
    right: 10px;
    width: 1.2em;
    height: 1.2em;
    border-radius: 50%;
    background-color: #fff;
  }
  .swiper-button-prev {
    top: 60%;
    left: 10px;
    width: 1.2em;
    height: 1.2em;
    border-radius: 50%;
    background-color: #fff;
  }
  .swiper-button-next:after,
  .swiper-button-prev:after {
    font-family: swiper-icons;
    font-size: 20px;
    text-transform: none !important;
    letter-spacing: 0;
    text-transform: none;
    font-variant: initial;
    color: #ff9d42;
  }
  // mobile
  @media (max-width: 767px) {
    font-size: small;
    border-radius: 30px;
    margin: 0 1em;
    .img-box {
      img {
        width: 48px;
        height: 48px;
      }
    }
  }
}
</style>
