<template>
  <div class="content-wraper py-5">
    <div class="container">
      <div class="add-to-cart-message text-center alert alert-success d-none my-3"></div>
      <div class="row single-product-area" :style="`${$i18n.locale == 'en' ? 'direction:ltr' : 'direction:rtl'}`">
        <div class="col-lg-3 col-md-6">
          <!-- Product Details Left -->
          <div class="product-details-left">
            <div class="product-details-images">
              <img class="responsive" :src="`${apiImageUrl + data.photo}`" />
            </div>
          </div>
          <!--// Product Details Left -->
        </div>

        <div class="col-lg-7 col-md-6">
          <div class="product-details-view-content sp-normal-content pt-60">
            <div class="product-info">
              <h2>{{ useTranslate(data, 'title') }}</h2>
              
              <div class="price-box pt-2 mb-0">               
                  <span class="new-price new-price-2">{{ $t('price') + ' : ' + data.price + ' $' }}</span>
              </div>
              <div class="product-desc border-top pt-3 mt-3">
                <p v-html="useTranslate(data, 'content')"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const { apiImageUrl } = useRuntimeConfig()
  const { data } = defineProps(['data'])
</script>