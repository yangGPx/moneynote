// Tag 的id生成器，id 唯一 而且生成之后不再修改 
const ID_KEY_NAME = '_MaxId';
let id: number = parseInt(window.localStorage.getItem(ID_KEY_NAME) || '0', 10) || 0;

function idCreator(){
  id++;
  window.localStorage.setItem(ID_KEY_NAME, id.toString());
  return id;
}

export default idCreator;