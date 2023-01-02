<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <RouterView />
  </n-config-provider>
</template>

<script lang="ts">
import themeOverrides from './naive-ui/naiveOverrides';
import { RouterView } from "vue-router";
import { NConfigProvider } from 'naive-ui';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      themeOverrides,
    };
  },
  name: 'testAssignmentApp',
  components: {
    RouterView,
    NConfigProvider,
  },
});
</script>
