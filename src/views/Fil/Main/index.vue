<template>
  <div class="layout-box ">
    <div class="layout-inner-box box1"><Box1 /></div>
    <div class="layout-inner-box box2"><Box2 /></div>
    <div class="layout-inner-box box3"><Box3 /></div>
    <div class="layout-inner-box box4"><Box4 /></div>
  </div>
</template>

<script>
import Box1 from '@/views/Fil/Main/Box1'
import Box2 from '@/views/Fil/Main/Box2'
import Box3 from '@/views/Fil/Main/Box3'
import Box4 from '@/views/Fil/Main/Box4'
export default {
  name: 'Main',
  components: {
    Box1,
    Box2,
    Box3,
    Box4
  }

}
</script>

<style scoped lang="scss">
.layout-box {
  display: flex;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  .layout-inner-box {
    width:50%;
  }
}

</style>
