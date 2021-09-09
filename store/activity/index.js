/** 一頁式活動頁專用 */

// 存放要儲存的狀態或是資料
const state = () => {
  return {
    /** 專屬新聞tab code */
    newsTab: undefined,
    /** 專屬優惠券tab code */
    voucherTab: undefined,
    /** 專屬商品tab code */
    productTab: undefined
  };
};

// 當我們在 component 中要設定、改變 state 中的資料，都需要透過 actions 底下的自訂方法，進一步呼叫 mutations 方法。
// Vuex 官方文件有特別提到 actions 是支持異步操作。
const actions = {
  callSetNewsTab ({ commit }, code) {
    if (code) {
      commit('setNewTab', code);
    }
  }
};

// 真正更新 state 的方法，第一個參數 state 會自動注入，要帶進來的資料在第二個參數。
// 只能做同步操作，不能做非同步操作。如要進行非同步操作請使用action
const mutations = {
  /** 選擇swiper tab 狀態
   * @param type mutation function name
   * @param typeCode 類型。 1:新聞 2:優惠券 3:熱門商品
   * @param code 分類編碼
   */
  setNewTab (state, { type, typeCode, code }) {
    switch (typeCode) {
      case 1 :
        state.newsTab = code;
        break;
      case 2:
        state.voucherTab = code;
        break;
      case 3:
        state.productTab = code;
        break;
    }
    console.log(state);
  }
};

// component 用來取得 state 的資料，在官方的說明當中建議大家將 getters 視為 computed 方法的概念
// (實際上在 component 引入時也是掛在 computed 底下)。
const getters = {
  getNewsTab (state) {
    return state.newsTab;
  }
};

// 最終要匯出
export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true // 多模組的時候，當有相同名稱的變數或方法才能區隔開
};
