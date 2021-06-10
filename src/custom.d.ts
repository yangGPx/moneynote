
  type RecordItem = {
    tags: string[],
    notes: string,
    type: string,
    amount: number,
    createTime: string
  } 
  type Tag = {
    id: number | string,
    name: string,
    svg?: string
  }