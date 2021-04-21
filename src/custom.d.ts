
  type RecordItem = {
    tags: string[],
    notes: string,
    type: string,
    amount: number,
    createTime: string
  } 
  type Tag = {
    id: number,
    name: string,
  }

  interface Window {
    store:{
      tagList: Tag[]
      tagRemove: (id: number|string) => boolean
      tagUpdate: (id: number|string, name: string) => 'success' | 'duplicated' | 'empty' | 'error'
      tagGetOne: (id: number|string) => Tag
      tagCreate: (name:string) => 'success' | 'duplicated' | 'empty'
      recordList: RecordItem[]
      recordCreate: (item: RecordItem) => boolean
      recordSave: () => void
    }
  }