<template>
  <n-list-item>
    <template #prefix>
      <n-checkbox :checked="false" />
    </template>
    <n-row gutter="12">
      <n-col :span="16">
        <n-thing>
          <template #avatar>
            <n-avatar
              round
              src="https://randomuser.me/api/portraits/men/32.jpg"
            />
          </template>
          <template #header>Karen Marie Ørsted Andersen</template>
          <template #description>karen.andersen@sunrise.com</template>
        </n-thing>
      </n-col>
      <n-col :span="8">
        <n-tag :bordered="false" type="error" size="small">
          Account manager
        </n-tag>
      </n-col>
    </n-row>
    <template #suffix>
      <n-space align="center" justify="end" :size="[6, 5]">
        <n-button icon-placement="left">
          <template #icon>
            <EditIcon />
          </template>
          Edit
        </n-button>
        <n-button>
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

export default defineComponent({
  name: 'UserListItem',
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
