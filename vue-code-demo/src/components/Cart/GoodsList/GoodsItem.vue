<template>
  <div class="goodsItem-wrapper">
    <div class="goodsInfo">
      {{goodsItem.name}} - {{goodsItem.price}}元
    </div>
    <div class="addCart">
      <button @click="addClickHandler(goodsItem.id)">加入购物车</button>
    </div>
  </div>
</template>

<script>
import event from '../event'
export default {
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    addClickHandler(id) {
      event.$emit('addToCart', id)
    }
  }
}
</script>

<style lang="stylus">
.goodsItem-wrapper
  display flex
</style>