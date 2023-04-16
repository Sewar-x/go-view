<template>
  <div class="go-project-empty-template">
    <n-space vertical>
      <n-image
        v-if="!lottie"
        object-fit="contain"
        height="300"
        preview-disabled
        :src="imagesUrl"
      ></n-image>
      <Vue3Lottie v-else :animationData="imagesUrl" :height="400" :width="400" />
      <n-h2 class="title">{{ title }}</n-h2>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { requireEmptyImg } from "@/utils";
const props = defineProps({
  lottie: {
    type: Boolean,
    default: false,
  },
  imageUrl: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    default: "暂时还没有东西呢~",
  },
});

const imagesUrl = props.imageUrl ? ref(props.imageUrl) : requireEmptyImg(props.lottie);
</script>

<style lang="scss" scoped>
@include go("project-empty-template") {
  margin-top: 100px;
  @extend .go-flex-center;
  .title {
    margin-top: 15px;
  }
}
</style>
