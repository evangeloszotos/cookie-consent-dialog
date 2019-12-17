!(function() {
  let hh = null; // hyperscript helpers
  // Zum anzeigen des dialogs

  // hier ist die Id drin
  let containerElementId = undefined;
  // hier das element drin
  let dialogElement = undefined;

  // Benötigt js-cookie um zu functionieren
  const cookieStorageDriver = {
    getStorage: function() {
      const storageCookieString = Cookies.get(this.storageCookieName) || "{}";

      return JSON.parse(storageCookieString);
    },
    storageCookieName: "consent-cookie-storage",
    save: function(checkboxId, value) {
      const storageCookieData = this.getStorage();
      storageCookieData[checkboxId] = value;

      Cookies.set(this.storageCookieName, JSON.stringify(storageCookieData));
    },
    load: function(checkboxId) {
      return this.getStorage()[checkboxId];
    }
  };

  const localStorageDriver = {
    save: (checkboxId, value) => localStorage.setItem(checkboxId, !!value),
    load: checkboxId => localStorage.getItem(checkboxId) === "true"
  };

  // wird verwendet um daten abzuspeichern
  let storageDriver = null;

  function createCookieConsentDialog(hyperscriptHelpers, config) {
    hh = hyperscriptHelpers;
    containerElementId = config.containerId;

    storageDriver = config.storage ? config.storage : localStorageDriver;

    storageDriver =
      config.storage === "cookie"
        ? cookieStorageDriver
        : config.storage === "localstorage"
        ? localStorageDriver
        : localStorageDriver; // falls nix angegeben benutze localstorage

    // falls ein expliziter storagedriver angegeben wurde benutze den, sonst benutze die einstellung
    // welche über storage ermittelt wurde
    storageDriver = config.storageDriver ? config.storageDriver : storageDriver;

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
      }
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
        checked: true
      },
      statistics: {
        id: "statistics"
      },
      marketing: {
        id: "marketing"
      },
      "external-media": {
        id: "external-media",
        childIds: ["youtube", "vimeo"]
      },
      youtube: {
        id: "youtube",
        parentId: "external-media"
      },
      vimeo: {
        id: "vimeo",
        parentId: "external-media"
      }
    };

    function selectContainerElement() {
      return config.containerElement
        ? config.containerElement
        : containerElementId
        ? document.getElementById(containerElementId)
        : undefined;
    }

    const temporaryAccepted = {};

    return {
      acceptOnce: function(consent) {
        console.log("acceptOnce");
        temporaryAccepted[checkboxIdPrefix + consent] = true;
        handleComplete && handleComplete(checkboxesProps, checkboxIdPrefix);
      },

      accept: function(consent) {
        setCheckbox(checkboxIdPrefix + consent, true);
        handleComplete && handleComplete(checkboxesProps, checkboxIdPrefix);
      },

      openIfUnset: function() {
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
          // TODO: check localization file for completeness - if all required fields are defined
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
                            {
                              type: "checkbox",
                              onclick: event =>
                                handleCheck(event, ckbConfig, checkboxesProps)
                            },
                            merge(ckbConfig, {
                              name: "cookieCheckboxGroup[]",
                              id: checkboxId,
                              checked: calculateValue(
                                ckbConfig,
                                checkboxId,
                                checkboxesProps
                              )
                            })
                          )
                        ),
                        labelTag({ htmlFor: checkboxId }),
                        labelTag({ htmlFor: checkboxId }, ckbConfig.label)
                      ]),
                      p(".toggle-describtion", ckbConfig.describtion)
                    ]);
                  })
                ),
                p(loc.dataPrivacy)
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
                    }.bind(this)
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
                    }.bind(this)
                  },
                  [loc.acceptAll, i(".overlayClose.btn.mr-1")]
                )
              ])
            ])
          ])
        ]);
      }
    };

    function calculateValue(ckbConfig, checkboxId, checkboxesProps) {
      return ckbConfig.childIds
        ? calculateInitialParentValue(ckbConfig.id, checkboxesProps)
        : ckbConfig.checked
        ? true
        : isChecked(checkboxId);
    }

    function calculateInitialParentValue(parentId, checkboxesProps) {
      const parentConfig = checkboxesProps[parentId];

      return parentConfig.childIds.some(childId => {
        return isChecked(checkboxIdPrefix + childId);
      });
    }

    function handleParentValueOnChildValueChange(parentId, checkboxesProps) {
      console.log(parentId);
      const parentConfig = checkboxesProps[parentId];

      const parentCheckBox = document.getElementById(
        checkboxIdPrefix + parentId
      );

      parentCheckBox.checked = parentConfig.childIds.some(childId => {
        const childCheckBox = document.getElementById(
          checkboxIdPrefix + childId
        );

        return childCheckBox.checked;
      });
    }

    function handleCheck(event, config, checkboxProps) {
      if (config.childIds) {
        // manage the children
        config.childIds.forEach(childId => {
          const childCheckBox = document.getElementById(
            checkboxIdPrefix + childId
          );

          childCheckBox.checked = event.target.checked;
        });
      }

      if (config.parentId) {
        // manage the parent
        handleParentValueOnChildValueChange(config.parentId, checkboxProps);
      }
    }

    function handleComplete(checkboxesProps, checkboxIdPrefix) {
      const checkboxesPropsKeys = Object.keys(checkboxesProps);

      const result = {};
      for (var i = 0; i < checkboxesPropsKeys.length; i++) {
        const key = checkboxesPropsKeys[i];

        if (
          temporaryAccepted[checkboxIdPrefix + key] ||
          isChecked(checkboxIdPrefix + key)
        ) {
          result[key] = true;
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
      return storageDriver.load(checkboxId);
      //return localStorage.getItem(checkboxId) === "true"; // COOKIE LESEN
    }

    // SPEICHERN
    function setCheckbox(checkboxId, value) {
      storageDriver.save(checkboxId, value);
      //localStorage.setItem(checkboxId, !!value); // true or false | COOKIE SCHREIBEN
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

  // #################################################################
  // #################################################################
  // Video
  // #################################################################
  // #################################################################

  const videoIFrameFactoryMap = {
    youtube: function buildYoutubeIFrame(id, width, height) {
      return hh.iframe({
        width: width,
        height: height,
        allow: "fullscreen",
        src:
          "https://www.youtube.com/embed/" +
          id +
          "?rel=0;autoplay=0;modestbranding=1;autohide=1"
      });
    },
    vimeo: function buildVimeoIFrame(id, width, height) {
      return hh.iframe({
        width: width,
        height: height,
        allow: "fullscreen",
        src:
          "https://player.vimeo.com/video/" +
          id +
          "?autoplay=0&loop=1&autopause=0&muted=1"
      });
    }
  };

  function loadExternalMedia(classSelector, data) {
    const videos = document.querySelectorAll("." + classSelector);

    for (var i = 0; i < videos.length; i++) {
      const video = videos[i];

      const width = video.dataset.width;
      const height = video.dataset.height;
      const videoId = video.dataset.videoid;
      const consent = video.dataset.consent;

      if (data[consent]) {
        // es ist akzeptiert worden
        video.innerHTML = ""; // Remove contents of video container
        const iframeFactory = videoIFrameFactoryMap[video.dataset.source];

        videoIFrame = iframeFactory(videoId, width, height);
        video.appendChild(videoIFrame);
      }
    }
  }

  // Global zugänglich machen
  window.CookieDialog = createCookieConsentDialog;
  CookieDialog.loadExternalMedia = loadExternalMedia;
})();
