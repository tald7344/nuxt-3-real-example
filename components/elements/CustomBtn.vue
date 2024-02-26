<template>
    <div class="more-btn-box">
      <NuxtLink :to="url" :class="`btn-more ${classes}`" :style="{width: width, 'font-size': fontSize}">{{ btnText }}</NuxtLink>
    </div>
</template>

<script setup>
  const { url, classes, width, fontSize, btnText } = defineProps(['url', 'classes', 'width', 'fontSize', 'btnText'])
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/scss/theme/variables';
  .more-btn-box {
    .btn-more {
      @include defaultLinearGradient();
      display: inline-block;
      text-align: center;
      color: #333;
      // font-size: 28px;
      &:hover { color : #fff; }
    }
  }

</style>