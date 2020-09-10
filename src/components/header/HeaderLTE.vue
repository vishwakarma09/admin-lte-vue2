<template>
  <div>
    <Navbar />
    <Sidebar />
  </div>
</template>

<script>
  import Navbar from './Navbar'
  import Sidebar from './Sidebar'

  export default {
    name: 'HeaderLTE',
    components: {
      Navbar,
      Sidebar
    },
    beforeMount: function () {
      console.log('inside HeaderLTE')
    }
  }
</script>
