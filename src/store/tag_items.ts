import {
  getDocsCountByTag,
  getItems,
  nextPage,
  prevPage, queryRefByTag
} from "~/util/store";

export const state = () => ({
  items: [],
  currentPage: 0,
  docsCount: 0
});

export const mutations = {
  updateItemPage(state, payload) {
    state.currentPage = payload;
  },
  updateItems(state, payload) {
    state.items = payload;
  },
  updateDocsCount(state, payload) {
    state.docsCount = payload;
  }
};

export const actions = {
  async loadItems({ commit }, tagName) {
    console.log("tag: " + tagName)
    const ddd = await getDocsCountByTag(this, tagName);
    commit("updateDocsCount", ddd);

    const proj = await getItems(this, queryRefByTag(this, tagName))
    commit("updateItems", proj);
  },

  async nextPage({ commit, getters }, tagName) {
    commit(
      "updateProjects",
      await nextPage(this, queryRefByTag(this, tagName), getters.getItems)
    );
  },

  async prevPage({ commit, getters }, tagName) {
    commit(
      "updateProjects",
      await prevPage(this, queryRefByTag(this, tagName), getters.getItems)
    );
  }
};

export const getters = {
  getItems(state) {
    return state.items;
  },
  getDocsCount(state) {
    return state.docsCount;
  },
  getCurrentPage(state) {
    return state.currentPage;
  }
};
