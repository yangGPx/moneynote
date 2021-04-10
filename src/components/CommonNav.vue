<template>
  <nav class="common-nav">
    <router-link
      v-for="item in linkList"
      :key="item.name"
      active-class="active"
      :to="`/${item.name}`">
      <icon :name="item.name"/>
      <span>{{ item.title }}</span>
    </router-link>
  </nav>
</template>
<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'

  type linkItem = {
    name: string
    title: string
  }

  @Component
  export default class CommonNav extends Vue{
    linkList: linkItem[] = [
      {name: 'labels', title: '标签'},
      {name: 'money', title: '记一笔'},
      {name: 'statistics', title: '统计'},
    ]
  }
</script>

<style lang="scss" scoped>
  .common-nav{
    display: flex;
    height: 56px;
    box-shadow: 0px -2px 2px 1px #e5e5e5;
    a{
      $defaultColor: #999;
      $activeColor: #333;
      height: 100%;
      display: flex;
      flex-grow: 1;
      font-size: 12px;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      fill: $defaultColor;
      color: $defaultColor;
      &.active{
        fill: $activeColor;
        color: $activeColor;
      }
    }
  }
</style>