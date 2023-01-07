import { Store } from "vuex";

declare module "@vue/runtime-core" {
  // declare your own store states
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface State {}

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
