<template>
  <div class="py-5">
    <ProductsGallery v-if="products" :products="products" />

    <div v-if="!lastPage" @click="loadMore" class="text-center py-4 load-more">
      <i class="fa fa-refresh fa-3x" id="refresh_icon" aria-hidden="true"></i>
      <h5>Load More...</h5>
    </div>

  </div>
</template>

<script setup>
  const { api, apiBase } = useRuntimeConfig()
  const offset = ref(0);
  const productNumberPerPage = ref(1);
  const products = ref([]);
  const pending = ref(false);
  const lastPage = ref(false);

  const { data, error, pending: dataPending, execute } = await useAsyncData(
    'products',
    () => $fetch(`${api.ProductsApi}`, {
      method: 'GET',
      baseURL: `${apiBase}`,
      params: {Offset: offset.value, PageSize: productNumberPerPage.value},
      headers: {
        'Authorization': `Bearer ${useMainToken().value}`
      },

    } ), {
      watch: [offset, productNumberPerPage],
    }
  );

  // refetch the token if 401 error occure
  if (error.value && error.value.statusCode == 401) {
    await useReauthorization().reAuthorize()
  }

  const appendProducts = ( newProducts ) => {
    // console.log('newProducts', newProducts.length);
    if (newProducts.length == 0) lastPage.value = true
    newProducts.forEach( ( product ) => {
      products.value.push( product );
    });
  }

  const loadMore = () => {
    const refreshElement = document.getElementById('refresh_icon')
    offset.value = offset.value + productNumberPerPage.value
    refreshElement.classList.add('fa-spin');
  }

  // Life cycle Hook
  onMounted(() => {
    if (data.value) products.value = data.value.data
    else execute()
  })
  watch(data, (newData) => {
    console.log('newData : ', newData.data);
    appendProducts( newData.data )
  })
  watch(dataPending, (newDataPending) => {
    pending.value = newDataPending
    if (pending.value) {
      setTimeout(() => document.getElementById('refresh_icon').classList.remove('fa-spin'), 500)
    }
  })
</script>

<style lang="scss">
  @import '~/assets/styles/scss/theme/variables';
  @import '~/assets/styles/scss/theme/mixin';

  a { color: #000; text-decoration: none; }
  .load-more {
    cursor: pointer;
    color: $grey;
    @include transition(all, .5s, ease);
    &:hover { color: #777; }
    i { 
      @include sm-mobile {
        font-size: 2.2em;
      }
    }
  }
</style>