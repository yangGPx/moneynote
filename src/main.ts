import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Layout from './components/Layout.vue'
import Icon from './components/Icon.vue'
import TagModel from '@/model/TagListModel'
import RecordModel from '@/model/RecordListModel'

Vue.config.productionTip = false

Vue.component('layout', Layout)
Vue.component('icon', Icon)

// 利用window做全局状态管理 
// 在小项目中体现不出来，大项目多人协作开发中，如果同一份数据，有多种获取、操作数据的方法，可能导致不同数据不统一

window.store = {
  tagList:TagModel.fetch(),
  recordList :RecordModel.fetch(),
  tagRemove = function(id) {
    return TagModel.delete(id);
  },
  tagUpdate: function(id, name) {
    return TagModel.update(id, name);
  },
  
  tagGetOne: function (id) {
    return TagModel.getOneById(id);
  },
  
  tagCreate: function (name) {
    return TagModel.createTag(name);
  },
  
  recordCreate = function(item) {
    return RecordModel.create(item);
  },
  
  recordSave:= function() {
    RecordModel.save();
  },
}


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
