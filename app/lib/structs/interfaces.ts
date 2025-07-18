export interface RouteObj {
  title: string;
  path: string;
}

export interface menuTreeObj {
  path: string;
  title: string;
  children?: Array<menuTreeObj>;
}

export interface clipboardPrepObj {
  value: string;
  copied: boolean;
}
