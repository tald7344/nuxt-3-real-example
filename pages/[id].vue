<template>
  <ProductsDetails :data="product.data" />
</template>

<script setup>
  definePageMeta({
    middleware: ['auth']
  })
  const { id } = useRoute().params
  const { api } = useRuntimeConfig()
  // Fetch The Data
  const { data: product, error, execute } = await useGetUserApi().GetById(`${api.ProductsApi}/`, id)

  // refetch the token if 401 error occure
  if (error.value && error.value.statusCode == 401) {
    await useReauthorization().reAuthorize()
  }

  onMounted(() => {
    // Reexecute fetch data on mounted
    if (!product.value) execute()
  })
</script>