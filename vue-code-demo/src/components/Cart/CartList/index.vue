<template>
  <div class="cartList-wrapper">
    <CartItem v-for="item in newCartList" :key="item.id" :cartItem="item"></CartItem>
    <div class="totalPrice">
      总价：{{totalPrice}}
    </div>
  </div>
</template>

<script>
import CartItem from './CartItem'
export default {
  components: {
    CartItem
  },
  props: {
    goodsList: {
      type: Array,
      default() {
        return []
      }
    },
    cartList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    newCartList() {
      return this.cartList.map(cartItem => {
        const good = this.goodsList.find(goodItem => cartItem.id === goodItem.id)
        return {
          ...good,
          quantity: cartItem.quantity
        }
      })
    },
    totalPrice() {
      return this.newCartList.reduce((total, curItem) => total + curItem.price*curItem.quantity, 0)
    }
  }
}
</script>

<style lang="stylus">

</style>