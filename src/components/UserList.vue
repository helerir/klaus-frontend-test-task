<template>
  <n-list hoverable class="user-list" v-if="users.length">
    <template #header>
      <n-row gutter="12">
        <n-col :span="16">
          <n-checkbox :checked="allUsersChecked" @click="checkAllUsers()"> User </n-checkbox>
        </n-col>
        <n-col :span="8">
          <n-button text size="tiny" icon-placement="right" @click="reOrderUserList()">
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
    <div v-bind="containerProps" style="height: 624px">
      <div v-bind="wrapperProps">
        <UserListItem
          :user="user.data"
          :checked="allUsersChecked"
          v-for="user in list"
          :key="user.data.id"
          @userCheckedValue="checkedUser"
        />
      </div>
    </div>
  </n-list>
</template>

<script lang="ts">
import { defineComponent, type PropType, toRef } from "vue";
import { NList, NCheckbox, NRow, NCol, NButton, NIcon } from "naive-ui";
import UserListItem from "@/components/UserListItem.vue";
import ArrowDownIcon from "@/components/icons/ArrowDownIcon.vue";
import type { userWithPriorityProperties } from "@/types/userWithPriority.types";
import { useVirtualList } from "@vueuse/core";

export default defineComponent({
  name: "UserList",
  setup(props) {
    const usersData = toRef(props, "users");

    const { list, containerProps, wrapperProps } = useVirtualList(usersData, {
      itemHeight: 68,
      overscan: 20,
    });

    return { list, containerProps, wrapperProps };
  },
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
      this.$store.commit("setUsers", this.users.slice().reverse());
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
