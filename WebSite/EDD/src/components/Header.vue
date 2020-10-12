<template>
  <div>
    <header>
      <h1>Elite Dangerous Discovery</h1>
      <h1>
        <input
          @click="toggle_fullscreen()"
          type="button"
          value="fullscreen"
          id="fullscreen_button"
        />
        <img src="../../WebOld/Images/EdLogo600.png" alt="EDD" width="80" />
      </h1>
    </header>
  </div>
</template>

<script>
export default {
  methods: {
    toggle_fullscreen () {
      this.$parent.toggle()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style>
/* Legacy EDD WebSite CSS Resources */
@import '../../WebOld/header.css';
</style>
