<template>
  <layout>
    <div class="tags">
      <ul class="tag-list">
        <li>衣</li>
        <li>食</li>
        <li>住</li>
        <li>行</li>
                <li>衣</li>
        <li>食</li>
        <li>住</li>
        <li>行</li>
                <li>衣</li>
        <li>食</li>
        <li>住</li>
        <li>行</li>
                <li>衣</li>
        <li>食</li>
        <li>住</li>
        <li>行</li>
      </ul>
      <div class="add-tag">
        <span>新增标签</span>
      </div>
    </div>
    <label class="comments">
      备注 
      <input placeholder="在这里添加备注"/>
    </label>
    <ul class="tabs">
      <li>支出</li>
      <li>收入</li>
    </ul>
    <div class="number-pad">
      <p class="input-wrapper">
        <input value="0"/>
      </p>
      <div class="number-btn-list">
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>删除</button>

        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>清空</button>

        <button>3</button>
        <button>2</button>
        <button>1</button>
        <button class="ok-key">OK</button>

        <button class="zero-key">0</button>        
        <button>.</button>        
      </div>
    </div>
  </layout>
</template>
<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'

  @Component
  export default class Money extends Vue{
    
  }
</script>

<style lang="scss" scoped>
  .tags{
    flex-grow: 1;padding: 16px 20px;
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
  .comments{
    padding: 10px 20px;background: #f7f4f4;display: flex;
    align-items: center;
    input{
      margin-left: 15px;padding: 10px 5px;border:0;
      outline: none;background: inherit;flex-grow:1;
    }
  }

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
        font-size: 16px;
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