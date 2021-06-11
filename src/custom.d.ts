
  type RecordItem = {
    tags: string[],
    notes: string,
    type: '+' | '-' | '',
    amount: number,
    createTime: string
  } 
  type Tag = {
    id: number | string,
    name: string,
    svg?: string
  }