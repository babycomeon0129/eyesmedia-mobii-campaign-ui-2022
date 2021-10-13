<template>
  <div class="channel-wrap">
    <CampaignHeader :title-img="campainData.eventsVm.mktEventLogo" />
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
      <div>
        <div class="channel-icon">
          <div class="for-pc">
            <SwiperIcon :icon-option="boxIconPC" :icons="campainData.icons" />
          </div>
          <div class="for-mobile">
            <SwiperIcon
              :icon-option="boxIcon"
              :icons="campainData.icons"
              :icon-arrows="false"
            />
          </div>
        </div>
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
      <!-- footer 注意事項 -->
      <footer class="channel-footer">
        <h6>{{ campainData.eventsVm.mktEventOtherTitle }}</h6>
        <div class="content" :class="{'active': !isOpenRead}">
          {{ campainData.eventsVm.mktEventOtehrContent }}
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
      :visible.sync="isOpenService"
      :direction="'rtl'"
      :size="'100%'"
      :with-header="false"
    >
      <div class="more-icon-box">
        <div class="container">
          <div>
            <div class="head-top">
              <!-- 點擊帶queryParams控制父層class -->
              <button class="btn" @click="isOpenService = false">
                <i class="el-icon-arrow-left" /><span>返回</span>
              </button>
            </div>
            <div class="row">
              <a
                v-for="icon in campainData.icons"
                :key="icon.id"
                :target="icon.target"
                :href="icon.url"
                :class="{'disable': icon.Function_IsActive === 0}"
                class="col"
              >
                <img :src="icon.mktEventItemImg">
                <p class="txt-line-clamp1">{{ icon.name }}</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </el-drawer>
    <GotopIcon />
    <JustkaIcon v-if="campainData.eventsVm.mktEventOtehrJustka !== null && campainData.eventsVm.mktEventOtehrJustka !== ''" :juska-url="campainData.eventsVm.mktEventOtehrJustka" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { directive } from 'vue-awesome-swiper';

