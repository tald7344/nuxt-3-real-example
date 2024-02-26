export const useReauthorization = () => {
  const { apiBase, api } = useRuntimeConfig()

  const reAuthorize = async () => useFetch(`${api.AuthLoginApi}`, {
    baseURL: apiBase,
    method: 'POST',
    body: {
      email: 'rami@gmail.com',
      password: '123'
    },
    onResponse({ request, response, options }) {
      // Process the response data
      if (response._data.access_token) {
        localStorage.removeItem('mainToken')
        localStorage.setItem('mainToken', response._data.access_token)
        useMainToken().value = response._data.access_token
      }
      return response._data
    }
  })

  return {
    reAuthorize
  }
}