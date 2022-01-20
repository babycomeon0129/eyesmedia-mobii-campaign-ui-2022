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
            <img src="@/static/images/campaign/vaclogo_new.png" class="rwdimgmax" alt="more">
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
              <select
                v-model="requestData.idtype"
              >
                <option :value="null" style="display: none;">
                  請選擇
                </option>
                <option
                  v-for="item in dentityCat"
                  :key="item.value"
                  :value="item.value"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-12 small-warning">
            <span v-if="!verify.idtype && verify.idtype !== null">請選擇身份別</span>
          </div>
        </div>
        <div class="row form" :class="{ 'error': (!verify.idno && verify.idno !== null) || idnoApplied }">
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
            <span v-if="!verify.idno && verify.idno !== null">身分證字號輸入不正確</span>
            <span v-if="idnoApplied">此身分證字號已申請過</span>
          </div>
        </div>
        <div class="row form" :class="{ 'error': !verify.birth_dt && verify.birth_dt !== null}">
          <div class="col-12 identity">
            <label>
              生日
              <span class="impt">*</span>
            </label>
            <div class="forminput">
              <input v-model="birth_dt" type="text" placeholder="月/日，例：0101" maxlength="4" minlength="4">
            </div>
          </div>
          <div class="col-12 small-warning">
            <span v-if="!verify.birth_dt && verify.birth_dt !== null">日期輸入不正確</span>
          </div>
        </div>
        <div class="row form">
          <div class="col-12 identity">
            <label>
              推薦單位
            </label>
            <div class="forminput">
              <select
                v-model="requestData.service_unit"
              >
                <option :value="null" style="display: none;">
                  請選擇
                </option>
                <option
                  v-for="(item, idx) in serviceUnitList"
                  :key="'serviceUnit' + idx"
                  :value="item"
                >
                  {{ item }}
                </option>
              </select>
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
      <!-- 測試Dialog按鈕 -->
      <!--div>
        <button @click="dialogOption.show = true; dialogOption.type = 3">
          測試Dialog按鈕
        </button>
      </div-->
      <button
        v-if="!isVac"
        class="btn send col-12"
        :class="{ 'unable': !agree || requestData.idno === null || requestData.idtype === null || birth_dt === null|| !reCaptcha || onSubmitLoading}"
        :disabled="!agree || requestData.idno === null || requestData.idtype === null || birth_dt === null|| !reCaptcha || onSubmitLoading"
        @click="onSubmit()"
      >
        <span v-if="onSubmitLoading"><i class="el-icon-loading" /></span>
        <span v-if="!onSubmitLoading">立即申請</span>
      </button>
      <p v-if="isVac">
        <i class="material-icons">error_outline</i>若有問題請洽退輔會24小時服務專線：(02)2725-5700，或免付費服務電話：0800-212-154、0800-212-510
      </p>
    </div>
    <!-- 提醒視窗 -->
    <el-dialog
      class="campaign"
      :title="dialogOption.title"
      :visible.sync="dialogOption.show"
      :show-close="false"
      :close-on-press-escape="false"
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
        <select
          v-model="pmsRequestData.pmsrel"
          class="pmsrel"
        >
          <option :value="null" style="display: none;">
            請選擇稱謂，您是榮民的
          </option>
          <option
            v-for="item in pmsrel"
            :key="item.value"
            :value="item.value"
          >
            {{ item.name }}
          </option>
        </select>
      </div>
      <!-- 身分證錯誤提示 -->
      <div v-if="!verifyPms.pmsidno && verifyPms.pmsidno !== null" class="col-12 pmsidno-error">
        <div v-if="pmsRequestData.pmsidno !== requestData.idno" class="col-12 small-warning">
          身分證字號輸入不正確
        </div>
        <div v-if="pmsRequestData.pmsidno === requestData.idno" class="col-12 small-warning">
          依附榮民身分證號與申請人(眷屬)身分證號相同，請重新輸入！
        </div>
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
          :class="{'unable': pmsRequestData.pmsidno === null || pmsRequestData.pmsrel === null || pmsSubmitLoading}"
          :disabled="pmsRequestData.pmsidno === null || pmsRequestData.pmsrel === null || pmsSubmitLoading"
          @click="pmsSubmit"
        >
          <span v-if="pmsSubmitLoading"><i class="el-icon-loading" /></span>
          <span v-if="!pmsSubmitLoading">送出</span>
        </button>
        <!-- 重新輸入 -->
        <button
          v-show="dialogOption.type === 2"
          type="button"
          class="btn send col-12"
          @click="dialogOption.show = false"
        >重新輸入</button>
        <div class="col-12 closebtn">
          <button v-show="dialogOption.type !== 1 && dialogOption.type !== 6" type="button" class="btn close" @click="dialogOption.show = false">
            <img src="@/static/images/campaign/icon/icon-close.png">
          </button>
        </div>
        <!-- 朕知道了 -->
        <nuxt-link
          v-show="dialogOption.type === 6"
          type="button"
          class="btn send col-12"
          to="/campaign/VAC"
        >
          我知道了
        </nuxt-link>
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
      type: 1 // 1:請先登入  2: 驗證失敗，查無資料_榮民/二類官兵/員工  3:驗證失敗，查無眷屬資料  4: 送出資料失敗(error code: 9999)  5:成功 6: 後端自定義
    };
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
      // 未登入
      case '619820008':
        dialogOption.title = '請先登入!';
        dialogOption.content = '請先登入方能進行數位榮福卡申請';
        dialogOption.type = 1;
        dialogOption.show = true;
        break;
      // 系統維護
      case '616600001':
        dialogOption.title = vacData.data.errorTitle;
        dialogOption.content = vacData.data.errorDesc;
        dialogOption.type = 6;
        dialogOption.show = true;
        break;
      // 其他各種登入錯誤
      default:
        // dialogOption.show = true;
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
        affiliation: null,
        /** 推薦單位 */
        service_unit: null
      },
      /** 榮民生日 */
      birth_dt: null,
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
      /** 推薦單位清單 */
      serviceUnitList: [
        '基隆市榮服處',
        '臺北市榮服處',
        '新北市榮服處',
        '宜蘭縣榮服處',
        '桃園市榮服處',
        '新竹榮服處',
        '苗栗縣榮服處',
        '臺中市榮服處',
        '彰化縣榮服處',
        '南投縣榮服處',
        '雲林縣榮服處',
        '嘉義榮服處',
        '臺南市榮服處',
        '高雄市榮服處',
        '屏東縣榮服處',
        '花蓮縣榮服處',
        '臺東縣榮服處',
        '澎湖縣榮服處',
        '金門縣榮服處',
        '國軍退除役官兵輔導委員會'
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
      reCaptcha: false,
      /** 立即申請按鈕，等待api的loading */
      onSubmitLoading: false,
      /** 眷屬申請按鈕，等待api的loading */
      pmsSubmitLoading: false,
      /** 身分證是否已申請 */
      idnoApplied: false
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
      // 驗證身分證是否已申請的選項先預設false，待api驗證
      this.idnoApplied = false;
      // 驗證身分證字號是否正確
      this.verify.idno = this.getTwID(this.requestData.idno);
      // 驗證生日格式是否正確
      this.requestData.birth_dt = `${this.birth_dt.slice(0, 2)}-${this.birth_dt.slice(2)}`;
      const date = this.$moment(`2020-${this.requestData.birth_dt}`);
      this.verify.birth_dt = date.isValid();
      this.requestData.birth_dt = this.verify.birth_dt ? this.birth_dt.replace('-', '') : null;
      // 檢查verify內的東西是否都是true
      const submitOk = Object.values(this.verify).every(e => e === true);
      // TODO:上SIT記得補上機器人驗證
      if (submitOk && this.agree && this.reCaptcha) {
        this.onSubmitLoading = true;
        this.$axios.post(`${this.env.apiPath}/events/bind`, this.requestData, {
          headers: {
            Authorization: `Bearer ${this.idToken}`
          }
        }).then((res) => {
          this.onSubmitLoading = false;
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
            // 此身分證字號已申請過
            case '619820009':
              this.idnoApplied = true;
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
      this.verifyPms.pmsrel = this.pmsRequestData.pmsrel !== null;
      // 驗證身分證字號是否正確
      this.verifyPms.pmsidno = this.getTwID(this.pmsRequestData.pmsidno);
      // 檢查verify內的東西是否都是true
      const submitOk = Object.values(this.verifyPms).every(e => e === true);
      if (submitOk) {
        this.pmsSubmitLoading = true;
        this.$axios.post(`${this.env.apiPath}/events/checkIdType`, this.pmsRequestData, {
          headers: {
            Authorization: `Bearer ${this.idToken}`
          }
        }).then((res) => {
          this.pmsSubmitLoading = false;
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
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/campaign/VAC');
    },
    /** 機器人驗證成功 */
    onSuccess (token) {
      this.reCaptcha = true;
    },
    /** 機器人驗證失敗 */
    onError () {
      this.reCaptcha = false;
    },
    /** 機器人驗證過期？ */
    onExpired () {
      this.reCaptcha = false;
    },
    /** 身分證驗證
     * @param pid 身分證字號
     */
    getTwID (pid) {
      pid = pid.trim();
      const regExpID = /^[A-Z]{1}[1-2]{1}[0-9]{8}$/;
      // 先驗證格式是否正確
      if (regExpID.test(pid)) {
        // 身分證首位字母
        const conver = 'ABCDEFGHJKLMNPQRSTUVXYWZIO';
        // 指定常數，相乘用
        const weights = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1];
        // 身分證字號檢查碼
        const checkPid = parseInt(pid.slice(-1));
        // 計算出的檢查碼
        let checkSum = 0;
        pid = String(conver.indexOf(pid[0]) + 10) + pid.slice(1, -1);
        // 計算身分證字號計算公式
        for (let i = 0; i < pid.length; i++) {
        // 檢查碼每一位數（轉數字）
          const c = parseInt(pid[i]);
          // 相乘的指定常數
          const w = weights[i];
          checkSum += c * w;
        }
        // 算出的檢查碼比對身分證最後一個檢查碼
        // (10 - checkSum % 10) % 10是為了防尾數0，10-0的情況還是10
        return (10 - checkSum % 10) % 10 === checkPid;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>

.channel-header .channel-header-box .channel-header-item {
  white-space: nowrap;
  width: auto;
}

.channel-header-title {
  flex: 2;
  font-size: x-large;
  color: $default-txt;
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
        width: 60%;
        @media (max-width: 767px) {
          width: 80%;
        }
      }
    }
    &.form-title {
      text-align: center;
      color: #005792;
      border-bottom: $border-solid-1;
      padding: 0.3em 0;
    }
  }
}

.impt {
  color: $default-icon;
}

.form {
  border-bottom: $border-solid-1;
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
    color: $default-txt;
  }
  input {
    border: none;
    background: none;
    text-align: right;
    &::placeholder {
      color: $from-txt;
    }
    &:focus {
      outline: none;
    }
  }
}

select {
  border: 0;
  text-align: right;
  color: $from-txt;
  font-size: 1rem;
  height: 38px;
  background: #f8f8f8;
  outline: none;
  -webkit-appearance:none;
  direction: rtl;
  &.pmsrel {
    width: 100%;
    background: #fff;
    border: $border-solid-1;
    border-radius: 8px;
    padding-right: .75rem;
  }
}

.small-warning {
  height: 19px;
  font-size: 80%;
  width: 100%;
  position: absolute;
  bottom: 0;
  right: 1.3em;
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
    color: $default-txt;
    text-align: left;
  }
}

.col-12.isVac {
  color: $default-txt;
  padding: 50px;
  h2 {
    margin-bottom: 18px;
  }
}
.foot-btn {
  position: fixed;
  min-width: 320px;
  max-width: $container-width;
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

.pms {
  position: relative;
  .small-warning {
    bottom: -20px;
  }
}

/** dialog */
::v-deep .el-dialog {
  .el-dialog__body {
    text-align: left;
  }
  .pmsidno-error .small-warning {
    position: relative;
    left: auto;
    right: auto;
    height: auto;
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
      color: $from-txt;
      font-size: 1rem;
    }
    &:focus {
      background: none;
      border: none;
    }
  }
}
</style>
