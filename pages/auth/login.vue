<template>
  <main class="">
    <section class="col-lg-8 login_box_area mx-auto">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 d-none">
            <!-- <div class="login_box_img">
              <img class="img-fluid" src="/images/login.jpg" alt="">
              <div class="hover">
                <h4>New to our website?</h4>
                <p>There is always new material being introduced, and the best way to find out is to find out</p>
                <NuxtLink to="/auth/register" class="primary-btn btn-custom px-5 mx-auto">Create Account</NuxtLink>
              </div>
            </div> -->
          </div>
          <div class="col-md-10 col-lg-8 col-xl-6 mx-auto">
            <div class="login_form_inner">
              <h3 class="mb-3">{{ $t('login-to-enter') }}</h3>            
              <VForm
                id="loginForm"
                class="row login_form"
                :validation-schema="schema"
                :initial-values="initialValues"
                v-slot="{ meta: formMeta }"
                @submit="handleSubmit" >
                <div v-if="hasError" class="error-messages mb-3">
                  <div class="alert alert-danger text-center">
                    <ul class="list-unstyled mb-0">
                      <li >{{ errorMessage }}</li>
                    </ul>
                  </div>
                </div>
                <ElementsFormVTextInput type="email" name="email" id="email" :label="$t('email')" :placeholder="$t('email')" />
                <ElementsFormVTextInput type="password" name="password" id="password" :label="$t('password')" :placeholder="$t('password')" autocomplete="false" :activePasswordEye="true"/>
                <div class="col-md-12 form-group">
                  <button type="submit" value="Login" class="btn btn-custom btn-block px-3" 
                  :class="{ 'btn-primary': formMeta.valid }" 
                  :disabled="!formMeta.valid || isLoading">
                    <span v-if="!isLoading">{{ $t('login') }}</span>
                    <span v-else>{{ $t('loading...') }}</span>
                  </button>              
                </div>
              </VForm>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
  import { object, string, ref as yupRef } from "yup";
  import { configure } from "vee-validate";  
  const { $awn } = useNuxtApp()
  
  definePageMeta({
    middleware: ['not-authorize']
  })

  const { apiBase, api } = useRuntimeConfig()
  const isLoading = ref(false);
  const hasError = ref(false);
  const errorMessage = ref('');

  // Handle Form Submit
  const handleSubmit = async (values, actions) => {
    isLoading.value = true
    const { data, error } = await useFetch(`${api.AuthLoginApi}`, {
      baseURL: apiBase,
      method: 'POST',
      body: values
    })

    if (error.value) {
        isLoading.value = false
        hasError.value = true
        errorMessage.value = error.value.data.error
        // remove valid class and set invalid to email input
        actions.evt.target[1].classList.remove('is-valid');
        actions.evt.target[1].classList.add('is-invalid');
        // remove valid class and set invalid to password input
        actions.evt.target[2].classList.remove('is-valid');
        actions.evt.target[2].classList.add('is-invalid');
    }
    if (data.value) {
        console.log('', data.value)
        hasError.value = false                                  // hide error message box
        localStorage.setItem('token', data.value.access_token)  // storage the token in localstorage
        useToken().value = data.value.access_token
        localStorage.setItem('userInfo', JSON.stringify(data.value.me))     // storage the user info inside inside localstorage
        useUserInfo().value = data.value.me
        useAuth().value.isAuthenticated = true          // make global isAuthenticated state true
        actions.resetForm();
        return navigateTo('/')
    }
  };
  configure({
    validateOnBlur: true,         // controls if `blur` events should trigger validation with `handleChange` handler
    validateOnChange: true,       // controls if `change` events should trigger validation with `handleChange` handler
    validateOnInput: false,       // controls if `input` events should trigger validation with `handleChange` handler
    validateOnModelUpdate: true,  // controls if `update:modelValue` events should trigger validation with `handleChange` handler
  });
  const schema = object({
    email: string()
      .required()
      .email()
      // .test(
      //   "email-is-taken",
      //   "Email is already taken",
      //   async (value) => !(await existingEmail(value))
      // )
      .label("Email Address"),
    password: string().required().min(3).label("Your Password"),
  });
  const initialValues = { email: "", password: "" };
</script>

<style lang="scss">
  @import '~/assets/styles/scss/theme/variables';
  @import '~/assets/styles/scss/theme/mixin';

  .login_box_area {
    padding: 100px 0;
    @include sm-mobile {
      padding: 50px 0;
    }
    .login_box_img {
      margin-right: -30px;
      position: relative; 
      img { width: 100%; }
      &:before {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        content: "";
        background: #000;
        opacity: .5; 
      }
      .hover {
        position: absolute;
        top: 50%;
        left: 0px;
        text-align: center;
        width: 100%;
        transform: translateY(-50%); 
        h4 {
          font-size: 24px;
          color: #fff;
          margin-bottom: 15px; 
        }
        p {
          max-width: 380px;
          margin: 0px auto 25px;
          color: #fff; 
        }
        .primary-btn {
          border-radius: 0px;
          line-height: 38px;
          text-transform: uppercase; 
          &:hover:before { left: 260px; }
        }
      }
    }
    .login_form_inner {
      // box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.07);
      box-shadow: 0px 10px 30px 0px rgb(250 250 250 / 7%);
      height: 100%;
      text-align: center;
      padding-top: 115px; 
      padding-bottom: 100px; 
      -webkit-backdrop-filter: brightness(0.2);
      backdrop-filter: brightness(0.2);
      box-shadow: 9px 11px 9px -4px #777;
      @include tablet {
        padding-top: 80px;
        padding-bottom: 65px;
      }
      @include sm-mobile {
        padding-top: 65px;
        padding-bottom: 50px;
      }
      h3 {
        color: #fff;
        text-transform: uppercase;
        font-size: 18px;
        margin-bottom: 30px; 
      }
      .login_form {
        max-width: 385px;
        margin: auto;
        a {
          font-size: 14px;
          color: #777777;
          font-family: "Roboto", sans-serif;
          margin-top: 20px;
          display: block; 
        }
      }
    }
  }

</style>