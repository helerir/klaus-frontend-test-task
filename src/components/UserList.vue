<template>
  <n-list hoverable class="user-list">
    <template #header>
      <n-checkbox :checked="false" />
      <n-row gutter="6">
        <n-col span="16">User</n-col>
        <n-col span="8">
          <n-button text size="tiny" icon-placement="right" @click="reverseUsersOrder()">
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
    <div v-if="users.length">
      <UserListItem :user="user" v-for="user in usersWithPriorities" :key="user.id" />
    </div>
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
import type { userProperties } from '@/types/user.types';
import { users } from '@/store'
import type { permissionProperties } from '@/types/permission.types';
import type { userWithPriorityProperties } from '@/types/userWithPriority.types';

export default defineComponent({
  name: 'UserList',
  data() {
    return {
      users: [] as userProperties[],
      permissions: [] as permissionProperties[],
      usersWithPriorities: [] as userWithPriorityProperties[],
    }
  },
  async created() {
    await users.actions.fetchUsers();
    this.users = this.allUsers;
    this.permissions = this.allPermissions;
    this.orderUsers();
  },
  computed: {
    allUsers(): userProperties[] {
      return users.getters.getUsers();
    },
    allPermissions(): permissionProperties[] {
      return users.getters.getPermissions();
    },
  },
  methods: {
    mergeUsersWithPriorities(): userWithPriorityProperties[] {
      let usersWithPriorities = [] as userWithPriorityProperties[];
      this.users.forEach((user) => {
        const permission = this.permissions.find((p) => p.value == user.role);
        if (permission) {
          let userWithPriority = { ...user, priority: permission.priority };
          usersWithPriorities.push(userWithPriority);
        }
      });
      return usersWithPriorities;
    },
    orderUsers(): void {
      let orderedUsers = [] as userWithPriorityProperties[];
      orderedUsers = this.mergeUsersWithPriorities().sort(function(a, b) {
        return a.priority - b.priority;
      });
      this.usersWithPriorities = orderedUsers;
    },
    reverseUsersOrder() {
      return this.usersWithPriorities.reverse();
    }
  },
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
