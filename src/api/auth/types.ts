export interface TLoginRequest {
  email: string;
  password: string;
}

export interface TLoginResponse {
  userInfo: {
    id: string;
    email: string;
    name: string;
    roles: string[];
  };
  token: string;
}

export interface TRefreshUserResponse {
  userInfo: {
    id: string;
    email: string;
    name: string;
    roles: string[];
  };
}

export interface TRegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface TRegisterResponse {
  userInfo: {
    id: string;
    email: string;
    name: string;
    roles: string[];
  };
  token: string;
}
