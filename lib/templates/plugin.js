import Vue from 'vue';
import VueMultianalytics from 'vue-multianalytics/dist/vue-multianalytics';

export default async function ({ app: { router } }, inject) {
  const config = <%= serialize(options.config) %>;
  const mixin = <%= serialize(options.mixin) %>;

  <% Object.keys(options.customModules).forEach(name => { %>
    VueMultianalytics.addCustomModule('<%= name %>', <%= serialize(options.customModules[name]) %>)
  <% }) %>;

  console.log(VueMultianalytics.install(
    Vue,
    Object.assign({
      routing: { vueRouter: router },
      returnModule: true,
    }, config),
    mixin || false,
  ));

  console.log(Vue.use(VueMultianalytics, Object.assign({
    routing: { vueRouter: router },
    returnModule: true,
  }, config), mixin));

  inject(
    'ma',
    VueMultianalytics.install(
      Vue,
      Object.assign({
        routing: { vueRouter: router },
        returnModule: true,
      }, config),
      mixin || false,
    ),
  );
}
