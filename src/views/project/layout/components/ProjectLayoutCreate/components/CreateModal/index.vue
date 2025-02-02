<template>
  <n-modal v-model:show="showRef" class="go-create-modal" @afterLeave="closeHandle">
    <n-space size="large">
      <n-card class="card-box" hoverable>
        <template #header>
          <n-text class="card-box-tite">{{ $t("project.create_tip") }}</n-text>
        </template>
        <template #header-extra>
          <n-text @click="closeHandle">
            <n-icon size="20">
              <component :is="CloseIcon"></component>
            </n-icon>
          </n-text>
        </template>
        <n-space class="card-box-content" justify="center">
          <n-button
            size="large"
            :disabled="item.disabled"
            v-for="item in typeList"
            :key="item.key"
            @click="btnHandle(item.key)"
          >
            <component :is="item.title"></component>
            <template #icon>
              <n-icon size="18">
                <component :is="item.icon"></component>
              </n-icon>
            </template>
          </n-button>
        </n-space>
        <template #action></template>
      </n-card>
    </n-space>
  </n-modal>
</template>

<script lang="ts" setup>
import { ref, watch, shallowRef } from "vue";
import { Icon } from "@/plugins";
import { PageEnum, ChartEnum } from "@/enums/pageEnum";
import { fetchPathByName, routerTurnByPath, renderLang, getUUID } from "@/utils";
import { useProjectStoreStore } from "@/store/modules/projectStoreStore/projectStoreStore";
import { useDataListInit } from "@/views/project/items/components/ProjectItemsList/hooks/useData.hook";
const { PieChartSharpICon, CloseIcon } = Icon;
const { ObjectStorageIcon, BlockStorageIcon } = Icon;
const { createdHandle } = useDataListInit();
const showRef = ref(false);
const { setProjectCreatedName } = useProjectStoreStore();

const emit = defineEmits(["close", "created"]);
const props = defineProps({
  show: Boolean,
});

const typeList = shallowRef([
  {
    title: renderLang("project.chart_project"),
    key: ChartEnum.CHART_HOME_NAME,
    icon: PieChartSharpICon,
    disabled: false,
  },
  {
    title: renderLang("project.table_project"),
    key: ChartEnum.TABLE_HOME_NAME,
    icon: BlockStorageIcon,
    disabled: true,
  },
  {
    title: renderLang("project.template_project"),
    key: PageEnum.BASE_HOME_TEMPLATE_NAME,
    icon: ObjectStorageIcon,
    disabled: true,
  },
]);

watch(
  () => props.show,
  (newValue) => {
    showRef.value = newValue;
  }
);

// 关闭对话框
const closeHandle = () => {
  emit("close", false);
};

// 处理按钮点击
const btnHandle = async (key: string) => {
  switch (key) {
    case ChartEnum.CHART_HOME_NAME:
      created(key);
      break;
  }
};

const created = async (key: string) => {
  try {
    const projectName: string = `${key}-${getUUID()}`;
    // 新增项目
    const res = await createdHandle(
      {
        // 项目名称
        projectName,
        // remarks
        remarks: null,
        // 图片地址
        indexImage: null,
      },
      (data) => {
        const { id } = data;
        const path = fetchPathByName(ChartEnum.CHART_HOME_NAME, "href");
        routerTurnByPath(path, [id], undefined, true);
        closeHandle();
        setProjectCreatedName(projectName);
        emit("created", data);
      }
    );
  } catch (error) {
    emit("created", false);
  }
};
</script>
<style lang="scss" scoped>
$cardWidth: 570px;

@include go("create-modal") {
  position: fixed;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  .card-box {
    width: $cardWidth;
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0);
    @extend .go-transition;
    &:hover {
      @include hover-border-color("hover-border-color");
    }
    &-tite {
      font-size: 14px;
    }
    &-content {
      padding: 0px 10px;
      width: 100%;
    }
  }
}
</style>
