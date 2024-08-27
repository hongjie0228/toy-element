<script lang="ts" setup>
import { ref } from 'vue';
import type { ButtonProps } from './types';
/**
 * Button.vue
 * Button.test.tsx
 * types.ts
 * style.css
 * constants.ts
 */
defineOptions({
    name: "ErButton"
})
const props = withDefaults(defineProps<ButtonProps>(),{
    tag: "button",
    nativeType: "button",
}) 

const slots = defineSlots();

const _ref = ref<HTMLButtonElement>();
</script>

<template>
    <component 
        :is="props.tag"
        ref="_ref"
        :type="tag === 'button' ? nativeType : void 0" 
        :disabled="disabled || loading ? true : void 0" 
        :class="{
            [`er-button er-button--${props.type}`]:type,
            [`er-button--${props.size}`]:size,
            'is-circle':circle,
            'is-plain':plain,
            'is-round':round,
            'is-disabled':disabled,
            'is-loading': loading,
        }">
        <slot></slot>
    </component>
</template>