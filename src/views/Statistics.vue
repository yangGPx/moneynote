<template>
  <layout>
    {{ data }}
  </layout>
</template>
<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  
  @Component
  export default class Statistics extends Vue{
    data: RecordItem[] = window.recordList
  }
</script>

<style lang="scss" scoped>
  
</style>