import Vue from 'vue'
import App from './App.vue'
import Chakra, { CThemeProvider } from '@chakra-ui/vue'
import customTheme from './custom-theme.js'
import AsyncComputed from 'vue-async-computed'

Vue.use(Chakra, {
  extendTheme: customTheme
})
Vue.use(AsyncComputed)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(CThemeProvider, [h(App)])
}).$mount('#app')
