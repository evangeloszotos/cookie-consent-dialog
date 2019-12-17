!(function() {
  const hh = hyperscriptHelpers(hyperscript);

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

  CookieDialog.loadExternalMedia = loadExternalMedia;
})();
