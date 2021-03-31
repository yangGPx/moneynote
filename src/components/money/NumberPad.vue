<template>
  <div class="number-pad">
    <p class="input-wrapper">
      <input v-model="output"/>
    </p>
    <div class="number-btn-list" @click="actionHanlder">
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button @click.stop="delLastOne">删除</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button @click.stop="empty">清空</button>
      <button>3</button>
      <button>2</button>
      <button>1</button>
      <button class="ok-key" @click.stop="okFn">OK</button>
      <button class="zero-key">0</button>        
      <button>.</button>        
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component } from 'vue-property-decorator'

  @Component
  export default class NumberPad extends Vue{
    output = '';
    actionHanlder(event: MouseEvent){
      const target = event.target as HTMLButtonElement;
      const input:string = target.textContent || ''; // 这里得增加一个默认值，否则ts认为liEl.textContent 可能为null
      
      const { output } = this;
      if((output === '0' && input === '0') || (output.includes('.') && input === '.')) {
        return;
      }
      this.output = output === '0' && input !== '.' ? input : `${output}${input}`;
    }

    empty() {
      this.output = '0'
    }

    delLastOne() {
      let output = this.output.slice(0, -1);
      this.output = output.length > 0 ? output : '0';
    }

    okFn() {
      console.log(this.output)
    }
  }
</script>

<style lang="scss" scoped>
  .number-pad{
    .input-wrapper{
      input{
        width: 100%;border: 0;outline:none;
        font-size: 32px;padding: 8px 12px;text-align: right;
      }
    }
    .number-btn-list{
      button{
        border: 0;width:25%;height: 64px;float: left;
        font-size: 16px;outline: none;
        &:nth-child(1){
          background: #F2F2F2;
        }
        &:nth-child(2),&:nth-child(5){
          background: #e8e8e8;
        }
        &:nth-child(3),&:nth-child(6),&:nth-child(9){
          background: #dedede;
        }
        &:nth-child(4),&:nth-child(7),&:nth-child(10){
          background: #d3d3d3;
        }
        &:nth-child(8),&:nth-child(11),&:nth-child(13){
          background: #c9c9c9;
        }
        &:nth-child(14){
          background: #bfbfbf;
        }
        &:nth-child(12){
          background: #b5b5b5;
        }
        &.zero-key{
          width: 50%;
        }
        &.ok-key{
          height: 128px;float: right;
        }
      }
    }

  }
</style>