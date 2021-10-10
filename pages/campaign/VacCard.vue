<template>
  <div class="channel-wrap">
    <div class="channel-header">
      <div class="header-item">
        <i class="material-icons">
          navigate_before</i>
      </div>
      <div class="header-title">
        數位榮福卡身分驗證
      </div>
      <div class="header-item" />
    </div>
    <main>
      <div class="row">
        12131
      </div>
    </main>
  </div>
</template>

<script>

export default {
  name: 'VacCard',
  middleware (context) {
    context.$gtm.push({ event: 'sit網站瀏覽' });
  },
  async asyncData (context) {
    // console.log('context', context);
    // const headers = {
    //   'Content-Type': 'application/json',
    //   xEyes_Command: '1110',
    //   xEyes_X: '',
    //   xEyes_Y: '',
    //   xEyes_DeviceType: '0',
    //   xEyes_CustomerInfo: '',
    //   xEyes_DeviceCode: ''
    // };
    // const request = {
    //   User_Code: 'qnWcdVmhuDtFPtZtczybJQ%3d%3d'
    // };
    // const apiData = await context.$axios.post('https://sit-afpapi.mobii.ai/api/Home', { Data: JSON.stringify(request) }, { headers });
    // const resData = JSON.parse(apiData.data.Data);
    // const callApi = await context.$axios.get('http://localhost:5000/campaign/api/v1/events/detail/GAS');
    // const eventData = JSON.parse(callApi.data.data);
    // console.log('---------------------------------------');
    // console.log(eventData);
    // return {
    //   listData: eventData,
    //   testData: resData,
    //   env: context.env.SIDE_ENV
    // };
  },
  data () {
    return {
      // ...
    };
  },
  head () {
    return {
      title: 'mobii 活動模組 測試頁',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description-HID',
          name: 'description',
          content: 'My custom description'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/images/campaign/icon/favicon.ico' }
      ]
    };
  },
  created () {
    // console.log('language >>>> ', this.$cookies.get('language'));
    // this.$nuxt.$on('openMyService', (e) => {
    //   this.isOpenService = e;
    // });
  },
  mounted () {
    // ...
  },
  methods: {
    // ...
  }
};
</script>

<style lang="scss" scoped>

.channel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .header-title {
  font-size: x-large;
  color: #13334C;
}
}
</style>
