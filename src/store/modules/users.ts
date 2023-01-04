import mockAPI from '@/services'
import type { permissionProperties } from '@/types/permissions.types'
import type { userProperties } from '@/types/users.types'

export interface State {
  users: userProperties[];
  permissions: permissionProperties[];
}

const state: State = {
  users: [] as userProperties[],
  permissions: [
    {
      title: 'Account manager',
      value: 'ACCOUNT_MANAGER',
      textColor: '#710C36',
      tagColor: '#FEDDEB',
      priority: 1,
    }, {
      title: 'Admin',
      value: 'ADMIN',
      textColor: '#574195',
      tagColor: '#EFE2FE',
      priority: 2,
    }, {
      title: 'Agent',
      value: 'AGENT',
      textColor: '#04546F',
      tagColor: '#CEF1FD',
      priority: 3,
    }, {
      title: 'External reviewer',
      value: 'EXTERNAL_REVIEWER',
      textColor: '#91472C',
      tagColor: '#FEEBC8',
      priority: 4,
    },
  ] as permissionProperties[],
}

const mutations = {
  setUsers (users: userProperties[]) {
    state.users = users;
  }
}

const getters = {
  getUsers(): userProperties[] {
    return state.users;
  },
  getPermissions(): permissionProperties[] {
    return state.permissions;
  }
}

const actions = {
  fetchUsers () {
    return mockAPI.fetchUsers()
      .then(response => {
        mutations.setUsers(response.users);
      })
  }
}

export default {
  state,
  mutations,
  getters,
  actions,
}
