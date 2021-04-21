import { getItem, setItem } from './util'
import idCreator from '@/libs/IdCreator'

const defaultKeyName = 'tagList';

type tagModel = {
  data: Tag[]
  fetch: () => Tag[]
  save: () => void
  update: (id: number|string, name: string) => 'success' | 'duplicated' | 'empty' | 'error'
  delete: (id: number|string) => boolean
  createTag: (name:string) => 'success' | 'duplicated' | 'empty'
  getOneById: (id: number|string) => Tag
  checkDuplicated: (name: string) => boolean
}

const model: tagModel= {
  data: [],
  fetch() {
    this.data = getItem(defaultKeyName) || []
    return this.data;
  },

  save() {
    setItem(defaultKeyName, this.data)
  },
  update(id, name) {
    if(name.trim().length === 0) return 'empty';
    const item = this.getOneById(id);
    if (item) {
      if (this.checkDuplicated(name)) {
        return 'duplicated';
      }else {
        item.name = name;
        this.save();
        return 'success';
      }
    }
    return 'error'
  },
  delete(id) {
    id = id + '';
    for(let i = 0; i<this.data.length; i++) {
      if(this.data[i].id === parseInt(id, 10)) {
        this.data.splice(i, 1);
        this.save();
        return true;
      }
    }
    return false;
  },
  createTag(name) {
    if(name.trim().length === 0) return 'empty';
    if (this.checkDuplicated(name)) {
      return 'duplicated';
    }
    this.data.push({
      id: idCreator(),
      name
    });
    this.save()
    return 'success';
  },
  getOneById(id) {
    // 如果一个新页面直接getOne 需要先将数据从localStorage中拿出来
    if(this.data.length === 0) {
      this.fetch()
    }
    id = parseInt(`${id}`, 10);
    const list = this.data.filter(item => item.id === id);
    return list[0]
  },
  checkDuplicated(name: string) {
    const list = this.data.filter(item => item.name === name)
    return list.length > 0;
  }
}

export default model;