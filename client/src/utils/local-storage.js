export const setTokenIntoLocalStorage = (token) => {
  return localStorage.setItem("token", token);
};

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

export const removeTokenFromLocalStorage = () => {
  return localStorage.removeItem("token");
};
