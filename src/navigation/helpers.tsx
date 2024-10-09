import { StackActions, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PermissionType } from "@screens/PermissionRequired";
import { useCallback } from "react";
import { AppStackParams, Routes } from "./routes";

export function useGoToAbout() {
  const navigation = useNavigation<StackNavigationProp<AppStackParams>>();
  return useCallback(() => navigation.navigate(Routes.About), [navigation]);
}

export function useGoToDebugConfig() {
  const navigation = useNavigation<StackNavigationProp<AppStackParams>>();
  return useCallback(() => navigation.navigate(Routes.DebugConfig), [navigation]);
}

export function useGoToDebugUi() {
  const navigation = useNavigation<StackNavigationProp<AppStackParams>>();
  return useCallback((item: string) => navigation.navigate(Routes.DebugUi, { item }), [navigation]);
}

export function useGoToGroup() {
  const navigation = useNavigation<StackNavigationProp<AppStackParams>>();
  return useCallback(
    (year: number, month: number) => navigation.navigate(Routes.Group, { year, month }),
    [navigation],
  );
}

export function useGoToGroupReview() {
  const navigation = useNavigation<StackNavigationProp<AppStackParams>>();
  return useCallback(
    (
      { year, month }: { year: number; month: number },
      replace?: boolean, // Optional parameter
    ) => {
      if (replace) {
        navigation.dispatch(StackActions.replace(Routes.GroupReview, { year, month }));
      } else {
        navigation.navigate(Routes.GroupReview, { year, month });
      }
    },
    [navigation],
  );
}

export function useGoToGroups() {
  const navigation = useNavigation<StackNavigationProp<AppStackParams>>();
  return useCallback(() => navigation.navigate(Routes.Groups), [navigation]);
}

export function useGoToLegalWebview() {
  const navigation = useNavigation<StackNavigationProp<AppStackParams>>();
  return useCallback(
    (type: "privacy" | "terms") => navigation.navigate(Routes.LegalWebview, { type }),
    [navigation],
  );
}

export function useGoToPermissionRequired() {
  const navigation = useNavigation<StackNavigationProp<AppStackParams>>();
  return useCallback(
    (type: PermissionType) => navigation.navigate(Routes.PermissionRequired, { type }),
    [navigation],
  );
}

export function useGoToSettings() {
  const navigation = useNavigation<StackNavigationProp<AppStackParams>>();
  return useCallback(() => navigation.navigate(Routes.Settings), [navigation]);
}

export function useGoToSettingsDarkmode() {
  const navigation = useNavigation<StackNavigationProp<AppStackParams>>();
  return useCallback(() => navigation.navigate(Routes.SettingsDarkmode), [navigation]);
}

export function useGoToSettingsLocale() {
  const navigation = useNavigation<StackNavigationProp<AppStackParams>>();
  return useCallback(() => navigation.navigate(Routes.SettingsLocale), [navigation]);
}

export function useGoToSettingsThemeVariant() {
  const navigation = useNavigation<StackNavigationProp<AppStackParams>>();
  return useCallback(() => navigation.navigate(Routes.SettingsThemeVariant), [navigation]);
}
