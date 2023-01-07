// Override Naive UI components styles
import type { GlobalThemeOverrides } from "naive-ui";

const $brand = "#475DE5";

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: $brand,
    fontFamily: '"Inter", sans serif',
  },
  Button: {
    iconSizeMedium: "16px",
    iconMarginMedium: "0 8px 0 0",
    borderRadiusSmall: "4px",
    borderRadiusMedium: "4px",
    borderRadiusLarge: "4px",
    fontSizeLarge: "14px",
    paddingMedium: "0 12px 0 10px",
    paddingLarge: "0 12px",
    fontWeight: "500",
    heightMedium: "32px",
    border: "1px solid #E2E8F0",
    textColor: "#4A5568",
    color: "#FFFFFF",
    colorHover: "#FFFFFF",
    colorHoverPrimary: "#171A22",
    borderHoverPrimary: "1px solid #171A22",
    colorFocusPrimary: "#171A22",
    borderFocusPrimary: "#171A22",
    borderHover: "1px solid #475DE5",
    borderFocus: "1px solid #475DE5",
    textColorHover: $brand,
    textColorFocus: $brand,
  },
  Card: {
    borderRadius: "8px",
  },
  Checkbox: {
    borderRadius: "3px",
    fontSizeMedium: "12px",
    textColor: "#718096",
    labelPadding: "0 12px",
  },
  Input: {
    border: "1px solid #E2E8F0",
    borderRadius: "4px",
    fontSizeLarge: "14px",
    placeholderColor: "#A0AEC0",
    textColor: "#718096",
    borderHover: "1px solid #475DE5",
    borderFocus: "1px solid #475DE5",
  },
  Layout: {
    color: "transparent",
    headerColor: "transparent",
  },
  List: {
    colorHover: "#F7FAFC",
    borderRadius: "4px",
  },
  Tag: {
    heightSmall: "24px",
    padding: "3px 8px",
    borderRadius: "4px",
  },
  Typography: {
    textColor: "#171A22",
    headerFontSize1: "18px",
    headerMargin1: "0",
  },
};

export default themeOverrides;
