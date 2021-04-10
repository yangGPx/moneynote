<template>
    <layout classPrefix="labels">
        <ul class="tag-list">
            <li v-for="item in tagList" :key="item">
                {{ item }}
                <icon name="right"/>
            </li>
        </ul>
        <div class="button-wrapper">
            <button @click="addTag">添加标签</button>
        </div>
    </layout>
</template>
<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator'
    import tagModel from '@/model/TagListModel'

    tagModel.fetch()

    @Component
    export default class Labels extends Vue{
        tagList: string[] = tagModel.data;
        addTag(){
            let name = window.prompt('新增一个标签') || '';
            if (tagModel.createTag(name)) {
                window.alert('创建成功');
            } else {
                window.alert('该标签已存在');
            }
        }
    }
</script>

<style lang="scss" scoped>
.labels-content{
    display: flex; flex-direction: column;height: 100%;
    .tag-list{
        padding: 0 15px;
        background: #fff;
        flex-grow: 1;
        li{
            border-bottom: 2px solid #E5e5e5;
            padding: 12px 0;display: flex; justify-content: space-between;
            align-items: center;fill: #333;
            &:last-child{
                border-bottom: 0;
            }
        }
    }
    .button-wrapper{
        text-align: center;padding: 20px 0;
        button{
            border: none;background: #767676;color: #fff;width: 98px;height: 40px;border-radius: 5px;
        }
    }
}
</style>