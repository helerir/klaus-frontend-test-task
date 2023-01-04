<template>
  <n-card class="users-container">
    <header class="users-container__header">
      <n-space align="center" :size="[25, 10]">
        <p>2 users selected</p>
        <n-space>
          <n-button icon-placement="left">
            <template #icon>
              <EditIcon />
            </template>
            Edit
          </n-button>
          <n-button icon-placement="left">
            <template #icon>
              <DeleteIcon />
            </template>
            Delete
          </n-button>
        </n-space>
      </n-space>
    </header>
    <UserList />
  </n-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  NSpace,
  NButton,
  NCard,
} from 'naive-ui';
import UserList from '@/components/UserList.vue'
import EditIcon from '@/components/icons/EditIcon.vue';
import DeleteIcon from '@/components/icons/DeleteIcon.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    NSpace,
    NButton,
    NCard,
    UserList,
    EditIcon,
    DeleteIcon,
  }
})
</script>
