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
          <Logo class="login-account-logo" logoHeight="30" logoWith="30" :showTitle="false"/>
        </template>
        <div class="slogan">Make your app</div>
      </n-tooltip>

      <div v-else class="logo-container go-animation-twinkle">
        <Logo class="login-account-logo" logoHeight="60" logoWith="60"  titleSize="16" subTitleSize="12"/>
      </div>
    </n-space>
  </div>
</template>
<script setup lang="ts">
import { toRefs } from "vue";
import { Logo } from "@/components/Logo";
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
}
</style>
