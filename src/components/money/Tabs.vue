<template>
  <ul class="tabs">
    <li>支出</li>
    <li>收入</li>
  </ul>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component } from 'vue-property-decorator'

  @Component
  export default class Tabs extends Vue{
    
  }
</script>

<style lang="scss" scoped>
  .tabs{
    display: flex;justify-content: center;align-items: center;
    height: 64px;font-size: 24px;position: relative;
    background: #C4C4C4;
    li{
      flex-grow: 1;text-align: center;
    }
    &::before{
      content: '';display: block;position: absolute;
      bottom: 0;left: 0;height: 3px;width: 50%;background: #333;
    }
  }
</style>