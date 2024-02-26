export default defineNuxtRouteMiddleware(() => {
  const auth = useAuth();
  if (!auth.value.isAuthenticated) {
    return navigateTo('/auth/login')
  }
  return true
});