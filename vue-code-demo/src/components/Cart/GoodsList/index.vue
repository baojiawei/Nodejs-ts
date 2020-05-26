<template>
  <div class="goodsList-wrapper">
    <GoodsItem v-for="item in goodsList" :key="item.id" :goodsItem="item"></GoodsItem>
  </div>
</template>

<script>
import GoodsItem from './GoodsItem'
export default {
  components: {
    GoodsItem
  },
  props: {
    goodsList: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="stylus">

</style>