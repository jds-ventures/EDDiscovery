<template>
  <div>
    <nav>
      <ul>
        <li><router-link :to="{ name: 'Home'}">History</router-link></li>
        <li><router-link :to="{ name: 'Status'}">Status</router-link></li>
        <li><router-link :to="{ name: 'Grid'}">Grid</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {}
</script>
