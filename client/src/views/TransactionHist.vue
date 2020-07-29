<template>
  <div class="home">
    <h3 class="mb-5 pt-2"> Transaction History </h3>
    <div class="container">
      <div class="row">
        <HistoryItem v-for="cart in $store.state.allHistProducts"
        :key="cart.id" :cart="cart" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HistoryItem from '../components/HistoryItem.vue';

export default {
  name: 'TransactionHist',
  components: {
    HistoryItem,
  },
  created() {
    console.log(this);
    this.$store.dispatch('getTransHist');
    this.$store.dispatch('checkLoginStatus');
  },
};
</script>
