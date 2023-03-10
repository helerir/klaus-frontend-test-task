import type { userWithPriorityProperties } from "@/types/userWithPriority.types";
import mockAPI from "@/services";
import type { permissionProperties } from "@/types/permission.types";
import type { userProperties } from "@/types/user.types";
import type { Module } from "vuex";

export interface State {
  users: userProperties[];
  permissions: permissionProperties[];
}

// Define initial user module states
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

  // Define mutations to change initial states
  mutations: {
    setUsers(state, users: userProperties[]) {
      state.users = users;
    },
    deleteUser(state, userId: number) {
      const userIndex = state.users.findIndex((u: userProperties) => u.id == userId);
      state.users.splice(userIndex, 1);
    },
  },

  // Define getters to return state data and updates
  getters: {
    getPermissions(state): permissionProperties[] {
      return state.permissions;
    },
    getUsersWithRolePriorities(state): userWithPriorityProperties[] {
      // Get all users that are set to state and connect them to permission priorities by roles
      const usersWithPriorities = [] as userWithPriorityProperties[];
      if (state.users.length) {
        //const showNineUsers = state.users.slice(0, 9);
        state.users.forEach((user: userProperties) => {
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

  // Define actions to commit any data related mutations and use data related async functions
  actions: {
    async fetchUsers({ commit }) {
      return await mockAPI.fetchUsers().then(async (response) => {
        if (response.users) {
          commit("setUsers", response.users);
        }
      });
    },
  },
};

export default usersModule;
