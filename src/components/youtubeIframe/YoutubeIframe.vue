<template>
  <div :id="frameId" class="frame-div"></div>
</template>
<script>
import loadJs from "@/utils/loadJs";
import CONSTANTS from "@/constants.js";
import { setTimeout } from "timers";
import Store from "@/store.js";
import ACTIONS from "@/actions.js";
import { mapGetters } from "vuex";
export default {
  name: "YoutubeIframe",
  data: () => ({
    isScriptLoaded: false,
    player: "",
    frameId: "player",
    width: 720,
    height: 360
  }),
  created: function() {
    if (!this.isScriptLoaded) {
      this.isScriptLoaded = loadJs(CONSTANTS.PLAYER.API);
    }
  },
  methods: {
    onPlayerStateChange: function(e) {
      if (e.data === CONSTANTS.PLAYER.ENDED) {
        this.modifyQueue();
      }
    },
    onPlayerReady: function(event) {
      event.target.playVideo();
    },
    mountOperation: function(src) {
      let _this = this;
      if (this.isScriptLoaded && window.YT) {
        if (this.player && this.player !== "") {
          this.player.stopVideo();
          this.player.destroy();
          this.player = null;
        }
        this.player = new window.YT.Player(this.frameId, {
          width: _this.width,
          height: _this.height,
          videoId: src,
          playerVars: { autoplay: 1, controls: 1 },
          events: {
            onReady: _this.onPlayerReady,
            onStateChange: _this.onPlayerStateChange
          }
        });
      }
    },
    modifyQueue: function() {
      const { dispatch } = Store;
      dispatch(ACTIONS.PLAYER.UPDATE_QUEUE);
    },
    checkWindowSize: function() {
      if (
        window.outerWidth < CONSTANTS.TAB_SIZE &&
        window.outerWidth > CONSTANTS.MIN_MOBILE_SIZE
      ) {
        this.width = 480;
        this.height = 360;
      } else if (window.outerWidth < CONSTANTS.MIN_MOBILE_SIZE) {
        this.width = 200;
        this.height = 200;
      }
    }
  },
  mounted: function() {
    const _this = this;
    this.checkWindowSize();
    setTimeout(() => {
      this.mountOperation(_this.videoSrc);
    }, 1000);
  },
  computed: mapGetters({
    videoSrc: "getVideoSource"
  }),
  watch: {
    videoSrc: function(newSrc, prevSrc) {
      if (prevSrc !== newSrc) {
        this.mountOperation(newSrc);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#player {
  margin: 10% auto;
}
</style>
