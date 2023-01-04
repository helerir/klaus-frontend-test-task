<template>
  <n-list hoverable class="user-list">
    <template #header>
      <n-checkbox :checked="false" />
      <n-row gutter="6">
        <n-col span="16">User</n-col>
        <n-col span="8">
          <n-button text size="tiny" icon-placement="right">
            Permission
            <template #icon>
              <n-icon>
                <ArrowDownIcon />
              </n-icon>
            </template>
          </n-button>
        </n-col>
      </n-row>
    </template>
    <UserListItem />
  </n-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  NList,
  NCheckbox,
  NRow,
  NCol,
  NButton,
  NIcon,
} from 'naive-ui';
import UserListItem from '@/components/UserListItem.vue';
import ArrowDownIcon from '@/components/icons/ArrowDownIcon.vue';

export default defineComponent({
  name: 'UserList',
  components: {
    NButton,
    NIcon,
    NList,
    NCheckbox,
    NRow,
    NCol,
    UserListItem,
    ArrowDownIcon,
  }
})
</script>
