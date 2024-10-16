import { type Theme as NavigationTheme } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import { Platform, StatusBarProps } from "react-native";

export type DarkMode = "dark" | "light";
export const themeVariants = ["stitch", "flamingo", "grinch", "lorax"] as const;
export type ThemeVariant = (typeof themeVariants)[number];

type Palette = {
  primary: string;
  navigation: string;
  text: string;
  subtle: string;
  surface: string;
  border: string;
  background: string;
  danger: string;
};

type PaletteApp = {
  keep: string;
  keepContrast: string;
  drop: string;
  dropContrast: string;
  undo: string;
  undoContrast: string;
};

type ThemeVariantProps = "navigation" | "primary" | keyof PaletteApp;
const variants: Record<ThemeVariant, Pick<Palette & PaletteApp, ThemeVariantProps>> = {
  stitch: {
    navigation: "#0084FF",
    primary: "#0084FF",
    keep: "#0084FF",
    keepContrast: "#fff",
    drop: "red",
    dropContrast: "#fff",
    undo: "#ccc",
    undoContrast: "#fff",
  },
  flamingo: {
    navigation: "#FF8DA1",
    primary: "#FF8DA1",
    keep: "#FF8DA1",
    keepContrast: "#fff",
    drop: "#645AA5",
    dropContrast: "#fff",
    undo: "#ccc",
    undoContrast: "#fff",
  },
  grinch: {
    navigation: "#009688",
    primary: "#009688",
    keep: "#009688",
    keepContrast: "#fff",
    drop: "#f7475c",
    dropContrast: "#fff",
    undo: "rgba(0,0,0,.85)",
    undoContrast: "#fff",
  },
  lorax: {
    navigation: "#FFA500",
    primary: "#FFA500",
    keep: "#FFA500",
    keepContrast: "#fff",
    drop: "#ff3700",
    dropContrast: "#fff",
    undo: "#ccc",
    undoContrast: "#fff",
  },
};

const palettes: Record<DarkMode, Omit<Palette, ThemeVariantProps>> = {
  dark: {
    background: "#000000",
    border: "#2C2C2E",
    danger: "#EE3333",
    subtle: "#9A9A9E",
    surface: "#1C1C1E",
    text: "#E5E5E7",
  },
  light: {
    background: "#F2F2F2",
    border: "#E2E2E2",
    danger: "#EE3333",
    subtle: "#8E8E93",
    surface: "#FFFFFF",
    text: "#000",
  },
};

const typographyVariants = {
  h1: {
    fontFamily: "Black",
    fontSize: 24,
  },
  h2: {
    fontFamily: "Bold",
    fontSize: 20,
  },
  h3: {
    fontFamily: "Bold",
    fontSize: 18,
  },
  h4: {
    fontFamily: "Regular",
    fontSize: 13,
    textTransform: "uppercase",
  },
  text: {
    fontFamily: "Regular",
    fontSize: 16,
  },
  annotation: {
    fontFamily: "Light",
    fontSize: 14,
    lineHeight: 20,
  },
  list: {
    fontFamily: "Regular",
    fontSize: 16,
  },
  button: {
    fontFamily: "Bold",
    fontSize: 18,
  },
};

const shadows = {
  low: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 1.2,
      },
      android: { elevation: 3 },
    }),
  },
  base: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.23,
        shadowRadius: 3.85,
      },
      android: { elevation: 6 },
    }),
  },
  high: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.38,
        shadowRadius: 6.37,
      },
      android: { elevation: 10 },
    }),
  },
};

export function buildTheme(variant: ThemeVariant, darkMode: DarkMode) {
  const palette = {
    ...variants[variant],
    ...palettes[darkMode],
  };

  const navigation: NavigationTheme = {
    dark: darkMode === "dark",
    colors: {
      primary: palette.primary,
      background: palette.background,
      card: palette.surface,
      text: palette.text,
      border: palette.border,
      notification: "rgb(255, 59, 48)",
    },
  };

  const screenOptions: StackNavigationOptions = {
    headerStyle: {
      backgroundColor: "transparent",
      borderBottomWidth: 0,
    },
    headerTitleStyle: {
      fontFamily: "Bold", // Shoulb be based on some enums
      color: palette.text,
    },
    headerTintColor: palette.navigation,
  };

  const StatusBar: StatusBarProps = {
    animated: false,
    barStyle: darkMode === "dark" ? "light-content" : "dark-content",
  };

  const rounded = {
    sm: 3,
    base: 6,
  };

  const boxMultiplier = 4;

  return {
    darkMode: darkMode === "dark",

    boxMultiplier,

    navigation,
    screenOptions,
    StatusBar,

    palette,
    rounded,
    shadows,
    spacings: {
      xs: boxMultiplier / 4,
      sm: boxMultiplier / 2,
      base: boxMultiplier,
      lg: boxMultiplier * 2,
      xl: boxMultiplier * 4,
      screen: boxMultiplier * 4,
    },

    overlays: {
      base: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
    },

    components: {
      ActivityIndicator: {
        color: palette.primary,
      },
      AssetImage: {
        backgroundColor: darkMode === "dark" ? "#333" : "#ccc",
      },
      Button: {
        primary: {
          backgroundColor: palette.primary,
          borderColor: palette.primary,
          color: "#fff",
        },
        default: {
          backgroundColor: palette.surface,
          borderColor: palette.border,
          color: palette.text,
        },
        disabled: {
          backgroundColor: palette.surface,
          borderColor: palette.border,
          color: palette.subtle,
        },
        danger: {
          backgroundColor: palette.danger,
          borderColor: palette.danger,
          color: "#fff",
        },
      },
      ButtonCircleIcon: {
        keep: {
          color: palette.keepContrast,
          backgroundColor: palette.keep,
        },
        drop: {
          color: palette.dropContrast,
          backgroundColor: palette.drop,
        },
        undo: {
          color: palette.undoContrast,
          backgroundColor: palette.undo,
        },
      },
      Counter: {
        backgroundColor: darkMode === "dark" ? "rgba(0,0,0,.7)" : "rgba(255,255,255,.7)",
        textColor: palette.text,
      },
      List: {
        item: {
          borderBottomColor: palette.border,
        },
      },
      ListEntryGeneric: {
        container: {
          backgroundColor: palette.surface,
        },
        value: {
          color: palette.subtle,
        },
        icon: {
          default: { color: palette.subtle },
          highlight: { color: palette.navigation },
        },
      },
      ListEntryText: {
        label: {
          color: palette.text,
        },
      },
      NavbarIconButton: {
        root: {
          backgroundColor: "transparent",
          minHeight: 42,
        },
        Icon: {
          color: palette.navigation,
        },
      },
      Paper: {
        backgroundColor: palette.surface,
      },
      PercentageLine: {
        backgroundColor: darkMode === "dark" ? "#333" : "#ccc",
        line: {
          backgroundColor: palette.primary,
        },
      },
      Typography: {
        palette: {
          text: { color: palette.text },
          subtle: { color: palette.subtle },
          primary: { color: palette.primary },
          danger: { color: palette.danger },
          navigation: { color: palette.navigation },
        },
        variants: typographyVariants,
      },
    },
  } as const;
}

export type Theme = ReturnType<typeof buildTheme>;
