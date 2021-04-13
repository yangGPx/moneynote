<template>
  <label class="forum-item">
    备注
    <input placeholder="在这里添加备注" @input="commentFn"/>
  </label>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop } from 'vue-property-decorator'

  @Component
  export default class ForumItem extends Vue{
    @Prop({ default: '' }) value:string|undefined;
    commentFn(event: KeyboardEvent) {
      const target = event.target as HTMLInputElement;
      this.$emit('update:value', target.value);
    }
  }
</script>

<style lang="scss" scoped>
  .forum-item{
    padding: 8px 20px;background: #f7f4f4;display: flex;
    align-items: center;
    input{
      margin-left: 15px;padding: 10px 5px;border:0;
      outline: none;background: inherit;flex-grow:1;
    }
  }
</style>