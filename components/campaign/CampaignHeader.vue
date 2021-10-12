<template>
  <div class="channel-header">
    <div class="channel-container">
      <div class="channel-header-box">
        <div class="channel-header-item" @click="openInfoModal">
          <a><i class="material-icons">home</i></a>
        </div>
        <div class="channel-header-title">
          <img src="@/static/images/test/channel-title.png">
        </div>
        <div class="channel-header-item" style="display: none;">
          <span class="hi-user">Hi 訪客訪客訪客訪客訪客訪客</span>
          <button class="btn channel-btn">
            登入/註冊
          </button>
        </div>
        <div class="channel-header-item">
          <el-dropdown trigger="click">
            <div class="menu-icon" split-button :class="{'change': openMenu}" @click="openMenu = !openMenu">
              <div class="bar1" />
              <div class="bar2" />
              <div class="bar3" />
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item><a>我的會員頁</a></el-dropdown-item>
                <el-dropdown-item><a>我的卡片</a></el-dropdown-item>
                <!-- 榮福專案專有選項 -->
                <el-dropdown-item v-if="isVac">
                  <a>申請榮福卡</a>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CampaignHeader',
  data () {
    const isVac = this.$route.params.eventId === 'VAC';
    return {
      openMenu: false,
      isVac // 是否為榮福卡專案
    };
  },
  methods: {
    openInfoModal () {
      const msg = `注意事項：

      媽小里家再即會色外出查賣收？時象案，創選告類，早的樣式自演等明，朋輕內間，管童苦行皮腳種時輕應西野：程熱斯民作油得當我舉案也？字成樣日張華李，學起作變老要足開民門氣有去在音不小清。
      媽小里家再即會色外出查賣收？時象案，創選告類，早的樣式自演等明，朋輕內間，管童苦行皮腳種時輕應西野：程熱斯民作油得當我舉案也？字成樣日張華李，學起作變老要足開民門氣有去在音不小
      媽小里家再即會色外出查賣收？時象案，創選告類，早的樣式自演等明，朋輕內間，管童苦行皮腳種時輕應西野：程熱斯民作油得當我舉案也？字成樣日張華李，學起作變老要足開民門氣有去在音不小
      媽小里家再即會色外出查賣收？時象案，創選告類，早的樣式自演等明，朋輕內間，管童苦行皮腳種時輕應西野：程熱斯民作油得當我舉案也？字成樣日張華李，學起作變老要足開民門氣有去在音不小
      媽小里家再即會色外出查賣收？時象案，創選告類，早的樣式自演等明，朋輕內間，管童苦行皮腳種時輕應西野：程熱斯民作油得當我舉案也？字成樣日張華李，學起作變老要足開民門氣有去在音不小
      媽小里家再即會色外出查賣收？時象案，創選告類，早的樣式自演等明，朋輕內間，管童苦行皮腳種時輕應西野：程熱斯民作油得當我舉案也？字成樣日張華李，學起作變老要足開民門氣有去在音不小
      媽小里家再即會色外出查賣收？時象案，創選告類，早的樣式自演等明，朋輕內間，管童苦行皮腳種時輕應西野：程熱斯民作油得當我舉案也？字成樣日張華李，學起作變老要足開民門氣有去在音不小
      媽小里家再即會色外出查賣收？時象案，創選告類，早的樣式自演等明，朋輕內間，管童苦行皮腳種時輕應西野：程熱斯民作油得當我舉案也？字成樣日張華李，學起作變老要足開民門氣有去在音不小`;
      this.$alert(msg, '活動資訊', {
        showConfirmButton: false,
        customClass: 'modal-style'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
/** button */
.channel-btn {
  background: #ff8c05;
  color: white;
  border-radius: 30px;
  padding: 0.25em 1em;
  box-shadow: 0px 2.75px 9.625px -1.375px rgba(147, 137, 117, 0.2);
  margin: 0 0.5em;
}

/** share style */
.channel-header-item,
.channel-btn {
  font-size: medium;
  @media (max-width: 767px) {
    font-size: small;
  }
}
// mene icon
.menu-icon {
  display: inline-block;
  cursor: pointer;
}

.bar1,
.bar2,
.bar3 {
  width: 30px;
  height: 4px;
  border-radius: 10px;
  background-color: #333;
  margin: 6px 0;
  transition: 0.4s;
}

.change {
  .bar1 {
    -webkit-transform: rotate(-45deg) translate(-7px, 6px);
    transform: rotate(-45deg) translate(-7px, 6px);
  }
  .bar2 {
    opacity: 0;
  }
  .bar3 {
    -webkit-transform: rotate(45deg) translate(-8px, -8px);
    transform: rotate(45deg) translate(-8px, -8px);
  }
}

// menu list
::v-deep.el-dropdown-menu {
  background: #13334C;
  border:none;
  .el-dropdown-menu__item {
    color: #fff;
  }
  .popper__arrow {
    &::after {
      border-bottom-color: #13334C;
    }
  }
}

</style>
