import { getItem, setItem } from './util'

const defaultKeyName = 'recordList';

type recordModel = {
  data: RecordItem[]
  fetch: () => RecordItem[]
  save: () => void
  create: (item: RecordItem) => boolean
}

const model:recordModel = {
  data: [],
  fetch: function() {
    this.data= getItem(defaultKeyName) || [] as RecordItem[];
    return this.data;
  },
  save: function () {
    setItem(defaultKeyName, this.data)
  },
  create: function(item: RecordItem) {
    if (item.amount > 0 && item.tags.length > 0) {
      this.data.push(item)
      return true;
    }
    return false;
  }
}

export default model