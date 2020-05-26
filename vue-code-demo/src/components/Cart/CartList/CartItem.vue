<template>
  <div class="cartItem-wrapper">
    <div class="cart-info">
      {{cartItem.name}} - 数量{{cartItem.quantity}}
    </div>
    <div class="edit-cart">
      <button @click="addClickHandler(cartItem.id)">增加</button>
      <button @click="delClickHandler(cartItem.id)">减少</button>
    </div>
  </div>
</template>

<script>
import event from '../event'
export default {
  props: {
    cartItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    addClickHandler(id) {
      event.$emit('addToCart', id)
    },
    delClickHandler(id) {
      event.$emit('delToCart', id)
    }
  }
}
</script>

<style lang="stylus">
.cartItem-wrapper
  display flex
</style>