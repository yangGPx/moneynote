import { getItem, setItem } from './util'

const defaultKeyName = 'recordList';

function recordClone(value: RecordItem):RecordItem {
  return JSON.parse(JSON.stringify(value))
}

function recordFetch():RecordItem[] {
  const list = getItem(defaultKeyName) || [] as RecordItem[];
  
  return list;
}

function recordSave(value: RecordItem[]):void {
  setItem(defaultKeyName, value)
}

export {
  recordClone,
  recordFetch,
  recordSave
}