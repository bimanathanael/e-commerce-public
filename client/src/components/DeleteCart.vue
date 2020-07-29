<template>
  <div class="p-5 bg-warning">
    <h1> Are you sure want to delete Cart Item ? </h1>
    <button class="btn btn-info mr-4" @click="cancelDelete"> Cancel </button>
    <button class="btn btn-danger" @click="processDeleteCart"> Destroy </button>
  </div>

</template>

<script>

export default {
  name: 'DeleteCart',
  props: ['cartId'],
  methods: {
    processDeleteCart() {
      this.$store.dispatch('processDeleteCart', this.cartId);
    },
    cancelDelete() {
      this.$router.push('/cart');
    },
  },
  created() {
    // const detail = this.$store.state.
    console.log(this.cartId, 'this.cartId');
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
