// 存放要儲存的狀態或是資料
const state = () => {
  return {
    // ...
  };
};

// 當我們在 component 中要設定、改變 state 中的資料，都需要透過 actions 底下的自訂方法，進一步呼叫 mutations 方法。
// Vuex 官方文件有特別提到 actions 是支持異步操作。
const actions = {
  // ...
};

// 真正更新 state 的方法，第一個參數 state 會自動注入，要帶進來的資料在第二個參數。
const mutations = {
  // ...
};

// component 用來取得 state 的資料，在官方的說明當中建議大家將 getters 視為 computed 方法的概念
// (實際上在 component 引入時也是掛在 computed 底下)。
const getters = {
  // ...
};

// 最終要匯出
export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true // 多模組的時候，當有相同名稱的變數或方法才能區隔開
};
