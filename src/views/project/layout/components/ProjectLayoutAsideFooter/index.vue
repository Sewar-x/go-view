<template>
  <div class="go-aside-footer" :width="getAsideCollapsedWidth">
    <n-divider class="go-mt-0"></n-divider>
    <n-space justify="space-around">
      <n-tooltip
        v-if="collapsed"
        placement="right"
        trigger="hover"
        class="logo-container"
      >
        <template #trigger>
          <img :src="requireLogoImg()" alt="logo" class="logo collapsed" />
        </template>
        <div class="slogan">Make your app</div>
      </n-tooltip>

      <div v-else class="logo-container go-animation-twinkle">
        <img :src="requireLogoImg()" alt="logo" class="logo" />
        <n-gradient-text type="info" class="slogan"> Make your app </n-gradient-text>
      </div>
    </n-space>
  </div>
</template>
<script setup lang="ts">
import { toRefs } from "vue";
import { requireLogoImg } from "@/utils/utils";
import { useSettingStore } from "@/store/modules/settingStore/settingStore";
const { getAsideCollapsedWidth } = toRefs(useSettingStore());
const props = defineProps({
  collapsed: Boolean,
});
</script>

<style lang="scss" scoped>
@include go("aside-footer") {
  padding-bottom: 20px;
  .logo {
    width: 30px;
    height: 30px;
  }
  .logo-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .logo {
      width: 50px;
      height: 50px;
    }
    .slogan {
      margin: 10px 0 0 10px;
      font-size: 18px;
      font-weight: 600;
    }
  }
}
</style>
