import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';
import store from './store/index.js';
import VueAxios from 'vue-axios';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import iviewArea from 'iview-area';
import axios from './plugins/axios/http.js'; // 导入axios拦截器
import {updateVueX} from "./utils/index.js";
import Viewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';

Vue.use(Viewer);
Viewer.setDefaults({
  Options: { 'inline': true, 'button': true, 'navbar': true, 'title': true, 'toolbar': true, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }
})
Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(iView);
Vue.use(iviewArea);
updateVueX();//监听页面刷新，重置vueX数据。
Vue.use(router);

new Vue({
  router,
  store,
  render: h => h(App),
  methods:{
  }
}).$mount('#app')
