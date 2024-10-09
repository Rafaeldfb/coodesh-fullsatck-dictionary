export type GlobalStateType = {
  accessToken?: ThisType<AccessToken>
  refreshToken?: ThisType<refreshToken>
};

type AccessToken =  string;
type refreshToken = string;