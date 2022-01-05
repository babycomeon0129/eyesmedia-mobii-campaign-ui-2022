<template>
  <div class="tab-content w-100 pt-2">
    <!-- v-for  class: fade -->
    <div class="tab-pane" :class="panesTemplate">
      <!-- channel樣版 swiper -->
      <div v-swiper:mySwiper="swiperPanesOption">
        <div class="swiper-wrapper">
          <div
            v-for="inside in panesData"
            :key="inside.id"
            class="swiper-slide"
          >
            <a class="products-item" :href="inside.url" :target="'_' + inside.target">
              <div class="products-content">
                <div class="products-img">
                  <div class="img-box">
                    <!-- 除了商店以外的模板圖片抓大圖 -->
                    <div
                      v-if="panesMode !== 'store'"
                      v-lazy:background-image="inside.img === null ? defaultbkimg : inside.img"
                      class="rwdimg-cover"
                    />
                    <!-- 商店模板圖片抓logo -->
                    <div
                      v-if="panesMode === 'store'"
                      v-lazy:background-image="inside.logo === null ? defaultlogo : inside.logo"
                      class="rwdimg-cover contain"
                    />
                  </div>
                </div>
                <!-- 新聞 -->
                <div v-if="panesMode === 'card'" class="channel-content">
                  <p>
                    {{ inside.name }}
                  </p>
                </div>
                <!-- 優惠券 -->
                <div v-if="panesMode === 'voucher'" class="channel-content">
                  <p>{{ inside.title }}</p>
                  <small>{{ inside.name }}</small>
                </div>
                <!-- 優惠商品 -->
                <div v-if="panesMode === 'product'" class="channel-content">
                  <p>{{ inside.name }}</p>
                  <div v-show="inside.specialPrice > 0" class="spacialprice">
                    {{ formatter(inside.price) }}
                  </div>
                  <div class="sellprice">
                    {{ inside.specialPrice > 0 ? formatter(inside.specialPrice) : formatter(inside.price) }}
                  </div>
                </div>
                <!-- 專屬商店 -->
                <div v-if="panesMode === 'store'" class="channel-content">
                  <p>{{ inside.name }}</p>
                  <div class="storetype">
                    <i v-if="inside.type === '線上店'" class="material-icons">language</i> <i v-if="inside.type === '實體店'" class="material-icons">place</i>{{ inside.type }}
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets" />
        <div v-if="panesArrows" class="swiper-button-prev" />
        <div v-if="panesArrows" class="swiper-button-next" />
      </div>
    </div>
  </div>
</template>

<script>
// 商店模板預設logo
import { directive } from 'vue-awesome-swiper';
// 商店模板預設背景圖
import defaultbkimg from '@/static/images/campaign/voucher_defaultbkimg.png';
// 商店模板預設logo
import defaultlogo from '@/static/images/campaign/voucher_defaultlogo.png';

