<template>
  <section class="products-gallery">
    <div class="container pt-5">
      <div class="row">
        <div v-for="(product, index) in products" :key="`product-${index}`" class="col-12 col-sm-6 col-md-4 col-xl-3 mx-auto mb-5 text-center">
          <NuxtLink :to="`/${product.id}`" class="gold-hover">
            <ElementsProductCard :src="apiImageUrl + product.photo" :title="useTranslate(product, 'title')" :newPrice="`${product.price}`" :priceColor="`#977c38`" />
          </NuxtLink>
        </div>
      </div><!--.row-->
    </div>
  </section>
</template>

<script setup>
  const { apiImageUrl } = useRuntimeConfig()
  const { products } = defineProps(['products'])
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/scss/theme/variables';

</style>