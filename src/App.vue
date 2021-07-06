<template>
  <div id="app">
    <div class="nav">
      <ul>
        <li v-for="(item,index) in routerOptions" :key="index">
          <router-link :to="item.path">{{item.name}}</router-link>
        </li>
      </ul>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      routerOptions: this.$router.options.routes
    };
  },
  created() {
  }
};
</script>
<style lang="scss" scoped>
  .nav{
    @include flex(center);
    background-color: #333;
    ul,li{
      list-style: none;
      margin: 0;
      padding: 0;
    }
    ul{
      width: 1200px;
      @include flex(flex-start);
      li{
        margin-right: 20px;
        height: 60px;
        padding: 0 20px;
        @include flex(center);
        &:nth-last-child(1){
          margin-right: 0;
        }
        a{
          text-decoration: unset;
          color: #fff;
          font-size: 20px;
        }
        .router-link-exact-active{
          color: yellow;
        }
      }
    }
  }
</style>
