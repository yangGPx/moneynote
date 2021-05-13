import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export class TagHandler extends Vue {
    addTag(){
        console.log('xxx')
        let name = window.prompt('新增一个标签') || '';
        name = name.trim()
        if (name.length === 0) return;
        this.$store.commit('createTag', name)
    }
}