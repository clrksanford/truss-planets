import Vue from 'vue'
import App from './App.vue'
import { formatNumericValue, formatUnknownValue } from './utils/filters';

Vue.config.productionTip = false;

Vue.prototype.$filters = {
  formatNumericValue,
  formatUnknownValue
};

new Vue({
  render: h => h(App),
}).$mount('#app');
