<template>
  <div class="channel-wrap">
    <CampaignHeader :title-img="campainData.eventsVm.mktEventLogo" :login-url="env.mobii" :redirect-url="env.domain" />
    <main>
      <!-- 首頁大圖輪播 -->
      <div class="top-banner">
        <SwiperBanner
          :swiper-option="topBannerOption"
          :banner-img="campainData.banners"
          :pagination="false"
          :arrows="false"
          :cont-img="false"
          :cont-background="'rwdimg-cover h55'"
        />
      </div>
      <!-- 服務icon -->
      <div class="channel-icon">
        <div class="for-pc">
          <SwiperIcon :icon-option="boxIconPC" :icons="campainData.icons" />
        </div>
        <div class="for-mobile">
          <SwiperIconMobile
            :icons="campainData.icons"
          />
        </div>
      </div>
      <!-- 偷偷埋版號 -->
      <div style="display: none;">
        version: {{ env.version }} | {{ env.updateTime }}
      </div>
      <!-- 中間大廣告 -->
      <div class="big-banner">
        <SwiperBanner
          :swiper-option="bigBannerOption"
          :banner-img="campainData.ads"
          :pagination="true"
          :arrows="false"
          :cont-img="false"
          :cont-background="'rwdimg-cover h37 border-radius5'"
        />
      </div>
      <!-- 專屬新聞 -->
      <section v-if="campainData.cardTabs.length > 0" class="channel-section">
        <h6>{{ campainData.cardBlockName }}</h6>
        <div class="channel-swiper-box">
          <SwiperNav
            :swiper-nav-option="boxTabs"
            :nav-data="campainData.cardTabs"
            :template="'channel-template1'"
            :data-type="'card'"
          />
          <SwiperPanes
            :swiper-panes-option="boxChannel1"
            :panes-mode="'card'"
            :panes-data="showCardTab"
            :panes-template="'channel-template1-panes'"
            :panes-arrows="false"
          />
        </div>
      </section>
      <!-- 專屬優惠券 -->
      <section v-if="campainData.voucherTabs.length > 0" class="channel-section">
        <h6>{{ campainData.voucherBlockName }}</h6>
        <div class="channel-swiper-box shadow">
          <SwiperNav
            :swiper-nav-option="boxTabs"
            :nav-data="campainData.voucherTabs"
            :template="'channel-template2'"
            :data-type="'voucher'"
          />
          <SwiperPanes
            :swiper-panes-option="boxChannel2"
            :panes-mode="'voucher'"
            :panes-data="showVoucherTab"
            :panes-template="'channel-template2-panes'"
            :panes-arrows="true"
          />
        </div>
      </section>
      <!-- 專屬優惠商品 -->
      <section v-if="campainData.productTabs.length > 0" class="channel-section">
        <h6>{{ campainData.productBlockName }}</h6>
        <div class="channel-swiper-box shadow">
          <SwiperNav
            :swiper-nav-option="boxTabs"
            :nav-data="campainData.productTabs"
            :template="'channel-template3'"
            :data-type="'product'"
          />
          <SwiperPanes
            :swiper-panes-option="boxChannel2"
            :panes-mode="'product'"
            :panes-data="showProductTab"
            :panes-template="'channel-template3-panes'"
            :panes-arrows="true"
          />
        </div>
      </section>
      <!-- 專屬商店 -->
      <section v-if="campainData.storeTabs.length > 0" class="channel-section">
        <h6>{{ campainData.storeBlockName }}</h6>
        <div class="channel-swiper-box shadow">
          <SwiperNav
            :swiper-nav-option="boxTabs"
            :nav-data="campainData.storeTabs"
            :template="'channel-template4'"
            :data-type="'store'"
          />
          <SwiperPanes
            :swiper-panes-option="boxChannel2"
            :panes-mode="'store'"
            :panes-data="showStoreTab"
            :panes-template="'channel-template4-panes'"
            :panes-arrows="true"
          />
        </div>
      </section>
      <!-- 瀑布流 -->
      <section class="channel-section">
        <h6>{{ campainData.waterfallBlockName }}</h6>
        <WaterFall
          v-infinite-scroll="loadMore"
          :infinite-scroll-distance="50"
          :infinite-scroll-throttle-delay="1000"
          :water-fall-list="campainData.waterfallItems"
          :water-fall-type="campainData.waterfallBlockType"
        />
        <!-- 瀑布流loading -->
        <i v-if="waterFallRequest.load" class="el-icon-loading" />
      </section>
      <!-- footer 注意事項 -->
      <footer class="channel-footer">
        <h6>{{ campainData.eventsVm.mktEventOtherTitle }}</h6>
        <div class="content" :class="{'active': !isOpenRead}">
          <!-- eslint-disable vue/no-v-html -->
          <div v-linkified v-html="campainData.eventsVm.mktEventOtehrContent" />
        </div>
        <a v-if="isOpenRead" @click="isOpenRead = false">〈繼續閱讀〉</a>
      </footer>
      <br>
      <!--div class="block">
        <button type="button" class="submit-button icon-ic_send">
          測試GTM
        </button>
      </div-->
    </main>
    <!-- 更多服務icon(滑頁) -->
    <el-drawer
      :visible.sync="drawerShow"
      :direction="'rtl'"
      :size="'100%'"
      :with-header="false"
    >
      <div class="more-icon-box">
        <div class="container">
          <div>
            <div class="head-top">
              <!-- 點擊帶queryParams控制父層class -->
              <button class="btn goBack2" @click="setDrawerOpen(false)">
                <i class="el-icon-arrow-left" /><span>返回</span>
              </button>
            </div>
            <div class="row">
              <a
                v-for="icon in campainData.icons"
                :key="icon.id"
                :target="'_' + icon.target"
                :href="icon.url"
                class="col"
              >
                <img v-lazy="icon.img">
                <p class="txt-line-clamp1">{{ icon.name }}</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </el-drawer>
    <!-- dialog -->
    <el-dialog
      title="請重新登入"
      :visible.sync="dialogVisible"
      :show-close="false"
    >
      <div class="col-12">
        登入失敗
      </div>
      <span slot="footer" class="dialog-footer">
        <button class="btn send col-12" @click="dialogVisible = false">我知道了</button>
      </span>
    </el-dialog>
    <GotopIcon />
    <JustkaIcon
      v-if="campainData.eventsVm.mktEventOtehrJustka !== null && campainData.eventsVm.mktEventOtehrJustka !== ''"
      :juska-url="`${campainData.eventsVm.mktEventOtehrJustka}&J_idToken=${idToken}`"
      :id-token="idToken"
      :login-url="env.mobii"
      :redirect-url="env.domain"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { directive } from 'vue-awesome-swiper';

