<template>
    <div class="er-button-group">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
    import type{ ButtonGroupProps } from './types';
    import { provide,reactive,toRef } from 'vue';
    import { BUTTON_GROUP_CTX_KEY } from './contants'

    defineOptions({
        name: 'ErButtonGroup'
    })

    const props = defineProps<ButtonGroupProps>();

    // provide 接收两个参数 第一个参数 string | symbol 第二个是值
    provide(BUTTON_GROUP_CTX_KEY, reactive({
        size: toRef(props,'size'),
        type: toRef(props,'type'),
        disabled: toRef(props,'disabled')
    }))

    
    // const defaultProps = withDefaults(props, {
    //     size: 'default',
    //     type: 'primary',
    // })
</script>

<style scoped>
    @import "./style.css";
</style>