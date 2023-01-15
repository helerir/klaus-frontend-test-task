// store
import type { InjectionKey, State } from "vue";
import { Store } from "vuex";
import users from "@/store/modules/users";

//  define  injection  key
export const key: InjectionKey<Store<State>> = Symbol();

// Create the Vuex store and add users module
export const store = new Store({
  modules: {
    users,
  },
});
