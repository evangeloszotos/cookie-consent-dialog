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
          "von ihnen sind essenziell, während andere uns helfen, diese Website und Ihre Erfahrung zu verbessern.",
        ],
        save: "Speichern",
        acceptAll: "Alle akzeptieren",
        dataPrivacy: a({ href: "https://google.com" }, "Datenschutzerklärung"),
        // Checkbox labels
        essential: {
          label: "Essenziell",
          describtion:
            "Essenzielle Cookies ermöglichen grundlegende Funktionen und sind für die einwandfreie Funktion der Website erforderlich.",
        },

        statistics: {
          label: "Statistik",
          describtion:
            "Statistik Cookies erfassen Informationen anonym. Diese Informationen helfen uns zu verstehen, wie unsere Besucher unsere Website nutzen.",
        },
        marketing: {
          label: "Marketing",
          describtion:
            "Marketing Cookies werden von Drittanbietern oder Publishern verwendet, um personalisierte Werbung anzuzeigen. Sie tun dies, indem sie Besucher über Websites hinweg verfolgen.",
        },

        "external-media": {
          label: "Externe Medien",
          describtion:
            "Inhalte von Videoplattformen und Social Media Plattformen werden standardmäßig blockiert. Wenn Cookies von externen Medien akzeptiert werden, bedarf der Zugriff auf diese Inhalte keiner manuellen Zustimmung mehr.",
        },
      },
      en: {
        title: "WE USE COOKIES",
        description: "We use cookies to enhance your experience",
        save: "Save",
        acceptAll: "Accept all",
        dataPrivacy: a({ href: "https://yahoo.com" }, "Dataprivacy"),

        essential: {
          label: "Essential",
          describtion: "Essenziellestats",
        },

        statistics: {
          label: "Statistics",
          describtion: "Essenziellestats",
        },
        marketing: {
          label: "Marketing",
          describtion: "MM",
        },

        "external-media": {
          label: "External Media",
          describtion: "MM",
        },
      },
    };
  };
})();
