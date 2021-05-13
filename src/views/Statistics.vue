<template>
  <layout>
    <tabs :dataSource="moneyTypeTabs" :value.sync="moneyType"/>
  </layout>
</template>
<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import Tabs from '@/components/Tabs.vue'
  import { moneyTypeTabs } from '@/const'

  @Component({
    components: {
      Tabs
    }
  })
  export default class Statistics extends Vue{
    moneyType = ''
    moneyTypeTabs = moneyTypeTabs
    created() {
      this.$store.commit('fetchRecord')
    }
    get recordList() {
      return this.$store.state.recordList;
    }
  }
</script>

<style lang="scss" scoped>
  
</style>