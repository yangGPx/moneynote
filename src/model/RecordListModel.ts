const storageKeyName = 'recordList';

const model = {
  clone(value: RecordItem):RecordItem {
    return JSON.parse(JSON.stringify(value))
  },

  fetch():RecordItem[] {
    const list = JSON.parse(window.localStorage.getItem(storageKeyName) || '[]') as RecordItem[];
    return list;
  },

  save(value: RecordItem[]):void {
    window.localStorage.setItem(storageKeyName, JSON.stringify(value))
  }
}

export default model;