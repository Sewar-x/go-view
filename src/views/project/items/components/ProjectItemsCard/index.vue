<template>
  <div v-if="cardData" class="go-items-list-card">
    <n-card class="go-items-list-card-container" hoverable size="small">
      <div class="list-content">
        <!-- 顶部按钮 -->
        <div class="list-content-top">
          <mac-os-control-btn
            class="top-btn"
            :hidden="['remove']"
            @close="deleteHandle"
            @resize="resizeHandle"
          ></mac-os-control-btn>
        </div>
        <!-- 中间图片展示 -->
        <div class="list-content-img" @click="resizeHandle">
          <n-image
            object-fit="contain"
            height="180"
            preview-disabled
            :src="`${cardData.image}?time=${new Date().getTime()}`"
            :alt="cardData.title"
            :fallback-src="requireErrorImg()"
          ></n-image>
        </div>
      </div>
      <!-- 底部操作按钮 -->
      <template #action>
        <div class="go-flex-items-center list-footer" justify="space-between">
          <n-text class="go-ellipsis-1">
            {{ cardData.title || cardData.id || "未命名" }}
          </n-text>
          <!-- 状态 -->
          <div class="go-flex-items-center list-footer-ri">
            <n-space>
              <n-text>
                <n-badge
                  class="go-animation-twinkle"
                  dot
                  :color="cardData.release ? '#34c749' : '#fcbc40'"
                ></n-badge>
                {{ cardData.release ? $t("project.release") : $t("project.unreleased") }}
              </n-text>
              <!-- 操作按钮 -->
              <template v-for="item in fnBtnList" :key="item.key">
                <!-- 下拉选择操作按钮 -->
                <template v-if="item.key === 'select'">
                  <n-dropdown
                    trigger="hover"
                    placement="bottom"
                    :options="selectOptions"
                    :show-arrow="true"
                    @select="handleSelect"
                  >
                    <n-button size="small">
                      <template #icon>
                        <component :is="item.icon"></component>
                      </template>
                    </n-button>
                  </n-dropdown>
                </template>
                <!-- 编辑模板操作按钮 -->
                <n-tooltip v-else placement="bottom" trigger="hover">
                  <template #trigger>
                    <n-button
                      :disabled="!cardData.created"
                      size="small"
                      @click="handleSelect(item.key)"
                    >
                      <template #icon>
                        <component :is="item.icon"></component>
                      </template>
                    </n-button>
                  </template>
                  <component :is="item.label"></component>
                </n-tooltip>
              </template>
            </n-space>
            <!-- end -->
          </div>
        </div>
      </template>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, PropType } from "vue";
import { renderIcon, renderLang, requireErrorImg } from "@/utils";
import { Icon} from '@/plugins';
import { MacOsControlBtn } from "@/components/Tips/MacOsControlBtn";
import { Chartype } from "../../index.d";
const {
  EllipsisHorizontalCircleSharpIcon,
  CopyIcon,
  TrashIcon,
  PencilIcon,
  DownloadIcon,
  BrowsersOutlineIcon,
  HammerIcon,
  SendIcon,
} = Icon;
const { TemplateIcon } = Icon;
const emit = defineEmits(["preview", "delete", "resize", "edit", "release","setTemplate"]);

const props = defineProps({
  cardData: Object as PropType<Chartype>,
});

//按钮组
const fnBtnList = reactive([
  {
    label: renderLang("global.r_edit"),
    key: "edit", //编辑按钮
    icon: renderIcon(HammerIcon),
  },
  {
    lable: renderLang("global.r_more"),
    key: "select", //下拉选择
    icon: renderIcon(EllipsisHorizontalCircleSharpIcon),
  },
]);
// 下拉选项
const selectOptions = ref([
  {
    label: renderLang("global.r_preview"),
    key: "preview", //预览
    icon: renderIcon(BrowsersOutlineIcon),
    disabled: !props.cardData?.created,
  },
  {
    label: renderLang("global.r_copy"),
    key: "copy", //复制
    icon: renderIcon(CopyIcon),
    disabled: true,
  },
  {
    label: renderLang("global.r_rename"),
    key: "rename", //重命名
    icon: renderIcon(PencilIcon),
    disabled: true,
  },
  {
    type: "divider",
    key: "d1",
  },
  {
    label: props.cardData?.release
      ? renderLang("global.r_unpublish")
      : renderLang("global.r_publish"),
    key: "release", //发布
    icon: renderIcon(SendIcon),
    disabled: !props.cardData?.created,
  },
  {
    label: renderLang("global.set_template"),
    key: "setTemplate", //发布
    icon: renderIcon(TemplateIcon),
    disabled: !props.cardData?.created,
  },
  {
    label: renderLang("global.r_download"),
    key: "download", //下载
    icon: renderIcon(DownloadIcon),
    disabled: true,
  },
  {
    type: "divider",
    key: "d2",
  },
  {
    label: renderLang("global.r_delete"),
    key: "delete", //删除
    icon: renderIcon(TrashIcon),
    disabled: !props.cardData?.created,
  },
]);

const handleSelect = (key: string) => {
  const methodMap: {
    [key: string]: () => void;
  } = {
    preview: previewHandle,
    delete: deleteHandle,
    release: releaseHandle,
    edit: editHandle,
    setTemplate:setTemplateHandle
  };
  const method = methodMap[key];
  method && method();
};

// 预览处理
const previewHandle = () => {
  emit("preview", props.cardData);
};

// 删除处理
const deleteHandle = () => {
  emit("delete", props.cardData);
};

// 编辑处理
const editHandle = () => {
  emit("edit", props.cardData);
};

// 发布处理
const releaseHandle = () => {
  emit("release", props.cardData);
};

// 设为模板处理
const setTemplateHandle = () => {
  emit("setTemplate", props.cardData);
};

// 放大处理
const resizeHandle = () => {
  emit("resize", props.cardData);
};
</script>

<style lang="scss" scoped>
$contentHeight: 180px;
@include go("items-list-card") {
  position: relative;
  border-radius: $--border-radius-base;
  border: 1px solid rgba(0, 0, 0, 0);
  @extend .go-transition;
  &:hover {
    @include hover-border-color("hover-border-color");
  }
  @include hoverScale("items-list-card-container", 1.04);
  .list-content {
    margin-top: 20px;
    margin-bottom: 5px;
    cursor: pointer;
    border-radius: $--border-radius-base;
    @include background-image("background-point");
    @extend .go-point-bg;
    &-top {
      position: absolute;
      top: 10px;
      right: 10px;
      height: 22px;
    }
    &-img {
      height: $contentHeight;
      @extend .go-flex-center;
      @extend .go-border-radius;
      @include deep() {
        img {
          @extend .go-border-radius;
        }
      }
    }
  }
  .list-footer {
    flex-wrap: nowrap;
    justify-content: space-between;
    line-height: 30px;
    &-ri {
      justify-content: flex-end;
      min-width: 180px;
    }
  }
}
</style>
