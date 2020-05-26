<template>
  <div class="cart-wrapper">
    <GoodsList :goodsList="goodsList"></GoodsList>
    <hr>
    <CartList :goodsList="goodsList" :cartList="cartList"></CartList>
  </div>
</template>

<script>
import GoodsList from './GoodsList'
import CartList from './CartList'
import event from './event'
export default {
  components: {
    GoodsList,
    CartList
  },
  data() {
    return {
      goodsList: [
        {
          id: 1,
          name: '草莓',
          price: 10
        },
        {
          id: 2,
          name: '葡萄',
          price: 15
        },
        {
          id: 3,
          name: '芒果',
          price: 20
        }
      ],
      cartList: [
        {
          id: 1,
          quantity: 1
        }
      ]
    }
  },
  mounted() {
    event.$on('addToCart', this.addToCart)
    event.$on('delToCart', this.delToCart)
  },
  beforeDestroy() {
    event.$off('addToCart', this.addToCart)
    event.$off('delToCart', this.delToCart)
  },
  methods: {
    addToCart(id) {
      const good = this.cartList.find(item => item.id === id)
      if(good) {
        good.quantity ++
        return
      } else {
        this.cartList.push({
          id,
          quantity: 1
        })
      }
    },
    delToCart(id) {
       const good = this.cartList.find(item => item.id === id)
       if(good == null) {
         return
       }
       good.quantity --
       if(good.quantity <= 0) {
         this.cartList = this.cartList.filter(item => item.id !== id)
       }
     }
  }
}
</script>

<style lang="stylus">

</style>