const local = window.localStorage;

function getItem(key:string){
  const value = local.getItem(key);
  return value ? JSON.parse(value) : value;
}

function setItem(key:string, data: any){
  local.setItem(key, JSON.stringify(data))
}

export {
  getItem,
  setItem
}