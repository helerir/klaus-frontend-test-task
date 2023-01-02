// Override Naive UI components styles
import type { GlobalThemeOverrides } from "naive-ui";

const $white = '#FFFFFF';

const themeOverrides: GlobalThemeOverrides = {
  Button: {
    textColor: $white,
  },
}

export default themeOverrides;
