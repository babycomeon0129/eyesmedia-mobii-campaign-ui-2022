<template>
  <div class="channel-header">
    <div class="channel-container">
      <div class="channel-header-box">
        <div class="channel-header-item">
          <span>活動資訊</span>
        </div>
        <div class="channel-header-title">
          <img src="../assets/image/channel-title.png">
        </div>
        <div class="channel-header-item">
          <span class="hi-user">Hi 訪客訪客訪客訪客訪客訪客</span>
          <button class="btn channel-btn">
            立即綁卡
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$header-height: 56px;
$channel-color: #FF9D42;

/** header */
.channel-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  height: $header-height;
  flex-direction: row;
  .channel-header-box {
    position: relative;
    display: flex;
    align-items: baseline;
    .channel-header-title {
      img {
        height: 100%;
        width: 100%;
        max-height: $header-height;
        max-width: 220px;
      }
    }
    .channel-header-item {
      white-space: nowrap;
      width: calc((100% - 220px) / 2);
      &:first-child {
        color: $channel-color;
        text-align: left;
        padding-left: 1em;
      }
      &:last-child {
        display: block;
        text-align: right;
        padding-right: 1em;
      }
      .hi-user {
        width: 150px;
        display: inline-block;
        overflow:hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        vertical-align: middle;
        @media (min-width: 768px) and (max-width: 991px) {
          width: 100px;
        }
      }
    }
    @media (max-width: 767px) {
      flex-direction: row-reverse;
      .channel-header-item:first-child {
        text-align: right;
        padding-right: 1em;
      }
      .channel-header-item:last-child {
        display: none;
      }
    }
  }
}

/** button */
.channel-btn {
  color: white;
  background: $channel-color;
  border-radius: 30px;
  padding: .25em 1em;
  box-shadow: 0px 2.75px 9.625px -1.375px rgba(147, 137, 117, 0.2);
  margin: 0 .5em;
}

/** share style */
.channel-header-item,
.channel-btn{
  font-size: medium;
  @media (max-width: 767px) {
    font-size: small;
  }
}
.channel-header .channel-container {
  max-width: 1140px;
  margin: 0 auto;
  background: white;
  box-shadow: 0px 2px 7px -1px rgba(147, 137, 117, 0.2);
  @media (max-width: 767px) {
    box-shadow: none;
  }
}

</style>