export default {
  name: 'Campaign',
  directives: {
    swiper: directive
  },
  middleware (context) {
    context.$gtm.push({ event: `${context.env.SIDE_ENV.env}一頁式活動頁瀏覽` });
  },
  async asyncData (context) {
    /** 登入idToken */
    let idToken = context.$cookies.get('M_idToken') || null;
    // 如果傳參含M_idToken，整個頁面reflash
    let isReplace = false;
    if (context.query.M_idToken) {
      isReplace = true;
      // 更新idToken
      idToken = context.query.M_idToken;
      context.$cookies.set('M_idToken', context.query.M_idToken, {
        path: '/',
        domain: '.mobii.ai',
        sameSite: 'Lax',
        secure: true
      });
    }
    /** dialog 開關 */
    let dialogVisible = false;
    // 取回活動資料
    const callApi = await context.$axios.get(`${context.env.SIDE_ENV.apiPath}/events/detail/${context.params.eventId}`, {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    });
    // 判斷是否登入成功
    switch (callApi.data.errorCode) {
      // 登入成功
      case '996600001':
        context.store.commit('campaign/setLogin', true);
        // 如果idtoken跟cookie token不同，就更新cookie token
        if (callApi.data.idToken !== idToken) {
          context.$cookies.set('M_idToken', callApi.data.idToken, {
            path: '/',
            domain: '.mobii.ai',
            sameSite: 'Lax',
            secure: true
          });
        }
        break;
        // idToken 驗不過
      case '619820001':
        context.store.commit('campaign/setLogin', false);
        context.$cookies.remove('M_idToken', {
          path: '/',
          domain: '.mobii.ai',
          sameSite: 'Lax',
          secure: true
        });
        dialogVisible = true;
        break;
        // 未登入
      case '619820008':
        context.store.commit('campaign/setLogin', false);
        break;
    }
    const eventData = JSON.parse(callApi.data.data);
    context.store.commit({
      type: 'campaign/setNewTab',
      typeCode: 'card',
      data: eventData.cardTabs.map(data => data.items)
    });
    context.store.commit({
      type: 'campaign/setNewTab',
      typeCode: 'voucher',
      data: eventData.voucherTabs.map(data => data.vouchers)
    });
    context.store.commit({
      type: 'campaign/setNewTab',
      typeCode: 'product',
      data: eventData.productTabs.map(data => data.products)
    });
    context.store.commit({
      type: 'campaign/setNewTab',
      typeCode: 'store',
      data: eventData.storeTabs.map(data => data.stores)
    });
    return {
      params: context.params,
      /** 活動資料 */
      campainData: eventData,
      env: context.env.SIDE_ENV,
      /** 是否需要rePlace */
      isReplace,
      /** dialog開關 */
      dialogVisible,
      /** 登入token */
      idToken,
      /** 瀑布流request */
      waterFallRequest: {
        id: eventData.waterfallBlockId,
        load: false, // 瀑布流是否正在call api，前端用
        paginationInfo: {
          pageIndex: 1,
          pageSize: 20,
          totalPages: eventData.paginationInfo.totalPages,
          totalNumber: eventData.paginationInfo.totalNumber
        }
      }
    };
  },
  data () {
    return {
      /** 首頁Banner設定 */
      topBannerOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        slidesPerView: 1,
        spaceBetween: 0,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        }
      },
      /** 中間輪播Banner */
      bigBannerOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        slidesPerView: 1.2,
        spaceBetween: 10,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        }
      },
      /** 服務Icon（電腦版） */
      boxIconPC: {
        slidesPerView: 5,
        breakpoints: {
          768: {
            slidesPerView: 7
          },
          1024: {
            slidesPerView: 9
          }
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        loop: false
      },
      /** 服務Icon（手機版） */
      boxIcon: {
        spaceBetween: 0,
        slidesPerView: 5,
        slidesPerColumn: 2,
        slidesPerColumnFill: 'row',
        slidesPerGroup: 5,
        loop: false
      },
      /** 專屬新聞 tab swiper */
      boxTabs: {
        slidesPerView: 4.3,
        spaceBetween: 10,
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
          }
        },
        on: {
          click () {
            this.slideTo(this.clickedIndex);
          }
        }
      },
      /** 專屬新聞 panes swiper */
      boxChannel1: {
        slidesPerView: 2.5,
        spaceBetween: 10,
        breakpoints: {
          570: {
            slidesPerView: 3,
            spaceBetween: 10
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 10
          },
          1024: {
            slidesPerView: 5.5,
            spaceBetween: 10
          }
        },
        loop: false,
        observer: true,
        observeParents: true,
        preloadImages: true,
        updateOnImagesReady: true,
        on: {
          click () {
            this.slideTo(this.clickedIndex);
          }
        }
      },
      /** 專屬優惠券、商品 panes swiper */
      boxChannel2: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        slidesPerView: 3,
        spaceBetween: 10,
        breakpoints: {
          570: {
            slidesPerView: 3,
            spaceBetween: 10
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 10
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 10
          }
        },
        loop: false,
        observer: true,
        observeParents: true,
        preloadImages: true,
        updateOnImagesReady: true
      },
      /** 是否打開我的服務 */
      isOpenService: false,
      /** 是否啟用繼續閱讀 */
      isOpenRead: false
    };
  },
  head () {
    return {
      title: this.campainData.eventsVm.mktEventName,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description-HID',
          name: 'description',
          content: this.campainData.eventsVm.mktEventMetaDiscription
        },
        { name: 'keywords', content: this.campainData.eventsVm.mktEventSeo },
        { property: 'og:image', content: this.campainData.banners.length === 0 ? '' : this.campainData.banners[0].img }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/images/campaign/icon/favicon.ico' }
      ]
    };
  },
  computed: {
    ...mapGetters('campaign', ['showVoucherTab', 'showCardTab', 'showProductTab', 'showStoreTab', 'drawerShow'])
  },
  created () {
    if (this.isReplace) {
      this.$router.replace({ path: `/campaign/${this.params.eventId}` });
    }
  },
  mounted () {
    const noticeEl = document.querySelector('.channel-footer .content');
    if (noticeEl.offsetHeight >= 59) {
      this.isOpenRead = true;
    }
  },
  methods: {
    ...mapMutations('campaign', {
      setLogin: 'setLogin',
      setDrawerOpen: 'setDrawerOpen'
    }),
    loadMore () {
      this.waterFallRequest.paginationInfo.pageIndex++;
      console.log(this.waterFallRequest.paginationInfo.pageIndex);
      if (this.waterFallRequest.paginationInfo.pageIndex <= this.waterFallRequest.paginationInfo.totalPages) {
        this.waterFallRequest.load = true;
        this.$axios.post(`${this.env.apiPath}/events/waterfall`, this.waterFallRequest, {
          headers: {
            Authorization: `Bearer ${this.idToken}`
          }
        }).then((res) => {
          const data = JSON.parse(res.data.data);
          this.waterFallRequest.paginationInfo.totalPages = data.paginationInfo.totalPages;
          for (const items of data.waterfallItems) {
            this.campainData.waterfallItems.push(items);
          }
          this.waterFallRequest.load = false;
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>

/** banner */
.top-banner {
  position: relative;
  z-index: 1;
}

.big-banner {
  position: relative;
  padding: 0;
  @media (max-width: 1139px) {
    padding: 0 1em;
  }
}

/** service icon */
.channel-icon {
  position: relative;
  z-index: 2;
  width: 100%;
  transform: translateY(-2em);
  @media (max-width: 767px) {
    transform: translateY(-1em);
  }
}

/** channel-section */
.channel-section {
  position: relative;
  display: block;
  width: 100%;
  padding: 1em;
  h6 {
    width: 100%;
    text-align: left;
    padding-bottom: 0.5em;
    color: #13334c;
    font-size: 1.2rem;
  }
  .channel-swiper-box {
    overflow: hidden;
    border-top-left-radius: 0.75em;
    border-top-right-radius: 0.75em;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    &.shadow {
      border-bottom-left-radius: 0.75em;
      border-bottom-right-radius: 0.75em;
      box-shadow: 0px 2px 7px -1px rgba(147, 137, 117, 0.2);
    }
  }
}

/** 輪播banner的點點 **/
::v-deep .big-banner {
  .swiper-container-horizontal > .swiper-pagination-bullets,
  .swiper-pagination-custom,
  .swiper-pagination-fraction {
    bottom: 2px;
  }
  .swiper-container-horizontal
    > .swiper-pagination-bullets
    .swiper-pagination-bullet {
    margin: 0 2px;
  }
  .swiper-pagination-bullet {
    width: 26px;
    height: 3px;
    border-radius: 8px;
    opacity: 1;
    background: #dadada;
    &-active {
      background-color: #ffb26b;
    }
  }
}

/** 頻道樣式 */
.channel-template1 {
  background: #ffbe5b;
  overflow: hidden;
  padding: 0 0.5em;
}
.channel-template2 {
  background: #ffb26b;
  overflow: hidden;
  padding: 0 0.5em;
}
.channel-template3 {
  background: #FE9060;
  background-size: cover;
  overflow: hidden;
  padding: 0 0.5em;
}

.channel-template4 {
  background: #FE8660;;
  background-size: cover;
  overflow: hidden;
  padding: 0 0.5em;
}

/** 我的服務 */
/** more service icon */
.more-icon-box {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  background: transparent;
  &.open {
    background: white;
    width: 100vw;
    height: 100vh;
    display: inline-flex;
    justify-content: center;
  }
  .head-top {
    text-align: left;
  }
  .title {
    font-size: small;
    font-weight: 500;
    padding: 1em 1em .5em 1em;
  }
  .row {
    padding: 0 1em 1em 1em;
    text-align: center;
    .col {
      flex-grow: 1;
      padding: .5em .15em;
      min-width: 10%;
      color: #818181;
      @media (max-width: 767px) {
        min-width: 20%;
        flex-grow: inherit;
      }
      p {
        white-space: nowrap;
        font-size: smaller;
        padding-top: 6px;
      }
      img {
        width: 48px;
        height: 48px;
        border-radius: 16px;
      }
    }
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

/** footer */
.channel-footer {
  padding: 1em 2em;
  margin-bottom: 12em;
  font-size: small;
  color: #717171;
  text-align: left;
  a {
    color: #FF9D42;
  }
  .content{
    height: 4.5em;
    overflow:hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    white-space: normal;
    &.active {
    height: auto;
    -webkit-line-clamp:unset;
  }
  }
}

</style>

<!-- element UI modal style -->
<style lang="scss">
.modal-style {
  border-radius: 20px;
  width: 500 px;
  @media (max-width: 767px) {
    width: 95%;
  }
  .el-message-box__title {
    text-align: center;
    color: #13334c;
    font-weight: 700;
    font-size: x-large;
    line-height: 180%;
  }
  .el-message-box__message {
    padding: 1em;
    font-size: medium;
    color: #717171;
    line-height: 170%;
  }
  .el-message-box__content {
    background: #F9F9F9;
    max-height: 550px;
    overflow-y: scroll;
  }
  .el-message-box__headerbtn {
    i {
      font-size: x-large;
      color: #13334C;
      &::before {
        border: 1px solid #13334C;
        border-radius: 99em;
      }
    }
  }
}

/** dialog */
.el-dialog {
  border-radius: 8px;
  width: 30%;
  @media (max-width: 960px) {
    width: 50%;
  }
  @media (max-width: 767px) {
    width: 70%;
  }
  .el-dialog__title {
    font-weight: bold;
  }
  .el-dialog__body {
    padding: 1em 2em;
    color: #13334c;
    font-size: medium;
    text-align: center;
  }
  .dialog-footer {
    position: relative;
    display: flex;
    justify-content: space-around;
    .closebtn {
      text-align: center;
      position: absolute;
      bottom: -8em;
    }
  }
  input {
    margin: 1em 0 0.3em 0;
    border-radius: 8px;
    outline: none;
    text-align: right;
    &:focus,
    &:active,
    &:visited {
      border: 1px solid #fd5f00;
    }
  }
  .el-select {
    width: 100%;
    .el-input__inner {
      border: 1px solid #c4c4c4;
    }
    .el-input.is-focus {
      .el-input__inner {
        background: none;
        border: 1px solid #fd5f00;
      }
    }
  }
}

</style>
