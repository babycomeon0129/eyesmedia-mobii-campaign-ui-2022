<template>
  <div class="channel-wrap">
    <div class="page404">
      <img src="@/static/images/common/404.png" class="errorImg" alt="404">
      <h4>404</h4>
      <p>您造訪的頁面已迷失在Mobii!星球中...</p>
      <div class="row errorMenu">
        <div class="col-3">
          <a :href="env.mobii">
            <img src="@/static/images/common/icon404-1.png" class="rwdimg" alt="Mobii">
            <p>返回首頁</p>
          </a>
        </div>
        <div class="col-3">
          <a :href="`${env.mobii}/Travel`">
            <img src="@/static/images/common/icon404-2.png" class="rwdimg" alt="去旅行">
            <p>去旅行</p>
          </a>
        </div>
        <div class="col-3">
          <a :href="`${env.mobii}/Voucher/Offers`">
            <img src="@/static/images/common/icon404-3.png" class="rwdimg" alt="賺優惠">
            <p>賺優惠</p>
          </a>
        </div>
        <div class="col-3">
          <a :href="`${env.mobii}/Shopping`">
            <img src="@/static/images/common/icon404-4.png" class="rwdimg" alt="逛商場">
            <p>逛商場</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404',
  components: {},
  middleware (context) {
  },
  asyncData (context) {
    return {
      env: context.env.SIDE_ENV
    };
  },
  data () {
    return {};
  },
  head () {
    return {
      title: '找不到頁面。'
    };
  }
};
</script>

<style lang="scss" scoped>
.page404 {
  padding: 10em 3em;
  max-width: 540px;
  min-width: 320px;
  text-align: center;
  margin: 0 auto;
  @media (max-width: 375px) {
    padding: 10em 1em;
  }
  h4 {
    padding-top: 1em;
    font-weight: 700;
    font-size: 1.5em;
  }
  p {
    color: #333;
    margin-top: 5px;
    font-weight: 500;
    font-size: 1em;
  }
  .errorMenu {
    max-width: 600px;
    min-width: 300px;
    width: 90%;
    padding: 2em 1em;
    margin: 0 auto;
    .col-3 {
      padding: .5em
    }
    p {
      font-size: .8em;
    }
  }
}

.errorImg {
  width: 70%;
  max-width: 360px;
}

</style>
