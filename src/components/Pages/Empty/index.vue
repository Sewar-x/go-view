<template>
  <div class="go-project-empty-template">
    <n-space vertical>
      <n-image
        object-fit="contain"
        height="300"
        preview-disabled
        :src="imagesUrl"
      ></n-image>
      <n-h3>{{ title }}</n-h3>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { requireEmptyImg } from "@/utils";
const props = defineProps({
  imageUrl: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    default: "暂时还没有东西呢",
  },
});

const imagesUrl = props.imageUrl ? ref(props.imageUrl) : requireEmptyImg();
</script>

<style lang="scss" scoped>
@include go("project-empty-template") {
  margin-top: 100px;
  @extend .go-flex-center;
}
</style>
