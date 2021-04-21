<template>
    <layout classPrefix="labels">
        <ul class="tag-list">
            <li v-for="item in tagList" :key="item.id" @click="goDump(item)">
                {{ item.name }}
                <icon name="right"/>
            </li>
        </ul>
        <div class="button-wrapper">
            <m-button @click="addTag">添加标签</m-button>
        </div>
    </layout>
</template>
<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator'
    import MButton from '@/components/MButton.vue'

    @Component({
        components: {
            MButton
        }
    })
    export default class Labels extends Vue{
        tagList: Tag[] = window.tagList;
        addTag(){
            let name = window.prompt('新增一个标签') || '';
            name = name.trim();
            if (name.length === 0) return;
            if (window.tagCreate(name) === 'duplicated') {
                window.alert('该标签已存在');
            } else {
                window.alert('创建成功');
            }
        }

        goDump(item: Tag) {
            this.$router.push({
                path: '/labels/edit/' + item.id
            });
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
    }
}
</style>