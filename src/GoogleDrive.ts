/**
 * For complete reference see: https://developers.google.com/picker/docs/reference#action
 */
export enum GOOGLE_ACTION {
  CANCEL = 'cancel',
  PICKED = 'picked',
  LOADED = 'loaded',
}

/**
 * For complete reference see: https://developers.google.com/picker/docs/reference#service-id
 */
export enum ServiceId {
  DOCS = 'docs',
  MAPS = 'maps',
  PHOTOS = 'picasa',
  SEARCH_API = 'search-api',
  URL = 'url',
  YOUTUBE = 'youtube',
}

/**
 * For complete reference see: https://developers.google.com/drive/picker/reference#thumbnail
 */
export interface DocumentThumbnailObject {
  url: string;
  width: number;
  height: number;
}

export enum Type {
  DOCUMENT = 'document',
  LOCATION = 'location',
  PHOTO = 'photo',
  URL = 'url',
  VIDEO = 'video',
}

/**
 * For complete reference see: https://developers.google.com/picker/docs/results
 */
export type GoogleDriveFile = {
  addressLines?: string[];
  description: string;
  downloadUrl?: string;
  driveSuccess: boolean;
  duration?: unknown;
  embedUrl: string;
  iconUrl: string;
  id: string;
  isNew?: boolean;
  isShared: boolean;
  lastEditedUtc: number;
  latitude?: unknown;
  longitude?: unknown;
  mimeType: string;
  name: string;
  organizationDisplayName?: string;
  parentId?: string;
  phoneNumbers?: Array<{ type: string; number: any }>;
  rotation?: number;
  rotationDegree?: number;
  serviceId: ServiceId;
  sizeBytes: number;
  thumbnails?: DocumentThumbnailObject[];
  type: Type;
  uploadState?: string;
  url: string;
};

type ViewIdOptions =
  | 'DOCS'
  | 'DOCS_IMAGES'
  | 'DOCS_IMAGES_AND_VIDEOS'
  | 'DOCS_VIDEOS'
  | 'DOCUMENTS'
  | 'DRAWINGS'
  | 'FOLDERS'
  | 'FORMS'
  | 'PDFS'
  | 'PRESENTATIONS'
  | 'SPREADSHEETS';

export type GoogleDrivePickerData = {
  action: GOOGLE_ACTION;
  docs: GoogleDriveFile[];
  parents: unknown;
  viewToken: [
    ViewIdOptions,
    undefined,
    { query: string | undefined; parent: string | undefined },
  ];
};

export type CustomPickerConfiguration = {
  viewId?: ViewIdOptions;
  viewMimeTypes?: string[];
  customScopes?: string[];
};

export type AppendCustomPickerConfig = (
  picker: google.picker.PickerBuilder,
) => google.picker.PickerBuilder;

export type AppendCustomViewConfig = (
  view: google.picker.DocsView,
) => google.picker.DocsView;

export type TokenResponse = {
  access_token?: string;
  expires_in: number;
  hd: string;
  prompt: string;
  token_type: string;
  scope: string;
  state: string;
  error: string;
  error_description: string;
  error_uri: string;
  details?: string;
};

export type ErrorType = 'popup_failed_to_open' | 'popup_closed' | 'unknown';

export type ErrorCallback = {
  message: string;
  stack: string;
  type: ErrorType;
};

/**
 * For complete reference see: https://developers.google.com/identity/oauth2/web/reference/js-reference#TokenClientConfig/
 */

export type TokenClientConfig = {
  client_id: string;
  scope: string;
  redirect_uri?: string;
  state?: string;
  enable_serial_consent?: boolean;
  hint?: string;
  hosted_domain?: string;
  ux_mode?: 'popup' | 'redirect';
  select_account?: boolean;
  callback: (response: TokenResponse) => void;
  error_callback?: (error: ErrorCallback) => void;
};
