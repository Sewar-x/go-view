<template>
  <div class="go-footer">
    <slot>
      <n-space :size="50">
        <n-text depth="2">
        
        
        </n-text>
        <n-text depth="3">
          <n-a italic href="https://beian.miit.gov.cn/" target="_blank">
            
          </n-a>
        </n-text>
      </n-space>
    </slot>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
@include go(footer) {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0 40px;
  height: $--footer-height;
}
</style>
