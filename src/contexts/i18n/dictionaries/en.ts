import { app, localeValues, localeValuesWithFlags, themeValues } from "./shared";

const darkmodeValues = {
  dark: "Enabled",
  light: "Disabled",
  system: "System",
};

export const dictionary = {
  date: {
    months: {
      "1": "January",
      "2": "February",
      "3": "March",
      "4": "April",
      "5": "May",
      "6": "June",
      "7": "July",
      "8": "August",
      "9": "September",
      "10": "October",
      "11": "November",
      "12": "December",
    },
  },
  screens: {
    about: {
      navigationTitle: "About",
      entries: {
        version: { label: "Version" },
        privacy: { label: "Privacy policy" },
        terms: { label: "Terms and conditions" },
        debugConfig: { label: "Configuration" },
        debugPermissionRequired: { label: "Permissions screen" },
        debugUi: { label: "Debug UI" },
        feedback: { label: "Send feedback" },
      },
      debug: { title: "Debug" },
      contact: { title: "Contact" },
    },
    debugConfig: {
      navigationTitle: "Configuration debug",
    },
    debugUi: {
      navigationTitle: "Debug UI",
      buttons: {
        back: { label: "Back" },
      },
    },
    group: {
      swiper: {
        keep: "Keep",
        drop: "Drop",
      },
    },
    groups: {
      navigationTitle: app.name,
      stats: {
        totalPictures: {
          zero: "You have no photo",
          one: "You have one photo",
          other: "You have %{count} photos",
        },
      },
      filterMenu: {
        title: "Filter Options",
        sortByDateNewFirst: "Newest First",
        sortByDateOldFirst: "Oldest First",
        showFilteredAlbums: "All albums",
        hideFilteredAlbums: "Only album to sort",
        close: "Close",
      },
      empty: {
        title: "Great job!",
        text: "You've sorted all your %{count} medias",
      },
    },
    groupReview: {
      navigationTitle: "Review",
      button: {
        zero: "Continue",
        one: "Delete 1 photo",
        other: "Delete %{count} photos",
      },
    },
    home: {
      navigationTitle: "Home",
    },
    legalWebview: {
      privacy: {
        title: "Privacy",
      },
      terms: {
        title: "Terms and conditions",
      },
      loading: "Loading...",
      error: "Unable to open the webpage",
    },
    permissionRequired: {
      navigationTitle: "Permission screen",
      camera: {
        title: "Camera Permission Required",
        message:
          "This application needs access to the camera. You can grant access in your %{device} settings.",
        button: "Open device settings",
      },
      location: {
        title: "Location Permission Required",
        message:
          "This application needs access to your location. You can grant access in your %{device} settings.",
        button: "Open device settings",
      },
      mediaLibrary: {
        title: "Media Library Permission Required",
        message:
          "This application needs access to the photo library. You can grant access in your %{device} settings.",
        button: "Open device settings",
      },
      contacts: {
        title: "Contacts Permission Required",
        message:
          "This application needs access to your contacts. You can grant access in your %{device} settings.",
        button: "Open device settings",
      },
      notifications: {
        title: "Notifications Permission Required",
        message:
          "This application needs permission to send notifications. You can grant access in your %{device} settings.",
        button: "Open device settings",
      },
      microphone: {
        title: "Microphone Permission Required",
        message:
          "This application needs access to the microphone. You can grant access in your %{device} settings.",
        button: "Open device settings",
      },
      calendar: {
        title: "Calendar Permission Required",
        message:
          "This application needs access to your calendar. You can grant access in your %{device} settings.",
        button: "Open device settings",
      },
      reminders: {
        title: "Reminders Permission Required",
        message:
          "This application needs access to your reminders. You can grant access in your %{device} settings.",
        button: "Open device settings",
      },
      motion: {
        title: "Motion Permission Required",
        message:
          "This application needs access to motion data. You can grant access in your %{device} settings.",
        button: "Open device settings",
      },
      bluetooth: {
        title: "Bluetooth Permission Required",
        message:
          "This application needs access to Bluetooth. You can grant access in your %{device} settings.",
        button: "Open device settings",
      },
      health: {
        title: "Health Permission Required",
        message:
          "This application needs access to health data. You can grant access in your %{device} settings.",
        button: "Open device settings",
      },
      faceId: {
        title: "Face ID Permission Required",
        message:
          "This application needs access to Face ID. You can grant access in your %{device} settings.",
        button: "Open device settings",
      },
    },
    settings: {
      navigationTitle: "Preferences",
      entries: {
        darkmode: {
          label: "Dark mode",
          values: darkmodeValues,
        },
        locale: {
          label: "Language",
          values: localeValues,
        },
        themeVariant: {
          label: "Theme",
          values: themeValues,
        },
        about: { label: "About" },
        resetAppData: {
          label: "Reset all app data",
          confirm: {
            title: "Reset app data",
            message: "Are you sure you want to reset all the app data?",
            confirmLabel: "Reset",
            cancelLabel: "Cancel",
          },
        },
        shareApp: {
          label: "Share the app",
          message: "Check out this awesome app!",
        },
        rateApp: { label: "Rate the app" },
        resetPreferences: {
          label: "Reset all your preferences",
          confirm: {
            title: "Reset preferences",
            message: "Are you sure you want to reset all your preferences?",
            confirmLabel: "Yes",
            cancelLabel: "Cancel",
          },
        },
      },
      acknoledgement:
        "Your preferences will be saved on this device only, but will be reset if you reinstall the app.",
    },
    settingsDarkmode: {
      navigationTitle: "Dark mode",
      options: darkmodeValues,
      acknowledgement:
        "If you choose automatic, the mode will adjust based on your device settings.",
    },
    settingsLocale: {
      navigationTitle: "Language",
      options: localeValuesWithFlags,
    },
    settingsThemeVariant: {
      navigationTitle: "Theme",
      options: themeValues,
    },
  },
};

export type Dictionary = typeof dictionary;
