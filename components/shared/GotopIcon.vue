<template>
  <button v-show="goTopDisplay" type="button" class="btn" @click="goTop">
    <div class="go-top">
      <img src="@/static/images/campaign/icon/goTop.png">
    </div>
  </button>
</template>

<script>
export default {
  name: 'GotopIcon',
  data () {
    return {
      goTopDisplay: false
    };
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    goTop () {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    },
    handleScroll () {
      this.goTopDisplay = window.scrollY > 200;
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  position: fixed;
  bottom: 130px;
  right: 25px;
  width: 51px;
  height: 64px;
  padding: 0;
  z-index: 2;
  &:focus {
    outline: none;
    box-shadow: none;
  }
  .go-top {
    background: rgba(165, 165, 165, 0.2);
    border-radius: 8px;
    position: absolute;
    top: 0;
    left: 0;
    width: 38px;
    height: 38px;
    &::before {
      content: '';
      position: absolute;
      width: 38px;
      height: 38px;
      top:0;
      right:0;
      background: rgba(165, 165, 165, 0.2);
      box-shadow: 0px 4px 12.27px rgba(0, 0, 0, 0.25);
      backdrop-filter: blur(12px);
      border-radius: 8px;
      box-sizing: border-box;
      z-index: -1;
    }
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 38px;
      height: 38px;
      z-index: 2;
      opacity: 1;
    }
  }
  @media (max-width: 767px) {
    right: calc((100% - 490px) / 2);
  }
  @media (max-width: 570px) {
    right: 25px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    right: calc((100% - 670px) / 2);
  }
  @media (min-width: 992px) {
    right: calc((100% - 910px) / 2);
  }
  @media (min-width: 1200px) {
    right: calc((100% - 1090px) / 2);
  }
}

</style>
