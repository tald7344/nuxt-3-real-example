<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-black">
    <div class="container-fluid" :style="`${$i18n.locale == 'en' ? 'direction:ltr;' : 'direction:rtl'}`">
      <NuxtLink to="/" class="navbar-brand text-medium-gold text-uppercase">
          <span>{{ $t('gallery') }}</span>
      </NuxtLink>
      <ul :class="`navbar-nav align-items-center d-none d-sm-flex ${$i18n.locale == 'en' ? 'ms-auto' : 'me-auto'}`">
        <li class="nav-item dropdown">
          <select class="language-dropdown" @change="changeLanguage" v-model="$i18n.locale">
            <option value="en">English</option>
            <option value="ar">العربية</option>
          </select>
        </li>
        <template v-if="!isAuth.isAuthenticated">
          <li class="nav-item mx-2">
            <NuxtLink to="/auth/login" class="nav-link text-medium-gold text-uppercase">              
              <i :class="`fa fa-user fa-fw mx-1 ${$i18n.locale == 'ar' ? 'rtl' : ''}`"></i>
              <span>{{ $t('login') }}</span>
            </NuxtLink>
          </li>
        </template>
        <template v-if="isAuth.isAuthenticated">
          <li class="nav-item mx-2">
            <a @click.prevent="logout" href="#" class="nav-link text-medium-gold text-uppercase">
              <i :class="`fa fa-sign-in fa-fw mx-1 ${$i18n.locale == 'ar' ? 'rtl' : ''}`"></i>
              <span>{{ $t('logout') }}</span>
            </a>
          </li>            
        </template>
      </ul>
      <ul class="navbar-nav mb-2 d-none mb-lg-0">
        <NuxtLink to="/" class="nav-link">
          <font-awesome-icon icon="far fa-heart" class="gold-hover" />
        </NuxtLink>
        <a class="nav-link" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
          <font-awesome-icon icon="fas fa-bag-shopping" class="gold-hover" />
        </a>
      </ul>
    </div>
  </nav>
</template>

<script setup>
  const emit = defineEmits(['lang'])
  const isAuth = useAuth()
  const user = useUserInfo().value;

  // Chnage Language with 
  const changeLanguage = (event) => {
    localStorage.setItem('lang', event.target.value)
    useLang().value = event.target.value;
    emit('lang', event.target.value)
  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    useAuth().value.isAuthenticated = false;
    return navigateTo('/auth/login');
  }
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/scss/theme/variables';
  @import '~/assets/styles/scss/theme/mixin';
    nav.navbar { 
      @include sm-mobile {
        height: 46px; 
      }
    }
    .nav-item {
      .nav-link { 
        font-size: 16px; 
        color: $medium-gold;
        @include tablet {
          font-size: 13px;
        }
        @include sm-mobile {
          font-size: 13px;
        }
      }
    }
    .navbar-nav {
      flex-direction: row;
    }
  .dropdown-item {
    &:hover {
      background-color: $gold;
      color: #fff;
    }
  }

  select.language-dropdown {
    background: transparent;
    color: $text-color;
    border: none;
    &:focus-visible { outline: none; }

    option {
      color: #000;
      &:hover {
        background-color: var(--selectHoverCol);
        color: #fff;
      }
    }
  }

  i.fa.rtl { vertical-align: middle; }

</style>