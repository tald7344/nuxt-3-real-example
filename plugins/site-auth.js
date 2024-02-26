export default defineNuxtPlugin(async nuxtApp => {
  const { apiBase, api } = useRuntimeConfig();
  // if (typeof window !== 'undefined') {
  if (process.client) {
    const { $awn } = useNuxtApp()        
    // Get Main Site Token
    const mainToken = localStorage.getItem('mainToken')
    // Get User Token
    const token = localStorage.getItem('token')
    // Get User Info
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    // store main token in useSTate
    useMainToken().value = mainToken
    // make global isAuthenticated state true
    useAuth().value.isAuthenticated = token ? true : false
    // store Token in the store
    useToken().value = token
    // store userinfo in the store
    useUserInfo().value = userInfo

    if (!mainToken) {
      const data = await $fetch(`${api.AuthLoginApi}`, {
          baseURL: apiBase,
          method: 'POST',
          body: {
            email: 'rami@gmail.com',
            password: '123'
          }
        })
        // Store token if there is not any error
        if (data.access_token) {
          localStorage.setItem('mainToken', data.access_token);
          useMainToken().value = data.access_token
        }
        if (!error.value) {
          $awn.alert('Server Error, Please Try Again Later', { durations: { global: 5000 } })
        }
    }
  }
})