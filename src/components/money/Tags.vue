<template>
  <div class="tags">
    <ul class="tag-list">
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
      <li>衣</li>
    </ul>
    <div class="add-tag">
      <span>新增标签</span>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component } from 'vue-property-decorator'

  @Component
  export default class Tags extends Vue{
    
  }
</script>

<style lang="scss" scoped>
  .tags{
    flex-grow: 1;padding: 16px 20px;display: flex;
    flex-direction: column;justify-content: flex-end;
    .tag-list{
      li{
        display: inline-block;width: 50px;height: 24px;
        line-height: 24px;background: #d9d9d9;text-align: center;
        border-radius: 24px;margin-right: 15px;margin-bottom: 15px;
      }
    }
    .add-tag{
      span{
        color: #999;border-bottom:1px solid;padding-bottom: 3px;
      }
    }
  }
</style>