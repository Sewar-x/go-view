<template>
  <div class="container">
    <img class="logo" :style="logoStyle" :src="requireLogoImg()" alt="logo" />
    <div class="right-container" v-if="showTitle">
      <div class="title-container">
        <n-gradient-text class="title" :style="titleStyle"> {{ title }} </n-gradient-text>
        <n-gradient-text class="sub-title" :style="subTitleStyle">
          {{ subTitle }}</n-gradient-text
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { requireLogoImg } from "@/utils/utils";
const props = defineProps({
  showTitle: {
    required: false,
    type: Boolean,
    default: true,
  },
  title: {
    required: false,
    type: String,
    default: "MOKA MK",
  },
  subTitle: {
    required: false,
    type: String,
    default: "Make your Application",
  },
  logoWith: {
    required: false,
    type: [Number, String],
    default: 50,
  },
  logoHeight: {
    required: false,
    type: [Number, String],
    default: 50,
  },
  titleSize: {
    required: false,
    type: [Number, String],
    default: 36,
  },

  subTitleSize: {
    required: false,
    type: [Number, String],
    default: 18,
  },
});

const logoStyle = computed(() => {
  return {
    width: `${props.logoWith}px`,
    height: `${props.logoHeight}px`,
  };
});
const titleStyle = computed(() => {
  return {
    fontSize: `${props.titleSize}px`,
  };
});
const subTitleStyle = computed(() => {
  return {
    fontSize: `${props.subTitleSize}px`,
  };
});
</script>
<style lang="scss" scoped>
$my-color: #ff0000; // 定义变量

.container {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  .logo {
    fill: $my-color;
  }
  .right-container {
    display: flex;
    justify-content: center;
    align-items: center;
    .title-container {
      display: flex;
      flex-direction: column;
      .title {
        text-align: center;
        font-size: 36px;
        font-weight: 500;
      }
      .sub-title {
        font-size: 18px;
      }
    }
  }
}
</style>
