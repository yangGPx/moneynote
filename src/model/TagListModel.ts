import { getItem, setItem } from './util'

const defaultKeyName = 'tagList';
const mockData = ['餐饮','购物', '日用', '交通', '水果'];

type tagModel = {
  data: string[],
  fetch: () => string[],
  save: () => void,
  createTag: (name:string) => boolean,
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

  createTag(name) {
    if (this.data.indexOf(name) > -1) {
      return false;
    }
    this.data.push(name);
    this.save()
    return true;
  },

}

export default model;