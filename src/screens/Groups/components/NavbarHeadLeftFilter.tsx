import { FilterIcon } from "@components/Icon";
import { NavbarIconButton } from "@components/NavbarIconButton";
import React from "react";

export function NavbarHeadLeftFilter(props: { onPress?: () => void }) {
  return <NavbarIconButton Icon={FilterIcon} side="left" onPress={props.onPress} />;
}
