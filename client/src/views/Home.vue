<template>
  <div class="home">
    <h3 class="pt-2 mb-5"> Home of Products</h3>
    <div class="container">
      <div class="row">
        <product v-for="product in $store.state.allProducts"
        :key="product.id" :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import product from '../components/Product.vue';

export default {
  name: 'Home',
  components: {
    product,
  },
  created() {
    console.log(this);
    this.$store.dispatch('getProducts');
    this.$store.dispatch('checkLoginStatus');
  },
};
</script>
