import { decodedToken } from "./jwtDecode";
import { getTokenFromLocalStorage } from "./local-storage";

export const getUserInfo = () => {
  const accessToken = getTokenFromLocalStorage("token");

  if (accessToken) {
    const decodedData = decodedToken(accessToken);
    return {
      ...decodedData,
    };
  }
};
