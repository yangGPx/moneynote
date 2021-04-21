import tagStore from './modules/tagStore'
import recordStore from './modules/recordStore'

export default {
  ...tagStore,
  ...recordStore
};