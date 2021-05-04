import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/model/util'
import idCreator from '@/libs/IdCreator'

Vue.use(Vuex)

function checkDuplicated(tagList: Tag[], name: string) {
  const list = tagList.filter(item => item.name === name)
  return list.length > 0;
}

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as Tag[],
  },
  mutations: {
    fetchRecord(state) {
      state.recordList = getItem('recordList') || [];
    },
    saveRecordList(state) {
      setItem('recordList', state.recordList);
    },
    createRecord(state,item: RecordItem) {
      console.log(item);
      if (item.amount > 0 && item.tags.length > 0) {
        state.recordList.push(item)
        store.commit('saveRecordList')
      }
    },
    fetchTags(state) {
      state.tagList = getItem('tagList') || []
    },
    saveTags(state) {
      setItem('tagList', state.tagList)
    },
    createTag(state, name:string): 'duplicated'| 'success' | 'empty' {
      if(name.trim().length === 0) return 'empty';
      if (checkDuplicated(state.tagList, name)) {
        return 'duplicated';
      }
      state.tagList.push({
        id: idCreator(),
        name
      });
      store.commit('saveTags')
      return 'success';
    },

  }
})

export default store;