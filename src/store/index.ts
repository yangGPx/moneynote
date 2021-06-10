import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import { getItem, setItem } from '@/model/util'
import idCreator from '@/libs/IdCreator'
import { labelDefault } from '../const/index'

Vue.use(Vuex)

function checkDuplicated(tagList: Tag[], name: string) {
  const list = tagList.filter(item => item.name === name)
  return list.length > 0;
}

type RootState = {
  recordList: RecordItem[]
  tagList: Tag[]
  currentTag ?: Tag
  createdTags: Tag[]
  createdTagFlag: 'duplicated'| 'success' | 'empty' | ''
}

const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    currentTag: undefined,
    createdTags: [],
    createdTagFlag: ''
  } as RootState,
  mutations: {
    fetchRecord(state) {
      state.recordList = getItem('recordList') || [];
    },
    saveRecordList(state) {
      setItem('recordList', state.recordList);
    },
    createRecord(state,item: RecordItem) {
      if (item.amount > 0 && item.tags.length > 0) {
        console.log(item);
        state.recordList.push(item)
        store.commit('saveRecordList')
      }
    },
    fetchTags(state) {
      state.createdTags = getItem('createdTags') || [];
      let list = Object.entries(labelDefault).map(([key, value]) => {
        return {
          id: key,
          name: value,
          svg: key
        }
      })
      state.tagList = [...list, ...state.createdTags]
    },
    fetchCreatedTag(state) {
      state.createdTags = getItem('createdTags');
    },
    saveTags(state) {
      setItem('createdTags', state.createdTags)
    },
    createTag(state, name:string) {
      if(name.trim().length === 0) {
        state.createdTagFlag = 'empty';
        return;
      };
      if (checkDuplicated(state.tagList, name)) {
        state.createdTagFlag = 'duplicated';
        return;
      }
      state.createdTags.push({
        id: idCreator(),
        name
      });
      store.commit('saveTags')
      state.createdTagFlag = 'success';
      store.commit('fetchTags') // 更新 全部列表
    },
    getOneTag(state, id:string) {
      // 如果一个新页面直接getOne 需要先将数据从localStorage中拿出来
      if(state.createdTags.length === 0) {
        store.commit('fetchCreatedTag')
      }
      state.currentTag = state.createdTags.filter(item => item.id === parseInt(id, 10))[0];
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
      for(let i = 0; i<state.createdTags.length; i++) {
        if(state.createdTags[i].id === parseInt(id, 10)) {
          state.createdTags.splice(i, 1);
          router.back()
          store.commit('saveTags');
        }
      }
    },
  }
})

export default store;
