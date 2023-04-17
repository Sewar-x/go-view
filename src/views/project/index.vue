<template>
  <div class="go-project">
    <n-layout has-sider position="absolute">
      <!--侧边栏-->
      <n-space vertical>
        <project-layout-sider></project-layout-sider>
      </n-space>
      <!--左侧布局-->
      <n-layout>
        <!--头部工具栏-->
        <layout-header-pro></layout-header-pro>
        <n-layout
          id="go-project-content-top"
          class="content-top"
          position="absolute"
          :native-scrollbar="false"
        >
          <!--内容区域-->
          <n-layout-content>
            <layout-transition-main>
              <router-view></router-view>
            </layout-transition-main>
          </n-layout-content>
        </n-layout>
      </n-layout>
    </n-layout>
  </div>
</template>

<script setup lang="ts">
import { ProjectLayoutSider } from "./layout/components/ProjectLayoutSider";
import { LayoutHeaderPro } from "@/layout/components/LayoutHeaderPro";
import { LayoutTransitionMain } from "@/layout/components/LayoutTransitionMain/index";
</script>

<style lang="scss" scoped>
@include go(project) {
  .content-top {
    top: $--header-height;
    margin-top: 1px;
  }
}
</style>
