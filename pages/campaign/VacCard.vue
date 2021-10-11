<template>
  <div class="channel-wrap">
    <div class="channel-header">
      <div class="channel-container">
        <div class="channel-header-box">
          <div class="channel-header-item">
            <a>
              <i class="material-icons">navigate_before</i>
            </a>
          </div>
          <div class="channel-header-title">
            數位榮福卡身分驗證
            <div class="channel-header-item" />
          </div>
        </div>
      </div>
    </div>
    <main>
      <div class="channel-section">
        <div class="col-12 vaclogo">
          <img src="@/static/images/campaign/vaclogo.png" class="rwdimgmax" alt="more">
        </div>
      </div>
      <div class="channel-section">
        <div class="col-12 form-title">
          驗證資料
        </div>
        <div class="col-12 identity error">
          <label>
            身分證字號
            <span class="impt">*</span>
          </label>
          <div class="forminput">
            <input v-model="identityID" placeholder="請輸入" maxlength="10" minlength="10" type="text">
            <div class="small-warning">
              {{ errorMsg }}
            </div>
          </div>
        </div>
      </div>
      <div class="channel-section">
        <div class="col-12 vacinfo">
          <ul>
            <li>
              <i class="material-icons">error_outline</i>申請數位榮福卡，需驗證是否符合以下身分，經退輔會驗證身分無誤後，方能完成數位榮福卡之申請。
              <ul>
                <li>第一類退除役官兵(榮民)</li>
                <li>第二類退除役官兵</li>
                <li>退除役官兵眷屬</li>
                <li>退輔會(含所屬機構)職員工</li>
                <li>其他退輔會同意者</li>
              </ul>
            </li>
            <li>
              <i class="material-icons">error_outline</i>所輸入之身分證字號，僅供身分驗證，以利數位榮福卡申請，不做其他用途。艾斯移動（Mobii!平台）不會記錄身分證字號，也不會保存於Mobii!平台系統裡。
            </li>
            <li>
              <i class="material-icons">error_outline</i>若有問題請洽退輔會24小時服務專線：(02)2725-5700，或免付費服務電話：0800-212-154、0800-212-510。
            </li>
          </ul>
        </div>
        <div class="col-12 checkagree">
          <input id="checkOK" v-model="agree" type="checkbox">
          <label for="checkOK">我同意艾斯移動（Mobii!平台）使用本卡內之會員個人資料及交易資料，以利發放點數回饋及參與Mobii!平台活動。</label>
        </div>
      </div>
    </main>
    <div class="foot-btn">
      <button class="btn send" :class="{'unable': !agree}" :disabled="!agree" @click="onSubmit()">
        立即申請
      </button>
    </div>
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
      identityID: '', // 身分證字號
      errorMsg: '字數長度不足10碼', // 驗證提示
      agree: false // 隱私權是否同意
    };
  },
  head () {
    return {
      title: '數位榮福卡身分驗證',
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
    onSubmit () {
      // const regex = '/^[a-zA-Z]d{9}$/g';
      console.log(/^[a-zA-Z]d{9}$/g.test(this.identityID));
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./../../assets/styles/_vars";
$from-txt: #818181;

.channel-header-title {
  font-size: x-large;
  color: #13334c;
  height: $header-height;
  line-height: 200%;
}

.col-12 {
  padding: 0 1em;
  &.vaclogo {
    padding: 100px 0;
    background: radial-gradient(
      100% 100% at 50% 0%,
      #fbfdfd 0%,
      #f6f8f8 71.42%,
      #eaeaea 100%
    );
    img {
      @media (max-width: 767px) {
        width: 120px;
        height: 120px;
      }
    }
  }
}
.form-title {
  text-align: center;
  color: #005792;
  border-bottom: #ced4da 1px solid;
  padding: 0.3em 0;
}

.impt {
  color: $default-icon;
}

.identity {
  display: flex;
  flex-wrap: wrap;
  border-bottom: #ced4da 1px solid;
  &.error {
    background: #fffef2;
    border-right: 4px solid $default-icon;
  }
  .forminput {
    flex: 2;
    justify-content: flex-end;
  }
  label {
    text-align: left;
    width: 135px;
    display: flex;
    align-items: center;
  }
  input {
    border: none;
    background: none;
    text-align: right;
    color: #818181;
    &:focus {
      outline: none;
    }
  }
}

.small-warning {
  font-size: 80%;
  width: 100%;
  color: #dc3545;
  text-align: right;
}

.vacinfo {
  padding: 1em;
  ul,
  li {
    list-style: none;
    text-align: left;
    color: $from-txt;
  }
  >ul {
    padding-left: 1.5em;
  }
  li {
    line-height: 180%;
    position: relative;
    i {
      color: $default-icon;
      position: absolute;
      left: -1.1em;
    }
    li {
      &::before {
        content: "";
        display: block;
        width: 5px;
        height: 1px;
        position: absolute;
        background: $from-txt;
        top: 45%;
        left: -1em;
      }
    }
  }
}

main {
  margin-bottom: 8em;
  @media (max-width: 767px) {
    margin-bottom: 6em;
  }
}

.checkagree {
  display: flex;
  label {
    color: #13334C;
    text-align: left;
  }
}

.foot-btn {
  position: fixed;
  min-width: 320px;
  max-width: 1140px;
  bottom: 0;
  width: 100%;
  padding: 1em;
  background: #fff;
  box-shadow: 0 -5px 8px rgb(0 0 0 / 20%)
}

.send {
  background: $default-icon;
  color: #fff;
  border-radius: 30px;
  width: 100%;
  &.unable {
    color: #fff;
    background: #d3d3d3;
  }
}

</style>
