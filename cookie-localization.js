!(function() {
  window.createLocalization = function createLocalization(hh) {
    const a = hh.a;
    const strong = hh.strong;

    return {
      de: {
        title: ["Wir ", strong("verwenden"), " Cookies"],
        description: [
          "Wir nutzen Cookies auf unserer Website.",
          a("Einige", { href: "#" }),
          "von ihnen sind essenziell, während andere uns helfen, diese Website und Ihre Erfahrung zu verbessern."
        ],
        dataPrivacy: a({ href: "https://google.com" }, "Datenschutzerklärung"),
        save: "Speichern",
        acceptAll: "Alle akzeptieren",

        // Checkbox labels
        essential: {
          label: "Essenziell",
          describtion: "Essenziellestats"
        },

        statistics: {
          label: "Statistik",
          describtion: "Essenziellestats"
        },
        marketing: {
          label: "Marketing",
          describtion: "Beschreibung der Marketing cookies"
        },
        "external-media": {
          label: "Externe Medien",
          describtion: "Beschreibung der Externe Medien cookies"
        },
        youtube: {
          label: "Youtube",
          describtion: "Youtube Text"
        },
        vimeo: {
          label: "Vimeo",
          describtion: "Vimeo Text"
        }
      },
      en: {
        title: "WE USE COOKIES",
        description: "We use cookies to enhance your experience",
        save: "Save",
        acceptAll: "Accept all",
        dataPrivacy: a({ href: "https://yahoo.com" }, "Dataprivacy"),

        essential: {
          label: "Essential",
          describtion: "Essenziellestats"
        },

        statistics: {
          label: "Statistics",
          describtion: "Essenziellestats"
        },
        marketing: {
          label: "Marketing",
          describtion: "MM"
        },

        "external-media": {
          label: "External Media",
          describtion: "MM"
        },
        youtube: {
          label: "Youtube",
          describtion: "Youtube Text English"
        },
        vimeo: {
          label: "Vimeo",
          describtion: "Vimeo Text English"
        }
      }
    };
  };
})();
