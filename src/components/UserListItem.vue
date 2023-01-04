<template>
  <n-list-item @click="checkedValue = !checkedValue" :class="{'selected': checkedValue}">
    <template #prefix>
      <n-checkbox :checked="checkedValue" />
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
        <n-button @click.stop.prevent>
          <template #icon>
            <DeleteIcon />
          </template>
        </n-button>
      </n-space>
    </template>
  </n-list-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
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
} from 'naive-ui';
import EditIcon from '@/components/icons/EditIcon.vue';
import DeleteIcon from '@/components/icons/DeleteIcon.vue';
import type { userProperties } from '@/types/user.types';
import type { permissionProperties } from '@/types/permission.types';
import users from '@/store/modules/users';

export default defineComponent({
  name: 'UserListItem',
  data() {
    return {
      permissions: [] as permissionProperties[],
      checkedValue: false,
      tagTextColor: '' || undefined,
      tagColor: '' || undefined
    };
  },
  created() {
    this.permissions = this.getPermissions;
  },
  props: {
    user: { type: Object as PropType<userProperties>, required: true }
  },
  computed: {
    getPermissions(): permissionProperties[] {
      return users.getters.getPermissions();
    },
  },
  methods: {
    userRole(): string | undefined {
      const role = this.permissions.find((p) => p.value == this.user.role);
      this.tagTextColor = role?.textColor;
      this.tagColor = role?.tagColor;
      return role?.title;
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
  }
})
</script>
