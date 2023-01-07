<template>
  <n-layout>
    <n-layout-header>
      <n-space justify="space-between" align="center">
        <n-h1>Account users</n-h1>
        <n-space>
          <n-input placeholder="Search" type="text" size="large">
            <template #prefix>
              <SearchIcon />
            </template>
          </n-input>
          <n-button size="large" type="primary">Connect users</n-button>
        </n-space>
      </n-space>
    </n-layout-header>
    <n-layout-content>
      <UsersContainer />
    </n-layout-content>
  </n-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NSpace,
  NH1,
  NInput,
  NButton,
} from "naive-ui";
import UsersContainer from "@/components/UsersContainer.vue";
import SearchIcon from "@/components/icons/SearchIcon.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NSpace,
    NH1,
    NInput,
    NButton,
    SearchIcon,
    UsersContainer,
  },
});
</script>
