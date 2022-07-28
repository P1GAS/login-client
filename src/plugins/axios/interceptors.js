import jwtDecode from "jwt-decode";

import { getNewTokens } from "servers";
import store from "store";
import { accessTokenGot } from "features/accessToken";

const getAccessToken = () => {
  const state = store.getState();
  const accessToken = state.accessToken.value;
  return accessToken;
};

const setTokenOnSubmit = async (req) => {
  try {
    let accessToken = getAccessToken();
    const currentDate = new Date();

    const isValidAccessToken =
      jwtDecode(accessToken).exp * 1000 > currentDate.getTime();

    if (!isValidAccessToken || true) {
      const res = await getNewTokens();
      const { accessToken: newAccessToken } = res.data;
      store.dispatch(accessTokenGot(newAccessToken));
      accessToken = newAccessToken;
    }

    req.headers.Authorization = `Bearer ${accessToken}`;
    return req;
  } catch (error) {
    return req;
  }
};

const interceptorFunc = (axiosJWT) => {
  axiosJWT.interceptors.request.use(setTokenOnSubmit);
};

export default interceptorFunc;
