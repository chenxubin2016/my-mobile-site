<template>
  <div class="plain-upload">
    <ul class="img-list">
      <li v-for="(item,index) in imgList" :key="index">
        <img :src="`http://127.0.0.1:7001${item}`" alt="">
      </li>
    </ul>
    <div class="upload-btn" @click="uploadFn">图片上传</div>
    <input type="file" class="upload-file" multiple ref="uploadFile">
  </div>
</template>

<script>
import { uploadEvent, getFilesBuffer } from "../api";
import validateFileType from "@utils/validateFileType";

export default {
  name: "PlainUpload",
  data() {
    return {
      uploadFile: null,
      imgList: []
    };
  },
  mounted() {
    this.uploadFile = this.$refs.uploadFile;
  },
  methods: {
    uploadFn() {
      this.uploadFile.click();
      this.uploadFile.onchange = (e => {
        const $event = e || window.event;
        [...e.target.files].map(async file => {
          console.log(getFilesBuffer(file));
          validateFileType(file);
          const result = await uploadEvent(file);
          if (result.statusText === "OK") {
            const { data } = result.data;
            this.imgList.push(data[0]);
          }
          console.log(result);
          return file;
        });
      });
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
    ul, li {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .img-list {
      @include flex(flex-start);
      li {
        width: 120px;
        height: 120px;
        border-radius: 5px;
        overflow: hidden;
        margin-right: 20px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
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
