<template>
  <div id="app">
    <template v-if="!isAuthenticated">
      <p>
        Not authenticated
        <button @click="isAuthenticated = !isAuthenticated">{{ isAuthenticated ? 'un-': '' }}Authenticate</button>
      </p>
    </template>
    <template v-else>
      <p>Authenticate</p>
      <font-awesome-icon :icon="['fas', 'user-secret']" />
      <AdminLTE showControlSidebar="true" />
      <button @click="isAuthenticated = !isAuthenticated">{{ isAuthenticated ? 'un-': '' }}Authenticate</button>
    </template>

    <router-view></router-view>
  </div>
</template>

<script>
import AdminLTE from './components/layouts/AdminLTE'

export default {
  name: 'App',
  components: {
    AdminLTE
  },
  data: function() {
    return {
      isAuthenticated: false
    }
  },
  beforeMount: async function() {
    if (!this.isAuthenticated) {
      // this.$router.push({ name: '@login'})
      console.log('not authenticated')
    }
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
