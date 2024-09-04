<template>
    <div class="er-collapse">
        <slot></slot>
    </div>
</template>

<script setup lang="ts" >
import type { CollapseProps,CollapseEmits,CollapseItemName } from './types';
import { provide, ref, watch,watchEffect} from 'vue';
import { COLLAPSE_CTX_KEY } from './contants';
import { debugWarn } from '@toy-elements/utils'

const COM_NAME = 'ErCollapse' as const;

defineOptions({
    name: COM_NAME
})

const props = defineProps<CollapseProps>();
const emits = defineEmits<CollapseEmits>();
const activeNames = ref(props.modelValue);

watchEffect(()=>{
  if(props.accordion && activeNames.value.length > 1 ){
    debugWarn(COM_NAME,'accordion模式下只能同时展开一个')
  }
})

function handleItemClick(item: CollapseItemName){
    let _activeNames = [...activeNames.value];
  // 手风琴模式
  if (props.accordion) {
    _activeNames = [_activeNames[0] === item ? "" : item];
    updateActiveNames(_activeNames); 
    return;
  }

  const index = _activeNames.indexOf(item);
  if (index > -1) {
    // 存在，删除数组中的一项
    _activeNames.splice(index, 1);
  } else {
    // 不存在，插入对应 name
    _activeNames.push(item);
  }
  updateActiveNames(_activeNames);
}
 function updateActiveNames(newNames: CollapseItemName[]){
    activeNames.value = newNames;
    emits('update:modelValue', newNames);
    emits('change', newNames);
 }

 watch(
  () => props.modelValue,
  (val) => updateActiveNames(val)
);

provide(COLLAPSE_CTX_KEY, {
  activeNames,
  handleItemClick,
});

</script>

<style scoped>
@import "./style.css";
</style>