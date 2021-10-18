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
        <div class="col-12 vaclogo">
          <img src="@/static/images/campaign/vaclogo.png" class="rwdimgmax" alt="more">
        </div>
      </div>
      <div v-if="!isVac" class="channel-section">
        <div class="row">
          <div class="col-12 form-title">
            驗證資料
          </div>
        </div>
        <div class="row form">
          <div class="col-12 identity">
            <label>
              身分別
              <span class="impt">*</span>
            </label>
            <div class="forminput">
              <el-select v-model="requestData.dentityCat" :popper-class="'popperstyle'" placeholder="請選擇">
                <el-option
                  v-for="item in dentityCat"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
        </div>
        <div class="row form" :class="{'error': !dentityOk}">
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
                @keyup="dentityCheck($event)"
              >
            </div>
          </div>
          <div class="col-12 small-warning">
            <span v-if="!dentityOk">{{ errorMsg }}</span>
          </div>
        </div>
        <div class="row form">
          <div class="col-12 identity">
            <label>
              出生年月日
              <span class="impt">*</span>
            </label>
            <div class="forminput">
              <el-date-picker
                v-model="requestData.birthDay"
                type="date"
                placeholder="年／月／日"
                value-format="yyyy-MM-dd"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- 身份驗證欄 -->
      <div v-if="!isVac" class="channel-section">
        <div class="col-12 vacinfo">
          <ul>
            <li>
              <i class="material-icons">error_outline</i>申請數位榮福卡，需驗證是否符合以下身分，經退輔會驗證身分無誤後，方能完成數位榮福卡之申請。
              <ul>
                <li>第一類退除役官兵(榮民)</li>
                <li>第二類退除役官兵</li>
                <li>退除役官兵眷屬</li>
                <li>退輔會(含所屬機構)職員工</li>
                <li>其他經退輔會同意者</li>
              </ul>
            </li>
            <li>
              所輸入之身分證字號，僅供申請數位榮福卡身分驗證使用，不做其他用途。艾斯移動 (Mobii 平台) 不會記錄、保存身分證字號於 Mobii 平台系統中。
              <br><br>
              榮福卡合作優惠終止時，優惠將轉換為一般會員。
            </li>
          </ul>
        </div>
        <div class="col-12 checkagree">
          <input id="checkOK" v-model="agree" type="checkbox">
          <label for="checkOK">我同意艾斯移動（Mobii 平台）使用本卡內之會員個人資料及交易資料，以利發放點數回饋及參與 Mobii 平台活動。</label>
        </div>
      </div>
      <!-- 完成申請 -->
      <div v-if="isVac" class="channel-section">
        <div class="col-12 isVac">
          <h2>已完成申請！</h2>
          <p>您已完成數位榮福卡申請，歡迎您盡情享受<br>Mobii 獨家優惠！</p>
        </div>
      </div>
    </main>
    <!-- 申請按鈕 -->
    <div class="foot-btn" :class="{'isVac':isVac}">
      <button v-if="!isVac" class="btn send col-12" :class="{'unable': !agree || requestData.idno === null}" :disabled="!agree || requestData.idno === null" @click="onSubmit()">
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
      top="30vh"
      width="60%"
    >
      <div class="col-12">
        {{ dialogOption.cobtent }}
      </div>
      <div v-show="dialogOption.type === 3" class="col-12">
        <input placeholder="請輸入所屬榮民身分證號">
        <el-select v-model="requestData.dentityCat" placeholder="請選擇稱謂，您是榮民的" :popper-class="'popperstyle'" filterable>
          <el-option
            v-for="item in pmsrel"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <a v-show="dialogOption.type === 1 || dialogOption.type === 3" type="button" class="btn goBack col-5">返回專頁</a>
        <a v-show="dialogOption.type === 1" type="button" class="btn send col-5">前往登入註冊</a>
        <button v-show="dialogOption.type === 2" type="button" class="btn send col-12" @click="dialogOption.show = false">重新輸入</button>
        <div class="col-12 closebtn">
          <button type="button" class="btn close" @click="dialogOption.show = false">
            <img
              src="@/static/images/campaign/icon/icon-close.png"
            >
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
    const isVac = await false;
    return {
      isVac // 是否是榮福卡會員
    };
  },
  data () {
    return {
      requestData: {
        dentityCat: null,
        idno: null,
        birthDay: null
      },
      dentityCat: [
        {
          name: '榮民',
          value: 1
        },
        {
          name: '第二類退除役官兵',
          value: 2
        },
        {
          name: '退除役官兵眷屬',
          value: 3
        },
        {
          name: '退輔會(含所屬機構)職員工',
          value: 4
        }
      ],
      pmsrel: [ // 與榮民的關係列表
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
      dentityOk: true, // 身分證字號長度驗證
      errorMsg: '字數長度不足10碼', // 驗證提示
      agree: false, // 隱私權是否同意
      dialogOption: { // 提醒視窗Option
        title: '請先登入',
        cobtent: '請確認您的身分證字號，並重新輸入。若有問題請洽退輔會24小時服務專線：(02)2725-5700，或免付費服務電話：0800-212-154、0800-212-510',
        show: false,
        type: 3 // 1:請先登入  2: 申請失敗  3:輸入資料  4: 沒資料  5:成功
      }
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
  methods: {
    /** 第一次送出資料 */
    onSubmit () {
      // 驗證身分證字號是否10位數
      this.dentityOk = this.requestData.idno.length >= 10;
      if (this.dentityOk) {
        this.dialogOption.show = true;
      }
    },
    /** 返回鍵 */
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.router.push('/campaign/VAC');
    },
    dentityCheck (event) {
      // console.log(event);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./../../assets/styles/_vars";
$from-txt: #818181;

.channel-header .channel-header-box .channel-header-item {
    white-space: nowrap;
    width:auto;
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

.form {
  border-bottom: #ced4da 1px solid;
  position: relative;
  padding: .5em 0;
  &.error {
    background: #fffef2;
    border-right: 4px solid $default-icon;
  }
}

.identity {
  display: flex;
  flex-wrap: wrap;
  .forminput {
    flex: 2;
    justify-content: flex-end;
    text-align: right;
  }
  label {
    text-align: left;
    width: 135px;
    display: flex;
    align-items: center;
    color: #13334C;
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

.checkagree {
  display: flex;
  padding-bottom: 6em;
  label {
    color: #13334C;
    text-align: left;
  }
}

.col-12.isVac {
  color: #13334C;
  padding: 50px ;
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
      i{
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
    background: #FBB54D;
  }
}

/** 下拉選單 */
::v-deep .el-select{
  .el-input__inner {
    text-align: right;
    background: none;
    border: none;
    &::placeholder {
      color: #818181;
      font-size:  1rem;
    }
    &:focus {
      background: none;
      border: none;
    }
  }
  .el-input.is-focus {
    .el-input__inner {
      background: none;
      border: none;
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

::v-deep .el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
    background-color: #FFFEF2;
}

.popperstyle {
  .selected{
    color: #818181;
    background: #FFFEF2;
  }
}

/** dialog */
::v-deep .el-dialog {
  border-radius: 8px;
  .el-dialog__title {
    font-weight: bold;
  }
  .el-dialog__body{
    padding: 1em 2em;
    color:#13334C;
  }
  .dialog-footer {
    position: relative;
    display: flex;
    justify-content: space-around;
    padding: 0 2em;
    .closebtn {
      text-align: center;
      position: absolute;
      bottom: -8em;
    }
  }
  input {
    margin: 1em 0 .3em 0;
    border-radius: 8px;
    outline: none;
    text-align: right;
    &:focus, &:active, &:visited {
      border: 1px solid #FD5F00;
    }
  }
  .el-select {
    width: 100%;
    .el-input__inner {
      border: 1px solid #C4C4C4;
    }
    .el-input.is-focus {
    .el-input__inner {
      background: none;
      border: 1px solid #FD5F00;
    }
  }
  }
}

// 日期選擇器
::v-deep .el-date-editor {
  .el-input__prefix {
    right: 1em;
  }
  .el-input__inner {
    text-align: right;
    background: none;
    border: none;
    padding-right: .75rem;
    &::placeholder {
      color: #818181;
      font-size:  1rem;
    }
    &:focus {
      background: none;
      border: none;
    }
  }
}

::v-deep .el-date-table td.today span {
    color: $default-icon;
  }

</style>
