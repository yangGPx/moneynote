<template>
  <nav class="common-nav">
    <router-link to="/money">
      <icon name="money"/>
      <span>记一笔</span>
    </router-link>
    <router-link to="/labels">
      <icon name="labels"/>
      <span>标签</span>
    </router-link>
    <router-link to="/statistics">
      <icon name="statistics"/>
      <span>统计</span>
    </router-link>
  </nav>
</template>
<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'

  @Component
  export default class CommonNav extends Vue{
    
  }
</script>

<style lang="scss" scoped>
  .common-nav{
    display: flex;
    height: 56px;
    box-shadow: 0px -2px 2px 1px #e5e5e5;
    a{
      height: 100%;
      display: flex;
      flex-grow: 1;
      font-size: 12px;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }
</style>