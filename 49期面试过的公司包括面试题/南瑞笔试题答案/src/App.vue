<template>
  <div id="app">
    <nav>
      <router-link to="/one">第一题</router-link> |
      <router-link to="/two">第二题</router-link> |
      <router-link to="/three">第三题</router-link> |
      <router-link to="/four">第四题</router-link> |
      <router-link to="/five">第五题</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style lang="less">
#app {
  text-align: center;
}
</style>
