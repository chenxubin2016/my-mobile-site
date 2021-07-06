<template>
  <div class="plain-upload">
    <ul class="img-list">
      <li v-for="(item, index) in imgList" :key="index">
        <!-- <img :src="`http://127.0.0.1:7001${item}`" alt="" /> -->
        <div class="progress" v-if="!item.data">
          <p style="color: #fff;">{{item.progress}}</p>
        </div>
        <video
          v-else
          :id="`vadio${index}`"
          :src="`http://127.0.0.1:7001${item.data}`"
        ></video>
        <div class="play-btn" @click="playFn(index)" v-if="!vadioState">😨</div>
        <div
          class="play-paused"
          @click="pausedFn(index)"
          v-if="vadioState && pausedBtnIsShow"
        >
          😱
        </div>
      </li>
    </ul>
    <div class="upload-btn" @click="uploadFn">视频上传</div>
    <input type="file" class="upload-file" multiple ref="uploadFile"/>
  </div>
</template>

<script>
import { uploadEvent, getFilesBuffer } from "../api";
import { uploadAction } from "../api/request";
import validateFileType from "@utils/validateFileType";

export default {
  name: "PlainUpload",
  data() {
    return {
      uploadFile: null,
      imgList: [],
      vadioState: false,
      pausedBtnIsShow: true
    };
  },
  mounted() {
    this.uploadFile = this.$refs.uploadFile;
    window.addEventListener;
  },
  watch: {
    imgList(val) {
      if (val.length) {
        this.$nextTick(() => {
          console.log(document.querySelectorAll("video"));
          [...document.querySelectorAll("video")].map(item => {
            item.parentElement.onmouseover = () => {
              console.log(1);
              setTimeout(() => {
                this.pausedBtnIsShow = true;
              }, 200);
            };
            item.parentElement.onmouseout = () => {
              console.log(2);
              setTimeout(() => {
                this.pausedBtnIsShow = false;
              }, 200);
            };
          });
        });
      }
    }
  },
  methods: {
    uploadFn() {
      this.uploadFile.click();
      this.uploadFile.onchange = e => {
        const $event = e || window.event;
        [...e.target.files].map(async(file, index) => {
          console.log(file);
          const fileObj = {};
          fileObj.name = file.name;
          // console.log(getFilesBuffer(file));
          validateFileType(file);
          const formData = new FormData();
          formData.append("file", file);
          const result = await uploadAction("/uploadImg", formData, progressEvent => {
            console.log("progressEvent=======", progressEvent);
            const { loaded, total } = progressEvent;
            fileObj.progress = `${Math.floor(loaded * 100 / total)}%`;
          });
          console.log(result);
          this.imgList.push(fileObj);
          if (result.statusText === "OK") {
            const { data } = result.data;
            if (data) {
              this.imgList[index].data = data[0];
            }
          }
          console.log(result);
          return file;
        });
      };
    },
    playFn(i) {
      const vadioEl = document.getElementById(`vadio${i}`);
      vadioEl.play();
      this.vadioState = true;
    },
    pausedFn(i) {
      const vadioEl = document.getElementById(`vadio${i}`);
      vadioEl.pause();
      this.vadioState = false;
    }
  }
};
</script>

<style lang="scss" scoped>
  .plain-upload {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    @include flex(flex-start);
    ul,
    li {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .img-list {
      @include flex(flex-start);
      li {
        width: 320px;
        height: 320px;
        border-radius: 5px;
        overflow: hidden;
        margin-right: 20px;
        background-color: #000;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        video {
          width: 100%;
          height: 100%;
        }
        .play-btn,
        .play-paused {
          position: absolute;
          left: 50%;
          top: 50%;
          box-sizing: border-box;
          line-height: 40px;
          padding-left: 10px;
          margin: -20px 0 0 -20px;
          width: 40px;
          height: 40px;
          border-radius: 20px;
          overflow: hidden;
          background-color: rgba($color: #fff, $alpha: 0.5);
          color: #fff;
          cursor: pointer;
          user-select: none;
        }
      }
    }
    .upload-btn {
      width: 120px;
      height: 120px;
      border-radius: 5px;
      background-color: gainsboro;
      @include flex(center);
      cursor: pointer;
    }
    .upload-file {
      display: none;
    }
  }
</style>
