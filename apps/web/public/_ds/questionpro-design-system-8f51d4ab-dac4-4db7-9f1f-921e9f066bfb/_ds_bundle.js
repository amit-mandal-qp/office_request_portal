/* @ds-bundle: {"format":3,"namespace":"QuestionProDesignSystem_8f51d4","components":[{"name":"Avatar","sourcePath":"components/avatar/Avatar.jsx"},{"name":"Button","sourcePath":"components/button/Button.jsx"},{"name":"Card","sourcePath":"components/card/Card.jsx"},{"name":"CardHeader","sourcePath":"components/card/Card.jsx"},{"name":"CardFooter","sourcePath":"components/card/Card.jsx"},{"name":"Chip","sourcePath":"components/chip/Chip.jsx"},{"name":"Input","sourcePath":"components/input/Input.jsx"},{"name":"Tabs","sourcePath":"components/tabs/Tabs.jsx"},{"name":"Toggle","sourcePath":"components/toggle/Toggle.jsx"}],"sourceHashes":{"components/avatar/Avatar.jsx":"993f711e70c9","components/button/Button.jsx":"9481a99957c6","components/card/Card.jsx":"0b51a8c194fc","components/chip/Chip.jsx":"05d5463c4b3b","components/input/Input.jsx":"18515754acab","components/tabs/Tabs.jsx":"b1f749e80273","components/toggle/Toggle.jsx":"f0f85c453fb6","ui_kits/survey_manager/app.jsx":"888481b05c17","ui_kits/survey_manager/data.js":"812248926852","ui_kits/survey_manager/primitives.jsx":"0f8864f8ef95"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.QuestionProDesignSystem_8f51d4 = window.QuestionProDesignSystem_8f51d4 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/avatar/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* QuestionPro — Avatar. Circular user marker with image or initials.
   Mirrors the avatar pattern used across WuActivityLog / WuAppHeader. */

