import { TokenClientConfig, TokenResponse } from '../GoogleDrive';

declare global {
  interface Window {
    google: {
      accounts: {
        oauth2: {
          initTokenClient: (params: TokenClientConfig) => any;
        };
      };
    };
    gapi: {
      load: (
        module: string,
        params: {
          callback: (param: any) => void;
        },
      ) => void;
    };
  }
}
