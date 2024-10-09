import { PermissionType } from "@screens/PermissionRequired";

export enum Routes {
  About = "About",
  App = "App",
  DebugConfig = "DebugConfig",
  DebugUi = "DebugUi",
  Group = "Group",
  GroupReview = "GroupReview",
  Groups = "Groups",
  Home = "Home",
  LegalWebview = "LegalWebview",
  PermissionRequired = "PermissionRequired",
  Settings = "Settings",
  SettingsDarkmode = "SettingsDarkmode",
  SettingsLocale = "SettingsLocale",
  SettingsThemeVariant = "SettingsThemeVariant",
}

export type LegalWebviewType = "privacy" | "terms";

export type RootStackParams = {
  [Routes.App]: undefined;
};

export type AppStackParams = {
  [Routes.About]: undefined;
  [Routes.DebugConfig]: undefined;
  [Routes.DebugUi]: { item: string };
  [Routes.Group]: { year: number; month: number };
  [Routes.GroupReview]: { year: number; month: number };
  [Routes.Groups]: undefined;
  [Routes.Home]: undefined;
  [Routes.LegalWebview]: { type: LegalWebviewType };
  [Routes.PermissionRequired]: { type: PermissionType };
  [Routes.Settings]: undefined;
  [Routes.SettingsDarkmode]: undefined;
  [Routes.SettingsLocale]: undefined;
  [Routes.SettingsThemeVariant]: undefined;
};
