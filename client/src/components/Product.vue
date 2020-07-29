<template>
  <div class="col-4">
    <div class="card mb-4 shadow-sm">
      <img :src=product.image_url class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Name : {{product.name}}</h5>
        <p class="card-text">Price : {{product.price}}</p>
        <p class="card-text">Stock : {{product.stock}}</p>
        <button v-if="!$store.state.isLogin"
        class="btn btn-info" @click="goToLogin"> Login to Buy </button>
        <form v-if="$store.state.isLogin" @submit.prevent="addToCart(product.id)">
          <div class="input-group mb-3">
            <input v-model="qty" type="text" class="form-control" placeholder="Quantity">
            <div class="input-group-append">
              <button class="btn btn-info" type="submit"
              id="button-addon2">Add to Cart</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../router';

export default {
  name: 'Product',
  props: ['product'],
  data() {
    return {
      qty: 1,
    };
  },
  methods: {
    addToCart(productId) {
      if (this.qty <= 0) {
        console.log('must more than 0');
      } else {
        const dataAdd = {
          ProductId: productId,
          qty: this.qty,
        };
        this.$store.dispatch('addToCart', dataAdd);
      }
    },
    goToLogin() {
      router.push({ name: 'Login' });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
