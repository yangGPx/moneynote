import TagModel from '@/model/TagListModel'

type Store = {
  tagList: Tag[]
  tagRemove: (id: number|string) => boolean
  tagUpdate: (id: number|string, name: string) => 'success' | 'duplicated' | 'empty' | 'error'
  tagGetOne: (id: number|string) => Tag
  tagCreate: (name:string) => 'success' | 'duplicated' | 'empty'
}

const store:Store = {
  tagList:TagModel.fetch(),
  tagRemove: function(id) {
    return TagModel.delete(id);
  },
  tagUpdate: function(id, name) {
    return TagModel.update(id, name);
  },
  
  tagGetOne: function (id) {
    return TagModel.getOneById(id);
  },
  
  tagCreate: function (name) {
    return TagModel.createTag(name);
  }
}
export default store;