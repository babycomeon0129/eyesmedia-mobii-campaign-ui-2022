<template>
  <div>
    <div v-swiper:mySwiper="NavTabOption" class="news">
      <ul class="swiper-wrapper">
        <li class="swiper-slide active">
          <a>天母美食</a>
        </li>
        <li class="swiper-slide">
          <a>國際時事</a>
        </li>
        <li class="swiper-slide">
          <a>疫情快報</a>
        </li>
        <li class="swiper-slide">
          <a>娛樂新聞</a>
        </li>
        <li class="swiper-slide">
          <a>健康資訊</a>
        </li>
        <li class="swiper-slide">
          <a>經濟快報</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { directive } from 'vue-awesome-swiper';

export default {
  name: 'ActivityNews',
  directives: {
    swiper: directive
  },
  data () {
    return {
      NavTabOption: {
        slidesPerView: 4.3,
        spaceBetween: 10,
        slidesPerGroup: 1,
        breakpoints: {
          570: {
            slidesPerView: 5.3,
            spaceBetween: 10
          },
          768: {
            slidesPerView: 6.3,
            spaceBetween: 10
          },
          1024: {
            slidesPerView: 8.3,
            spaceBetween: 10
          },
          on: {
            click () {
              this.slideTo(this.clickedIndex);
            }
          }
        }
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.news {
  background: #ffbe5b;
  border-radius: 8px 8px 0 0;
  ul {
    list-style: none;
    text-align: left;
    margin-bottom: 0;
    li {
      opacity: .9;
      padding: 5px 0;
      display: inline;
      font-size: medium;
      text-align: center;
      color: #fff;
      @media (max-width: 767px) {
        font-size: 16px;
      }
      &.active{
      opacity: 1;
      font-weight: 700;
      color: white;
      border-bottom: solid 3px white;
    }
    }
  }
}
</style>
