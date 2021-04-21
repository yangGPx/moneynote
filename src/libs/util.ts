function dataClone(value: any):RecordItem {
  return JSON.parse(JSON.stringify(value))
}

export {
  dataClone
}