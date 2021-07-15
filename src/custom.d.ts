
  type RecordItem = {
    tags: string[],
    notes: string,
    type: TagType,
    amount: number,
    createTime: string
  } 
  type Tag = {
    id: number | string,
    name: string,
    svg?: string,
    type?: TagType
  }

  type ResultItem = {
    title: string,
    list: RecordItem[],
    inTotal: number,
    outTotal: number,
  }

  type TagType = 'in' | 'out';