const moneyTypeTabs = Object.freeze([
    {
      text: '支出',
      value: '-'
    },
    {
      text: '收入',
      value: '+'
    },
])

const weekCn = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']

const labelDefault = {
  breakfast: '早餐',
  lunch: '午餐',
  dinner: '晚餐',
  traffic: '交通',
  fruit: '水果',
  snacks: '零食',
  daily: '日用',
  clothes: '服饰',
  pets: '宠物',
}

export {
  moneyTypeTabs,
  weekCn,
  labelDefault
}