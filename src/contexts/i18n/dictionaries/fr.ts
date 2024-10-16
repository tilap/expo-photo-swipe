import { type Dictionary } from "./en";
import { app, localeValues, localeValuesWithFlags, themeValues } from "./shared";

const darkmodeValues = {
  dark: "Activé",
  light: "Désactivé",
  system: "Automatique",
};

export const dictionary: Dictionary = {
  date: {
    months: {
      "1": "Janvier",
      "2": "Février",
      "3": "Mars",
      "4": "Avril",
      "5": "Mai",
      "6": "Juin",
      "7": "Juillet",
      "8": "Août",
      "9": "Septembre",
      "10": "Octobre",
      "11": "Novembre",
      "12": "Décembre",
    },
  },
  screens: {
    about: {
      navigationTitle: "À propos",
      entries: {
        version: { label: "Version" },
        privacy: { label: "Politique de confidentialité" },
        terms: { label: "Conditions d'utilisations" },
        debugConfig: { label: "Configuration" },
        debugPermissionRequired: { label: "Écran de permissions" },
        debugUi: { label: "Débogage de l'ui" },
        feedback: { label: "Envoyer un feedback" },
      },
      debug: { title: "Débogage" },
      contact: { title: "Contact" },
    },
    debugConfig: {
      navigationTitle: "Debug config",
    },
    group: {
      swiper: {
        keep: "Garder",
        drop: "Jeter",
      },
    },
    groups: {
      navigationTitle: app.name,
      stats: {
        totalPictures: {
          zero: "Aucune photo",
          one: "Vous avez une photo",
          other: "Vous avez %{count} photos",
        },
      },
      filterMenu: {
        title: "Options",
        sortByDateNewFirst: "Plus récentes d'abord",
        sortByDateOldFirst: "Plus anciennes d'abord",
        showFilteredAlbums: "Tous les albums",
        hideFilteredAlbums: "Les albums à trier",
        close: "Fermer",
      },
      empty: {
        title: "Bravo !",
        text: "Vous avez trié vos %{count} photos.",
      },
    },
    groupReview: {
      navigationTitle: "Confirmation",
      button: {
        zero: "Tout garder",
        one: "Supprimer 1 photo",
        other: "Supprimer %{count} photos",
      },
    },
    debugUi: {
      navigationTitle: "Debug UI",
      buttons: {
        back: { label: "Retour" },
      },
    },
    home: {
      navigationTitle: "Accueil",
    },
    legalWebview: {
      privacy: {
        title: "Politique de confidentialité",
      },
      terms: {
        title: "Conditions d'utilisation",
      },
      loading: "Chargement...",
      error: "Impossible d'ouvrir la page web",
    },
    permissionRequired: {
      navigationTitle: "Écran de permissions",
      camera: {
        title: "Permission de la caméra requise",
        message:
          "Cette application nécessite l'accès à la caméra. Vous pouvez l'y autoriser en vous rendant dans les paramètres de votre %{device}.",
        button: "Ouvrir les réglages",
      },
      location: {
        title: "Permission de localisation requise",
        message:
          "Cette application nécessite l'accès à votre localisation. Vous pouvez l'y autoriser en vous rendant dans les paramètres de votre %{device}.",
        button: "Ouvrir les réglages",
      },
      mediaLibrary: {
        title: "Permission de la bibliothèque multimédia requise",
        message:
          "Cette application nécessite l'accès à la bibliothèque de photos. Vous pouvez l'y autoriser en vous rendant dans les paramètres de votre %{device}.",
        button: "Ouvrir les réglages",
      },
      contacts: {
        title: "Permission des contacts requise",
        message:
          "Cette application nécessite l'accès à vos contacts. Vous pouvez l'y autoriser en vous rendant dans les paramètres de votre %{device}.",
        button: "Ouvrir les réglages",
      },
      notifications: {
        title: "Permission des notifications requise",
        message:
          "Cette application nécessite l'autorisation d'envoyer des notifications. Vous pouvez l'y autoriser en vous rendant dans les paramètres de votre %{device}.",
        button: "Ouvrir les réglages",
      },
      microphone: {
        title: "Permission du microphone requise",
        message:
          "Cette application nécessite l'accès au microphone. Vous pouvez l'y autoriser en vous rendant dans les paramètres de votre %{device}.",
        button: "Ouvrir les réglages",
      },
      calendar: {
        title: "Permission du calendrier requise",
        message:
          "Cette application nécessite l'accès à votre calendrier. Vous pouvez l'y autoriser en vous rendant dans les paramètres de votre %{device}.",
        button: "Ouvrir les réglages",
      },
      reminders: {
        title: "Permission des rappels requise",
        message:
          "Cette application nécessite l'accès à vos rappels. Vous pouvez l'y autoriser en vous rendant dans les paramètres de votre %{device}.",
        button: "Ouvrir les réglages",
      },
      motion: {
        title: "Permission des mouvements requise",
        message:
          "Cette application nécessite l'accès aux données de mouvement. Vous pouvez l'y autoriser en vous rendant dans les paramètres de votre %{device}.",
        button: "Ouvrir les réglages",
      },
      bluetooth: {
        title: "Permission Bluetooth requise",
        message:
          "Cette application nécessite l'accès au Bluetooth. Vous pouvez l'y autoriser en vous rendant dans les paramètres de votre %{device}.",
        button: "Ouvrir les réglages",
      },
      health: {
        title: "Permission de santé requise",
        message:
          "Cette application nécessite l'accès aux données de santé. Vous pouvez l'y autoriser en vous rendant dans les paramètres de votre %{device}.",
        button: "Ouvrir les réglages",
      },
      faceId: {
        title: "Permission Face ID requise",
        message:
          "Cette application nécessite l'accès à Face ID. Vous pouvez l'y autoriser en vous rendant dans les paramètres de votre %{device}.",
        button: "Ouvrir les réglages",
      },
    },
    settings: {
      navigationTitle: "Préférences",
      entries: {
        darkmode: {
          label: "Mode sombre",
          values: darkmodeValues,
        },
        locale: {
          label: "Langue",
          values: localeValues,
        },
        themeVariant: {
          label: "Thème",
          values: themeValues,
        },
        about: { label: "À propos" },
        resetAppData: {
          label: "Supprimer vos données",
          confirm: {
            title: "Réinitialiser les données de l'application",
            message: "Êtes-vous sur de vouloire réinitialiser toutes les données de l'application?",
            confirmLabel: "Oui",
            cancelLabel: "Non",
          },
        },
        shareApp: {
          label: "Partager l'application",
          message: "Essaye cette application incroyable!",
        },
        rateApp: { label: "Noter l'application" },
        resetPreferences: {
          label: "Réinitialiser vos préférences",
          confirm: {
            title: "Réinitialisation",
            message: "Êtes-vous sur de vouloire réinitialiser toutes vos préférences?",
            confirmLabel: "Oui",
            cancelLabel: "Non",
          },
        },
      },
      acknoledgement:
        "Vos préférences seront sauvegardées uniquement sur cet appareil. Si vous réinstallez l'application, vos préférences seront réinitialisées.",
    },
    settingsDarkmode: {
      navigationTitle: "Mode sombre",
      options: darkmodeValues,
      acknowledgement:
        "Si vous choisissez automatique, le mode s'ajustera en fonction de la configuration de votre appareil.",
    },
    settingsLocale: {
      navigationTitle: "Langue",
      options: localeValuesWithFlags,
    },
    settingsThemeVariant: {
      navigationTitle: "Theme",
      options: themeValues,
    },
  },
};
