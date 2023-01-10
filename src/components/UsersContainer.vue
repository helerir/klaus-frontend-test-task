<template>
  <n-card class="users-container">
    <header class="users-container__header">
      <n-space align="center" :size="[25, 10]">
        <p>
          {{ checkedUsersLength }}
          <span v-if="checkedUsersLength == 1">user</span>
          <span v-else>users</span>
          selected
        </p>
        <n-space>
          <n-button icon-placement="left" :disabled="btnDisabled">
            <template #icon>
              <EditIcon />
            </template>
            Edit
          </n-button>
          <n-button icon-placement="left" @click="deleteUsers()" :disabled="btnDisabled">
            <template #icon>
              <DeleteIcon />
            </template>
            Delete
          </n-button>
        </n-space>
      </n-space>
    </header>
    <n-space justify="center" v-if="!allUsers.length">
      <n-spin v-if="loading" size="small" />
      <div v-else>No users found.</div>
    </n-space>
    <UserList
      :users="allUsers"
      v-else
      @allUsersChecked="allUsersChecked = !allUsersChecked"
      @checkedUser="updateCheckedUsersList"
    />
  </n-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { NSpace, NButton, NCard, NSpin } from "naive-ui";
import UserList from "@/components/UserList.vue";
import EditIcon from "@/components/icons/EditIcon.vue";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import type { userWithPriorityProperties } from "@/types/userWithPriority.types";

export default defineComponent({
  name: "UsersContainer",
  data() {
    return {
      loading: false,
      allUsersChecked: false,
      checkedUsersList: [] as userWithPriorityProperties[],
    };
  },
  async created() {
    this.loading = true;
    await this.fetchAllUsers();
    this.orderUsers();
    if (this.allUsers) {
      this.loading = false;
    }
  },
  computed: {
    allUsers(): userWithPriorityProperties[] {
      return this.$store.getters.getUsersWithRolePriorities;
    },
    btnDisabled() {
      return !this.allUsersChecked && this.checkedUsersList.length < 1;
    },
    checkedUsersLength() {
      if (this.allUsersChecked || this.checkedUsersList.length) {
        return this.allUsersChecked ? this.allUsers.length : this.checkedUsersList.length;
      } else {
        return 0;
      }
    },
  },
  methods: {
    async fetchAllUsers() {
      return await this.$store.dispatch("fetchUsers");
    },
    orderUsers() {
      const orderedUsers = this.allUsers.sort(function (a, b) {
        return a.priority - b.priority;
      });
      this.$store.commit("setUsers", orderedUsers);
    },
    updateCheckedUsersList({ value, user }: any) {
      if (value) {
        this.checkedUsersList.push(user);
      } else {
        const userIndex = this.checkedUsersList.findIndex((u: userWithPriorityProperties) => u.id == user.id);
        this.checkedUsersList.splice(userIndex, 1);
      }
    },
    deleteCheckedUsers() {
      this.checkedUsersList.forEach((user: userWithPriorityProperties) => {
        this.$store.commit("deleteUser", user.id);
      });
      this.checkedUsersList = [];
    },
    deleteUsers() {
      if (this.allUsersChecked) {
        this.$store.commit("setUsers", {});
      } else if (this.checkedUsersList.length > 0) {
        this.deleteCheckedUsers();
      }
    },
  },
  components: {
    NSpace,
    NButton,
    NCard,
    UserList,
    EditIcon,
    DeleteIcon,
    NSpin,
  },
});
</script>
