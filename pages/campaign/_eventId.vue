<template>
  <div class="channel-wrap">
    <CampaignHeader
      :title-img="campainData.eventsVm.mktEventLogo"
      :login-url="env.mobii"
      :redirect-url="env.domain"
      :event-id="params.eventId"
      :mktEventLoginDisplay="campainData.eventsVm.mktEventLoginDisplay"
    />
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
      <div v-if="campainData.icons.length > 0" class="channel-icon">
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
        version: {{ env.version }} | {{ updateTime }}
      </div>
      <!-- KLOOK版位l -->
      <section v-if="params.eventId === 'klook'" class="channel-section">
        <!-- eslint-disable vue/no-v-html -->
        <div v-html="klookBlock.serchBlock" />
      </section>
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
      <!-- KLOOK iframe 版位 -->
      <template v-if="params.eventId === 'klook'">
        <section v-for="(klook, idx) in klookBlock.iframeBlock" :key="`klook-iframe${idx}`" class="channel-section">
          <h6>{{ klook.title }}</h6>
          <!-- eslint-disable vue/no-v-html -->
          <div v-html="klook.block" />
        </section>
      </template>
      <!-- 瀑布流 -->
      <section class="channel-section">
        <h6>{{ campainData.waterfallBlockName }}</h6>
        <WaterFall
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
      <!-- 測試Dialog按鈕 -->
      <!--div class="block">
        <button type="button" class="submit-button icon-ic_send" @click="dialogVisible = true">
          測試Dialog按鈕
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
      class="campaign"
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
import { directive } from 'vue-awesome-swiper';
import { mapGetters, mapMutations } from 'vuex';

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
    let isRoute = 0;
    if (context.query.M_idToken) {
      isRoute = 1;
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
      // 活動無效或過期
      case '619820002':
        isRoute = 2;
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
      /** 是否需要rePlace 1: 頁面replace 2: 導到404 */
      isRoute,
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
      },
      klookBlock: {
        serchBlock: '<ins class="klook_aff_search_box" data-wid="27786" data-height="340px" data-adid="575965" data-lang="zh-TW" data-prod="search_vertical" data-currency="TWD"><a href="//www.klook.com/?aid=">Klook.com</a></ins>',
        iframeBlock: [{
          title: '最新玩法 雙層巴士',
          block: '<ins class="klk-aff-widget" data-adid="576053" data-lang="" data-currency="" data-cardH="126" data-padding="92" data-lgH="470" data-edgeValue="655" data-prod="static_widget" data-amount="3"><a href="//www.klook.com/">Klook.com</a></ins>'
        },
        {
          title: '聚餐吃好料',
          block: '<ins class="klk-aff-widget" data-adid="575957" data-lang="zh-TW" data-currency="TWD" data-cardH="126" data-padding="92" data-lgH="470" data-edgeValue="655" data-cid="19" data-tid="4" data-amount="3" data-prod="dynamic_widget"><a href="//www.klook.com/">Klook.com</a></ins>'
        },
        {
          title: '暖呼呼泡湯',
          block: '<ins class="klk-aff-widget" data-adid="576039" data-lang="" data-currency="" data-cardH="126" data-padding="92" data-lgH="470" data-edgeValue="655" data-cid="6488" data-tid="3" data-amount="3" data-prod="dynamic_widget"><a href="//www.klook.com/">Klook.com</a></ins>'
        },
        {
          title: '走春出遊去',
          block: '<ins class="klk-aff-widget" data-adid="576027" data-lang="" data-currency="" data-cardH="126" data-padding="92" data-lgH="470" data-edgeValue="655" data-cid="42" data-tid="1" data-amount="3" data-prod="dynamic_widget"><a href="//www.klook.com/">Klook.com</a></ins>'
        },
        {
          title: '耍廢宅度假',
          block: '<ins class="klk-aff-widget" data-adid="576035" data-lang="" data-currency="" data-cardH="126" data-padding="92" data-lgH="470" data-edgeValue="655" data-cid="20" data-tid="" data-amount="3" data-prod="hotel_dynamic_widget"><a href="//www.klook.com/">Klook.com</a></ins>'
        }]
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
        slidesPerView: 1,
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
      isOpenRead: false,
      /** 檔案更新時間 */
      updateTime: ''
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
    switch (this.isRoute) {
      case 1:
        this.$router.replace({ path: `/campaign/${this.params.eventId}` });
        break;
      case 2:
        this.$router.push({ path: '/error404' });
        break;
    }
  },
  mounted () {
    // 更多資訊的繼續閱讀功能
    const noticeEl = document.querySelector('.channel-footer .content');
    if (noticeEl.offsetHeight >= 59) {
      this.isOpenRead = true;
    }
    this.updateTime = document.lastModified;
    // 偵測瀑布流是否要加載
    window.addEventListener('scroll', () => {
      // 是否到底部
      const IS_BOTTOM = document.documentElement.scrollHeight - document.documentElement.scrollTop <= document.documentElement.clientHeight;
      if (IS_BOTTOM) {
        this.loadMore();
      }
    });
    // Klook js 嵌入
    const scriptKlookSerch = document.createElement('script');
    scriptKlookSerch.innerHTML = "(function(d, sc, u) { var s = d.createElement(sc), p = d.getElementsByTagName(sc)[0]; s.type = 'text/javascript'; s.async = true; s.src = u; p.parentNode.insertBefore(s,p); })(document, 'script', 'https://cdn.klook.com/s/dist_web/klook-affiliate-front/s/dist/desktop/search_vertical_v3.js')";
    document.body.appendChild(scriptKlookSerch);
    const scriptKlookIframe = document.createElement('script');
    scriptKlookIframe.innerHTML = "(function (d, sc, u) { var s = d.createElement(sc), p = d.getElementsByTagName(sc)[0]; s.type = 'text/javascript'; s.async = true; s.src = u; p.parentNode.insertBefore(s, p); })( document, 'script', 'https://affiliate.klook.com/widget/fetch-iframe-init.js') ";
    document.body.appendChild(scriptKlookIframe);
  },
  methods: {
    ...mapMutations('campaign', {
      setLogin: 'setLogin',
      setDrawerOpen: 'setDrawerOpen'
    }),
    /** 下載更多（瀑布流下載更多資料） */
    loadMore () {
      if (!this.waterFallRequest.load) {
        this.waterFallRequest.paginationInfo.pageIndex++;
        if (this.waterFallRequest.paginationInfo.pageIndex <= this.waterFallRequest.paginationInfo.totalPages) {
          // 目前頁數未超出總頁數時，暫停loadMore，開始call api
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
            // 資料下載完畢，允許loadMore再次啟動
            this.waterFallRequest.load = false;
          });
        }
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
    color: $default-txt;
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
    &.active {
      background-color: $channel-color2;
    }
  }
}

/** 頻道樣式 */
.channel-template1,
.channel-template2,
.channel-template3,
.channel-template4 {
  overflow: hidden;
  padding: 0 0.5em;
}
.channel-template1 {
  background: $channel-color1;
}
.channel-template2 {
  background: $channel-color2;
}
.channel-template3 {
  background: $channel-color3;
  background-size: cover;
}

.channel-template4 {
  background: $channel-color4;
  background-size: cover;
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
    background: #fff;
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
      color: $from-txt;
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
        width: $imgbox-img;
        height: $imgbox-img;
        border-radius: 16px;
      }
    }
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

/** footer */
.channel-footer {
  padding: 1em 2em;
  margin-bottom: 12em;
  font-size: small;
  color: $tooltip-color;
  text-align: left;
  a {
    color: $default-color;
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
