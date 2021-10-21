<template>
  <div class="channel-header">
    <div class="channel-container">
      <div class="channel-header-box">
        <div class="channel-header-item">
          <a href="https://www.mobii.ai/">
            <img src="@/static/images/campaign/icon/icon-home.png" class="rwdimgmax" alt="回Mobbi">
          </a>
        </div>
        <div class="channel-header-title">
          <img :src="titleImg">
        </div>
        <!-- 登入 -->
        <div v-show="!isLogin" class="channel-header-item">
          <span class="hi-user" style="display: none;">Hi 訪客訪客訪客訪客訪客訪客</span>
          <a class="btn channel-btn" :href="`${loginUrl}/Login?fromOriginUri=${redirectUrl}/campaign/VAC`">
            登入/註冊
          </a>
        </div>
        <!-- menu -->
        <div v-show="isLogin" class="channel-header-item">
          <el-dropdown trigger="click" @visible-change="openMenu = $event">
            <div class="menu-icon" :class="{'change': openMenu}">
              <div class="bar1" />
              <div class="bar2" />
              <div class="bar3" />
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item><a href="https://www.mobii.ai/Member" target="_blank"><img src="@/static/images/campaign/icon/icon-menber.png" class="rwdimgmax" alt="我的會員頁">我的會員頁</a></el-dropdown-item>
                <el-dropdown-item><a href="https://www.mobii.ai/MemberFunction/MemberCard?showBack=true" target="_blank"><img src="@/static/images/campaign/icon/icon-card.png" class="rwdimgmax" alt="我的卡片">我的卡片</a></el-dropdown-item>
                <!-- 榮福專案專有選項 -->
                <el-dropdown-item v-if="isVac">
                  <nuxt-link to="/campaign/VacCard">
                    <img src="@/static/images/campaign/icon/icon-addcard.png" class="rwdimgmax" alt="申請榮福卡">申請榮福卡
                  </nuxt-link>
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
import { mapGetters } from 'vuex';

export default {
  name: 'CampaignHeader',
  props: {
    titleImg: {
      type: String,
      default: '@/static/images/campaign/icon/icon-home.png',
      required: false
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
    const isVac = this.$route.params.eventId === 'VAC';
    return {
      openMenu: false, // menu開關
      isVac // 是否為榮福卡專案
    };
  },
  computed: {
    ...mapGetters('campaign', ['isLogin'])
  },
  methods: {
    login () {
      // location.href = 'https://192.168.58.131:8083/campaign/VAC';
    }
  }
};
</script>

<style lang="scss" scoped>
/** button */
.channel-btn {
  background: #fff;
  border: 1px solid #ff8c05;
  color: #ff8c05;
  border-radius: 30px;
  padding: 0.25em 1em;
  box-shadow: 0px 2.75px 9.625px -1.375px rgba(147, 137, 117, 0.2);
  margin: 0 0.5em;
  &:hover {
    background: #ff8c05;
    color: #fff;
  }
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
    transition: .3s;
    a {
      padding: .1em 0;
      color: #fff;
      display: block;
      border-bottom: .5px solid rgba(182,192,213,.5);
    }
    img {
      margin-right: .5em;
    }
    &:last-of-type {
      a {
        border-bottom: none;
      }
    }
    &:hover {
      background: #000;
    }
  }
  .popper__arrow {
    &::after {
      border-bottom-color: #13334C;
    }
  }
}

</style>
