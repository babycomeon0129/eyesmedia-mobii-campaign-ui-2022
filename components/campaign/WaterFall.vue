<template>
  <div class="waterfall">
    <!-- 商品模板 -->
    <div v-if="waterFallType === 'PRODUCT'" class="row product">
      <div v-for="inside in waterFallList" :key="inside.id" class="col-3 col-m6">
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
      </div>
    </div>
    <!-- 優惠券模板 -->
    <div v-if="waterFallType === 'VOUCHER'" class="row voucher">
      <div v-for="inside in waterFallList" :key="inside.id" class="col-6">
        <div class="row block">
          <div class="col-4">
            <div v-lazy:background-image="inside.img" class="rwdimg-cover" />
          </div>
          <div class="col-8 voucher-content">
            <span>線上店</span>
            內容
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

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
      required: true
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
.product {
  .block {
    border-radius: 13px;
    overflow: hidden;
    box-shadow: 0px 3.01241px 10.5434px -1.50621px rgba(147, 137, 117, 0.2);
  }
  .col-3 {
    padding: .7em;
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
    padding: 0.7em;
  }
  .block {
    border: 1px red solid;
    box-shadow: 0px 2.58344px 9.04203px -1.29172px rgba(147, 137, 117, 0.2);
    border-radius: 10.3337px;
    overflow: hidden;
  }
  .voucher-content {
    position: relative;
    color: #717171;
    height: 100%;
    text-align: left;
    padding: 1em 0;
    span {
      position: absolute;
      top:0;
      right: 20%;
      background: rgba(242, 242, 242, 0.7);
      font-size: xx-small;
    }
  }
}
</style>
