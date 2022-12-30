import { useEffect, useState } from 'react';
import { useScript } from 'use-script';
import {
  AppendCustomPickerConfig,
  AppendCustomViewConfig,
  TokenClientConfig,
} from './GoogleDrive';
import {
  GoogleDrivePickerData,
  CustomPickerConfiguration,
  TokenResponse,
} from './GoogleDrive';

type Options = {
  googleAppId: string;
  googleAppKey: string;
  googleAuthClientId: string;
  customPickerConfig?: CustomPickerConfiguration;
  onAuthFailed?: (response: TokenResponse) => void;
  appendCustomPickerConfig?: AppendCustomPickerConfig;
  appendCustomViewConfig?: AppendCustomViewConfig;
  tokenClientConfig?: Partial<TokenClientConfig>;
};

export const useGooglePicker = (
  callbackFunction: (result: GoogleDrivePickerData, token: string) => void,
  options: Options,
) => {
  const { loading: loadingApis, error: errorApis } = useScript({
    src: 'https://apis.google.com/js/api.js',
  });
  const { loading: loadingGsi, error: errorGsi } = useScript({
    src: 'https://accounts.google.com/gsi/client',
  });

  const [pickerApiLoaded, setPickerApiLoaded] = useState(false);
  const [token, setToken] = useState<string>();

  const config = {
    viewId: 'DOCS',
    scope: ['https://www.googleapis.com/auth/drive.file'],
    ...options.customPickerConfig,
  };

  const createPicker = (initialToken?: string) => {
    const innerToken = initialToken || token;

    if (!innerToken) {
      return;
    }

    const view = new google.picker.DocsView(
      google.picker.ViewId[config.viewId],
    );

    if (config.viewMimeTypes) {
      view.setMimeTypes(config.viewMimeTypes.join(','));
    }

    const customView = options.appendCustomViewConfig
      ? options.appendCustomViewConfig(view)
      : view;

    const picker = new google.picker.PickerBuilder()
      .setAppId(options.googleAppId)
      .setOAuthToken(innerToken)
      .setDeveloperKey(options.googleAppKey)
      .addView(customView)
      .setCallback((result) =>
        callbackFunction((result as any) as GoogleDrivePickerData, innerToken),
      );

    const customPicker = options.appendCustomPickerConfig
      ? options.appendCustomPickerConfig(picker)
      : picker;

    customPicker.build().setVisible(true);
  };

  const loadPickerApi = () =>
    window.gapi.load('picker', {
      callback: () => {
        setPickerApiLoaded(true);
      },
    });

  const isApisLoaded = !loadingApis && !errorApis;
  const isGsiLoaded = !loadingGsi && !errorGsi;

  useEffect(() => {
    if (isApisLoaded && isGsiLoaded && !pickerApiLoaded) {
      loadPickerApi();
    }
  }, [loadingApis, errorApis, loadingGsi, errorGsi, pickerApiLoaded]);

  const openPicker = async () => {
    if (token) {
      createPicker();

      return;
    }

    window.google.accounts.oauth2
      .initTokenClient({
        client_id: options.googleAuthClientId,
        scope: config.scope.join(' '),
        callback: async (response: TokenResponse) => {
          createPicker(response.access_token);
          if (response.access_token) {
            setToken(response.access_token);

            return;
          }

          options.onAuthFailed?.(response);
        },
        ...options.tokenClientConfig,
      })
      .requestAccessToken();
  };

  return [openPicker, token] as const;
};
