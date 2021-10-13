/** 一頁式活動頁專用 */

// 存放要儲存的狀態或是資料
const state = () => {
  return {
    /** tab 類型 card:卡片 voucher:優惠券 product:熱門商品 */
    tabType: '',
    /** 專屬新聞tab */
    card: {
      index: 0,
      tabs: []
    },
    /** 專屬優惠券tab */
    voucher: {
      index: 0,
      tabs: []
    },
    /** 專屬商品tab */
    product: {
      index: 0,
      tabs: []
    }
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
  /** 儲存每個tab的資料
   * @param {String} type mutation function name
   * @param {String} typeCode 類型。 card:卡片 voucher:優惠券 product:熱門商品
   * @param {Array} data 資料
   */
  setNewTab (state, { type, typeCode, data }) {
    state[`${typeCode}`].tabs = data;
    console.log(state[`${typeCode}`].tabs);
  },
  /** 儲存tab 的index
   *
   * @param {String} typeCode 類型。 card:卡片 voucher:優惠券 product:熱門商品
   * @param {Number} index index
   */
  setTabIndex (state, { type, typeCode, index }) {
    state[`${typeCode}`].index = index;
    state.tabType = typeCode;
    console.log(state[`${typeCode}`]);
  }
};

// component 用來取得 state 的資料，在官方的說明當中建議大家將 getters 視為 computed 方法的概念
// (實際上在 component 引入時也是掛在 computed 底下)。
const getters = {
  showTab (state) {
    // return state[state.tabType].tabs[state[state.tabType].index];
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
