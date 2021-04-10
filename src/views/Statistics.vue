<template>
  <layout>
    {{ data }}
  </layout>
</template>
<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import { recordFetch } from '@/model/RecordListModel'
  
  @Component
  export default class Statistics extends Vue{
    data: RecordItem[] = recordFetch()
  }
</script>

<style lang="scss" scoped>
  
</style>