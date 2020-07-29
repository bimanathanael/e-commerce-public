<template>
  <div class="col-12">
    <div class="row shadow-sm mb-4" id="border">
      <div class="col-10 d-flex justify-content-start p-2">
        <div>
          <img :src=cart.Product.image_url class="card-img-top" style="width:100px" alt="...">
        </div>
        <div style="padding-top: 4%; padding-left: 2%">
          <h4> {{cart.Product.name}}</h4>
        </div>
      </div>
      <div class="col-2" style="padding-top: 5px; border-left: groove 10px">
        <p class="card-text">@ Rp{{cart.Product.price}}</p>
        <p class="card-text">Quantity : <b> {{cart.qty}} </b> </p>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'CartItem',
  props: ['cart'],
  data() {
    return {
      qty: 0,
    };
  },
  methods: {
    addToCart(productId) {
      const dataAdd = {
        ProductId: productId,
        qty: this.qty,
      };
      this.$store.dispatch('addToCart', dataAdd);
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