export default {
  name: 'Campaign',
  directives: {
    swiper: directive
  },
  middleware (context) {
    context.$gtm.push({ event: 'sit網站瀏覽' });
  },
  async asyncData (context) {
    const callApi = await context.$axios.get(`${context.env.SIDE_ENV.apiPath}/events/detail/${context.params.eventId}`);
    const eventData = JSON.parse(callApi.data.data);
    console.log('---------------------------------------');
    console.log(context.params.eventId);
    console.log(eventData.cardTabs[0].items);
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
    console.log('getters');
    // console.log(context.store.getters['campaign/showTab']);
    return {
      params: context.params,
      campainData: eventData,
      // testData: resData,
      env: context.env.SIDE_ENV
    };
  },
  data () {
    // const adSlider = this.campainData.ads.length > 1 ? 1.2 : 1;
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
      isOpenRead: false,
      /** 測試資料區 */
      channel1: [
        {
          UserDefine_ChannelID: 1111115,
          UserDefine_Code: 210062803930555,
          UserDefine_Name: '天母美食',
          VoucherData: [
            {
              Voucher_ID: 556,
              Voucher_Code: 460085958801227,
              Voucher_UserVoucherCode: null,
              Voucher_CountryCode: 886,
              Discount_Amount: 0,
              Voucher_UsedType: 3,
              Voucher_UsedTypeName: null,
              Voucher_ShowType: 2200,
              Voucher_ShowTypeName: null,
              Voucher_Title: '山水屋民宿',
              Voucher_URLTarget: null,
              Voucher_URL: null,
              Voucher_IsFreq: 1,
              Voucher_FreqName: '兌換',
              Voucher_Type: 11,
              Voucher_CompanyCode: 110042239332031,
              Voucher_ECStoreCode: 290057515001814,
              Voucher_ExtName: '早餐兌換券',
              Voucher_DedPoint: 0,
              Voucher_SpecialPoint: 0,
              Voucher_Image: 'https://sit-AFPSystem.mobii.ai//Upload/Images/20210623/a198158b-02de-4050-aeac-e99b4811d139.png',
              Voucher_ReleasedCount: 0,
              Voucher_IssuanceLimit: 0,
              Voucher_ReceiveLimit: 0,
              Voucher_UsedLimitType: 0,
              Voucher_UsedLimit: 0,
              Voucher_CheckLimit: null,
              Voucher_FeeType: null,
              Voucher_UsedOnDate: '2021-06-23T15:17:00',
              Voucher_UsedOffDate: '2022-06-23T15:17:00',
              Voucher_OnlineDate: '2021-06-23T15:17:00',
              Voucher_OfflineDate: '2022-06-23T15:17:00',
              Voucher_State: 0,
              Voucher_Content: null,
              Voucher_Note: null,
              VoucherRange_Prod: [],
              List_VoucherLimit: [],
              VoucherUseCount: null,
              Voucher_ReceiveDate: null,
              Voucher_IsScan: 0,
              Voucher_SpecialPrice: 1500,
              Voucher_SellPrice: 1200
            },
            {
              Voucher_ID: 554,
              Voucher_Code: 460083631238457,
              Voucher_UserVoucherCode: null,
              Voucher_CountryCode: 886,
              Discount_Amount: 0,
              Voucher_UsedType: 3,
              Voucher_UsedTypeName: null,
              Voucher_ShowType: 2000,
              Voucher_ShowTypeName: null,
              Voucher_Title: 'MOB-2625',
              Voucher_URLTarget: null,
              Voucher_URL: null,
              Voucher_IsFreq: 1,
              Voucher_FreqName: '兌換',
              Voucher_Type: 1,
              Voucher_CompanyCode: 110042239332031,
              Voucher_ECStoreCode: 290057515001814,
              Voucher_ExtName: 'MOB-2625 測試推播',
              Voucher_DedPoint: 0,
              Voucher_SpecialPoint: 0,
              Voucher_Image: 'https://sit-AFPSystem.mobii.ai//Upload/Images/20210527/505061b2-ddc7-4f61-beeb-83536e8c660e.png',
              Voucher_ReleasedCount: 0,
              Voucher_IssuanceLimit: 0,
              Voucher_ReceiveLimit: 0,
              Voucher_UsedLimitType: 0,
              Voucher_UsedLimit: 0,
              Voucher_CheckLimit: null,
              Voucher_FeeType: null,
              Voucher_UsedOnDate: '2021-05-27T16:46:00',
              Voucher_UsedOffDate: '2022-05-27T16:46:00',
              Voucher_OnlineDate: '2021-05-27T16:46:00',
              Voucher_OfflineDate: '2022-05-27T16:46:00',
              Voucher_State: 0,
              Voucher_Content: null,
              Voucher_Note: null,
              VoucherRange_Prod: [],
              List_VoucherLimit: [],
              VoucherUseCount: null,
              Voucher_ReceiveDate: null,
              Voucher_IsScan: 0,
              Voucher_SpecialPrice: 0,
              Voucher_SellPrice: 590
            },
            {
              Voucher_ID: 461,
              Voucher_Code: 460064343500681,
              Voucher_UserVoucherCode: null,
              Voucher_CountryCode: 886,
              Discount_Amount: 0,
              Voucher_UsedType: 3,
              Voucher_UsedTypeName: null,
              Voucher_ShowType: 2200,
              Voucher_ShowTypeName: null,
              Voucher_Title: '三明堂',
              Voucher_URLTarget: null,
              Voucher_URL: null,
              Voucher_IsFreq: 1,
              Voucher_FreqName: '兌換',
              Voucher_Type: 11,
              Voucher_CompanyCode: 110064340449969,
              Voucher_ECStoreCode: 290064341918799,
              Voucher_ExtName: '消費定食滿250元贈小點乙份',
              Voucher_DedPoint: 0,
              Voucher_SpecialPoint: 0,
              Voucher_Image: 'https://sit-AFPSystem.mobii.ai//Upload/Images/20201016/c2a503cc-fb1d-42f8-b56d-cafc7dc5330f.jpg',
              Voucher_ReleasedCount: 0,
              Voucher_IssuanceLimit: 0,
              Voucher_ReceiveLimit: 0,
              Voucher_UsedLimitType: 0,
              Voucher_UsedLimit: 0,
              Voucher_CheckLimit: null,
              Voucher_FeeType: null,
              Voucher_UsedOnDate: '2020-10-16T10:53:48',
              Voucher_UsedOffDate: '2021-11-30T23:59:59',
              Voucher_OnlineDate: '2020-10-16T10:53:48',
              Voucher_OfflineDate: '2021-11-30T23:59:59',
              Voucher_State: 0,
              Voucher_Content: null,
              Voucher_Note: null,
              VoucherRange_Prod: [],
              List_VoucherLimit: [],
              VoucherUseCount: null,
              Voucher_ReceiveDate: null,
              Voucher_IsScan: 0,
              Voucher_SpecialPrice: 2300,
              Voucher_SellPrice: 2300
            },
            {
              Voucher_ID: 461,
              Voucher_Code: 460064343500682,
              Voucher_UserVoucherCode: null,
              Voucher_CountryCode: 886,
              Discount_Amount: 0,
              Voucher_UsedType: 3,
              Voucher_UsedTypeName: null,
              Voucher_ShowType: 2200,
              Voucher_ShowTypeName: null,
              Voucher_Title: '三明堂三明堂三明堂',
              Voucher_URLTarget: null,
              Voucher_URL: null,
              Voucher_IsFreq: 1,
              Voucher_FreqName: '兌換',
              Voucher_Type: 11,
              Voucher_CompanyCode: 110064340449969,
              Voucher_ECStoreCode: 290064341918799,
              Voucher_ExtName: '消費定食滿250元贈小點乙份 消費定食滿250元贈小點乙份',
              Voucher_DedPoint: 0,
              Voucher_SpecialPoint: 0,
              Voucher_Image: 'https://sit-AFPSystem.mobii.ai//Upload/Images/20201016/c2a503cc-fb1d-42f8-b56d-cafc7dc5330f.jpg',
              Voucher_ReleasedCount: 0,
              Voucher_IssuanceLimit: 0,
              Voucher_ReceiveLimit: 0,
              Voucher_UsedLimitType: 0,
              Voucher_UsedLimit: 0,
              Voucher_CheckLimit: null,
              Voucher_FeeType: null,
              Voucher_UsedOnDate: '2020-10-16T10:53:48',
              Voucher_UsedOffDate: '2021-11-30T23:59:59',
              Voucher_OnlineDate: '2020-10-16T10:53:48',
              Voucher_OfflineDate: '2021-11-30T23:59:59',
              Voucher_State: 0,
              Voucher_Content: null,
              Voucher_Note: null,
              VoucherRange_Prod: [],
              List_VoucherLimit: [],
              VoucherUseCount: null,
              Voucher_ReceiveDate: null,
              Voucher_IsScan: 0,
              Voucher_SpecialPrice: 11800,
              Voucher_SellPrice: 11500
            },
            {
              Voucher_ID: 461,
              Voucher_Code: 460064343500682,
              Voucher_UserVoucherCode: null,
              Voucher_CountryCode: 886,
              Discount_Amount: 0,
              Voucher_UsedType: 3,
              Voucher_UsedTypeName: null,
              Voucher_ShowType: 2200,
              Voucher_ShowTypeName: null,
              Voucher_Title: '三明堂三明堂三明堂',
              Voucher_URLTarget: null,
              Voucher_URL: null,
              Voucher_IsFreq: 1,
              Voucher_FreqName: '兌換',
              Voucher_Type: 11,
              Voucher_CompanyCode: 110064340449969,
              Voucher_ECStoreCode: 290064341918799,
              Voucher_ExtName: '消費定食滿250元贈小點乙份 消費定食滿250元贈小點乙份',
              Voucher_DedPoint: 0,
              Voucher_SpecialPoint: 0,
              Voucher_Image: 'https://sit-AFPSystem.mobii.ai//Upload/Images/20201016/c2a503cc-fb1d-42f8-b56d-cafc7dc5330f.jpg',
              Voucher_ReleasedCount: 0,
              Voucher_IssuanceLimit: 0,
              Voucher_ReceiveLimit: 0,
              Voucher_UsedLimitType: 0,
              Voucher_UsedLimit: 0,
              Voucher_CheckLimit: null,
              Voucher_FeeType: null,
              Voucher_UsedOnDate: '2020-10-16T10:53:48',
              Voucher_UsedOffDate: '2021-11-30T23:59:59',
              Voucher_OnlineDate: '2020-10-16T10:53:48',
              Voucher_OfflineDate: '2021-11-30T23:59:59',
              Voucher_State: 0,
              Voucher_Content: null,
              Voucher_Note: null,
              VoucherRange_Prod: [],
              List_VoucherLimit: [],
              VoucherUseCount: null,
              Voucher_ReceiveDate: null,
              Voucher_IsScan: 0,
              Voucher_SpecialPrice: 11800,
              Voucher_SellPrice: 11500
            },
            {
              Voucher_ID: 461,
              Voucher_Code: 460064343500682,
              Voucher_UserVoucherCode: null,
              Voucher_CountryCode: 886,
              Discount_Amount: 0,
              Voucher_UsedType: 3,
              Voucher_UsedTypeName: null,
              Voucher_ShowType: 2200,
              Voucher_ShowTypeName: null,
              Voucher_Title: '三明堂三明堂三明堂',
              Voucher_URLTarget: null,
              Voucher_URL: null,
              Voucher_IsFreq: 1,
              Voucher_FreqName: '兌換',
              Voucher_Type: 11,
              Voucher_CompanyCode: 110064340449969,
              Voucher_ECStoreCode: 290064341918799,
              Voucher_ExtName: '消費定食滿250元贈小點乙份 消費定食滿250元贈小點乙份',
              Voucher_DedPoint: 0,
              Voucher_SpecialPoint: 0,
              Voucher_Image: 'https://sit-AFPSystem.mobii.ai//Upload/Images/20201016/c2a503cc-fb1d-42f8-b56d-cafc7dc5330f.jpg',
              Voucher_ReleasedCount: 0,
              Voucher_IssuanceLimit: 0,
              Voucher_ReceiveLimit: 0,
              Voucher_UsedLimitType: 0,
              Voucher_UsedLimit: 0,
              Voucher_CheckLimit: null,
              Voucher_FeeType: null,
              Voucher_UsedOnDate: '2020-10-16T10:53:48',
              Voucher_UsedOffDate: '2021-11-30T23:59:59',
              Voucher_OnlineDate: '2020-10-16T10:53:48',
              Voucher_OfflineDate: '2021-11-30T23:59:59',
              Voucher_State: 0,
              Voucher_Content: null,
              Voucher_Note: null,
              VoucherRange_Prod: [],
              List_VoucherLimit: [],
              VoucherUseCount: null,
              Voucher_ReceiveDate: null,
              Voucher_IsScan: 0,
              Voucher_SpecialPrice: 11800,
              Voucher_SellPrice: 11500
            },
            {
              Voucher_ID: 461,
              Voucher_Code: 460064343500682,
              Voucher_UserVoucherCode: null,
              Voucher_CountryCode: 886,
              Discount_Amount: 0,
              Voucher_UsedType: 3,
              Voucher_UsedTypeName: null,
              Voucher_ShowType: 2200,
              Voucher_ShowTypeName: null,
              Voucher_Title: '三明堂三明堂三明堂',
              Voucher_URLTarget: null,
              Voucher_URL: null,
              Voucher_IsFreq: 1,
              Voucher_FreqName: '兌換',
              Voucher_Type: 11,
              Voucher_CompanyCode: 110064340449969,
              Voucher_ECStoreCode: 290064341918799,
              Voucher_ExtName: '消費定食滿250元贈小點乙份 消費定食滿250元贈小點乙份',
              Voucher_DedPoint: 0,
              Voucher_SpecialPoint: 0,
              Voucher_Image: 'https://sit-AFPSystem.mobii.ai//Upload/Images/20201016/c2a503cc-fb1d-42f8-b56d-cafc7dc5330f.jpg',
              Voucher_ReleasedCount: 0,
              Voucher_IssuanceLimit: 0,
              Voucher_ReceiveLimit: 0,
              Voucher_UsedLimitType: 0,
              Voucher_UsedLimit: 0,
              Voucher_CheckLimit: null,
              Voucher_FeeType: null,
              Voucher_UsedOnDate: '2020-10-16T10:53:48',
              Voucher_UsedOffDate: '2021-11-30T23:59:59',
              Voucher_OnlineDate: '2020-10-16T10:53:48',
              Voucher_OfflineDate: '2021-11-30T23:59:59',
              Voucher_State: 0,
              Voucher_Content: null,
              Voucher_Note: null,
              VoucherRange_Prod: [],
              List_VoucherLimit: [],
              VoucherUseCount: null,
              Voucher_ReceiveDate: null,
              Voucher_IsScan: 0,
              Voucher_SpecialPrice: 11800,
              Voucher_SellPrice: 11500
            }
          ]
        },
        {
          UserDefine_ChannelID: 1111115,
          UserDefine_Code: 210062803993187,
          UserDefine_Name: '永康美食',
          VoucherData: []
        },
        {
          UserDefine_ChannelID: 1111115,
          UserDefine_Code: 210062804019069,
          UserDefine_Name: '永康飲品',
          VoucherData: []
        },
        {
          UserDefine_ChannelID: 1111115,
          UserDefine_Code: 210062804193575,
          UserDefine_Name: '永康生活',
          VoucherData: []
        },
        {
          UserDefine_ChannelID: 1111115,
          UserDefine_Code: 210062804281370,
          UserDefine_Name: '強打推薦',
          VoucherData: []
        }
      ]
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
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/images/campaign/icon/favicon.ico' }
      ]
    };
  },
  computed: {
    ...mapGetters('campaign', ['showVoucherTab', 'showCardTab', 'showProductTab'])
  },
  created () {
    console.log('language >>>> ', this.$cookies.get('language'));
    this.$nuxt.$on('openMyService', (e) => {
      this.isOpenService = e;
    });
  },
  mounted () {
    const noticeEl = document.querySelector('.channel-footer .content');
    if (noticeEl.offsetHeight >= 59) {
      this.isOpenRead = true;
    }
  },
  beforeDestroy () {
    // 要記得取消觀察
    this.$nuxt.$off('openMyService');
  },
  methods: {
    // ...
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
  background: #ff9d42;
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
  margin-bottom: 2em;
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

</style>
