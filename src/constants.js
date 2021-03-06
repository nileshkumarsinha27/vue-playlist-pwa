const CONSTANTS = {
  INPUT_COMPONENT: {
    PLACEHOLDER:
      "Add a youtube link(eg:https://www.youtube.com/watch?v=tL5sYdlk20I)",
    INPUT_NAME: "videoLink",
    YOUTUBE_REGEX: /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\?v=)([^#&?]*).*/,
    AUTO_COMPLETE_STATUS: "off",
    LABEL_TEXT: "Url"
  },
  URL_LIST: {
    PLAYLIST_TEXT: "PLAYLIST",
    IS_DRAGGABLE: true
  },
  PLAYER: {
    API: "https://www.youtube.com/iframe_api",
    ENDED: 0
  },
  TAB_SIZE: 1024,
  MIN_MOBILE_SIZE: 480
};
export default CONSTANTS;
