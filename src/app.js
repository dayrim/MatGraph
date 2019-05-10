import Vue from 'vue'
import App from './App.vue'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import Vuetify from 'vuetify'
import store from './store'


Vue.use(Vuetify)



new Vue({
  store,
  el: '#app',
  render: h => h(App)
})