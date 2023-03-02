<template>
  <div id="app">
    <vueBigTree ref="bigTree" :tree="treeData" :defaultExpand="true">
      <template v-slot="{ item }">
        <div>{{ item.label }}</div>
      </template>
    </vueBigTree>
  </div>
</template>

<script>
import vueBigTree from '@/components/tree.vue'
export default {
  name: 'App',
  data () {
    return {
      treeData: []
    }
  },

  created () {
    const data = [],
      root = 8,
      children = 3,
      base = 1000;
    for (let i = 0; i < root; i++) {
      data.push({
        id: `${i}`,
        label: `test-${i}`,
        children: []
      });
      for (let j = 0; j < children; j++) {
        data[i].children.push({
          id: `${i}-${j}`,
          label: `test-${i}-${j}`,
          children: []
        });
        for (let k = 0; k < base; k++) {
          data[i].children[j].children.push({
            id: `${i}-${j}-${k}`,
            label: `test-${i}-${j}-${k}`
          });
        }
      }
    }
    this.treeData = data;
  },
  components: {
    vueBigTree
  },
  methods: {

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
