<script lang="ts" setup>
import { ref,computed,inject } from 'vue';
import type { ButtonProps,ButtonEmits,ButtonInstance } from './types';
import { throttle } from 'lodash-es'
import ErIcon from '../Icon/Icon.vue';

import { BUTTON_GROUP_CTX_KEY } from './contants'
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
    useThrottle:true,
    throttleDuration:500
}) 

const emits = defineEmits<ButtonEmits>()

const slots = defineSlots();
const ctx = inject(BUTTON_GROUP_CTX_KEY, void 0)

const _ref = ref<HTMLButtonElement>();

const size = computed(()=> ctx?.size ?? props?.size ?? '')
const type = computed(()=> ctx?.type ?? props?.type ?? '')
const disabled = computed(()=> ctx?.disabled ?? props?.disabled ?? false)


const iconStyle = computed(()=> ({marginRight:slots.default ? '6px' : '0px'}))

const handleBtnClick = (e:MouseEvent) => emits('click',e)
const handleBtnCLickThrottle = throttle(handleBtnClick,props.throttleDuration,{trailing:true})

defineExpose<ButtonInstance>({
    ref:_ref
})
</script>

<template>
    <component 
        :is="props.tag"
        ref="_ref"
        class="er-button"
        :autofocus="autofocus"
        :type="tag === 'button' ? nativeType : void 0" 
        :disabled="disabled || loading ? true : void 0" 
        :class="{
            [`er-button--${type}`]:type,
            [`er-button--${size}`]:size,
            'is-circle':circle,
            'is-plain':plain,
            'is-round':round,
            'is-disabled':disabled,
            'is-loading': loading,
        }"
            @click="(e:MouseEvent)=> useThrottle ? handleBtnCLickThrottle(e) : handleBtnClick(e)"
        >
        <template v-if="loading">
            <slot name="loading">
                <er-icon
                class="loading-icon"
                :icon="loadingIcon ?? 'spinner'"
                :style="iconStyle"
                size="1x"
                spin
                />
                {{ loadingIcon }}
             </slot>
        </template>
         <!--给loading图标让位置-->
        <er-icon
            :icon="icon"
            size="1x"
            :style="iconStyle"
            v-if="icon && !loading"
         />
        <slot></slot>
    </component>
</template>

<style scoped>
    @import './style.css';
</style>