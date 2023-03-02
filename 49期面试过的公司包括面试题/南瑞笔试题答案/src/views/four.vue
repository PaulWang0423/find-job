<template>
  <!-- 只能有一个根标签 -->
  <div class="box">
    <div class="circle"></div>
    <i class="el-icon-close"></i>
    <img src="@/assets/pass.jpg" alt="">
    <div class="text">升级检测申请<span>已通过！</span></div>
    <el-button type="success" round class="know">我知道了</el-button>
  </div>
</template>

<script>
export default {
  name: 'FourPage',
  data () {
    return {}
  },
  created () { },
  mounted () { },
  components: {},
  props: {},
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style scoped lang="less">
.box {
  position: relative;
  width: 600px;
  height: 400px;
  overflow: hidden;
  margin: auto;
  margin-top: 100px;
  border: 1px solid #000;
  border-radius: 10px;
  img {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 170px;
  }
  i {
    position: absolute;
    top: 16px;
    right: 24px;
    font-size: 30px;
    color: white;
  }
  .text {
    margin-top: 200px;
    font-size: 20px;
    span {
      color: #50cc21;
    }
  }
  .know {
    margin-top: 40px;
    background-color: #016a5a;
  }
  .circle {
    position: absolute;
    bottom: 256px;
    left: 50%;
    transform: translateX(-50%);
    width: 1200px;
    height: 1200px;
    border-radius: 50%;
    background-color: #016a5a;
  }
}
</style>