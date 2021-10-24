<template>
  <div class="channel-wrap">
    <div class="channel-header">
      <div class="channel-container">
        <div class="channel-header-box">
          <div class="channel-header-item">
            <a @click="goBack">
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
        <div class="row">
          <div class="col-12 vaclogo">
            <img src="@/static/images/campaign/vaclogo.png" class="rwdimgmax" alt="more">
          </div>
        </div>
      </div>
      <div v-if="!isVac" class="channel-section">
        <div class="row">
          <div class="col-12 form-title">
            驗證資料
          </div>
        </div>
        <div class="row form" :class="{ 'error': !verify.idtype && verify.idtype !== null }">
          <div class="col-12 identity">
            <label>
              身分別
              <span class="impt">*</span>
            </label>
            <div class="forminput">
              <el-select
                v-model="requestData.idtype"
                :popper-class="'popperstyle'"
                placeholder="請選擇"
              >
                <el-option
                  v-for="item in dentityCat"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                  <span style="float: right;">{{ item.name }}</span>
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="col-12 small-warning">
            <span v-if="!verify.idtype && verify.idtype !== null">請選擇身份別</span>
          </div>
        </div>
        <div class="row form" :class="{ 'error': !verify.idno && verify.idno !== null }">
          <div class="col-12 identity">
            <label>
              身分證字號
              <span class="impt">*</span>
            </label>
            <div class="forminput">
              <input
                v-model="requestData.idno"
                placeholder="請輸入"
                maxlength="10"
                minlength="10"
                type="text"
                pattern="^[A-Za-z][12]\d{8}$"
                required
              >
            </div>
          </div>
          <div class="col-12 small-warning">
            <span v-if="!verify.idno && verify.idno !== null">字數長度不足10碼</span>
          </div>
        </div>
        <div class="row form">
          <div class="col-12 identity">
            <label>
              出生年月日
              <span class="impt">*</span>
            </label>
            <div class="forminput">
              <input v-model="requestData.birth_dt" type="text" placeholder="月／日，例：0129" maxlength="4" minlength="4">
              <!--el-date-picker
                v-model="requestData.birth_dt"
                type="date"
                placeholder="月／日"
                format="MM-dd"
                value-format="MM-dd"
              /-->
            </div>
          </div>
        </div>
        <div class="row form">
          <div class="col-12 identity">
            <label>
              請勾選
              <span class="impt">*</span>
            </label>
            <div class="forminput">
              <recaptcha @error="onError" @success="onSuccess" @expired="onExpired" />
            </div>
          </div>
        </div>
      </div>
      <!-- 身份驗證欄 -->
      <div v-if="!isVac" class="channel-section">
        <div class="col-12 checkagree">
          <input id="checkOK" v-model="agree" type="checkbox">
          <label for="checkOK">我同意艾斯移動（Mobii 平台）使用本卡內之會員個人資料及交易資料，以利發放點數回饋及參與 Mobii 平台活動。</label>
        </div>
        <div class="col-12 vacinfo">
          <ul>
            <li>
              <i class="material-icons">error_outline</i>申請數位榮福卡，需驗證是否符合以下身分，經退輔會驗證身分無誤後，方能完成數位榮福卡之申請。
              <ul>
                <li>第一類退除役官兵(榮民)</li>
                <li>第二類退除役官兵</li>
                <li>退除役官兵眷屬</li>
                <li>退輔會(含所屬機構)職員工</li>
              </ul>
            </li>
            <li>
              所輸入之身分證字號，僅供申請數位榮福卡身分驗證使用，不做其他用途。艾斯移動 (Mobii 平台) 不會記錄、保存身分證字號於 Mobii 平台系統中。
              <br>
              <br>榮福卡合作優惠終止時，優惠將轉換為一般會員。
            </li>
          </ul>
        </div>
      </div>
      <!-- 完成申請 -->
      <div v-if="isVac" class="channel-section">
        <div class="col-12 isVac">
          <h2>已完成申請！</h2>
          <p>
            您已完成數位榮福卡申請
            <br>歡迎您盡情享受Mobii獨家優惠！
          </p>
        </div>
      </div>
    </main>
    <!-- 申請按鈕 -->
    <div class="foot-btn" :class="{ 'isVac': isVac }">
      <button
        v-if="!isVac"
        class="btn send col-12"
        :class="{ 'unable': !agree || requestData.idno === null || requestData.idtype === null || requestData.birth_dt === null || !reCaptcha}"
        :disabled="!agree || requestData.idno === null || requestData.idtype === null || requestData.birth_dt === null || !reCaptcha"
        @click="onSubmit()"
      >
        立即申請
      </button>
      <p v-if="isVac">
        <i class="material-icons">error_outline</i>若有問題請洽退輔會24小時服務專線：(02)2725-5700，或免付費服務電話：0800-212-154、0800-212-510
      </p>
    </div>
    <!-- 提醒視窗 -->
    <el-dialog
      :title="dialogOption.title"
      :visible.sync="dialogOption.show"
      :show-close="false"
      :close-on-click-modal="false"
      top="30vh"
    >
      <div class="col-12">
        {{ dialogOption.content }}
      </div>
      <div v-show="dialogOption.type === 3" class="col-12">
        <input
          v-model="pmsRequestData.pmsidno"
          maxlength="10"
          minlength="10"
          type="text"
          pattern="^[A-Za-z][12]\d{8}$"
          required
          placeholder="請輸入所屬榮民身分證號"
        >
        <el-select
          v-model="pmsRequestData.pmsrel"
          placeholder="請選擇稱謂，您是榮民的"
          :popper-class="'popperstyle'"
        >
          <el-option
            v-for="item in pmsrel"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          >
            <span style="float: right; padding-right: 1em; font-size: medium;">{{ item.name }}</span>
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- 返回專頁 -->
        <nuxt-link
          v-show="dialogOption.type === 1 || dialogOption.type === 3 || dialogOption.type === 5"
          to="/campaign/VAC"
          type="button"
          class="btn col-5"
          :class="{'goBack': dialogOption.type === 1 || dialogOption.type === 3, 'send': dialogOption.type === 5}"
        >
          返回專頁</nuxt-link>
        <!-- 前往登入註冊 -->
        <a v-show="dialogOption.type === 1" :href="`${env.mobii}/Login?fromOriginUri=${env.domain}/campaign/VAC`" type="button" class="btn send col-5">登入註冊</a>
        <!-- 送出榮民眷屬資料 -->
        <button
          v-show="dialogOption.type === 3"
          type="button"
          class="btn send col-5"
          :class="{'unable': pmsRequestData.pmsidno === null || pmsRequestData.pmsrel === null}"
          :disabled="pmsRequestData.pmsidno === null || pmsRequestData.pmsrel === null"
          @click="pmsSubmit"
        >
          送出
        </button>
        <!-- 重新輸入 -->
        <button
          v-show="dialogOption.type === 2"
          type="button"
          class="btn send col-12"
          @click="dialogOption.show = false"
        >重新輸入</button>
        <div class="col-12 closebtn">
          <button v-show="dialogOption.type !== 1" type="button" class="btn close" @click="dialogOption.show = false">
            <img src="@/static/images/campaign/icon/icon-close.png">
          </button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'VacCard',
  middleware (context) {
    context.$gtm.push({ event: 'sit網站瀏覽' });
  },
  async asyncData (context) {
    /** 提示dialog Option */
    const dialogOption = {
      title: '請先登入!',
      content: '請先登入方能進行數位榮福卡申請',
      show: false,
      type: 1 // 1:請先登入  2: 驗證失敗，查無資料_榮民/二類官兵/員工  3:驗證失敗，查無眷屬資料  4: 送出資料失敗(error code: 9999)  5:成功
    };
    /** 登入idToken */
    let idToken = context.$cookies.get('M_idToken') || null;
    console.log('asyncData>>>>>>>>>>' + context.query.M_idToken);
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
    const vacData = await context.$axios.get(`${context.env.SIDE_ENV.apiPath}/events/check`, {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    });
    let isVac = false;
    const responseData = JSON.parse(vacData.data.data);
    // 判斷是否登入成功
    switch (vacData.data.errorCode) {
      // 登入成功
      case '996600001':
        console.log(JSON.parse(vacData.data.data));
        isVac = responseData.isBind;
        // 如果idtoken跟cookie token不同，就更新cookie token
        if (vacData.data.idToken !== idToken) {
          context.$cookies.set('M_idToken', vacData.data.idToken, {
            path: '/',
            domain: '.mobii.ai',
            sameSite: 'Lax',
            secure: true
          });
        }
        break;
      // idToken 驗不過
      case '619820001':
        dialogOption.show = true;
        context.store.commit('campaign/setLogin', false);
        context.$cookies.remove('M_idToken', {
          path: '/',
          domain: '.mobii.ai',
          sameSite: 'Lax',
          secure: true
        });
        break;
      // 其他各種登入錯誤
      default:
        dialogOption.show = true;
        break;
    }
    return {
      /** 是否是榮福卡會員 */
      isVac,
      /** id token */
      idToken,
      /** 環境變數 */
      env: context.env.SIDE_ENV,
      /** 提示dialog Option */
      dialogOption,
      /** 是否需要rePlace */
      isReplace
    };
  },
  data () {
    return {
      /** Api Request */
      requestData: {
        /** 身份別 */
        idtype: null,
        /** 身分證字號 */
        idno: null,
        /** 生日 */
        birth_dt: null,
        /** 會員編號 */
        memid: null,
        /** 所屬機構 */
        affiliation: null
      },
      /** 眷屬確認 Api Request */
      pmsRequestData: {
        idno: null,
        pmsidno: null,
        pmsrel: null
      },
      /** 榮民的身份別 */
      dentityCat: [
        {
          name: '榮民',
          value: '1'
        },
        {
          name: '第二類退除役官兵',
          value: '2'
        },
        {
          name: '退除役官兵眷屬',
          value: '3'
        },
        {
          name: '退輔會(含所屬機構)職員工',
          value: '4'
        }
      ],
      /** 與榮民的關係列表 */
      pmsrel: [
        {
          name: '父',
          value: '21'
        },
        {
          name: '母',
          value: '22'
        },
        {
          name: '養父',
          value: '25'
        },
        {
          name: '養母',
          value: '26'
        },
        {
          name: '配偶',
          value: '30'
        },
        {
          name: '夫',
          value: '31'
        },
        {
          name: '妻',
          value: '32'
        },
        {
          name: '子',
          value: '41'
        },
        {
          name: '女',
          value: '42'
        },
        {
          name: '養子',
          value: '45'
        },
        {
          name: '養女',
          value: '46'
        }
      ],
      /** 榮民資料驗證 */
      verify: {
        idtype: null,
        idno: null,
        birth_dt: null
      },
      /** 榮民眷屬資料驗證 */
      verifyPms: {
        idno: null,
        pmsidno: null,
        pmsrel: null
      },
      /** 隱私權是否同意 */
      agree: false,
      /** google reCaptcha */
      reCaptcha: false
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
          content: '數位榮福卡身分驗證頁，申請數位榮福卡，需驗證是否符合以下身分，經退輔會驗證身分無誤後，方能完成數位榮福卡之申請。'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/images/campaign/icon/favicon.ico' }
      ]
    };
  },
  created () {
    console.log(this.isReplace);
    if (this.isReplace) {
      this.$router.replace({ path: '/campaign/VacCard' });
    }
  },
  updated () {
    this.pmsRequestData.idno = this.requestData.idno;
  },
  mounted () {
    // ...
  },
  methods: {
    /** 立即申請（第一次送出資料） */
    onSubmit () {
      // 驗證是否選擇身份別
      this.verify.idtype = this.requestData.idtype !== null;
      // 驗證身分證字號是否10位
      this.verify.idno = this.requestData.idno.length === 10;
      // 驗證是否選擇生日
      this.verify.birth_dt = this.requestData.birth_dt !== null;
      // 檢查verify內的東西是否都是true
      const submitOk = Object.values(this.verify).every(e => e === true);
      // TODO:上SIT記得補上機器人驗證
      if (submitOk && this.agree && this.reCaptcha) {
        this.$axios.post(`${this.env.apiPath}/events/bind`, this.requestData, {
          headers: {
            Authorization: `Bearer ${this.idToken}`
          }
        }).then((res) => {
          switch (res.data.errorCode) {
            // 驗證成功
            case '996600001':
              this.isVac = true;
              break;
            // 驗證失敗，查無資料_榮民/二類官兵/員工
            case '619820003':
              this.dialogOption.type = 2;
              this.dialogOption.title = '查無資料！';
              this.dialogOption.content = '請確認您所填資料是否正確，並重新輸入。若有問題請洽所屬單位或退輔會24小時服務專線：(02)2725-5700';
              this.dialogOption.show = true;
              break;
            // 驗證失敗，查無眷屬資料
            case '619820004':
              this.dialogOption.type = 3;
              this.dialogOption.title = '查無眷屬資料！';
              this.dialogOption.content = '請確認您所填資料是否正確，或提交以下資料給退輔會做查驗。若有問題請洽所屬單位，或退輔會24小時服務專線：(02)2725-5700';
              this.dialogOption.show = true;
              break;
            // 其他錯誤
            default:
              this.dialogOption.type = 4;
              this.dialogOption.title = '綁定失敗！';
              this.dialogOption.content = '綁定失敗，請洽客服人員';
              this.dialogOption.show = true;
              break;
          }
        });
      }
    },
    pmsSubmit () {
      // 檢查眷屬資料是否有欄位是空值
      this.verifyPms.idno = this.pmsRequestData.idno !== null;
      this.verifyPms.pmsidno = this.pmsRequestData.pmsidno.length === 10;
      this.verifyPms.pmsrel = this.pmsRequestData.pmsrel !== null;
      // 檢查verify內的東西是否都是true
      const submitOk = Object.values(this.verifyPms).every(e => e === true);
      if (submitOk) {
        this.$axios.post(`${this.env.apiPath}/events/checkIdType`, this.pmsRequestData, {
          headers: {
            Authorization: `Bearer ${this.idToken}`
          }
        }).then((res) => {
          if (res.data.errorCode === '996600001') {
            this.dialogOption.type = 5;
            this.dialogOption.title = '提交完成！';
            this.dialogOption.content = '已將資料提交給退輔會相關單位做查驗，查驗需要一點時間，請您耐心等待。三天後若還是無法申請數位榮福卡，請洽退輔會24小時服務專線：(02)2725-5700';
            this.dialogOption.show = true;
          } else {
            this.dialogOption.type = 4;
            this.dialogOption.title = '綁定失敗！';
            this.dialogOption.content = '綁定失敗，請洽客服人員';
            this.dialogOption.show = true;
          }
        });
      }
    },
    /** 返回鍵 */
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.router.push('/campaign/VAC');
    },
    /** 機器人驗證成功 */
    onSuccess (token) {
      console.log('Succeeded:', token);
      this.reCaptcha = true;
    },
    /** 機器人驗證失敗 */
    onError (error) {
      console.log('Error happened:', error);
      this.reCaptcha = false;
    },
    /** 機器人驗證過期？ */
    onExpired () {
      console.log('Expired');
      this.reCaptcha = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./../../assets/styles/_vars";
$from-txt: #818181;

.channel-header .channel-header-box .channel-header-item {
  white-space: nowrap;
  width: auto;
}

.channel-header-title {
  flex: 2;
  font-size: x-large;
  color: #13334c;
  height: $header-height;
  line-height: 200%;
}

.row {
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
      @media (max-width: 767px) {
        padding: 80px 0;
      }
      img {
        @media (max-width: 767px) {
          width: 120px;
          height: 120px;
        }
      }
    }
    &.form-title {
      text-align: center;
      color: #005792;
      border-bottom: #ced4da 1px solid;
      padding: 0.3em 0;
    }
  }
}

