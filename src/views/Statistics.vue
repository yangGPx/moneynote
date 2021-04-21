<template>
  <layout>
    {{ data }}
  </layout>
</template>
<script lang="ts">
  import store from '@/store/index2'
  import { Vue, Component } from 'vue-property-decorator'
  
  @Component
  export default class Statistics extends Vue{
    data: RecordItem[] = store.recordList
  }
</script>

<style lang="scss" scoped>
  
</style>