<template>
  <div class="waterfall">
    <!-- 商品模板 -->
    <div v-if="waterFallType === 'PRODUCT'" class="row product">
      <div v-for="inside in waterFallList" :key="inside.id" class="col-3 col-m6">
        <a :href="inside.url" :target="'_' + inside.target">
          <div class="block">
            <div class="products-img">
              <div v-lazy:background-image="inside.img" class="rwdimg-cover" />
            </div>
            <div class="products-content">
              <p>{{ inside.name }}</p>
              <div v-show="inside.specialPrice > 0" class="spacialprice">
                {{ formatter(inside.price) }}
              </div>
              <div
                class="sellprice"
              >
                {{ inside.specialPrice > 0 ? formatter(inside.specialPrice) : formatter(inside.price) }}
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
    <!-- 優惠券模板 -->
    <div v-if="waterFallType === 'VOUCHER'" class="row voucher">
      <div v-for="inside in waterFallList" :key="inside.id" class="col-6 col-m12">
        <div class="row block">
          <div class="col-4 col-30">
            <div v-lazy:background-image="inside.img" class="rwdimg-cover" />
          </div>
          <div class="col-8 col-31 voucher-content">
            <span>{{ inside.storeType }}</span>
            <p class="col-8">
              {{ inside.storeName }}
            </p>
            <h4>{{ inside.name }}</h4>
            <div class="row voucher-content2">
              <div class="col-8">
                <div class="row">
                  <div class="col-3 col-d4 col-30 voucher-type">
                    <i v-if="inside.type === '購物'" class="material-icons">local_mall</i>
                    <i v-if="inside.type === '美食'" class="material-icons">fastfood</i>
                    <i v-if="inside.type === '景點'" class="material-icons">hiking</i>
                    <i v-if="inside.type === '醫療'" class="material-icons">medication</i>
                    <i v-if="inside.type === '遊樂'" class="material-icons">sports_esports</i>
                    <i v-if="inside.type === '住宿'" class="material-icons">local_hotel</i>
                    {{ inside.type }}
                  </div>
                  <div v-if="inside.mPoint > 0" class="col-9 col-d8 col-31 mpoint">
                    <img src="@/static/images/campaign/icon/mpoint.png"> {{ decimalFormatter(inside.mPoint) }}
                  </div>
                </div>
                <div class="col-12 date">
                  {{ inside.endDate }}截止
                </div>
              </div>
              <div class="col-4">
                <a class="btn exchange" :href="inside.url" target="_blank">兌換</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 商店模板 -->
    <div v-if="waterFallType === 'STORE'" class="row store">
      <div v-for="inside in waterFallList" :key="inside.id" class="col-3 col-m6">
        <a class="block" :href="inside.url" :target="'_' + inside.target">
          <div class="store-img">
            <div v-lazy:background-image="inside.img === null ? defaultbkimg : inside.img" class="rwdimg-cover h72" />
          </div>
          <div class="store-content">
            <div class="store-logo">
              <div v-lazy:background-image="inside.logo === null ? defaultlogo : inside.logo " class="rwdimg-cover logoimg" />
            </div>
            <p>{{ inside.name }}</p>
            <div class="storetype">
              <i v-if="inside.type === '線上店'" class="material-icons">language</i>
              <i v-if="inside.type === '實體店'" class="material-icons">place</i>
              {{ inside.type }}
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
// 商店模板預設背景圖
import defaultbkimg from '@/static/images/campaign/voucher_defaultbkimg.png';
// 商店模板預設logo
import defaultlogo from '@/static/images/campaign/voucher_defaultlogo.png';

export default {
  name: 'WaterFall',
  props: {
    /** 資料源  */
    waterFallList: {
      type: Array,
      required: true
    },
    waterFallType: {
      type: String,
      default: 'STORE',
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
    },
    decimalFormatter (num) {
      const formatter = new Intl.NumberFormat('zh-Hant-TW', {
        /** decimal：純數字 currency：貨幣 percent：百分比 unit：單位 */
        style: 'decimal',
        minimumFractionDigits: 0
      });
      return formatter.format(num);
    }
  }
};
</script>

<style lang="scss" scoped>
.product {
  .block {
    border-radius: 13px;
    overflow: hidden;
    box-shadow: 0px 3px 10.5px -1.5px rgba(147, 137, 117, 0.2);
  }
  .col-3 {
    &:nth-child(4n+1) {
      padding: .7em 1.4em .7em 0;
    }
    &:nth-child(4n+2) {
      padding: .7em .931em .7em .469em;
    }
    &:nth-child(4n+3) {
      padding: .7em .469em .7em .931em;
    }
    &:nth-child(4n) {
      padding: .7em 0 .7em 1.4em;
    }
    @media screen and (max-width: 767px) {
      &:nth-child(odd) {
        padding: 1em .5em 1em 0;
      }
      &:nth-child(even) {
        padding: 1em 0 1em .5em;
      }
    }
  }

  .products-content {
    padding: .7em;
    text-align: left;
    background: #fff;
    p,
    .spacialprice,
    .sellprice {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      overflow:hidden;
      /*! autoprefixer: off */
      -webkit-box-orient: vertical;
      line-height: 1.2em;
      text-align: left;
      margin: 0.25em 0.5em;
    }
    p {
      font-size: small;
      color: #717171;
      font-weight: bold;
      min-height: 32px;
    }
    .spacialprice {
      color: #c4c4c4;
      text-decoration: line-through;
      font-size: 0.7em;
      height: 1.2em;
    }
    .sellprice {
      color: #FF4242;
      font-size: medium;
      font-weight: 700;
    }
  }
}

