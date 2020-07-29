<template>
  <div class="about">
    <h1>Login</h1>
    <div class="container">
      <form @submit.prevent="processLogin">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Email</span>
          </div>
          <input v-model="email" type="text"
          class="form-control" placeholder="Email" aria-label="Email"
          aria-describedby="basic-addon1">
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Password</span>
          </div>
          <input v-model="password" type="password"
          class="form-control" placeholder="Password" aria-label="Password"
          aria-describedby="basic-addon1">
        </div>
        <button class="btn btn-info mb-3" type="submit"> Login </button>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Login',
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    processLogin() {
      const loginData = {
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch('processLogin', loginData);
    },
  },
};
</script>