export default {
  name: 'SwiperPanes',
  directives: {
    swiper: directive
  },
  props: {
    /** swiper Option設定 */
    swiperPanesOption: {
      type: Object,
      required: true
    },
    /** 資料源  */
    panesData: {
      type: Array,
      required: true
    },
    /** 樣版 */
    panesTemplate: {
      type: String,
      default: '',
      required: false
    },
    /** 樣板模式 card:卡片 voucher:優惠券 product:商品 */
    panesMode: {
      type: String,
      default: '',
      required: true
    },
    /** swiper是否顯示左右分頁(true顯示,false隱藏)  */
    panesArrows: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  data () {
    return {
      defaultlogo,
      defaultbkimg
    };
  },
  methods: {
    /** 數字轉台幣 */
    formatter (num) {
      const formatter = new Intl.NumberFormat('zh-Hant-TW', {
        /** decimal：純數字 currency：貨幣 percent：百分比 unit：單位 */
        style: 'currency',
        currency: 'TWD',
        minimumFractionDigits: 0
      });
      return formatter.format(num);
    }
  }
};
</script>

<style lang="scss" scoped>
.tab-content {
  padding-top: 0.75em;
  // min-height: 165px;
  @media (max-width: 767px) {
    // min-height: 230px;
    padding-top: 0.25em;
  }
  // @media (max-width: 480px) {
  //   min-height: -webkit-fill-available;
  // }
  // @media (min-width: 768px) {
  //   min-height: 230px;
  // }
}

/** 專屬新聞 */
.channel-template1-panes {
  .swiper-pagination,
  .swiper-button-prev,
  .swiper-button-next {
    display: none;
  }
  .products-content {
    position: relative;
    border-radius: 0.5em;
    overflow: hidden;
    .channel-content {
      width: 100%;
      height: 4em;
      position: absolute;
      bottom: 0;
      padding: 0.25em 0.5em;
      font-size: smaller;
      font-weight: 700;
      text-align: left;
      color: white;
      background: linear-gradient(transparent, #000);
      p {
        width: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        line-height: 1.5;
        padding-top: 5px;
      }
    }
  }
}

/** 專屬優惠券 */
.channel-template2-panes {
  .channel-content {
    p,
    small {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      display: -webkit-box;
      line-height: 1.2em;
      text-align: left;
      margin: 0.25em 0.5em;
    }
    p {
      color: #ffb26b;
      font-size: small;
      font-weight: 700;
    }
    small {
      color: #717171;
      font-size: smaller;
    }
  }
}

/** 專屬商品 */
.channel-template3-panes {
  .channel-content {
    p,
    .spacialprice,
    .sellprice {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      display: -webkit-box;
      line-height: 1.2em;
      text-align: left;
      margin: 0.25em 0.5em;
    }
    p {
      color: #717171;
      font-size: small;
      font-weight: 700;
    }
    .spacialprice {
      color: #c4c4c4;
      text-decoration: line-through;
      font-size: 0.7em;
      height: 1.2em;
    }
    .sellprice {
      color: #ffb26b;
      font-size: small;
      font-weight: 700;
    }
  }
}
/** 專屬商店 */
.channel-template4-panes {
  .channel-content {
    text-align: left;
    p {
      color: #FF9D42;
      font-size: small;
      font-weight: 700;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .storetype {
      color: #717171;
      font-size: xx-small;
      padding: .3em 0;
      i {
        color: #FF9D42;
        font-size: medium;
        vertical-align: bottom;
        margin-bottom: 1px;
      }
    }
  }
}

::v-deep .channel-template2-panes,
::v-deep .channel-template3-panes,
::v-deep .channel-template4-panes {
  position: relative;
  padding-left: 0.5em;
  padding-right: 0.5em;
  .swiper-wrapper {
    padding-bottom: 3em;
  }
  .swiper-pagination {
    margin-bottom: 0.5em;
  }
  .swiper-button-prev,
  .swiper-button-next {
    top: 0;
    bottom: 0;
    margin-top: auto;
    z-index: 100;
  }
  .swiper-button-next {
    right: 1%;
  }
  .swiper-button-prev::after,
  .swiper-button-next::after {
    padding-top: 4px;
    width: 1.75em;
    height: 1.75em;
    font-size: medium;
    color: #ffb26b;
    background-color: white;
    border-radius: 50%;
    border: 1px solid #ffb26b;
    @media (max-width: 767px) {
      font-size: small;
    }
  }
  .swiper-button-next::after {
    padding-left: 3px;
  }
  .swiper-button-prev::after {
    padding-right: 3px;
  }
  .swiper-container-horizontal > .swiper-pagination-bullets,
  .swiper-pagination-custom,
  .swiper-pagination-fraction {
    bottom: 0;
  }
  .swiper-container-horizontal
    > .swiper-pagination-bullets
    .swiper-pagination-bullet {
    margin: 0 2px;
  }
  .swiper-pagination-bullet {
    width: 6px;
    height: 6px;
    opacity: 1;
    background: #dadada;
    &-active {
      background-color: #ffb26b;
    }
  }
  .rwdimg-cover {
    border-top-left-radius: 0.5em;
    border-top-right-radius: 0.5em;
  }
}
</style>
