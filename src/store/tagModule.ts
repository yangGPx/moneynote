import idCreator from '@/libs/IdCreator'
import router from '@/router'
import { getItem, setItem } from '@/model/util'
import { labelDefault } from '../const/index'

function checkDuplicated(tagList: Tag[], name: string) {
  const list = tagList.filter(item => item.name === name)
  return list.length > 0;
}

type TagType = 'in' | 'out';

type RootState = {
  tagList: Tag[]
  currentTag ?: Tag
  createdTagData: {in: Tag[], out: Tag[]}
  createdTagFlag: 'duplicated'| 'success' | 'empty' | ''
}

const store = {
  state:() => ({
    tagList: [],
    currentTag: undefined,
    createdTagData: {in: [], out: []},
    createdTagFlag: ''
  } as RootState),
  mutations: {
    fetchTags(state:any, type:TagType = 'out') {
      store.mutations.fetchCreatedTag(state, type);
      let list = Object.entries(labelDefault[type]).map(([key, value]) => {
        return {
          id: key,
          name: value,
          svg: key
        }
      })
      state.tagList = [...list, ...state.createdTagData[type]]
    },
    fetchCreatedTag(state:any, type: TagType = 'out') {
      state.createdTagData = getItem('createdTagData') || {in: [], out: []};
    },
    saveTags(state:any) {
      console.log(state.createdTagData);
      
      setItem('createdTagData', state.createdTagData)
    },
    createTag(state:any, {name, type = 'out'}: {name: string, type:TagType } ) {
      if(name.trim().length === 0) {
        state.createdTagFlag = 'empty';
        return;
      };
      if (checkDuplicated(state.tagList, name)) {
        state.createdTagFlag = 'duplicated';
        return;
      }
        
      state.createdTagData[type].push({
        id: idCreator(),
        name,
        type,
      });
      store.mutations.saveTags(state)
      state.createdTagFlag = 'success';
      
      store.mutations.fetchTags(state, type)
    },
    getOneTag(state:any, id:string, type: TagType) {
      // 如果一个新页面直接getOne 需要先将数据从localStorage中拿出来
      if(state.createdTagData.length === 0) {
        store.mutations.fetchCreatedTag(state)
      }
      state.currentTag = state.tagList.filter(item => item.id === parseInt(id, 10))[0];
    },
    updateTag(state:any, payload: { id: string, name:string }) {
      const { name } = payload;
      if(name.trim().length === 0) return 'empty';

      if (state.currentTag) {
        console.log('update', name);
        
        state.currentTag.name = name;
        store.mutations.saveTags(state);
      }
    },
    deleteTag(state:any, {id, type = 'out'}:{id: string | number, type:TagType}) {
      id = id + '';
      let tagData = state.createdTagData[type];
      for(let i = 0; i<tagData.length; i++) {
        if(tagData[i].id === parseInt(id, 10)) {
          tagData.splice(i, 1);
          router.back()
          store.mutations.saveTags(state);
        }
      }
    },
  }
}

export default store;