.impt {
  color: $default-icon;
}

.form {
  border-bottom: #ced4da 1px solid;
  position: relative;
  padding: 0.5em 0;
  &.error {
    background: #fffef2;
    border-right: 4px solid $default-icon;
  }
}

.identity {
  display: flex;
  flex-wrap: wrap;
  .forminput {
    display: flex;
    flex: 2;
    justify-content: flex-end;
    text-align: right;
  }
  label {
    text-align: left;
    width: 135px;
    display: flex;
    align-items: center;
    color: #13334c;
  }
  input {
    border: none;
    background: none;
    text-align: right;
    &::placeholder {
      color: #818181;
    }
    &:focus {
      outline: none;
    }
  }
}

.small-warning {
  height: 19px;
  font-size: 80%;
  width: 100%;
  position: absolute;
  bottom: 0;
  color: #dc3545;
  text-align: right;
}

.vacinfo {
  padding: 1em 0 6em 0;
  ul,
  li {
    list-style: none;
    text-align: left;
    color: $from-txt;
  }
  > ul {
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

.checkagree {
  padding: 1em 0;
  display: flex;
  label {
    color: #13334c;
    text-align: left;
  }
}

.col-12.isVac {
  color: #13334c;
  padding: 50px;
  h2 {
    margin-bottom: 18px;
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
  box-shadow: 0 -5px 8px rgb(0 0 0 / 20%);
  &.isVac {
    background: #f8f8f8;
    font-size: 90%;
    color: $from-txt;
    text-align: left;
    padding: 1em 3em 40px 3em;
    box-shadow: none;
    p {
      position: relative;
      i {
        color: $default-icon;
        position: absolute;
        left: -1.1em;
      }
    }
  }
}

.btn {
  color: #fff;
  border-radius: 30px;
  &.send {
    background: $default-icon;
    &.unable {
      color: #fff;
      background: #d3d3d3;
    }
  }
  &.goBack {
    background: #fbb54d;
  }
}

/** 下拉選單 */
::v-deep .el-select {
  width: 100%;
    .el-input__inner {
    text-align: right;
    background: none;
    border: none;
    font-size: 1rem;
    &::placeholder {
      color: #818181;
      font-size: 1rem;
    }
    &:focus {
      background: none;
      border: none;
      font-size: 1rem;
    }
  }
  .el-input.is-focus {
    .el-input__inner {
      background: none;
      border: none;
      font-size: 1rem;
    }
  }
}

::v-deep .el-select-dropdown__list {
  .el-select-dropdown__item {
    text-align: right;
  }
}

::v-deep .el-select-dropdown__list {
  .el-select-dropdown__item {
    display: flex;
  }
}

::v-deep .el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #fffef2;
}

.popperstyle {
  .selected {
    color: #818181;
    background: #fffef2;
  }
}

/** dialog */
::v-deep .el-dialog {
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
    text-align: left;
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

// 日期選擇器
::v-deep .el-date-editor {
  .el-input__prefix {
    i {
      display: none;
    }
  }
  .el-input__inner {
    text-align: right;
    background: none;
    border: none;
    font-size: 1rem;
    padding-right: 0.75rem;
    &::placeholder {
      color: #818181;
      font-size: 1rem;
    }
    &:focus {
      background: none;
      border: none;
    }
  }
}
</style>
