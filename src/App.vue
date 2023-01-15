<template>
  <!-- Naive-UI specific config around the main app component -->
  <n-config-provider :theme-overrides="themeOverrides">
    <RouterView />
  </n-config-provider>
</template>

<script lang="ts">
import themeOverrides from "./naive-ui/themeOverrides";
import { RouterView } from "vue-router";
import { NConfigProvider } from "naive-ui";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {
      // Adding Naive-UI theme overrides to the app.
      themeOverrides,
    };
  },
  name: "TestAssignmentApp",
  components: {
    RouterView,
    NConfigProvider,
  },
});
</script>
