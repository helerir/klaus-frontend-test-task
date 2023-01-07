<template>
  <n-list-item
    @click="checkValue()"
    :class="{ selected: checkedValue || checked }"
  >
    <template #prefix>
      <n-checkbox :checked="checkedValue || checked" />
    </template>
    <n-row gutter="12">
      <n-col :span="16">
        <n-thing>
          <template #avatar>
            <n-avatar round :src="user.avatar" />
          </template>
          <template #header>{{ user.name }}</template>
          <template #description>{{ user.email }}</template>
        </n-thing>
      </n-col>
      <n-col :span="8">
        <n-tag
          :bordered="false"
          size="small"
          v-if="userRole()"
          :style="{ backgroundColor: tagColor, color: tagTextColor }"
        >
          {{ userRole() }}
        </n-tag>
      </n-col>
    </n-row>
    <template #suffix>
      <n-space align="center" justify="end" :size="[6, 5]">
        <n-button icon-placement="left" @click.stop.prevent>
          <template #icon>
            <EditIcon />
          </template>
          Edit
        </n-button>
        <n-button @click.stop.prevent="deleteUser()">
          <template #icon>
            <DeleteIcon />
          </template>
        </n-button>
      </n-space>
    </template>
  </n-list-item>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import {
  NSpace,
  NListItem,
  NCheckbox,
  NButton,
  NAvatar,
  NThing,
  NRow,
  NCol,
  NTag,
} from "naive-ui";
import EditIcon from "@/components/icons/EditIcon.vue";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import type { userProperties } from "@/types/user.types";
import type { permissionProperties } from "@/types/permission.types";

export default defineComponent({
  name: "UserListItem",
  data() {
    return {
      permissions: [] as permissionProperties[],
      checkedValue: false,
      tagTextColor: "",
      tagColor: "",
    };
  },
  created() {
    this.permissions = this.getPermissions;
  },
  props: {
    user: { type: Object as PropType<userProperties>, required: true },
    checked: Boolean,
  },
  watch: {
    checked(value) {
      if (!value) {
        this.checkedValue = false;
      }
    },
  },
  computed: {
    getPermissions(): permissionProperties[] {
      return this.$store.getters.getPermissions;
    },
  },
  methods: {
    userRole(): string | undefined {
      const role = this.permissions.find((p) => p.value == this.user.role);
      this.tagTextColor = role?.textColor;
      this.tagColor = role?.tagColor;
      return role?.title;
    },
    checkValue() {
      this.checkedValue = !this.checkedValue;
      this.$emit("userCheckedValue", {
        value: this.checkedValue,
        user: this.user,
      });
    },
    deleteUser() {
      this.$store.commit("deleteUser", this.user.id);
    },
  },
  components: {
    NSpace,
    NButton,
    NListItem,
    NCheckbox,
    NAvatar,
    NThing,
    NRow,
    NCol,
    NTag,
    EditIcon,
    DeleteIcon,
  },
});
</script>
