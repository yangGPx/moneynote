<template>
  <label class="forum-item">
    <span>{{ fieldName }}</span>
    <input :placeholder="placeholder" @input="commentFn" :value="value"/>
  </label>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop } from 'vue-property-decorator'

  @Component
  export default class ForumItem extends Vue{
    @Prop({ default: '' }) value:string|undefined;
    @Prop({ default: '备注' }) fieldName!: string;
    @Prop({ default: '' }) placeholder ?: string;

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
    span{
      flex-shrink: 0;
    }
  }
</style>

