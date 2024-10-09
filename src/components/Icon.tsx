import EntypoIcons from "@expo/vector-icons/Entypo";
import FeatherIcons from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import React, { ComponentProps } from "react";
import { View } from "react-native";

export type IconProps = Omit<ComponentProps<typeof Ionicons>, "name">;

export const StartToEndIcon = (props: IconProps) => (
  <MaterialIcons name="chevron-right" {...props} />
);
export const EndToStartIcon = (props: IconProps) => (
  <MaterialIcons name="chevron-left" {...props} />
);

export const CheckmarkIcon = (props: IconProps) => <FeatherIcons name="check" {...props} />;
export const BrushIcon = (props: IconProps) => <FontAwesome5 name="brush" {...props} />;

export const DarkmodeAutomaticIcon = (props: IconProps) => (
  <MaterialCommunityIcons name="theme-light-dark" {...props} />
);
export const DarkmodeDarkIcon = (props: IconProps) => <MaterialIcons name="dark-mode" {...props} />;
export const DarkmodeLightIcon = (props: IconProps) => (
  <MaterialIcons name="light-mode" {...props} />
);

export const SettingsIcon = (props: IconProps) => <Ionicons name="settings-outline" {...props} />;
export const FilterIcon = (props: IconProps) => <Ionicons name="filter-sharp" {...props} />;

export const DropIcon = (props: IconProps) => <EntypoIcons name="cross" {...props} />;
export const KeepIcon = (props: IconProps) => <EntypoIcons name="check" {...props} />;
export const UndoIcon = (props: IconProps) => <FontAwesome name="undo" {...props} />;

export const ChevronUpIcon = (props: IconProps) => <EntypoIcons name="chevron-up" {...props} />;
export const ChevronDownIcon = (props: IconProps) => <EntypoIcons name="chevron-down" {...props} />;

export const RadioOnIcon = (props: IconProps) => (
  <MaterialIcons name="radio-button-on" {...props} />
);
export const RadioOffIcon = (props: IconProps) => (
  <MaterialIcons name="radio-button-off" {...props} />
);

export const RateIcon = (props: IconProps) => <FontAwesome name="star-o" {...props} />;
export const ShareIcon = (props: IconProps) => <Ionicons name="share-social" {...props} />;

export const Demo = () => (
  /* eslint-disable react-native/no-inline-styles -- demo purpose */
  <View style={{ flexDirection: "row", gap: 16, flexWrap: "wrap" }}>
    <EndToStartIcon size={36} />
    <StartToEndIcon size={36} />
    <CheckmarkIcon size={36} />
    <BrushIcon size={36} />
    <DarkmodeAutomaticIcon size={36} />
    <DarkmodeDarkIcon size={36} />
    <DarkmodeLightIcon size={36} />
    <SettingsIcon size={36} />
    <DropIcon size={36} />
    <KeepIcon size={36} />
    <UndoIcon size={36} />
    <ChevronUpIcon size={36} />
    <ChevronDownIcon size={36} />
    <RadioOnIcon size={36} />
    <RadioOffIcon size={36} />
    <RateIcon size={36} />
    <ShareIcon size={36} />
  </View>
  /* eslint-enable react-native/no-inline-styles -- demo purpose */
);
