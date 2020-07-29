import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router';

Vue.use(Vuex);

const BaseURL = 'http://localhost:3000';

export default new Vuex.Store({
  state: {
    allProducts: [],
    allCartProducts: [],
    allHistProducts: [],
    totalPrice: 0,
    isLogin: false,
  },
  mutations: {
    SET_DATA(state, allData) {
      state.allProducts = allData.filter((data) => data.stock > 0);
    },
    SET_CART_DATA(state, allData) {
      state.allCartProducts = allData;
      let total = 0;
      console.log('masuk');
      allData.forEach((prod) => {
        total += prod.Product.price * prod.qty;
        console.log('total', total);
      });
      state.totalPrice = total;
    },
    SET_HIST_DATA(state, allData) {
      state.allHistProducts = allData;
    },
    SET_IS_LOGIN(state, boolean) {
      state.isLogin = boolean;
    },
  },
  actions: {
    getProducts(context) {
      return axios({
        method: 'get',
        url: `${BaseURL}/products`,
      })
        .then((result) => {
          console.log(result.data, 'success get product data');
          // router.push({ name: 'List' });
          context.commit('SET_DATA', result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCart(context) {
      return axios({
        method: 'get',
        url: `${BaseURL}/carts`,
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((result) => {
          console.log(result.data, 'success get carts data');
          // router.push({ name: 'List' });
          context.commit('SET_CART_DATA', result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getTransHist(context) {
      return axios({
        method: 'get',
        url: `${BaseURL}/carts/transactionHist`,
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((result) => {
          console.log(result.data, 'success get trasnsaction history data');
          // router.push({ name: 'List' });
          context.commit('SET_HIST_DATA', result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    processLogin(context, loginData) {
      return axios({
        method: 'post',
        url: `${BaseURL}/login`,
        data: {
          email: loginData.email,
          password: loginData.password,
        },
      })
        .then((result) => {
          console.log(result.data, 'success login');
          context.commit('SET_IS_LOGIN', true);
          router.push({ name: 'Home' });
          localStorage.access_token = result.data.access_token;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    processRegister(context, registerData) {
      return axios({
        method: 'post',
        url: `${BaseURL}/registerCust`,
        data: {
          email: registerData.email,
          password: registerData.password,
        },
      })
        .then((result) => {
          console.log(result.data, 'success register');
          router.push({ name: 'Login' });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addToCart(context, dataAdd) {
      return axios({
        method: 'post',
        url: `${BaseURL}/carts`,
        data: {
          ProductId: dataAdd.ProductId,
          qty: dataAdd.qty,
        },
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((result) => {
          console.log(result.data, 'success add to cart');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    processCheckout() {
      return axios({
        method: 'put',
        url: `${BaseURL}/carts`,
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(() => {
          console.log('berhasil checkout barang');
          router.push({ name: 'TransactionHist' });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    processDeleteCart(context, cartId) {
      return axios({
        method: 'delete',
        url: `${BaseURL}/carts/${cartId}`,
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(() => {
          console.log('berhasil delete cart');
          router.push('/cart');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    processLogout(context) {
      localStorage.clear();
      context.commit('SET_IS_LOGIN', false);
      router.push({ name: 'Home' });
    },
    checkLoginStatus(context) {
      if (localStorage.access_token) {
        context.commit('SET_IS_LOGIN', true);
      } else {
        context.commit('SET_IS_LOGIN', false);
      }
    },
  },
  modules: {
  },
});
