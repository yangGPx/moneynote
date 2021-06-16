function dataClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

function  formatTime(time: string, formatType = 'YYYY-MM-DD'): string {
  return window.dayjs(time).format(formatType);
}

export {
  dataClone,
  formatTime
}