<template>
  <ul :class="`tabs ${active}-tab`">
    <li @click="active = 'out'">支出</li>
    <li @click="active = 'in'">收入</li>
  </ul>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component } from 'vue-property-decorator'

  @Component
  export default class Tabs extends Vue{
    active = 'out';
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
      transition: 0.25s;
    }
    &.in-tab::before{
      left: 50%;
    }
  }
</style>