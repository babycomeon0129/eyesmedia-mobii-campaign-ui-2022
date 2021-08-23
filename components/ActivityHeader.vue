<template>
  <div class="container header">
    <div class="row">
      <div class="col-20">
        <img src="../static/images/logo.png" class="rwdimgmax">
      </div>
      <div class="col-21">
        <h1>榮民卡會員專區</h1>
      </div>
      <div class="col-20 hide-m hide-p member">
        <div class="row">
          <div class="col-6">
            訪客
          </div>
          <div class="col-6">
            <span class="no-bind">尚未綁卡</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  background: #fff;
  box-shadow: 0px 2px 7px -1px rgba(147, 137, 117, 0.2);
}

h1 {
  text-align: center;
  margin-bottom: 0;
  font-size: 30px;
  font-weight: bold;
}

.member {
  font-size: 18px;
  text-align: center;
  font-weight: bold;
  span{
    box-shadow: 0px 2.75px 9.625px -1.375px rgba(147, 137, 117, 0.2);
    color: #808080;
    padding: 3px 15px;
    border-radius: 15px ;
    &.no-bind {
      background: #FF8C05;
      color: #fff;
    }
  }
}
</style>
