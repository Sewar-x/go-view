<!--封装每一列的布局（顶部，内容，底部，滚动条），包括颜色深浅-->
<template>
  <!-- 侧边栏盒子：每个小模块的公共样式 -->
  <div class="go-content-box" :class="[`bg-depth${depth}`, flex && 'flex']">
    <!-- 侧边栏盒子：顶部组件 -->
    <div v-if="showTop" class="top go-mt-0 go-flex-no-wrap">
      <n-space class="go-flex-no-wrap" :size="5">
        <div class="mt-1">
          <slot name="icon"></slot>
        </div>
        <n-ellipsis>
          <n-text>{{ title }}</n-text>
        </n-ellipsis>
      </n-space>
      <n-space class="go-flex-no-wrap" align="center" style="gap: 4px">
        <slot name="top-right"></slot>
        <!-- 侧边栏盒子：返回按钮 -->
        <n-icon
          v-show="backIcon"
          size="20"
          class="go-cursor-pointer go-d-block"
          @click="backHandle"
        >
          <chevron-back-outline-icon></chevron-back-outline-icon>
        </n-icon>
      </n-space>
    </div>
    <!-- 侧边栏盒子：内容 -->
    <div
      class="content"
      :class="{
        'content-height-show-top-bottom': showBottom || showTop,
        'content-height-show-both': showBottom && showTop,
      }"
    >
      <!-- 侧边栏盒子：内容 - 禁止滚动内容-->
      <template v-if="disabledScroll">
        <slot></slot>
      </template>
      <!-- 侧边栏盒子：内容 - x轴滚动内容-->
      <template v-else-if="xScroll">
        <n-scrollbar x-scrollable>
          <n-scrollbar>
            <slot></slot>
          </n-scrollbar>
        </n-scrollbar>
      </template>
      <!-- 侧边栏盒子：内容 - y轴滚动内容-->
      <template v-else>
        <n-scrollbar>
          <slot></slot>
        </n-scrollbar>
      </template>
    </div>

    <div v-if="showBottom" class="bottom go-mt-0">
      <slot name="bottom"></slot>
    </div>
    <div class="aside">
      <slot name="aside"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@/plugins";
const { ChevronBackOutlineIcon } = Icon;

const emit = defineEmits(["back"]);

defineProps({
  title: String,
  showTop: {
    type: Boolean,
    default: true,
  },
  showBottom: {
    type: Boolean,
    default: false,
  },
  flex: {
    type: Boolean,
    default: false,
  },
  // back
  backIcon: {
    type: Boolean,
    default: true,
  },
  // 背景深度
  depth: {
    type: Number,
    default: 1,
  },
  // x 轴滚动
  xScroll: {
    type: Boolean,
    default: false,
  },
  disabledScroll: {
    type: Boolean,
    default: false,
  },
});

const backHandle = () => {
  emit("back");
};
</script>

<style lang="scss" scoped>
$topOrBottomHeight: 40px;

@include go(content-box) {
  height: calc(100vh - #{$--header-height});
  margin: 1px;
  margin-bottom: 0;

  &.bg-depth0 {
    @include fetch-bg-color("background-color1");

    .bottom,
    .top {
      @include fetch-bg-color("background-color1");
    }
  }

  &.bg-depth1 {
    @include fetch-bg-color("background-color1");

    .bottom,
    .top {
      @include fetch-bg-color("background-color2");
    }
  }

  &.bg-depth2 {
    @include fetch-bg-color("background-color2");

    .bottom,
    .top {
      @include fetch-bg-color("background-color3");
    }
  }

  &.bg-depth3 {
    @include fetch-bg-color("background-color3");

    .bottom,
    .top {
      @include fetch-bg-color("background-color4");
    }
  }

  &.flex {
    flex: 1;
  }

  .top,
  .bottom {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    align-items: center;
    height: $topOrBottomHeight;
    padding: 0 10px;
    border-top: 1px solid;
    @include fetch-border-color("hover-border-color");

    .mt-1 {
      margin-top: 2px;
    }
  }

  .top {
    border-bottom: 1px solid;
    @include fetch-border-color("background-color1");
  }

  .content {
    height: calc(100vh - #{$--header-height});
    overflow: hidden;
  }

  .aside {
    position: relative;
  }

  .content-height-show-top-bottom {
    height: calc(100vh - #{$--header-height} - #{$topOrBottomHeight});
  }

  .content-height-show-both {
    height: calc(
      100vh - #{$--header-height} - #{$topOrBottomHeight} - #{$topOrBottomHeight}
    );
  }
}
</style>
