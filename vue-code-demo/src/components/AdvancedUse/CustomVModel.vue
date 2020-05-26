<template>
  <!-- 例如：vue 颜色选择 -->
  <input type="text" 
  :value="text1" 
  @input="$emit('change', $event.target.value)" />
  <!--
        1. 上面的 input 使用了 :value 而不是 v-model
        2. 上面的 input 和 model.event 要对应起来
        3. text 属性对应起来
  -->
</template>

<script>
export default {
  model: {
    prop: 'text1', // 对应 props text1
    event: 'change'
  },
  props: {
    text1: String,
    default() {
      return ''
    }
  }
}
</script>