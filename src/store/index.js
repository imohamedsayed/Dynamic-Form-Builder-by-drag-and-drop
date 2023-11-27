import { createStore } from "vuex";

export default createStore({
  state: {
    formItem: null,
  },
  getters: {},
  mutations: {
    setFormItem(state, payload) {
      state.formItem = payload;
    },
  },
  actions: {
    editFormItem(context, item) {
      context.commit("setFormItem", item);
    },
  },
  modules: {},
});
