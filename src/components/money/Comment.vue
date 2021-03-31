<template>
  <label class="comments">
    备注 
    <input placeholder="在这里添加备注"/>
  </label>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component } from 'vue-property-decorator'

  @Component
  export default class Comment extends Vue{
    
  }
</script>

<style lang="scss" scoped>
  .comments{
    padding: 10px 20px;background: #f7f4f4;display: flex;
    align-items: center;
    input{
      margin-left: 15px;padding: 10px 5px;border:0;
      outline: none;background: inherit;flex-grow:1;
    }
  }
</style>