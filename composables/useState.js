export const useMainToken = () => useState(() => []);
export const useToken = () => useState(() => []);
export const useUserInfo = () => useState(() => []);
export const useLang = () => useState(() => []);
export const useAuth = () => useState(() => ({
  isAuthenticated: false
}));
export const useImageLouded = () => useState(() => ({
  loaded: false
}));
