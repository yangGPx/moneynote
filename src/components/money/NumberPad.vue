<template>
  <div class="number-pad">
    <date-picker
      ref="picker"
      type="date"
      v-model="pickerValue">
    </date-picker>
    <div class="input-wrapper">
      <forum-item field-name="备注"
        :value="notes" @update:value="noteUpdate"
        placeholder="点击此处填写备注"/>
      <span class="money-input"> {{ output }}</span>
    </div>
    <div class="number-btn-list" @click="actionHanlder">
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button @click.stop="showDate">pickerValue</button>
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
      <button @click.stop="delLastOne">删除</button>

    </div>

  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { DatetimePicker } from 'mint-ui';
  import { Component, Prop } from 'vue-property-decorator'
  import ForumItem from '@/components/ForumItem.vue';
  import dayjs from 'dayjs'

  @Component({
    components: {
      ForumItem,
      DatetimePicker,
    }
  })
  export default class NumberPad extends Vue{
    @Prop({ default: 0 }) value!: number | undefined;
    @Prop({ default: '' }) notes: string | undefined;

    pickerValue = dayjs().format('YYYY-MM-DD');
    output = `${this.value || 0}`;
    popupVisiable = false;
    noteOutput = '';
    actionHanlder(event: MouseEvent){
      const target = event.target as HTMLButtonElement;
      const input:string = target.textContent || ''; // 这里得增加一个默认值，否则ts认为liEl.textContent 可能为null
      
      const { output } = this;
      if((output === '0' && input === '0') || (output.includes('.') && input === '.')) {
        return;
      }
      this.output = output === '0' && input !== '.' ? input : `${output}${input}`;
    }

    noteUpdate(value: string) {
      this.noteOutput = value;
    }

    empty() {
      this.output = '0'
    }

    delLastOne() {
      let output = this.output.slice(0, -1);
      this.output = output.length > 0 ? output : '0';
    }

    okFn() {
      this.$emit('update:note', this.noteOutput);
      this.$emit('update:value', parseFloat(this.output));
      this.$emit('submit', this);
    }

    showDate() {
      this.$refs.picker.open();
    }

    created() {
      this.noteOutput = this.notes || '';
    }
  }
</script>

<style lang="scss" scoped>
  .number-pad{
    .input-wrapper{
      padding: 7px 0px;
      display: flex;background: #f2f2f2;align-items: center;
      ::v-deep .forum-item{
        padding: 0 5px;width: 100%;background: #f2f2f2;
        padding-left: 10px;
        input{
          margin-left: 10px;
        }
      }
      .money-input{
        padding:0 10px;
        font-size: 28px;text-align: right;
      }
    }
    .number-btn-list{
      $btnHeihgt: 52px;
      button{
        border: 0;width:25%;height: $btnHeihgt;float: left;
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
        &.ok-key{
          height: $btnHeihgt * 2;float: right;
        }
      }
    }

  }
</style>