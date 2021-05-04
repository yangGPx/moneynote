import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import { getItem, setItem } from '@/model/util'
import idCreator from '@/libs/IdCreator'

Vue.use(Vuex)

function checkDuplicated(tagList: Tag[], name: string) {
  const list = tagList.filter(item => item.name === name)
  return list.length > 0;
}

type RootState = {
  recordList: RecordItem[]
  tagList: Tag[]
  currentTag ?: Tag
}

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as Tag[],
    currentTag: undefined
  } as RootState,
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
    getOneTag(state, id:string) {
      // 如果一个新页面直接getOne 需要先将数据从localStorage中拿出来
      if(state.tagList.length === 0) {
        store.commit('fetchTags')
      }
      state.currentTag = state.tagList.filter(item => item.id === parseInt(id, 10))[0];
    },
    updateTag(state, payload: { id: string, name:string }) {
      const { name } = payload;
      if(name.trim().length === 0) return 'empty';
      if (state.currentTag) {
        state.currentTag.name = name;
          store.commit('saveTags');
        }
    },
    deleteTag(state, id: string | number) {
      id = id + '';
      for(let i = 0; i<state.tagList.length; i++) {
        if(state.tagList[i].id === parseInt(id, 10)) {
          state.tagList.splice(i, 1);
          router.back()
          store.commit('saveTags');
        }
      }
    },
  }
})

export default store;