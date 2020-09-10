import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import App from './App.vue'

/* eslint-disable-next-line */
import * as fas from './lib/fontAwesome'

Vue.component('tree-menu', {
  template: `<div class="tree-menu">
    <div class="label-wrapper" @click="toggleChildren">
      <div :style="indent" :class="labelClasses">
        <i v-if="nodes" class="fa" :class="iconClasses"></i>
        {{ label }}
      </div>
    </div>
    <tree-menu
        v-if="showChildren"
        v-for="node in nodes"
        :nodes="node.nodes"
        :label="node.label"
        :depth="depth + 1"
    >
    </tree-menu>
  </div>`,
  props: [ 'nodes', 'label', 'depth' ],
  data() {
    return {
      showChildren: false
    }
  },
  computed: {
    iconClasses() {
      return {
        'fa-plus-square-o': !this.showChildren,
        'fa-minus-square-o': this.showChildren
      }
    },
    labelClasses() {
      return { 'has-children': this.nodes }
    },
    indent() {
      return { transform: `translate(${this.depth * 50}px)` }
    }
  },
  methods: {
    toggleChildren() {
      this.showChildren = !this.showChildren;
    }
  }
});

new Vue({
  el: '#app',
  render: h => h(App),
  router: router,
  store: store
});
