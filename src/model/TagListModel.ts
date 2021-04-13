import { getItem, setItem } from './util'

const defaultKeyName = 'tagList';

type tagModel = {
  data: string[],
  fetch: () => string[],
  save: () => void,
  createTag: (name:string) => 'success' | 'duplicated' | 'empty',
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
    if(name.trim().length === 0) return 'empty';
    if (this.data.indexOf(name) > -1) {
      return 'duplicated';
    }
    this.data.push(name);
    this.save()
    return 'success';
  },

}

export default model;