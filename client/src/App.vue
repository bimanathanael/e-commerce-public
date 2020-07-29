<template>
  <div id="app">
    <div id="nav" class="d-flex justify-content-between">

      <router-link id="home" class="borderRight"
      to="/">Home</router-link>
      <div v-if="$store.state.isLogin" class="pt-3">
        <router-link class="borderRight borderMenu1"
        to="/cart">Cart</router-link>

        <router-link class="borderRight borderMenu2 text-info "
        to="/transactionHist" >Transaction History</router-link>
      </div>
      <div v-if="!$store.state.isLogin">
        <router-link class="borderRight text-info"
        to="/login">Login</router-link>

        <router-link class="borderRight text-warning"
        to="/register">Register</router-link>
      </div>

      <button v-if="$store.state.isLogin" @click="processLogout"
      class="btn btn-warning borderRight">Logout</button>

    </div>
    <router-view class="bg-light"/>
  </div>
</template>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: 'Raleway', sans-serif;
  /* font-family: 'Roboto', sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.borderRight{
  /* border-right: 1px black solid; */
  margin: 5px;
  padding-right: 10px;
  font-size: 18pt;
}

.borderMenu1{
  color: #dcad1f !important;
  padding-bottom: 5px;
  -webkit-box-shadow: 5px 6px 0px -1px  rgba(23,162,184,1);
  -moz-box-shadow: 5px 6px 0px -1px  rgba(23,162,184,1);
  box-shadow: 5px 6px 0px -1px  rgba(23,162,184,1);
}
.borderMenu2{
  padding-bottom: 5px;
  -webkit-box-shadow: 5px 6px 0px -1px rgba(231,166,26,1);
  -moz-box-shadow: 5px 6px 0px -1px rgba(231,166,26,1);
  box-shadow: 5px 6px 0px -1px rgba(231,166,26,1);
}
#home{
  border-left: 5px solid  rgba(231,166,26,1);
  border-bottom: 5px solid  rgba(231,166,26,1);
  padding-top: 5px;
  padding-left: 10px;
}
</style>

<script>
// @ is an alias to /src

export default {
  methods: {
    processLogout() {
      this.$store.dispatch('processLogout');
    },
  },
};
</script>
