<template>
  <div class="body">
    <div class="container" id="container">
      <canvas id="canvas" style="display: none"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowCanvas",
  data() {
    return {};
  },
  mounted() {
    this.fileToCanvas();
  },
  methods: {
    fileToCanvas() {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = require("../assets/long.png");
      // img.src = require("../assets/bj.jpeg");
      img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, img.width, img.height).data;
        console.log(imageData);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, img.width, img.height);
        const gap = 6;
        const dragonContainer = document.getElementById("container");
        const dragonScale = 2;
        for (let h = 0; h < img.height; h += gap) {
          for (let w = 0; w < img.width; w += gap) {
            console.log(w, h);
            const position = (img.width * h + w) * 4;
            const r = imageData[position];
            const g = imageData[position + 1];
            const b = imageData[position + 2];

            if (r + g + b === 0) {
              ctx.fillStyle = "#000";
              ctx.fillRect(w, h, 4, 4);
            }
            if (r + g + b === 0) {
              const bubble = document.createElement("img");
              bubble.src = require("../assets/bubble.png");
              bubble.setAttribute("class", "bubble");

              const bubbleSize = Math.random() * 10 + 20;
              bubble.style.position = "absolute";
              bubble.style.left = `${w * dragonScale - bubbleSize / 2}px`;
              bubble.style.top = `${h * dragonScale - bubbleSize / 2}px`;
              bubble.style.width = bubble.style.height = `${bubbleSize}px`;
              bubble.style.transform = "translate(180px, -20px)";
              bubble.style.animationDuration = `${Math.random() * 6 + 4}s`;

              dragonContainer.appendChild(bubble);
            }
          }
        }
      };
    }
  }
};
</script>

<style lang='scss' scoped>
  html,
  body {
    width: 100%;
    height: 100%;
  }

  .container {
    height: calc(100vh - 60px);
    background-image: url("../assets/bg.jpeg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
  }
</style>
