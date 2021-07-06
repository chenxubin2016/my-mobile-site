<template>
  <div class="canvas-container">
    <template>
      <h3 class="title" v-if="!$slots.title">{{title}}</h3>
      <slot name="title" v-else></slot>
    </template>
    <canvas id="myCanvas">your browser does not support the canvas tag</canvas>
    <template>
      <div class="tools" v-if="!$slots.tools">
        <button>清除画板</button>
        <button>下载签名</button>
      </div>
      <slot name="tools" v-else></slot>
    </template>
  </div>
</template>

<script>
export default {
  name: "Signature",
  props: {
    title: {
      type: String,
      default: "电子签名"
    }
  },
  mounted() {
    this.listener();
  },
  methods: {
    writing({ beginX, beginY, stopX, stopY, ctx }) {
      ctx.beginPath(); // 开启一条新路径
      ctx.globalAlpha = 1; // 设置图片的透明度
      ctx.lineWidth = 3; // 设置线宽
      ctx.strokeStyle = "red"; // 设置路径颜色
      ctx.moveTo(beginX, beginY); // 从(beginX, beginY)这个坐标点开始画图
      ctx.lineTo(stopX, stopY); // 定义从(beginX, beginY)到(stopX, stopY)的线条（该方法不会创建线条）
      ctx.closePath(); // 创建该条路径
      ctx.stroke(); // 实际地绘制出通过 moveTo() 和 lineTo() 方法定义的路径。默认颜色是黑色。
    },
    listener() {
      let beginX = null;
      let beginY = null;
      const canvas = document.getElementById("myCanvas");
      console.log([canvas]);
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      canvas.addEventListener("touchstart", event => {
        console.log(event);
        event.preventDefault(); // 阻止在canvas画布上签名的时候页面跟着滚动
        beginX = event.touches[0].pageX - canvas.offsetLeft;
        beginY = event.touches[0].pageY - canvas.offsetTop;
        console.log("canvas边界", canvas.offsetLeft, canvas.offsetTop);
        console.log("触摸坐标", event.touches[0].pageX, event.touches[0].pageY);
        console.log("触摸点在canvas中的坐标", beginX, beginY);
      });
      canvas.addEventListener("mousedown", event => {
        event.preventDefault(); // 阻止在canvas画布上签名的时候页面跟着滚动
        console.log(event);
        beginX = event.pageX - canvas.offsetLeft;
        beginY = event.pageY - canvas.offsetTop;
        console.log("canvas边界", canvas.offsetLeft, canvas.offsetTop);
        console.log("触摸坐标", event.pageX, event.pageY);
        console.log("触摸点在canvas中的坐标", beginX, beginY);
      });
      canvas.addEventListener("touchmove", event => {
        event.preventDefault(); // 阻止在canvas画布上签名的时候页面跟着滚动
        const current = event.touches[0];
        const stopX = current.pageX - canvas.offsetLeft;
        const stopY = current.pageY - canvas.offsetTop;
        this.writing({
          beginX,
          beginY,
          stopX,
          stopY,
          ctx
        });
        beginX = stopX; // 这一步很关键，需要不断更新起点，否则画出来的是射线簇
        beginY = stopY;
      });
      canvas.addEventListener("mousemove", event => {
        event.preventDefault(); // 阻止在canvas画布上签名的时候页面跟着滚动
        console.log(1)
        const current = event;
        const stopX = current.pageX - canvas.offsetLeft;
        const stopY = current.pageY - canvas.offsetTop;
        this.writing({
          beginX,
          beginY,
          stopX,
          stopY,
          ctx
        });
        beginX = stopX; // 这一步很关键，需要不断更新起点，否则画出来的是射线簇
        beginY = stopY;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  .canvas-container {
    width: 100%;
    height: 100%;
    @include flex(space-between, center, column);
    .title {
      width: 100%;
      box-sizing: border-box;
      text-align: center;
      height: 50px;
      @include flex(center);
      margin: 0;
      border-bottom: 1px solid #e7e7e7;
    }
    #myCanvas {
      flex: 1;
      width: 100%;
    }
    .tools {
      width: 100%;
      box-sizing: border-box;
      @include flex;
      padding: 0 20px;
      height: 60px;
      border-top: 1px solid #e7e7e7;
    }
  }
</style>
