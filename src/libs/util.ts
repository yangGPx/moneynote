import dayjs from 'dayjs'

function dataClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

function  formatTime(time: string, formatType = 'YYYY-MM-DD'): string {
  return dayjs(time).format(formatType);
}

export {
  dataClone,
  formatTime
}