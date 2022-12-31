# React Google Drive picker hook

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
<a href="https://www.npmjs.com/package/react-google-picker-hook">
<img alt="npm latest version" src="https://img.shields.io/npm/v/react-google-picker-hook">
</a>

<b>Google Drive API hook for React compatible with the newest Google auth API</b>

# Installation

[![module formats: cjs, and esm](https://img.shields.io/badge/module%20formats-cjs%2c%20esm-green.svg?style=flat)](https://www.npmjs.com/package/react-google-picker-hook?activeTab=explore)

## General

1. Add the `react-google-picker-hook` package

```bash
# yarn
yarn add react-google-picker-hook

## optional
yarn add --dev @types/google.picker
```

```bash
# npm
npm install react-google-picker-hook --save

## optional
npm install @types/google.picker --save-dev
```

2. Use the package

```ts
import { useGooglePicker } from 'react-google-picker-hook';

const [openPicker] = useGooglePicker(
  (data: GoogleDrivePickerData, token: string) => {
    console.log({ data, token });

    if (data?.action === GOOGLE_ACTION.PICKED) {
      // Handle file pick
    }
  },
  {
    googleAppId: 'googleAppId',
    googleAuthClientId: 'googleAuthClientId',
    googleAppKey: 'googleAppKey',
  },
);

// ...

return <button onClick={openPicker}>Upload!</button>;
```

## Handling errors (optional)

There are two separate error callback which can be used for error detection.

```ts
const [openPicker] = useGooglePicker(
  // ... base callback
  {
    onAuthFailed: (response: TokenResponse) => {
      console.log(response.error_description || response.details);

      // handle auth error
    },
    tokenClientConfig: {
      error_callback: ({ message, stack, type }: ErrorCallback) => {
        console.log({ message, stack, type });

        // handle client error
      },
    },
  },
);
```

## Extending the default config (optional)

### Two custom configs objects

- `tokenClientConfig` is spread to Google's `initTokenClient`
- `customPickerConfig` is used to override the minimal default config used for picker

```ts
const [openPicker] = useGooglePicker(
  // ... base callback
  {
    customPickerConfig: {
      // custom picker config
    },
    tokenClientConfig: {
      /* custom config for initTokenClient */
    },
  },
);
```

### Two config callback functions

- `appendCustomPickerConfig`
- `appendCustomViewConfig`

Both used to extend the builder pattern of `DocsView` and `PickerBuilder`

```ts
const [openPicker] = useGooglePicker(
  // ... base callback
  {
    appendCustomViewConfig: (view) => {
      // extend by calling any of the inner setters
      return view;
    },
    appendCustomPickerConfig: (picker) => picker.setSize(300, 300),
  },
);
```
