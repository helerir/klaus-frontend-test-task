import type { userWithPriorityProperties } from "@/types/userWithPriority.types";
import mockAPI from "@/services";
import type { permissionProperties } from "@/types/permission.types";
import type { userProperties } from "@/types/user.types";
import type { Module } from "vuex";

export interface State {
  users: userProperties[];
  permissions: permissionProperties[];
}

const usersModule: Module<any, any> = {
  state: {
    users: [] as userProperties[],
    permissions: [
      {
        title: "Account manager",
        value: "ACCOUNT_MANAGER",
        textColor: "#710C36",
        tagColor: "#FEDDEB",
        priority: 1,
      },
      {
        title: "Admin",
        value: "ADMIN",
        textColor: "#574195",
        tagColor: "#EFE2FE",
        priority: 2,
      },
      {
        title: "Agent",
        value: "AGENT",
        textColor: "#04546F",
        tagColor: "#CEF1FD",
        priority: 3,
      },
      {
        title: "External reviewer",
        value: "EXTERNAL_REVIEWER",
        textColor: "#91472C",
        tagColor: "#FEEBC8",
        priority: 4,
      },
    ] as permissionProperties[],
  },

  mutations: {
    setUsers(state, users: userProperties[]) {
      state.users = users;
    },
    deleteUser(state, userId: number) {
      const userIndex = state.users.findIndex((u: userProperties) => u.id == userId);
      state.users.splice(userIndex, 1);
    },
  },

  getters: {
    getPermissions(state): permissionProperties[] {
      return state.permissions;
    },
    getUsersWithRolePriorities(state): userWithPriorityProperties[] {
      const usersWithPriorities = [] as userWithPriorityProperties[];
      if (state.users.length) {
        const showNineUsers = state.users.slice(0, 9);
        showNineUsers.forEach((user: userProperties) => {
          const permission = state.permissions.find((p: permissionProperties) => p.value == user.role);
          if (permission) {
            const userWithPriority = { ...user, priority: permission.priority };
            usersWithPriorities.push(userWithPriority);
          }
        });
      }
      return usersWithPriorities;
    },
  },

  actions: {
    async fetchUsers({ commit }) {
      return await mockAPI.fetchUsers().then((response) => {
        commit("setUsers", response.users);
      });
    },
  },
};

export default usersModule;
