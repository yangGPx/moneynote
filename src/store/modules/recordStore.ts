import RecordModel from '@/model/RecordListModel'

type Store = {
  recordList: RecordItem[]
  recordCreate: (item: RecordItem) => boolean
  recordSave: () => void
}

const store:Store = {
  recordList:RecordModel.fetch(),
  recordCreate: function(item) {
    return RecordModel.create(item);
  },
  
  recordSave: function() {
    RecordModel.save();
  },
}
export default store;