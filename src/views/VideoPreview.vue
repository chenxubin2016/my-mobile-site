<template>
  <div class="video-block">
    <CustomVideo
      url="https://video.qiantucdn.com/58pic/40/18/46/16i58PICEcZwZs64cxjJE.mp4?e=1622788717&token=OyzEe_0O8H433pm7zVEjtnSy5dVdfpsIawO2nx3f:3YpoXc6KzDwpUxi3F0TPr_T2-C0="
    />
  </div>
</template>

<script>
import CustomVideo from "@components/CustomVideo";

export default {
  name: "VideoUpload",
  components: { CustomVideo },
};
</script>

<style lang='scss' scoped>
.video-block {
  width: 100%;
  height: calc(100vh - 60px);
}
</style>
