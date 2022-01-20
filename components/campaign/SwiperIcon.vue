<template>
  <div class="icon-box">
    <div v-swiper:mySwiper="iconOption" class="index-icon">
      <div class="swiper-wrapper">
        <div
          v-for="icon in icons"
          :key="icon.id"
          class="swiper-slide"
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
      </div>
      <!-- Add Arrows -->
      <div v-if="iconArrows" class="swiper-button-next" />
      <div v-if="iconArrows" class="swiper-button-prev" />
    </div>
  </div>
</template>

<script>
import { directive } from 'vue-awesome-swiper';

export default {
  name: 'SwiperIcon',
  directives: {
    swiper: directive
  },
  props: {
    /** swiper初始選項 */
    iconOption: {
      type: Object,
      required: true
    },
    /** 服務icon資料 */
    icons: {
      type: Array,
      required: true
    },
    /** swiper是否顯示箭頭分頁(true顯示,false隱藏) */
    iconArrows: {
      type: Boolean,
      default: true,
      required: false
    }
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
  .swiper-container {
    background-color: #fff;
    border-radius: 10px;
    padding: 0;
  }
  .swiper-wrapper {
    display: -moz-inline-box;
    display: -webkit-inline-box;
  }
  .swiper-slide {
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
    color: $default-color;
  }
  // mobile
  @media (max-width: 767px) {
    font-size: small;
    border-radius: 30px;
    margin: 0 1em;
    .img-box {
      img {
        width: $imgbox-img;
        height: $imgbox-img;
      }
    }
  }
}
</style>