const SIZES = {
  sm: 24,
  md: 36,
  lg: 48
};
function Avatar({
  name = "",
  src,
  size = "md",
  color = "var(--qp-dark-blue)",
  style,
  ...rest
}) {
  const px = SIZES[size] || (typeof size === "number" ? size : 36);
  const initials = name.split(" ").filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join("");
  return /*#__PURE__*/React.createElement("span", _extends({
    title: name || undefined,
    style: {
      width: px,
      height: px,
      borderRadius: "var(--radius-pill)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      flex: "none",
      background: src ? "var(--qp-gray-20)" : color,
      color: "#fff",
      fontFamily: "var(--font-sans)",
      fontWeight: "var(--font-weight-medium)",
      fontSize: px * 0.4,
      userSelect: "none",
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : initials || "?");
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/avatar/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/button/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* QuestionPro — Button (Wick UI WuButton). Primary action trigger.
   variant sets structure, color sets semantic intent, size sets density. */

const RADIUS = {
  default: "var(--radius-md)",
  rounded: "var(--radius-pill)",
  sharp: "0px"
};
const SIZES = {
  sm: {
    padding: "5px 12px",
    fontSize: "var(--font-button-sm)",
    minHeight: "28px"
  },
  md: {
    padding: "8px 16px",
    fontSize: "var(--font-button-md)",
    minHeight: "36px"
  },
  mobile: {
    padding: "11px 20px",
    fontSize: "var(--font-button-lg)",
    minHeight: "44px"
  }
};
const PALETTE = {
  primary: {
    bg: "var(--qp-electric-blue)",
    fg: "#fff",
    hover: "#1670c2"
  },
  error: {
    bg: "var(--qp-error-deep)",
    fg: "#fff",
    hover: "#a30000"
  },
  upgrade: {
    bg: "var(--qp-upgrade)",
    fg: "#3d2a00",
    hover: "var(--qp-upgrade-hover)"
  },
  neutral: {
    bg: "var(--qp-gray-20)",
    fg: "var(--qp-gray-lead)",
    hover: "var(--qp-gray-25)"
  },
  deep: {
    bg: "var(--qp-dark-blue)",
    fg: "#fff",
    hover: "#142562"
  }
};
function Button({
  children,
  variant = "primary",
  color = "primary",
  size = "md",
  shape = "default",
  Icon,
  iconPosition = "left",
  iconOnly = false,
  loading = false,
  selected = false,
  disabled = false,
  floating = false,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const pal = PALETTE[color] || PALETTE.primary;
  const sz = SIZES[size] || SIZES.md;
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontFamily: "var(--font-sans)",
    fontWeight: "var(--font-weight-regular)",
    lineHeight: 1,
    borderRadius: RADIUS[shape],
    cursor: disabled || loading ? "not-allowed" : "pointer",
    transition: "background .15s ease, color .15s ease, box-shadow .15s ease",
    border: "1px solid transparent",
    userSelect: "none",
    opacity: disabled ? 0.5 : 1,
    ...sz,
    ...(iconOnly ? {
      padding: 0,
      width: sz.minHeight,
      aspectRatio: "1 / 1"
    } : null)
  };
  let look;
  if (variant === "secondary") {
    look = {
      background: hover ? "var(--qp-gray-25)" : "var(--qp-gray-10)",
      color: pal.bg,
      border: "1px solid transparent"
    };
  } else if (variant === "outline" || variant === "outlined") {
    look = {
      background: hover ? "var(--qp-gray-10)" : "transparent",
      color: pal.bg,
      border: `1px solid var(--border-default)`
    };
  } else if (variant === "link") {
    look = {
      background: "transparent",
      color: pal.bg,
      textDecoration: hover ? "underline" : "none",
      padding: 0,
      minHeight: "auto",
      border: "none"
    };
  } else {
    look = {
      background: selected ? pal.hover : hover ? pal.hover : pal.bg,
      color: pal.fg
    };
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled || loading,
    "aria-busy": loading || undefined,
    "aria-pressed": selected || undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      ...base,
      ...look,
      ...(floating ? {
        boxShadow: "var(--shadow-md)"
      } : null),
      ...style
    }
  }, rest), loading && /*#__PURE__*/React.createElement("span", {
    className: "wm-progress-activity",
    style: {
      animation: "qp-spin 1s linear infinite"
    }
  }), !loading && Icon && iconPosition === "left" && Icon, !iconOnly && children, !loading && Icon && iconPosition === "right" && Icon, /*#__PURE__*/React.createElement("style", null, `@keyframes qp-spin{to{transform:rotate(360deg)}}`));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/button/Button.jsx", error: String((e && e.message) || e) }); }

// components/card/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* QuestionPro — Card (Wick UI WuCard). Quiet surface container: white,
   1px border, soft radius. Compose with CardHeader / CardFooter. */

function Card({
  children,
  rounded = false,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const interactive = !!onClick;
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-default)",
      borderRadius: rounded ? "var(--radius-lg)" : "var(--radius-md)",
      overflow: "hidden",
      fontFamily: "var(--font-sans)",
      color: "var(--text-body)",
      cursor: interactive ? "pointer" : "default",
      boxShadow: interactive && hover ? "var(--shadow-md)" : "none",
      transition: "box-shadow .15s ease",
      ...style
    }
  }, rest), children);
}
function CardHeader({
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      padding: "14px 16px",
      borderBottom: "1px solid var(--border-subtle)",
      fontSize: "var(--font-heading-04)",
      fontWeight: "var(--font-weight-medium)",
      color: "var(--text-strong)",
      ...style
    }
  }, rest), children);
}
function CardFooter({
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      padding: "12px 16px",
      borderTop: "1px solid var(--border-subtle)",
      background: "var(--surface-subtle)",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card, CardHeader, CardFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/card/Card.jsx", error: String((e && e.message) || e) }); }

// components/chip/Chip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* QuestionPro — Chip (Wick UI WuChip). Compact label / token, optionally
   selectable or closeable. Use color for status semantics. */

const SIZES = {
  sm: {
    fontSize: "11px",
    padding: "2px 8px",
    height: "20px"
  },
  md: {
    fontSize: "12px",
    padding: "3px 10px",
    height: "24px"
  },
  lg: {
    fontSize: "14px",
    padding: "5px 12px",
    height: "30px"
  }
};
const COLORS = {
  success: {
    bg: "var(--qp-success-soft)",
    fg: "var(--qp-success-deep)"
  },
  warning: {
    bg: "var(--qp-warning-soft)",
    fg: "var(--qp-warning-deep)"
  },
  danger: {
    bg: "var(--qp-error-soft)",
    fg: "var(--qp-error-deep)"
  }
};
function Chip({
  children,
  variant = "primary",
  size = "md",
  shape = "default",
  color,
  selected = false,
  disabled = false,
  onClose,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const sz = SIZES[size] || SIZES.md;
  let look;
  if (color && COLORS[color]) {
    look = COLORS[color];
  } else if (variant === "secondary") {
    look = {
      bg: "transparent",
      fg: "var(--qp-gray-lead)",
      border: "1px solid var(--border-default)"
    };
  } else {
    look = {
      bg: selected ? "var(--qp-electric-blue)" : "var(--qp-gray-10)",
      fg: selected ? "#fff" : "var(--qp-gray-lead)"
    };
  }
  const clickable = !!onClick && !disabled;
  return /*#__PURE__*/React.createElement("span", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: clickable ? onClick : undefined,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      maxWidth: "160px",
      fontFamily: "var(--font-sans)",
      fontWeight: "var(--font-weight-medium)",
      borderRadius: shape === "rounded" ? "var(--radius-pill)" : "var(--radius-sm)",
      background: look.bg,
      color: look.fg,
      border: look.border || "1px solid transparent",
      cursor: clickable ? "pointer" : "default",
      opacity: disabled ? 0.5 : 1,
      filter: clickable && hover ? "brightness(0.96)" : "none",
      transition: "filter .15s ease",
      ...sz,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, children), onClose && /*#__PURE__*/React.createElement("span", {
    className: "wm-check",
    onClick: e => {
      e.stopPropagation();
      if (!disabled) onClose();
    },
    "aria-label": "Remove",
    style: {
      fontSize: "1em",
      cursor: "pointer",
      lineHeight: 1
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/chip/Chip.jsx", error: String((e && e.message) || e) }); }

// components/input/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* QuestionPro — Input (Wick UI WuInput). Text field with optional label,
   icon, and validation. variant flat (default) or outlined. */

const VARIANTS = {
  flat: {
    background: "var(--qp-gray-10)",
    border: "1px solid transparent"
  },
  outlined: {
    background: "#fff",
    border: "1px solid var(--border-default)"
  },
  standard: {
    background: "#fff",
    border: "1px solid var(--border-default)"
  }
};
function Input({
  Label,
  labelPosition = "top",
  variant = "flat",
  Icon,
  iconPosition = "left",
  invalid = false,
  disabled = false,
  readonly = false,
  required = false,
  style,
  id,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const v = VARIANTS[variant] || VARIANTS.flat;
  const inputId = id || React.useId();
  const field = /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "0 12px",
      height: "36px",
      borderRadius: "var(--radius-sm)",
      background: v.background,
      border: invalid ? "1px solid var(--qp-error-deep)" : v.border,
      boxShadow: focus && !invalid ? "var(--focus-ring)" : "none",
      transition: "box-shadow .15s ease, border-color .15s ease",
      opacity: disabled ? 0.5 : 1
    }
  }, Icon && iconPosition === "left" && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)",
      display: "flex"
    }
  }, Icon), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    disabled: disabled,
    readOnly: readonly,
    required: required,
    "aria-invalid": invalid || undefined,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      border: "none",
      outline: "none",
      background: "transparent",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--font-subtitle-03)",
      color: "var(--text-strong)",
      minWidth: 0
    }
  }, rest)), Icon && iconPosition === "right" && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)",
      display: "flex"
    }
  }, Icon));
  if (!Label) return /*#__PURE__*/React.createElement("div", {
    style: style
  }, field);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: labelPosition === "left" ? "row" : "column",
      alignItems: labelPosition === "left" ? "center" : "stretch",
      gap: labelPosition === "left" ? "12px" : "6px",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontSize: "var(--font-subtitle-02)",
      fontWeight: "var(--font-weight-medium)",
      color: "var(--text-strong)"
    }
  }, Label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--qp-error-deep)"
    }
  }, " *")), field);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/input/Input.jsx", error: String((e && e.message) || e) }); }

