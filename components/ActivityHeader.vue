<template>
  <div class="channel-header">
    <div class="channel-container">
      <div class="channel-header-box">
        <div class="channel-header-item" @click="openInfoModal">
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

<script>
export default {
  name: 'ActivityHeader',
  methods: {
    openInfoModal () {
      const msg = `注意事項：

媽小里家再即會色外出查賣收？時象案，創選告類，早的樣式自演等明，朋輕內間，管童苦行皮腳種時輕應西野：程熱斯民作油得當我舉案也？字成樣日張華李，學起作變老要足開民門氣有去在音不小清。
媽小里家再即會色外出查賣收？時象案，創選告類，早的樣式自演等明，朋輕內間，管童苦行皮腳種時輕應西野：程熱斯民作油得當我舉案也？字成樣日張華李，學起作變老要足開民門氣有去在音不小清。
小里家再即會色外出查賣收？時象案，創選告類，早的樣式自演等明，朋輕內間，管童苦行皮腳種時輕應西野：程熱斯民作油得當我舉案也？字成樣日張華李，學起作變老要足開民門氣有去在音不小清。

小里家再即會色外出查賣收？時象案，創選告類，早的樣式自演等明，朋輕內間，管童苦行皮腳種時輕應西野：程熱斯民作油得當我舉案也？字成樣日張華李，學起作變老要足開民門氣有去在音不小清。小里家再即會色外出查賣收？時象案，創選告類，早的樣式自演等明，朋輕內間，管童苦行皮腳種時輕應西野：程熱斯民作油得當我舉案也？字成樣日張華李，學起作變老要足開民門氣有去在音不小清。`;
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
  background: #FF8C05;
  color: white;
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
