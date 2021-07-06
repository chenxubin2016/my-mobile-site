<template>
  <div class="video-container">
    <video
      :src="url"
      controls
      :controlslist="controlslist"
      :oncontextmenu="contextmenu"
    ></video>
  </div>
</template>
<script>
export default {
  name: "CustomVideo",
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      controlslist: "",
      contextmenu: "",
    };
  },
  mounted() {
    this.disableMenu();
  },
  methods: {
    // 禁止右键菜单和google浏览器右下角三个点菜单
    disableMenu() {
      this.controlslist = "nodownload";
      this.contextmenu = "return false";
      document.querySelector("video")["disablePictureInPicture"] = true;
    },
  },
};
</script>
<style lang='scss' scoped>
.video-container {
  width: 100%;
  height: 100%;
  background-color: #000;
  video {
    width: 100%;
    height: 100%;
  }
  //全屏按钮
  // video::-webkit-media-controls-fullscreen-button {
  //   display: none;
  // }
  //播放按钮
  // video::-webkit-media-controls-play-button {
  //   display: none;
  // }
  //进度条
  // video::-webkit-media-controls-timeline {
  //   display: none;
  // }
  //观看的当前时间
  // video::-webkit-media-controls-current-time-display {
  //   display: none;
  // }
  //剩余时间
  // video::-webkit-media-controls-time-remaining-display {
  //   display: none;
  // }
  //音量按钮
  // video::-webkit-media-controls-mute-button {
  //   display: none;
  // }
  video::-webkit-media-controls-toggle-closed-captions-button {
    display: none;
  }
  //音量的控制条
  // video::-webkit-media-controls-volume-slider {
  //   display: none;
  // }
  //所有控件
  // video::-webkit-media-controls-enclosure {
  //   display: none;
  // }
}
</style>
