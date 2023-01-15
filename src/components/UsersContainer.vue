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
    // Set loading state as long as the real data is being fetched
    this.loading = true;
    // fetching data
    await this.fetchAllUsers();
    // Data is fetched, order users and set loading state to false
    if (this.allUsers) {
      this.orderUsers();
      this.loading = false;
    }
  },
  computed: {
    allUsers(): userWithPriorityProperties[] {
      // Get all users from the store state by using store getters
      return this.$store.getters.getUsersWithRolePriorities;
    },
    btnDisabled() {
      // Disable button when no users are selected
      return !this.allUsersChecked && this.checkedUsersList.length < 1;
    },
    checkedUsersLength() {
      // Get the length of users that are selected in the list
      if (this.allUsersChecked || this.checkedUsersList.length) {
        return this.allUsersChecked ? this.allUsers.length : this.checkedUsersList.length;
      } else {
        return 0;
      }
    },
  },
  methods: {
    async fetchAllUsers() {
      // a call for store action to fetch all users from the backend
      await this.$store.dispatch("fetchUsers");
    },
    orderUsers() {
      // Order all users by role priority and set the ordered list as users state in store
      const orderedUsers = this.allUsers.sort(function (a, b) {
        return a.priority - b.priority;
      });
      this.$store.commit("setUsers", orderedUsers);
    },
    updateCheckedUsersList({ value, user }: any) {
      // This method listens for any updated from the UsersList component via emit function and when payload changes
      // it either pushes new selected user to checked users list or removes that user from the list.
      if (value) {
        this.checkedUsersList.push(user);
      } else {
        const userIndex = this.checkedUsersList.findIndex((u: userWithPriorityProperties) => u.id == user.id);
        this.checkedUsersList.splice(userIndex, 1);
      }
    },
    deleteCheckedUsers() {
      // a function to remove only checked users from list
      this.checkedUsersList.forEach((user: userWithPriorityProperties) => {
        this.$store.commit("deleteUser", user.id);
      });
      this.checkedUsersList = [];
    },
    deleteUsers() {
      // delete users, checks whether all users are selected or not and deletes accordingly
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
