<template>
  <layout>
    {{ recordList }}
  </layout>
</template>
<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  
  @Component
  export default class Statistics extends Vue{
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