.voucher {
  .col-6 {
    &:nth-child(odd) {
        padding: .7em .5em .7em 0;
      }
    &:nth-child(even) {
        padding: .7em 0 .7em .5em;
    }
    @media screen and (max-width: 767px) {
      &:nth-child(odd),&:nth-child(even) {
        padding: .7em 0;
      }
    }
  }
  .block {
    align-items: stretch;
    box-shadow: 0px 2.6px 9px -1.3px rgba(147, 137, 117, 0.2);
    border-radius: 10px;
    overflow: hidden;
    background: #fff;
  }
  .voucher-content {
    position: relative;
    color: #717171;
    text-align: left;
    padding: .5em 0;
    font-size: small;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-around;
    @media screen and (max-width: 465px) {
      font-size: .5em;
    }
    h4 {
      font-size: medium;
      padding: .5em 0 0 .5em;
      margin: 0;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      color: #FF9D42;
      @media screen and (max-width: 768px) {
        font-size: 1.3em;
      }
    }
    p {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      padding-left: .7em;
      @media screen and (max-width: 465px) {
        padding-left: .5em;
      }
    }
    span {
      position: absolute;
      top:0;
      right: 10%;
      padding: 5px 8px;
      background: rgba(242, 242, 242, 0.7);
    }
  }
  .voucher-content2 {
    padding: .5em 0 0 0;
    @media screen and (max-width: 465px) {
      padding: .5em 0 0 0;
    }
    .col-4 {
      padding-right: 5px;
      @media screen and (max-width: 320px) {
        padding-right: 0;
      }
    }
  }
  .voucher-type {
    background: #FFBE5B;
    color: #fff;
    font-size: .1em;
    padding: 2px;
    text-align: center;
    vertical-align: middle;
    border-radius: 0px 4px 4px 0px;
    @media screen and (max-width: 320px) {
      text-align: center;
    }
    i {
      font-size: 8px;
      vertical-align: middle;
      margin-bottom: 3px;
    }
  }
  .mpoint {
    padding-left: 5px;
    img {
      margin-right: 3px;
      @media screen and (max-width: 360px) {
        width: 13px;
        margin-right: 0;
      }
    }
  }
  .exchange {
    border: 1px solid #FF9D42;
    color: #FF9D42;
    font-size: small;
    width: 100%;
    &:hover {
      background: #FF9D42;
      color: #fff;
    }
  }
  .date {
    padding: .5em 0 0 .5em;
    @media screen and (max-width: 960px) {
        padding: 3px 0 0 5px;
    }
  }
}

.store {
  .col-3 {
    &:nth-child(4n+1) {
      padding: .7em 1.4em .7em 0;
    }
    &:nth-child(4n+2) {
      padding: .7em .931em .7em .469em;
    }
    &:nth-child(4n+3) {
      padding: .7em .469em .7em .931em;
    }
    &:nth-child(4n) {
      padding: .7em 0 .7em 1.4em;
    }
    @media screen and (max-width: 767px) {
      &:nth-child(odd) {
        padding: 1em .5em 1em 0;
      }
      &:nth-child(even) {
        padding: 1em 0 1em .5em;
      }
    }
  }
  .block {
    box-shadow: 0px 2.6px 9px -1.3px rgba(147, 137, 117, 0.2);
    border-radius: 19px;
    overflow: hidden;
    background: #fff;
    display: block;
  }
  .store-content {
    position: relative;
    font-size: small;
    padding: 2em 1em 1em 1em;
    text-align: left;
    @media screen and (max-width: 767px) {
      padding: 3em 1em 1em 1em;
    }
    @media screen and (max-width: 480px) {
      padding: 2em 1em 1em 1em;
    }
    @media screen and (max-width: 320px) {
      padding: 1.5em 1em 1em 1em;
    }
    p {
      color: #FF9D42;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      display: -webkit-box;
      font-weight: 700;
    }
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
  .store-logo {
    width: 28%;
    overflow: hidden;
    border-radius: 50em;
    border: 3px solid #fff;
    position: absolute;
    top: -50%;
    left: 5%;
    @media screen and (max-width: 960px) {
      top: -30%
    }
    @media screen and (max-width: 767px) {
      width: 25%;
      top: -55%;
    }
    @media screen and (max-width: 660px) {
      top: -45%;
    }
    @media screen and (max-width: 480px) {
      top: -40%;
      width: 30%;
    }
    .logoimg {
      min-height: 0;
    }
  }
}

.btn {
  @media screen and (max-width: 460px) {
    padding: 3px 0;
  }
}

@media screen and (max-width: 360px) {
  .col-30 {
    width: 40%;
  }
  .col-31 {
    width: 60%;
  }
}
</style>
