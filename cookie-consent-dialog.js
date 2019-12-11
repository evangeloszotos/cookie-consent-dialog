!(function() {
  // Zum anzeigen des dialogs

  // hier ist die Id drin
  let containerElementId = undefined;
  // hier das element drin
  let dialogElement = undefined;

  function createCookieConsentDialog(hyperscriptHelpers, config) {
    containerElementId = config.containerId;
    dialogConfig = config;

    const div = hyperscriptHelpers.div;
    const form = hyperscriptHelpers.form;
    const p = hyperscriptHelpers.p;
    const ul = hyperscriptHelpers.ul;
    const li = hyperscriptHelpers.li;
    const input = hyperscriptHelpers.input;
    const labelTag = hyperscriptHelpers.label;
    const button = hyperscriptHelpers.button;
    const a = hyperscriptHelpers.a;
    const i = hyperscriptHelpers.i;
    const strong = hyperscriptHelpers.strong;

    const defaultLocatization = {
      de: {
        title: ["Wir ", strong("verwenden"), " Cookies"],
        description: [
          "Wir nutzen Cookies auf unserer Website.",
          a("Einige", { href: "#" }),
          "von ihnen sind essenziell, während andere uns helfen, diese Website und Ihre Erfahrung zu verbessern.",
        ],
        dataPrivacy: a({ href: "https://google.com" }, "Datenschutzerklärung"),
        save: "Speichern",
        acceptAll: "Alle akzeptieren",

        // Checkbox labels
        essential: {
          label: "Essenziell",
          describtion: "Essenziellestats",
        },

        statistics: {
          label: "Statistik",
          describtion: "Essenziellestats",
        },
        marketing: {
          label: "Marketing",
          describtion: "MM",
        },

        "external-media": {
          label: "Externe Medien",
          describtion: "MM",
        },
      },
      en: {
        title: "WE USE COOKIES",
        description: "We use cookies to enhance your experience",
        dataPrivacy: a({ href: "https://yahoo.com" }, "Dataprivacy"),
        save: "Save",
        acceptAll: "Accept all",

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

    const localization = config.localization
      ? config.localization
      : defaultLocatization;

    // Texte auswählen
    const loc =
      typeof config.lang === "function"
        ? localization[config.lang()]
        : localization[config.lang];

    const essentialCookiesId = "essential"; // NICHT ÄNDERN, oder halt überall ändern!
    const checkboxIdPrefix = "cookies-checkbox-";

    const checkboxesProps = {
      /* [essentialCookiesId] =>  klappt im IE nicht!  */
      essential: {
        id: essentialCookiesId,
        disabled: true,
        checked: true,
      },
      statistics: {
        id: "statistics",
      },
      marketing: {
        id: "marketing",
      },
      "external-media": {
        id: "external-media",
      },
    };

    function selectContainerElement() {
      return config.containerElement
        ? config.containerElement
        : containerElementId
        ? document.getElementById(containerElementId)
        : undefined;
    }

    return {
      openIfUnset: function(onFinish) {
        if (!isChecked(checkboxIdPrefix + essentialCookiesId)) {
          this.open();
        } else {
          handleComplete && handleComplete(checkboxesProps, checkboxIdPrefix);
        }
      },

      open: function() {
        const containerElement = selectContainerElement();

        // clean previous if open
        if (dialogElement) {
          this.close();
        }

        if (containerElement) {
          dialogElement = this.render();
          containerElement.appendChild(dialogElement);
        }
      },

      close: function() {
        const containerElement = selectContainerElement();
        if (containerElement) {
          if (dialogElement) {
            containerElement.removeChild(dialogElement);
            dialogElement = undefined;
            handleComplete && handleComplete(checkboxesProps, checkboxIdPrefix);
          }
        }
      },
      renderIfUnset: function() {
        return isChecked(checkboxIdPrefix + essentialCookiesId)
          ? div("")
          : this.render();
      },
      onSave: function() {
        this.close();
      },
      render: function() {
        const finalCheckboxesConfig = config.checkboxes.map(function(
          cookieName
        ) {
          return merge(checkboxesProps[cookieName], loc[cookieName]);
        });

        return div("#overlay-bg.auf", [
          div("#overlay.auf", [
            div(".overlay-wrap.popup.rounded.box-shadow.bg-white.text-black", [
              div(".ovl-header", loc.title),
              div(".ovl-content", [
                p(loc.description),
                div(
                  finalCheckboxesConfig.map(function(ckbConfig) {
                    const checkboxId = checkboxIdPrefix + ckbConfig.id;

                    return div([
                      div(".toggle-checkbox", [
                        input(
                          merge(
                            { type: "checkbox" },
                            merge(ckbConfig, {
                              name: "cookieCheckboxGroup[]",
                              id: checkboxId,
                              checked: ckbConfig.checked
                                ? true
                                : isChecked(checkboxId),
                            })
                          )
                        ),
                        labelTag({ htmlFor: checkboxId }),
                        labelTag({ htmlFor: checkboxId }, ckbConfig.label),
                      ]),
                      p(".toggle-describtion", ckbConfig.describtion),
                    ]);
                  })
                ),
                p(loc.dataPrivacy),
              ]),
              div(".ovl-footer", [
                button(
                  ".meinecvlassenhier",
                  {
                    onclick: function(event) {
                      handleSave(
                        event,
                        buttonHandler(config.onSave, this.close).bind(this)
                      );
                    }.bind(this),
                  },
                  [loc.save, i(".overlayClose.btn.mr-1")]
                ),
                button(
                  ".meinecvlassenhier",
                  {
                    onclick: function(event) {
                      handleAcceptAll(
                        event,
                        buttonHandler(config.onAcceptAll, this.close).bind(this)
                      );
                    }.bind(this),
                  },
                  [loc.acceptAll, i(".overlayClose.btn.mr-1")]
                ),
              ]),
            ]),
          ]),
        ]);
      },
    };

    function handleComplete(checkboxesProps, checkboxIdPrefix) {
      const checkboxesPropsKeys = Object.keys(checkboxesProps);

      const result = [];
      for (var i = 0; i < checkboxesPropsKeys.length; i++) {
        const key = checkboxesPropsKeys[i];

        if (isChecked(checkboxIdPrefix + key)) {
          result.push(key);
        }
      }

      config.onComplete(result);
    }

    // prop it the input parameter
    // fallback is the parameter to use if no prop was provided
    function buttonHandler(prop, fallback) {
      return !prop
        ? fallback
        : typeof prop === "function"
        ? prop
        : typeof prop === "number"
        ? function() {
            setTimeout(fallback, prop);
          }.bind(this)
        : undefined;
    }

    // LADEN
    function isChecked(checkboxId) {
      return localStorage.getItem(checkboxId) === "true"; // COOKIE LESEN
    }

    // SPEICHER
    function setCheckbox(checkboxId, value) {
      localStorage.setItem(checkboxId, !!value); // true or false | COOKIE SCHREIBEN
    }

    // Helper function for {...objA, ...objB} syntax support in IE
    function merge(a, b) {
      const merged = {};

      Object.keys(a).forEach(function(key) {
        merged[key] = a[key];
      });

      Object.keys(b).forEach(function(key) {
        merged[key] = b[key];
      });

      return merged;
    }

    function persistSelection() {
      const checkboxes = document.getElementsByName("cookieCheckboxGroup[]");
      for (var i = 0; i < checkboxes.length; i++) {
        const ckb = checkboxes[i];

        setCheckbox(ckb.id, !!ckb.checked);
      }
    }

    function handleAcceptAll(event, onAcceptAll) {
      const checkboxes = document.getElementsByName("cookieCheckboxGroup[]");

      for (var i = 0; i < checkboxes.length; i++) {
        const ckb = checkboxes[i];
        ckb.checked = true;
      }

      persistSelection(checkboxes);
      onAcceptAll && typeof onAcceptAll === "function" && onAcceptAll(event);
    }

    function handleSave(event, onSave) {
      persistSelection();

      onSave && onSave(event);
    }
  }

  // Global zugänglich machen
  window.CookieDialog = createCookieConsentDialog;
})();
