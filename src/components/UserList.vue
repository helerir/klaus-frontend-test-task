<template>
  <n-list hoverable class="user-list">
    <template #header>
      <n-row gutter="12">
        <n-col :span="16">
          <n-checkbox :checked="allUsersChecked" @click="checkAllUsers()">
            User
          </n-checkbox>
        </n-col>
        <n-col :span="8">
          <n-button
            text
            size="tiny"
            icon-placement="right"
            @click="reOrderUserList()"
          >
            Permission
            <template #icon>
              <n-icon :class="{ 'icon-rotate': rotateIcon }">
                <ArrowDownIcon />
              </n-icon>
            </template>
          </n-button>
        </n-col>
      </n-row>
    </template>
    <div v-if="users.length">
      <UserListItem
        :user="user"
        :checked="allUsersChecked"
        v-for="user in users"
        :key="user.id"
        @userCheckedValue="checkedUser"
      />
    </div>
  </n-list>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { NList, NCheckbox, NRow, NCol, NButton, NIcon } from "naive-ui";
import UserListItem from "@/components/UserListItem.vue";
import ArrowDownIcon from "@/components/icons/ArrowDownIcon.vue";
import type { userWithPriorityProperties } from "@/types/userWithPriority.types";

export default defineComponent({
  name: "UserList",
  data() {
    return {
      allUsersChecked: false,
      rotateIcon: false,
    };
  },
  props: {
    users: {
      type: Object as PropType<userWithPriorityProperties[]>,
      required: true,
    },
  },
  methods: {
    reOrderUserList() {
      this.rotateIcon = !this.rotateIcon;
      let reversedUsers = this.users;
      reversedUsers = reversedUsers.reverse();
      this.$store.commit("setUsers", reversedUsers);
    },
    checkedUser({ value, user }: any) {
      this.$emit("checkedUser", { value: value, user: user });
    },
    checkAllUsers() {
      this.allUsersChecked = !this.allUsersChecked;
      this.$emit("allUsersChecked", this.allUsersChecked);
    },
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
  },
});
</script>
