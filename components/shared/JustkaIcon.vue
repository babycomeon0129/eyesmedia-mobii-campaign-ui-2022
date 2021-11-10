<template>
  <div>
    <div class="bearservice">
      <div class="scroll-top-wrapper">
        <span class="scroll-top-inner">
          <button href="juskaUrl" @click="clickJuska">
            <img
              src="@/static/images/campaign/icon/icon_service.png"
              class="justka-img"
            >
          </button>
        </span>
        <div v-if="msgMode" class="justka-msg">
          <button type="button" @click="msgMode = !msgMode">
            ×
          </button>
          <p>
            哈囉您好！有需要幫忙的地方，歡迎找我喔！
          </p>
        </div>
      </div>
    </div>
    <!-- justka dialog -->
    <el-dialog
      title=""
      :visible.sync="justkaDialog"
      width="60%"
      :destroy-on-close="true"
    >
      <iframe :src="juskaUrl" frameborder="0" class="justkaBox" />
      <span slot="footer" class="dialog-footer" />
    </el-dialog>
    <!-- dialog 提醒視窗  -->
    <el-dialog
      title=""
      :visible.sync="dialogOption"
      width="60%"
      :destroy-on-close="true"
    >
      <div class="col-12">
        登入失敗
      </div>
      <span slot="footer" class="dialog-footer">
        <button class="btn goBack col-5" @click="dialogOption = false">我知道了</button>
        <a class="btn send col-5" :href="`${loginUrl}/Login?fromOriginUri=${redirectUrl}/campaign/VAC`">登入/註冊</a>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'JustkaIcon',
  props: {
    juskaUrl: {
      type: String,
      default: '',
      require: false
    },
    idToken: {
      type: String,
      default: null,
      require: true
    },
    loginUrl: {
      type: String,
      default: '',
      required: true
    },
    redirectUrl: {
      type: String,
      default: '',
      required: true
    }
  },
  data () {
    return {
      /** 提示訊息是否開啟 */
      msgMode: true,
      /** justkaDialog是否開啟 */
      justkaDialog: false,
      /** 提示Dialog是否開啟 */
      dialogOption: false
    };
  },
  methods: {
    clickJuska () {
      this.idToken === null ? this.dialogOption = true : this.justkaDialog = true;
    }
  }
};
</script>

<style lang="scss" scoped>
/* web service for justKa */
.bearservice {
  .scroll-top-wrapper {
    position: fixed;
    opacity: 1;
    visibility: visible;
    text-align: center;
    z-index: 299;
    color: #eeeeee;
    width: 95px;
    height: 101px;
    line-height: 3em;
    right: 0;
    bottom: 42px;
    padding-top: 0px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    @media (max-width: 767px) {
      right: calc((100% - 540px) / 2);
    }
    @media (max-width: 570px) {
      right: 0;
    }
    @media (min-width: 768px) and (max-width: 991px) {
      right: calc((100% - 720px) / 2);
    }
    @media (min-width: 992px) {
      right: calc((100% - 960px) / 2);
    }
    @media (min-width: 1200px) {
      right: calc((100% - 1140px) / 2);
    }
    button,a {
      background: transparent;
      border: 0;
      outline: none;
      img.justka-img {
        width: 74px;
        height: 72px;
        display: block;
      }
    }
    a {
      display: block;
      padding-left: 10px;
    }
  }
}

.justka-msg {
  position: fixed;
  width: 200px;
  padding: 0.5em 1em;
  bottom: 105px;
  right: 86px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12.7907px);
  border-radius: 7px 7px 0px 7px;
  &::before {
    content: '';
    position: absolute;
    width: 200px;
    height: 56px;
    top:0; right:0; bottom:0; left:0;
    box-sizing: border-box;
    border-radius: 7px 7px 0px 7px;
    z-index: -1;
    margin: -10px;
  }
  border: 1px solid #D3D3D3;
  @media (max-width: 767px) {
    right: calc((100% - 370px) / 2);
  }
  @media (max-width: 570px) {
    right: 86px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    right: calc((100% - 530px) / 2);
  }
  @media (min-width: 992px) {
    right: calc((100% - 780px) / 2);
  }
  @media (min-width: 1200px) {
    right: calc((100% - 960px) / 2);
  }
  p {
    font-size: small;
    color: #182B56;
    line-height: 1.5;
    text-align: left;
  }
  button {
    position: absolute;
    right: 2px;
    top: -6px;
    line-height: 1.5;
    padding: 0;
  }
}

iframe.justkaBox{
  width: 100%;
  height: 100%;
  min-height: 50vh;
  border-radius: 5px;
}
</style>
