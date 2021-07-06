<template>
  <div class="signature">
    <div class="signature-content">
      <SignatureComponent>
        <template v-slot:title>
          <h3>电子签名</h3>
        </template>
        <template v-slot:tools>
          <div class="tools">
            <button>清除画板</button>
            <button>下载签名</button>
          </div>
        </template>
      </SignatureComponent>
    </div>
  </div>
</template>

<script>
import SignatureComponent from "@components/Signature";

export default {
  name: "ShowCanvas",
  components: { SignatureComponent },
  data() {
    return {};
  },
  mounted() {
  },
  methods: {
  }
};
</script>

<style lang='scss' scoped>
  .signature {
    width: 100%;
    height: calc(100vh - 60px);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    .signature-content {
      width: 400px;
      height: 600px;
      border: 1px solid #e7e7e7;
      .title {
        height: 44px;
        line-height: 44px;
        margin: 0;
        text-align: center;
        border-bottom: 1px solid #e7e7e7;
      }
      .tools {
        height: 50px;
        padding: 0 20px;
        border-top: 1px solid #e7e7e7;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        button {
          margin-right: 10px;
          height: 30px;
          // line-height: 30px;
        }
      }
    }
  }
</style>
