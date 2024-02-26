<template>
  <SharedMenuTop @lang="getLang"/>
</template>

<script setup>
  const emit = defineEmits(['navLang'])

  // Get Lnaguage from child comonent
  const getLang = (event) => {
    emit('navLang', event)
  }
</script>

<style lang="scss">

</style>