<template>
  <!-- 登录 -->
  <div class="go-login-box">
    <!-- 登录背景 -->
    <div class="go-login-box-bg">
      <aside class="bg-slot"></aside>
      <aside class="bg-img-box">
        <transition-group name="list-complete">
          <template v-for="item in bgList" :key="item">
            <div class="bg-img-box-li list-complete-item">
              <n-collapse-transition :appear="true" :show="showBg">
                <img :src="getImageUrl(item, 'chart/charts')" alt="chart" />
              </n-collapse-transition>
            </div>
          </template>
        </transition-group>
      </aside>
    </div>
    <layout-header class="login-header">
      <template #left></template>
      <template #right>
        <go-lang-select></go-lang-select>
        <go-theme-select></go-theme-select>
      </template>
    </layout-header>
    <!-- 登录内容 -->
    <div class="go-login">
      <!-- 登录左侧轮播图 -->
      <div class="go-login-lottie">
        <Vue3Lottie :animationData="bgLottie" :height="600" :width="600" />
      </div>
      <!-- 登录框 -->
      <div class="login-account">
        <div class="login-account-container">
          <n-collapse-transition :appear="true" :show="show">
            <n-card class="login-account-card" :title="$t('login.desc')">
              <n-divider style="margin: 0 0 20px 0" />
              <Logo class="login-account-logo" logoHeight="150" logoWith="150" />
              <n-form
                ref="formRef"
                label-placement="left"
                size="large"
                :model="formInline"
                :rules="rules"
              >
                <n-form-item path="username">
                  <n-input
                    v-model:value="formInline.username"
                    :placeholder="$t('global.form_account')"
                  >
                    <template #prefix>
                      <n-icon size="18">
                        <PersonOutlineIcon></PersonOutlineIcon>
                      </n-icon>
                    </template>
                  </n-input>
                </n-form-item>
                <n-form-item path="password">
                  <n-input
                    v-model:value="formInline.password"
                    type="password"
                    show-password-on="click"
                    :placeholder="$t('global.form_password')"
                  >
                    <template #prefix>
                      <n-icon size="18">
                        <LockClosedOutlineIcon></LockClosedOutlineIcon>
                      </n-icon>
                    </template>
                  </n-input>
                </n-form-item>
                <n-form-item>
                  <div class="flex justify-between">
                    <div class="flex-initial">
                      <n-checkbox v-model:checked="autoLogin">{{
                        $t("login.form_auto")
                      }}</n-checkbox>
                    </div>
                  </div>
                </n-form-item>
                <n-form-item>
                  <n-button
                    type="primary"
                    @click="handleSubmit"
                    size="large"
                    :loading="loading"
                    block
                    >{{ $t("login.form_button") }}</n-button
                  >
                </n-form-item>
              </n-form>
            </n-card>
          </n-collapse-transition>
        </div>
      </div>
    </div>

    <div class="go-login-box-footer">
      <layout-footer></layout-footer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import shuffle from "lodash/shuffle";
import { carouselInterval } from "@/settings/designSetting";
import { useSystemStore } from "@/store/modules/systemStore/systemStore";
import {
  SystemStoreUserInfoEnum,
  SystemStoreEnum,
} from "@/store/modules/systemStore/systemStore.d";
import { GoThemeSelect } from "@/components/GoThemeSelect";
import { GoLangSelect } from "@/components/GoLangSelect";
import { LayoutHeader } from "@/layout/components/LayoutHeader";
import { LayoutFooter } from "@/layout/components/LayoutFooter";
import { PageEnum } from "@/enums/pageEnum";
import { StorageEnum } from "@/enums/storageEnum";
import { Icon} from '@/plugins';
import { routerTurnByName } from "@/utils";
import { loginApi } from "@/api/path";
import { Logo } from "@/components/Logo";
import bgLottie from "@/assets/lottie/bg.json";
interface FormState {
  username: string;
  password: string;
}

const { GO_SYSTEM_STORE } = StorageEnum;
const { PersonOutlineIcon, LockClosedOutlineIcon } = Icon;

const formRef = ref();
const loading = ref(false);
const autoLogin = ref(true);
const show = ref(false);
const showBg = ref(false);
const systemStore = useSystemStore();

const t = window["$t"];

const formInline = reactive({
  username: null,
  password: null,
});

const rules = {
  username: {
    required: true,
    message: t("global.form_account"),
    trigger: "blur",
  },
  password: {
    required: true,
    message: t("global.form_password"),
    trigger: "blur",
  },
};

// 定时器
const shuffleTimiing = ref();

