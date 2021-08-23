<template>
  <div class="home">
    <nuxt-link :to="'/gui'" no-prefetch>
      前往gui頁
    </nuxt-link>
    <button type="button" class="submit-button icon-ic_send">
      測試GTM
    </button>
    <ActivityHeader />
    <DefualeBanner :slides-per-view="1" />
    <!-- 電腦版ICON -->
    <div v-swiper="swiperOption" class="w-5/6 ml-auto relative index-icon hide-m hide-p container" :loadtheme="false">
      <div class="swiper-wrapper">
        <div class="swiper-slide index-icon-item">
          <!-- Render original HTML in server, render Swiper in browser (client) -->
          <img src="../assets/image/coffee.svg">
          <p>健康</p>
        </div>
        <div class="swiper-slide index-icon-item">
          <img src="../assets/image/feet.svg">
          <p>健康</p>
        </div>
        <div class="swiper-slide index-icon-item">
          <img src="../assets/image/femalebag.svg">
          <p>品酒去</p>
        </div>
        <div class="swiper-slide index-icon-item">
          <img src="../assets/image/health.png">
          <p>跨境購物</p>
        </div>
        <div class="swiper-slide index-icon-item">
          <img src="../assets/image/nightlife.svg">
          <p>品茗城</p>
        </div>
        <div class="swiper-slide index-icon-item">
          <img src="../assets/image/shopping.svg">
          <p>旅遊</p>
        </div>
        <div class="swiper-slide index-icon-item">
          <img src="../assets/image/tea.svg">
          <p>品咖啡</p>
        </div>
        <div class="swiper-slide index-icon-item">
          <img src="../assets/image/tour.svg">
          <p>限時特賣</p>
        </div>
        <div class="swiper-slide index-icon-item">
          <img src="../assets/image/transport.svg">
          <p>交通</p>
        </div>
      </div>
      <div id="swiper-button-prev" slot="button-prev" class="ctrl-btn prev">
        <img src="../assets/image/btn-prev.png">
      </div>
      <div id="swiper-button-next" slot="button-next" class="ctrl-btn next">
        <img src="../assets/image/btn-next.png">
      </div>
    </div>
    <!-- 手機、IPAD版ICON -->
    <div class="container mobile-icon">
      <div class="index-icon hide-ds hide-d">
        <div class="index-icon-item">
          <img src="../assets/image/feet.svg">
          <p>健康</p>
        </div>
        <div class="index-icon-item">
          <img src="../assets/image/feet.svg">
          <p>健康</p>
        </div>
        <div class="index-icon-item">
          <img src="../assets/image/feet.svg">
          <p>健康</p>
        </div>
        <div class="index-icon-item">
          <img src="../assets/image/feet.svg">
          <p>健康</p>
        </div>
        <div class="index-icon-item">
          <img src="../assets/image/feet.svg">
          <p>健康</p>
        </div>
        <div class="index-icon-item">
          <img src="../assets/image/feet.svg">
          <p>健康</p>
        </div>
        <div class="index-icon-item">
          <img src="../assets/image/feet.svg">
          <p>健康</p>
        </div>
        <div class="index-icon-item">
          <img src="../assets/image/feet.svg">
          <p>健康</p>
        </div>
        <div class="index-icon-item">
          <img src="../assets/image/feet.svg">
          <p>健康</p>
        </div>
        <div class="index-icon-item">
          <img src="../assets/image/feet.svg">
          <p>健康</p>
        </div>
      </div>
    </div>
    <div class="container">
      <div v-swiper:mySwiper="Banner2swiperOption">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="../assets/image/adimg.png" class="rwdimg">
          </div>
          <div class="swiper-slide">
            <img src="../assets/image/adimg.png" class="rwdimg">
          </div>
        </div>
      </div>
    </div>
    <div class="block">
      <span class="demonstration">來Call SIT API 看看吧</span>
      <ul>
        <li v-for="item in testData.List_NewFunction" :key="item.CategaryCode">
          {{ item.CategaryName }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { directive } from 'vue-awesome-swiper';

export default {
  name: 'Index',
  directives: {
    swiper: directive
  },
  middleware (context) {
    context.$gtm.push({ event: 'sit網站瀏覽' });
  },
  async asyncData (context) {
    // console.log('context', context);
    const headers = {
      'Content-Type': 'application/json',
      xEyes_Command: '1110',
      xEyes_X: '',
      xEyes_Y: '',
      xEyes_DeviceType: '0',
      xEyes_CustomerInfo: '',
      xEyes_DeviceCode: ''
    };
    const request = {
      User_Code: 'qnWcdVmhuDtFPtZtczybJQ%3d%3d'
    };
    const apiData = await context.$axios.post('https://sit-afpapi.mobii.ai/api/Home', { Data: JSON.stringify(request) }, { headers });
    const resData = JSON.parse(apiData.data.Data);
    return {
      testData: resData,
      env: context.env.SIDE_ENV
    };
  },
  data () {
    return {
      cHeight: '0px',
      banners: ['coffee.svg', 'feet.svg', 'femalebag.svg', 'health.png', 'nightlife.svg', 'shopping.svg', 'tea.svg', 'tour.svg', 'transport.svg'],
      swiperOption: {
        slidesPerView: 9,
        spaceBetween: 0,
        slidesPerGroup: 3,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '#swiper-button-next',
          prevEl: '#swiper-button-prev'
        },
        breakpoints: {
          1024: {
            slidesPerView: 9,
            spaceBetween: 0
          }
        }
      },
      Banner2swiperOption: {
        slidesPerView: 1.1,
        spaceBetween: 10,
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        }
      }
    };
  },
  head () {
    return {
      title: 'mobii 活動模組 測試頁'
    };
  },
  created () {
    console.log('language >>>> ', this.$cookies.get('language'));
  },
  mounted () {
    this.cHeight = window.innerWidth > 767 ? '490px' : '200px';
    window.onresize = () => {
      this.cHeight = window.innerWidth > 767 ? '490px' : '168px';
    };
  }
};
</script>

<style lang="scss" scoped>

.home {
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: center;
  ::v-deep .el-carousel__button {
    // 修改element ui css
    height: 4px;
    border-radius: 99px;
    background-color:#DADADA;
  }
  ::v-deep .is-active {
    .el-carousel__button {
    // 修改element ui css
     background-color:#FFB26B;
    }
  }
  &.container{
    padding: 0;
  }
}

.index-icon {
  background: #fff;
  box-shadow: 0px 2px 7px -1px rgba(147, 137, 117, 0.2);
  border-radius: 50px;
  padding: 2em 0;
  margin-top: -50px;
  .ctrl-btn {
    position:  absolute;
    top: 45%;
    &.prev {
      left: 0;
    }
    &.next {
      right: 0;
    }
  }
}

.mobile-icon {
  margin-top: -20px;
  .index-icon {
    display: flex;
    justify-content: center;
    width: 100%;
    flex-wrap: wrap;
    padding: 2em 1em;
    .index-icon-item{
      width: 20%;
    }
  }
}

.index-icon-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    img {
      max-width: 100%;
    }
    p {
    color: #13334C;
    margin: 0;
    line-height: 200%;
  }
  }

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

</style>
