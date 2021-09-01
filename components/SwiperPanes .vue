<template>
  <div class="tab-content w-100 pt-2">
    <!-- v-for  class: fade -->
    <div class="tab-pane" :class="panesTemplate">
      <!-- channel樣版 swiper -->
      <div
        v-swiper:mySwiper="swiperPanesOption"
        class="swiper-container"
      >
        <div class="swiper-wrapper">
          <div
            v-for="inside in panesData"
            :key="inside.Voucher_Code"
            class="swiper-slide"
          >
            <a class="products-item">
              <div class="products-content">
                <div class="products-img">
                  <div class="img-box">
                    <div
                      class="rwdimg-cover"
                      :style="{
                        backgroundImage: `url(${inside.Voucher_Image})`,
                      }"
                    />
                  </div>
                </div>
                <!-- 新聞 -->
                <div v-if="panesMode === 1" class="channel-content">
                  <p>
                    {{ inside.Voucher_ExtName }}
                  </p>
                </div>
                <!-- 優惠券 -->
                <div v-if="panesMode === 2" class="channel-content">
                  <p>{{ inside.Voucher_Title }}</p>
                  <small>{{ inside.Voucher_ExtName }}</small>
                </div>
                <!-- 優惠商品 -->
                <div v-if="panesMode === 3" class="channel-content">
                  <p>{{ inside.Voucher_ExtName }}</p>
                  <div class="spacialprice">
                    {{ formatter(inside.Voucher_SpecialPrice) }}
                  </div>
                  <div class="sellprice">
                    {{ formatter(inside.Voucher_SellPrice) }}
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div class="swiper-pagination" />
      </div>
      <div v-if="panesArrows" class="swiper-button-prev" />
      <div v-if="panesArrows" class="swiper-button-next" />
    </div>
  </div>
</template>

<script>
import { directive } from 'vue-awesome-swiper';

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
    /** 樣板模式 1:新聞 2:優惠券 3:商品 */
    panesMode: {
      type: Number,
      default: 1,
      required: true
    },
    /** swiper是否顯示左右分頁(true顯示,false隱藏)  */
    panesArrows: {
      type: Boolean,
      default: true,
      required: false
    }
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
  padding-top: .75em;
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

::v-deep .channel-template2-panes,
::v-deep .channel-template3-panes {
  position: relative;
  padding-left: 3em;
  padding-right: 3em;
  @media(max-width: 767px) {
    padding-left: .5em;
    padding-right: .5em;
  }
  .swiper-wrapper {
    padding-bottom: 3em;
  }
  .swiper-pagination {
    margin-bottom: 0.5em;
  }
  .swiper-button-prev,
  .swiper-button-next {
    bottom: 30%;
    margin-top: auto;
    z-index: 100;
    @media(max-width: 767px) {
      top: 0;
      bottom: 0;
    }
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
    @media(max-width: 767px) {
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
