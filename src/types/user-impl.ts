export type UserImpl = {
  uid: string;
  email: string;
  emailVerified: boolean;
  displayName: string;
  isAnonymous: boolean;
  photoURL: string;
  providerData: ProviderDatum[];
  stsTokenManager: StsTokenManager;
  createdAt: string;
  lastLoginAt: string;
  apiKey: string;
  appName: string;
};

export type ProviderDatum = {
  providerId: string;
  uid: string;
  displayName: string;
  email: string;
  phoneNumber: null;
  photoURL: string;
};

export type StsTokenManager = {
  refreshToken: string;
  accessToken: string;
  expirationTime: number;
};
