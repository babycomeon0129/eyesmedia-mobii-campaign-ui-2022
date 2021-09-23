<template>
  <div class="bearservice">
    <div class="scroll-top-wrapper">
      <span class="scroll-top-inner">
        <button type="button">
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
</template>

<script>
export default {
  name: 'JustkaIcon',
  data () {
    return {
      /** 提示訊息是否開啟 */
      msgMode: true
    };
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
    button {
      background: transparent;
      border: 0;
      outline: none;
      img.justka-img {
        width: 74px;
        height: 72px;
        display: block;
      }
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
</style>
