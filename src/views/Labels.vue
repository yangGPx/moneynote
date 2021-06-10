<template>
    <layout classPrefix="labels">
        <ul class="tag-list">
            <li v-for="item in tagList" :key="item.id" @click="goDump(item)">
                <span>
                    <icon :name="item.svg || 'self'" /> {{ item.name }}
                </span>
                <icon name="right" v-if="/^[0-9]+/.test(parseInt(item.id, 10))"/>
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
    import { TagHandler } from '@/mixins'
    import { mixins } from 'vue-class-component'

    @Component({
        components: {
            MButton
        },
    })
    export default class Labels extends mixins(TagHandler){
        get tagList() {
            return this.$store.state.tagList;
        }
        created() {
            this.$store.commit('fetchTags')
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
            >span:first-child{
                display: flex;align-items: center;
                ::v-deep svg{
                    margin-right: 10px;
                    width: 25px;height: 25px;
                }
            }
        }
    }
    .button-wrapper{
        text-align: center;padding: 20px 0;
    }
}
</style>