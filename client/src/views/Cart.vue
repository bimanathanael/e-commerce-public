<template>
  <div class="home">
    <h3 class="mb-2 pt-2"> Cart </h3>
    <h5 class="mb-5"> Total harga: Rp {{$store.state.totalPrice }}  </h5>
    <button @click="processCheckout" class="btn btn-success mb-3"> Checkout </button>
    <div class="container">
      <div class="row">
        <CartItem v-for="cart in $store.state.allCartProducts"
        :key="cart.id" :cart="cart" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CartItem from '../components/CartItem.vue';

export default {
  name: 'Home',
  components: {
    CartItem,
  },
  created() {
    console.log(this);
    this.$store.dispatch('getCart');
    this.$store.dispatch('checkLoginStatus');
  },
  methods: {
    processCheckout() {
      this.$store.dispatch('processCheckout');
    },
  },
};
</script>
