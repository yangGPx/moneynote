import { getItem, setItem } from '@/model/util'

type RootState = {
  recordList: RecordItem[]
}

const store = {
  state:() => ({
    recordList: [],
  } as RootState),
  mutations: {
    fetchRecord(state: any) {
      state.recordList = getItem('recordList') || [];
    },
    saveRecordList(state: any) {
      setItem('recordList', state.recordList);
    },
    createRecord(state: any,item: RecordItem) {
      if (item.amount > 0 && item.tags.length > 0) {
        state.recordList.push(item)
        store.mutations.saveRecordList(state)
        window.alert('记账成功')
      }
    },
  }
}

export default store;