// components/tabs/Tabs.jsx
try { (() => {
/* QuestionPro — Tabs (Wick UI WuTab). Horizontal segmented navigation with
   an underline indicator on the active tab. */

function Tabs({
  items = [],
  value,
  defaultValue,
  onValueChange,
  style
}) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? items[0]?.value);
  const active = isControlled ? value : internal;
  const select = v => {
    if (!isControlled) setInternal(v);
    onValueChange && onValueChange(v);
  };
  const current = items.find(i => i.value === active);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: "flex",
      gap: "4px",
      borderBottom: "1px solid var(--border-subtle)"
    }
  }, items.map(it => {
    const on = it.value === active;
    return /*#__PURE__*/React.createElement("button", {
      key: it.value,
      role: "tab",
      "aria-selected": on,
      onClick: () => select(it.value),
      style: {
        appearance: "none",
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "10px 14px",
        fontFamily: "inherit",
        fontSize: "var(--font-subtitle-02)",
        fontWeight: "var(--font-weight-medium)",
        color: on ? "var(--qp-electric-blue)" : "var(--text-body)",
        borderBottom: on ? "2px solid var(--qp-electric-blue)" : "2px solid transparent",
        marginBottom: "-1px",
        transition: "color .15s ease"
      }
    }, it.Trigger ?? it.label);
  })), current?.Content !== undefined && /*#__PURE__*/React.createElement("div", {
    role: "tabpanel",
    style: {
      paddingTop: "16px"
    }
  }, current.Content));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/tabs/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/toggle/Toggle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* QuestionPro — Toggle (Wick UI WuToggle). On/off switch with optional label. */

