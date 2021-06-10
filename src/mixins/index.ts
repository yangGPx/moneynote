import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export class TagHandler extends Vue {
    addTag(){
        let name = window.prompt('新增一个标签') || '';
        name = name.trim()
        if (name.length === 0) return;
        this.$store.commit('createTag', name)
        if (this.$store.state.createdTagFlag === 'success') {
            window.alert('创建标签成功')
        } else if(this.$store.state.createdTagFlag === 'duplicated'){
            window.alert('该标签名已存在')
        } if(this.$store.state.createdTagFlag === 'empty') {
            window.alert('表签名不能为空')
        }
    }
}