// 背景图
const bgList = ref([
  "bar_y",
  "bar_x",
  "line_gradient",
  "line",
  "funnel",
  "heatmap",
  "map",
  "pie",
  "radar",
]);

// 处理url获取
const getImageUrl = (name: string, folder: string) => {
  return new URL(`../../assets/images/${folder}/${name}.png`, import.meta.url).href;
};

// 打乱图片顺序
const shuffleHandle = () => {
  shuffleTimiing.value = setInterval(() => {
    bgList.value = shuffle(bgList.value);
  }, carouselInterval);
};

// 登录
const handleSubmit = async (e: Event) => {
  e.preventDefault();
  formRef.value.validate(async (errors: any) => {
    if (!errors) {
      const { username, password } = formInline;
      loading.value = true;
      // 提交请求
      const res = await loginApi({
        username,
        password,
      });
      if (res && res.data) {
        const { tokenValue, tokenName } = res.data.token;
        const { nickname, username, id } = res.data.userinfo;

        // 存储到 pinia
        systemStore.setItem(SystemStoreEnum.USER_INFO, {
          [SystemStoreUserInfoEnum.USER_TOKEN]: tokenValue,
          [SystemStoreUserInfoEnum.TOKEN_NAME]: tokenName,
          [SystemStoreUserInfoEnum.USER_ID]: id,
          [SystemStoreUserInfoEnum.USER_NAME]: username,
          [SystemStoreUserInfoEnum.NICK_NAME]: nickname,
        });

        window["$message"].success(t("login.login_success"));
        routerTurnByName(PageEnum.BASE_HOME_NAME, true);
      }
      loading.value = false;
    } else {
      window["$message"].error(t("login.login_message"));
    }
  });
};

onMounted(() => {
  setTimeout(() => {
    show.value = true;
  }, 300);

  setTimeout(() => {
    showBg.value = true;
  }, 100);

  shuffleHandle();
});
</script>

<style lang="scss" scoped>
$width: 450px;
$go-login-height: 100vh;
$account-img-height: 210px;
$footer-height: 50px;
$carousel-width: 33%;
$carousel-image-height: 60vh;

@include go(login-box) {
  height: $go-login-height;
  overflow: hidden;
  @include background-image("background-image");
  .login-header {
    position: relative;
    z-index: 100;
  }
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    height: $--header-height;
  }
  &-divider {
    margin: 0;
    padding-top: 0;
  }

  @include go(login) {
    z-index: 2;
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: -$--header-height;
    height: $go-login-height;
    width: 100vw;
    &-lottie {
      position: fixed;
      top: 10vh;
      right: 12vw;
      width: $carousel-width;
      margin-top: 100px;
      min-width: 500px;
      &-img {
        display: block;
        margin: 0 auto;
        height: $carousel-image-height;
      }
    }
    .login-account {
      display: flex;
      flex-direction: column;
      margin: 0 160px;
      z-index: 10;
      &-container {
        width: $width;
      }

      &-card {
        @extend .go-transition;
        &:hover {
          transform: scale(1.1);
          box-shadow: #90939918 0px 15px 25px, #60626634 0px 5px 10px;
        }
        @extend .go-background-filter;
        @include fetch-bg-color("filter-color");
        box-shadow: 0 0 20px 5px rgba(40, 40, 40, 0.3);
        &::v-deep .n-card-header__main {
          text-align: center;
        }
      }

      &-top {
        padding-top: 10px;
        text-align: center;
        height: $account-img-height;
        margin-bottom: 20px;
      }
      &-logo {
        margin: 15px 0 50px 0;
      }
    }
  }

  &-footer {
    z-index: 2;
    position: fixed;
    width: 100%;
    bottom: 0;
  }
  // 登录背景
  &-bg {
    z-index: 0;
    position: fixed;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: url("@/assets/images/login/login-bg.png") no-repeat 55vw -2vh;
    .bg-slot {
      width: $carousel-width;
    }
    .bg-img-box {
      position: absolute;
      left: 7vw;
      display: flex;
      flex-wrap: wrap;
      width: 770px;
      margin-right: -20px;
      &-li {
        img {
          margin-right: 20px;
          margin-top: 20px;
          width: 230px;
          border-radius: 2 * $--border-radius-base;
          opacity: 0.9;
        }
      }
    }
  }
}
@media only screen and (max-width: 1200px) {
  .bg-img-box,
  .bg-slot,
  .go-login-lottie {
    display: none !important;
  }
  .go-login-box-footer {
    position: relative;
  }
}
</style>
