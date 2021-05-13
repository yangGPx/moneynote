function dataClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

export {
  dataClone
}