function Toggle({
  checked,
  defaultChecked = false,
  onChange,
  Label,
  labelPosition = "right",
  disabled = false,
  style,
  ...rest
}) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(defaultChecked);
  const on = isControlled ? checked : internal;
  const toggle = () => {
    if (disabled) return;
    if (!isControlled) setInternal(!on);
    onChange && onChange(!on);
  };
  const sw = /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    role: "switch",
    "aria-checked": on,
    disabled: disabled,
    onClick: toggle,
    style: {
      width: "36px",
      height: "20px",
      borderRadius: "var(--radius-pill)",
      border: "none",
      padding: "2px",
      background: on ? "var(--qp-electric-blue)" : "var(--qp-gray-40)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      transition: "background .2s ease",
      display: "inline-flex",
      alignItems: "center"
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: "16px",
      height: "16px",
      borderRadius: "var(--radius-pill)",
      background: "#fff",
      boxShadow: "var(--shadow-xs)",
      transform: on ? "translateX(16px)" : "translateX(0)",
      transition: "transform .2s ease"
    }
  }));
  if (!Label) return sw;
  const reverse = labelPosition === "left";
  const column = labelPosition === "top";
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      flexDirection: column ? "column" : reverse ? "row-reverse" : "row",
      alignItems: column ? "flex-start" : "center",
      gap: "8px",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--font-subtitle-02)",
      color: "var(--text-strong)",
      cursor: disabled ? "not-allowed" : "pointer",
      ...style
    }
  }, sw, /*#__PURE__*/React.createElement("span", null, Label));
}
Object.assign(__ds_scope, { Toggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/toggle/Toggle.jsx", error: String((e && e.message) || e) }); }

// ui_kits/survey_manager/app.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* QuestionPro Survey Manager — app shell + Surveys screen + create modal. */
const {
  Button,
  Chip,
  Avatar,
  Input,
  Select
} = window.QPUI;
const D = window.QP_DATA;
function AppHeader() {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      background: "var(--qp-dark-blue)",
      color: "#fff",
      height: 52,
      display: "flex",
      alignItems: "center",
      padding: "0 16px",
      gap: 16,
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      background: "none",
      border: "none",
      color: "#fff",
      display: "flex",
      cursor: "pointer",
      padding: 6
    },
    "aria-label": "Products"
  }, /*#__PURE__*/React.createElement("span", {
    className: "wm-home",
    style: {
      fontSize: 22
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 19,
      fontWeight: 500
    }
  }, "Question", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--qp-electric-blue)"
    }
  }, "Pro")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      opacity: 0.7,
      fontWeight: 500
    }
  }, "Survey")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      background: "rgba(255,255,255,.12)",
      borderRadius: "var(--radius-sm)",
      padding: "0 10px",
      height: 32,
      width: 220
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "wm-search",
    style: {
      fontSize: 18,
      opacity: 0.8
    }
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Search",
    style: {
      flex: 1,
      background: "transparent",
      border: "none",
      outline: "none",
      color: "#fff",
      fontFamily: "var(--font-sans)",
      fontSize: 13
    }
  })), /*#__PURE__*/React.createElement(Button, {
    color: "upgrade",
    shape: "rounded",
    size: "sm"
  }, "Upgrade now"), /*#__PURE__*/React.createElement("span", {
    className: "wm-help",
    style: {
      fontSize: 20,
      opacity: 0.85,
      cursor: "pointer"
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "wm-notifications",
    style: {
      fontSize: 20,
      opacity: 0.85,
      cursor: "pointer"
    }
  }), /*#__PURE__*/React.createElement(Avatar, {
    name: "Alex Turner",
    size: 30,
    color: "var(--qp-electric-blue)"
  }));
}
function StatCard({
  label,
  value,
  sub
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-md)",
      padding: "16px 18px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--font-body-03)",
      color: "var(--text-muted)",
      marginBottom: 4
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--font-display-02)",
      fontWeight: 400,
      color: "var(--text-strong)",
      lineHeight: 1.1
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--font-body-03)",
      color: "var(--text-muted)",
      marginTop: 2
    }
  }, sub));
}
function IconBtn({
  icon,
  danger,
  onClick,
  label
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    "aria-label": label,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      width: 30,
      height: 30,
      display: "grid",
      placeItems: "center",
      borderRadius: "var(--radius-sm)",
      border: "none",
      cursor: "pointer",
      background: h ? danger ? "var(--qp-error-soft)" : "#dbe9fb" : "var(--qp-gray-10)",
      color: h ? danger ? "var(--qp-error-deep)" : "var(--qp-electric-blue)" : "var(--qp-gray-100)",
      transition: "all .12s"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: icon,
    style: {
      fontSize: 17
    }
  }));
}
const TABS = [{
  value: "all",
  label: "All surveys"
}, {
  value: "active",
  label: "Active"
}, {
  value: "drafts",
  label: "Drafts"
}, {
  value: "archived",
  label: "Archived"
}];
function CreateModal({
  open,
  onClose,
  onCreate
}) {
  const [name, setName] = React.useState("");
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(26,32,44,.45)",
      display: "grid",
      placeItems: "center",
      zIndex: 50
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: 520,
      background: "#fff",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-lg)",
      overflow: "hidden",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 20px",
      borderBottom: "1px solid var(--border-subtle)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--font-heading-03)",
      fontWeight: 500,
      color: "var(--text-strong)"
    }
  }, "Create new survey"), /*#__PURE__*/React.createElement("span", {
    className: "wm-check",
    onClick: onClose,
    style: {
      cursor: "pointer",
      color: "var(--text-muted)",
      fontSize: 20
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    Label: "Survey name",
    placeholder: "e.g. Customer Satisfaction Q1",
    value: name,
    onChange: e => setName(e.target.value)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: "var(--font-subtitle-02)",
      fontWeight: 500,
      color: "var(--text-strong)"
    }
  }, "Category"), /*#__PURE__*/React.createElement(Select, {
    placeholder: "Select a category"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 20px",
      borderTop: "1px solid var(--border-subtle)",
      background: "var(--surface-subtle)",
      display: "flex",
      justifyContent: "flex-end",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: onClose
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
    onClick: () => {
      onCreate(name || "Untitled survey");
      setName("");
    }
  }, "Create survey"))));
}
function SurveysScreen() {
  const [rows, setRows] = React.useState(D.surveys);
  const [tab, setTab] = React.useState("all");
  const [search, setSearch] = React.useState("");
  const [modal, setModal] = React.useState(false);
  const filtered = rows.filter(s => {
    if (tab === "active" && s.status !== "Active") return false;
    if (tab === "drafts" && s.status !== "Draft") return false;
    if (tab === "archived" && s.status !== "Archived") return false;
    if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });
  const addSurvey = name => {
    setRows([{
      id: String(Date.now()),
      name,
      status: "Draft",
      responses: 0,
      completion: "—",
      created: "Just now",
      owner: "You"
    }, ...rows]);
    setModal(false);
  };
  const th = {
    textAlign: "left",
    fontSize: "var(--font-body-03)",
    fontWeight: 400,
    color: "var(--text-muted)",
    padding: "10px 14px",
    borderBottom: "1px solid var(--border-subtle)",
    textTransform: "none"
  };
  const td = {
    fontSize: "var(--font-body-02)",
    color: "var(--text-body)",
    padding: "11px 14px",
    borderBottom: "1px solid var(--border-subtle)"
  };
  return /*#__PURE__*/React.createElement("main", {
    style: {
      maxWidth: 1120,
      margin: "0 auto",
      padding: "28px 24px 48px",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: 16,
      flexWrap: "wrap",
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--font-heading-01)",
      fontWeight: 400,
      color: "var(--text-strong)",
      margin: 0
    }
  }, "Surveys"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--font-body-02)",
      color: "var(--text-muted)",
      margin: "4px 0 0"
    }
  }, "Manage and track all your surveys in one place")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    Icon: /*#__PURE__*/React.createElement("span", {
      className: "wm-file-download",
      style: {
        fontSize: 18
      }
    })
  }, "Export results"), /*#__PURE__*/React.createElement(Button, {
    Icon: /*#__PURE__*/React.createElement("span", {
      className: "wm-edit",
      style: {
        fontSize: 18
      }
    }),
    onClick: () => setModal(true)
  }, "Create survey"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 16,
      marginBottom: 24
    }
  }, D.stats.map(s => /*#__PURE__*/React.createElement(StatCard, _extends({
    key: s.label
  }, s)))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      padding: "0 16px",
      borderBottom: "1px solid var(--border-subtle)"
    }
  }, TABS.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.value,
    onClick: () => setTab(t.value),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: "14px 12px",
      fontFamily: "inherit",
      fontSize: "var(--font-subtitle-02)",
      fontWeight: 500,
      color: tab === t.value ? "var(--qp-electric-blue)" : "var(--text-body)",
      whiteSpace: "nowrap",
      borderBottom: tab === t.value ? "2px solid var(--qp-electric-blue)" : "2px solid transparent",
      marginBottom: -1
    }
  }, t.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      marginBottom: 16,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    variant: "outlined",
    Icon: /*#__PURE__*/React.createElement("span", {
      className: "wm-search",
      style: {
        fontSize: 18
      }
    }),
    placeholder: "Search surveys...",
    value: search,
    onChange: e => setSearch(e.target.value),
    style: {
      flex: 1,
      minWidth: 220
    }
  }), /*#__PURE__*/React.createElement(Select, {
    placeholder: "All statuses",
    style: {
      width: 160
    }
  }), /*#__PURE__*/React.createElement(Select, {
    placeholder: "All owners",
    style: {
      width: 160
    }
  })), /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    style: th
  }, "Survey name"), /*#__PURE__*/React.createElement("th", {
    style: th
  }, "Status"), /*#__PURE__*/React.createElement("th", {
    style: {
      ...th,
      textAlign: "right"
    }
  }, "Responses"), /*#__PURE__*/React.createElement("th", {
    style: {
      ...th,
      textAlign: "right"
    }
  }, "Completion"), /*#__PURE__*/React.createElement("th", {
    style: th
  }, "Owner"), /*#__PURE__*/React.createElement("th", {
    style: th
  }, "Created"), /*#__PURE__*/React.createElement("th", {
    style: th
  }))), /*#__PURE__*/React.createElement("tbody", null, filtered.map(s => /*#__PURE__*/React.createElement("tr", {
    key: s.id
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      ...td,
      fontWeight: 500,
      color: "var(--text-strong)"
    }
  }, s.name), /*#__PURE__*/React.createElement("td", {
    style: td
  }, /*#__PURE__*/React.createElement(Chip, {
    color: D.statusColor[s.status],
    size: "sm"
  }, s.status)), /*#__PURE__*/React.createElement("td", {
    style: {
      ...td,
      textAlign: "right",
      fontVariantNumeric: "tabular-nums"
    }
  }, s.responses.toLocaleString()), /*#__PURE__*/React.createElement("td", {
    style: {
      ...td,
      textAlign: "right"
    }
  }, s.completion), /*#__PURE__*/React.createElement("td", {
    style: td
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: s.owner === "You" ? "You" : s.owner,
    size: 24
  }), s.owner)), /*#__PURE__*/React.createElement("td", {
    style: {
      ...td,
      color: "var(--text-muted)",
      fontSize: "var(--font-body-03)"
    }
  }, s.created), /*#__PURE__*/React.createElement("td", {
    style: {
      ...td,
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      gap: 6,
      justifyContent: "flex-end"
    }
  }, /*#__PURE__*/React.createElement(IconBtn, {
    icon: "wm-edit",
    label: "Edit survey"
  }), /*#__PURE__*/React.createElement(IconBtn, {
    icon: "wm-delete",
    danger: true,
    label: "Delete survey",
    onClick: () => setRows(rows.filter(r => r.id !== s.id))
  }))))))), filtered.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "48px 0",
      textAlign: "center",
      color: "var(--text-muted)",
      fontSize: "var(--font-body-02)"
    }
  }, "No surveys match your filters"))), /*#__PURE__*/React.createElement(CreateModal, {
    open: modal,
    onClose: () => setModal(false),
    onCreate: addSurvey
  }));
}
function App() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: "var(--surface-subtle)"
    }
  }, /*#__PURE__*/React.createElement(AppHeader, null), /*#__PURE__*/React.createElement(SurveysScreen, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/survey_manager/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/survey_manager/data.js
try { (() => {
/* QuestionPro Survey Manager — mock data for the UI kit. */
window.QP_DATA = {
  stats: [{
    label: "Total surveys",
    value: "6",
    sub: "across all workspaces"
  }, {
    label: "Active surveys",
    value: "3",
    sub: "collecting responses"
  }, {
    label: "Total responses",
    value: "1,923",
    sub: "this month"
  }, {
    label: "Avg. completion",
    value: "74%",
    sub: "last 30 days"
  }],
  surveys: [{
    id: "1",
    name: "Customer Satisfaction Q4",
    status: "Active",
    responses: 1284,
    completion: "68%",
    created: "Dec 1, 2024",
    owner: "Sarah Chen"
  }, {
    id: "2",
    name: "Employee Engagement 2025",
    status: "Active",
    responses: 342,
    completion: "91%",
    created: "Jan 3, 2025",
    owner: "Mark Davis"
  }, {
    id: "3",
    name: "Product Feedback — Beta",
    status: "Draft",
    responses: 0,
    completion: "—",
    created: "Jan 10, 2025",
    owner: "You"
  }, {
    id: "4",
    name: "NPS January Wave",
    status: "Scheduled",
    responses: 0,
    completion: "—",
    created: "Jan 12, 2025",
    owner: "You"
  }, {
    id: "5",
    name: "Onboarding Experience",
    status: "Active",
    responses: 87,
    completion: "54%",
    created: "Nov 20, 2024",
    owner: "Priya Nair"
  }, {
    id: "6",
    name: "Exit Interview 2024",
    status: "Archived",
    responses: 210,
    completion: "88%",
    created: "Oct 5, 2024",
    owner: "Mark Davis"
  }],
  // Wick UI status → Chip color
  statusColor: {
    Active: "success",
    Draft: undefined,
    Archived: "danger",
    Scheduled: "warning"
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/survey_manager/data.js", error: String((e && e.message) || e) }); }

// ui_kits/survey_manager/primitives.jsx
try { (() => {
/* QuestionPro Survey Manager — lightweight UI primitives for the kit.
   These mirror the design-system components (Button, Chip, Input, Avatar,
   Select). In production, import the real components from the Wick UI bundle
   instead of these cosmetic copies. */

const Button = ({
  children,
  variant = "primary",
  color = "primary",
  size = "md",
  shape = "default",
  Icon,
  iconOnly,
  onClick,
  style
}) => {
  const [h, setH] = React.useState(false);
  const pal = {
    primary: ["var(--qp-electric-blue)", "#fff", "#1670c2"],
    error: ["var(--qp-error-deep)", "#fff", "#a30000"],
    upgrade: ["var(--qp-upgrade)", "#3d2a00", "var(--qp-upgrade-hover)"],
    deep: ["var(--qp-dark-blue)", "#fff", "#142562"]
  }[color] || ["var(--qp-electric-blue)", "#fff", "#1670c2"];
  const sz = {
    sm: ["5px 12px", "var(--font-button-sm)", 28],
    md: ["8px 16px", "var(--font-button-md)", 36]
  }[size] || ["8px 16px", "var(--font-button-md)", 36];
  let look;
  if (variant === "secondary") look = {
    background: h ? "var(--qp-gray-25)" : "var(--qp-gray-10)",
    color: pal[0]
  };else if (variant === "outline") look = {
    background: h ? "var(--qp-gray-10)" : "transparent",
    color: pal[0],
    border: "1px solid var(--border-default)"
  };else if (variant === "link") look = {
    background: "transparent",
    color: pal[0],
    padding: 0
  };else look = {
    background: h ? pal[2] : pal[0],
    color: pal[1]
  };
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      fontFamily: "var(--font-sans)",
      fontWeight: 400,
      borderRadius: shape === "rounded" ? "var(--radius-pill)" : "var(--radius-md)",
      border: "1px solid transparent",
      cursor: "pointer",
      padding: iconOnly ? 0 : sz[0],
      fontSize: sz[1],
      minHeight: sz[2],
      width: iconOnly ? sz[2] : undefined,
      whiteSpace: "nowrap",
      transition: "background .15s, color .15s",
      ...look,
      ...style
    }
  }, Icon, !iconOnly && children);
};
const Chip = ({
  children,
  color,
  size = "md"
}) => {
  const c = {
    success: ["var(--qp-success-soft)", "var(--qp-success-deep)"],
    warning: ["var(--qp-warning-soft)", "var(--qp-warning-deep)"],
    danger: ["var(--qp-error-soft)", "var(--qp-error-deep)"]
  }[color] || ["var(--qp-gray-10)", "var(--qp-gray-lead)"];
  const sz = {
    sm: ["11px", "2px 8px"],
    md: ["12px", "3px 10px"]
  }[size] || ["12px", "3px 10px"];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      fontFamily: "var(--font-sans)",
      fontWeight: 500,
      borderRadius: "var(--radius-sm)",
      background: c[0],
      color: c[1],
      fontSize: sz[0],
      padding: sz[1]
    }
  }, children);
};
const Avatar = ({
  name = "",
  src,
  size = 28,
  color = "var(--qp-dark-blue)"
}) => {
  const initials = name.split(" ").filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join("");
  return /*#__PURE__*/React.createElement("span", {
    title: name,
    style: {
      width: size,
      height: size,
      borderRadius: "var(--radius-pill)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      flex: "none",
      background: src ? "var(--qp-gray-20)" : color,
      color: "#fff",
      fontFamily: "var(--font-sans)",
      fontWeight: 500,
      fontSize: size * 0.4
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : initials || "?");
};
const Input = ({
  value,
  onChange,
  placeholder,
  Icon,
  variant = "outlined",
  Label,
  style
}) => {
  const [f, setF] = React.useState(false);
  const field = /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "0 12px",
      height: 36,
      borderRadius: "var(--radius-sm)",
      background: variant === "flat" ? "var(--qp-gray-10)" : "#fff",
      border: variant === "flat" ? "1px solid transparent" : "1px solid var(--border-default)",
      boxShadow: f ? "var(--focus-ring)" : "none",
      transition: "box-shadow .15s"
    }
  }, Icon && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)",
      display: "flex"
    }
  }, Icon), /*#__PURE__*/React.createElement("input", {
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    onFocus: () => setF(true),
    onBlur: () => setF(false),
    style: {
      flex: 1,
      border: "none",
      outline: "none",
      background: "transparent",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--font-subtitle-03)",
      color: "var(--text-strong)",
      minWidth: 0
    }
  }));
  if (!Label) return /*#__PURE__*/React.createElement("div", {
    style: style
  }, field);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      ...style
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: "var(--font-subtitle-02)",
      fontWeight: 500,
      color: "var(--text-strong)"
    }
  }, Label), field);
};
const Select = ({
  value,
  placeholder,
  style
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    padding: "0 12px",
    height: 36,
    borderRadius: "var(--radius-sm)",
    background: "#fff",
    border: "1px solid var(--border-default)",
    fontFamily: "var(--font-sans)",
    fontSize: "var(--font-subtitle-03)",
    color: value ? "var(--text-strong)" : "var(--text-muted)",
    cursor: "pointer",
    whiteSpace: "nowrap",
    ...style
  }
}, /*#__PURE__*/React.createElement("span", null, value || placeholder), /*#__PURE__*/React.createElement("span", {
  className: "wm-arrow-forward-ios",
  style: {
    fontSize: 14,
    color: "var(--text-muted)",
    transform: "rotate(90deg)"
  }
}));
Object.assign(window, {
  QPUI: {
    Button,
    Chip,
    Avatar,
    Input,
    Select
  }
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/survey_manager/primitives.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CardHeader = __ds_scope.CardHeader;

__ds_ns.CardFooter = __ds_scope.CardFooter;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Toggle = __ds_scope.Toggle;

})();
