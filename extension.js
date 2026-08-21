const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

const SHARED = ["class", "width", "height", "min-width", "min-height", "max-width", "max-height", "padding", "padding-x", "padding-y", "padding-top", "padding-right", "padding-bottom", "padding-left", "margin", "margin-x", "margin-y", "margin-top", "margin-right", "margin-bottom", "margin-left", "gap", "flex", "flex-grow", "flex-shrink", "align-items", "align-self", "justify-content", "center", "fill", "safe-area", "bg", "border-radius", "border-width", "border-color", "opacity", "elevation", "hidden", "a11y-label", "a11y-hint", "@press", "@doubleTap", "@longPress"];
const COMPONENTS = {
  "accordion": [
    "expanded",
    "a11y-label",
    "a11y-hint",
    "@change",
    "class"
  ],
  "accordion-header": [
    "a11y-label",
    "a11y-hint",
    "class"
  ],
  "accordion-content": [
    "a11y-label",
    "a11y-hint",
    "class"
  ],
  "activity-indicator": [
    "class",
    "width",
    "height",
    "min-width",
    "min-height",
    "max-width",
    "max-height",
    "padding",
    "padding-x",
    "padding-y",
    "padding-top",
    "padding-right",
    "padding-bottom",
    "padding-left",
    "margin",
    "margin-x",
    "margin-y",
    "margin-top",
    "margin-right",
    "margin-bottom",
    "margin-left",
    "gap",
    "flex",
    "flex-grow",
    "flex-shrink",
    "align-items",
    "align-self",
    "justify-content",
    "center",
    "fill",
    "safe-area",
    "bg",
    "border-radius",
    "border-width",
    "border-color",
    "opacity",
    "elevation",
    "hidden",
    "a11y-label",
    "a11y-hint",
    "@press",
    "@doubleTap",
    "@longPress",
    "size",
    "color"
  ],
  "badge": [
    "count",
    "label",
    "variant",
    "a11y-label",
    "class"
  ],
  "bottom-nav": [
    "label-visibility",
    "dark",
    "active-color",
    "background-color",
    "text-color",
    "font-name",
    "minimize-on-scroll",
    "custom",
    "class"
  ],
  "bottom-nav-item": [
    "id",
    "icon",
    "ios-icon",
    "android-icon",
    "ios",
    "android",
    "material-variant",
    "label",
    "url",
    "active",
    "badge",
    "news",
    "class"
  ],
  "bottom-sheet": [
    "visible",
    "detents",
    "a11y-label",
    "a11y-hint",
    "@dismiss",
    "class"
  ],
  "button": [
    "label",
    "variant",
    "size",
    "icon",
    "ios-icon",
    "android-icon",
    "iosIcon",
    "androidIcon",
    "ios",
    "android",
    "icon-trailing",
    "ios-icon-trailing",
    "android-icon-trailing",
    "font",
    "line-height",
    "line-height-px",
    "disabled",
    "loading",
    "a11y-label",
    "a11y-hint",
    "menu",
    "@press",
    "class"
  ],
  "button-group": [
    "options",
    "value",
    "selected-index",
    "disabled",
    "sync-mode",
    "a11y-label",
    "a11y-hint",
    "native:model",
    "@change",
    "class"
  ],
  "canvas": [
    "class",
    "width",
    "height",
    "min-width",
    "min-height",
    "max-width",
    "max-height",
    "padding",
    "padding-x",
    "padding-y",
    "padding-top",
    "padding-right",
    "padding-bottom",
    "padding-left",
    "margin",
    "margin-x",
    "margin-y",
    "margin-top",
    "margin-right",
    "margin-bottom",
    "margin-left",
    "gap",
    "flex",
    "flex-grow",
    "flex-shrink",
    "align-items",
    "align-self",
    "justify-content",
    "center",
    "fill",
    "safe-area",
    "bg",
    "border-radius",
    "border-width",
    "border-color",
    "opacity",
    "elevation",
    "hidden",
    "a11y-label",
    "a11y-hint",
    "@press",
    "@doubleTap",
    "@longPress"
  ],
  "carousel": [
    "item-width",
    "item-spacing",
    "variant",
    "a11y-label",
    "a11y-hint",
    "class"
  ],
  "checkbox": [
    "value",
    "label",
    "disabled",
    "sync-mode",
    "debounce-ms",
    "a11y-label",
    "a11y-hint",
    "native:model",
    "@change",
    "class"
  ],
  "chip": [
    "label",
    "selected",
    "value",
    "icon",
    "ios-icon",
    "android-icon",
    "iosIcon",
    "androidIcon",
    "ios",
    "android",
    "disabled",
    "a11y-label",
    "a11y-hint",
    "native:model",
    "@change",
    "class"
  ],
  "column": [
    "class",
    "width",
    "height",
    "min-width",
    "min-height",
    "max-width",
    "max-height",
    "padding",
    "padding-x",
    "padding-y",
    "padding-top",
    "padding-right",
    "padding-bottom",
    "padding-left",
    "margin",
    "margin-x",
    "margin-y",
    "margin-top",
    "margin-right",
    "margin-bottom",
    "margin-left",
    "gap",
    "flex",
    "flex-grow",
    "flex-shrink",
    "align-items",
    "align-self",
    "justify-content",
    "center",
    "fill",
    "safe-area",
    "bg",
    "border-radius",
    "border-width",
    "border-color",
    "opacity",
    "elevation",
    "hidden",
    "a11y-label",
    "a11y-hint",
    "@press",
    "@doubleTap",
    "@longPress"
  ],
  "divider": [
    "class",
    "width",
    "height",
    "min-width",
    "min-height",
    "max-width",
    "max-height",
    "padding",
    "padding-x",
    "padding-y",
    "padding-top",
    "padding-right",
    "padding-bottom",
    "padding-left",
    "margin",
    "margin-x",
    "margin-y",
    "margin-top",
    "margin-right",
    "margin-bottom",
    "margin-left",
    "gap",
    "flex",
    "flex-grow",
    "flex-shrink",
    "align-items",
    "align-self",
    "justify-content",
    "center",
    "fill",
    "safe-area",
    "bg",
    "border-radius",
    "border-width",
    "border-color",
    "opacity",
    "elevation",
    "hidden",
    "a11y-label",
    "a11y-hint",
    "@press",
    "@doubleTap",
    "@longPress"
  ],
  "horizontal-divider": [
    "class",
    "width",
    "height",
    "min-width",
    "min-height",
    "max-width",
    "max-height",
    "padding",
    "padding-x",
    "padding-y",
    "padding-top",
    "padding-right",
    "padding-bottom",
    "padding-left",
    "margin",
    "margin-x",
    "margin-y",
    "margin-top",
    "margin-right",
    "margin-bottom",
    "margin-left",
    "gap",
    "flex",
    "flex-grow",
    "flex-shrink",
    "align-items",
    "align-self",
    "justify-content",
    "center",
    "fill",
    "safe-area",
    "bg",
    "border-radius",
    "border-width",
    "border-color",
    "opacity",
    "elevation",
    "hidden",
    "a11y-label",
    "a11y-hint",
    "@press",
    "@doubleTap",
    "@longPress"
  ],
  "fab": [
    "icon",
    "ios-icon",
    "android-icon",
    "ios",
    "android",
    "label",
    "@press",
    "a11y-label",
    "a11y-hint",
    "class"
  ],
  "gesture-area": [
    "pan-y",
    "class"
  ],
  "icon": [
    "class",
    "width",
    "height",
    "min-width",
    "min-height",
    "max-width",
    "max-height",
    "padding",
    "padding-x",
    "padding-y",
    "padding-top",
    "padding-right",
    "padding-bottom",
    "padding-left",
    "margin",
    "margin-x",
    "margin-y",
    "margin-top",
    "margin-right",
    "margin-bottom",
    "margin-left",
    "gap",
    "flex",
    "flex-grow",
    "flex-shrink",
    "align-items",
    "align-self",
    "justify-content",
    "center",
    "fill",
    "safe-area",
    "bg",
    "border-radius",
    "border-width",
    "border-color",
    "opacity",
    "elevation",
    "hidden",
    "a11y-label",
    "a11y-hint",
    "@press",
    "@doubleTap",
    "@longPress",
    "name",
    "ios",
    "android",
    "size",
    "color",
    "dark-color"
  ],
  "image": [
    "class",
    "width",
    "height",
    "min-width",
    "min-height",
    "max-width",
    "max-height",
    "padding",
    "padding-x",
    "padding-y",
    "padding-top",
    "padding-right",
    "padding-bottom",
    "padding-left",
    "margin",
    "margin-x",
    "margin-y",
    "margin-top",
    "margin-right",
    "margin-bottom",
    "margin-left",
    "gap",
    "flex",
    "flex-grow",
    "flex-shrink",
    "align-items",
    "align-self",
    "justify-content",
    "center",
    "fill",
    "safe-area",
    "bg",
    "border-radius",
    "border-width",
    "border-color",
    "opacity",
    "elevation",
    "hidden",
    "a11y-label",
    "a11y-hint",
    "@press",
    "@doubleTap",
    "@longPress",
    "src",
    "fit",
    "tint-color",
    "alt"
  ],
  "lazy-grid": [
    "class",
    "width",
    "height",
    "min-width",
    "min-height",
    "max-width",
    "max-height",
    "padding",
    "padding-x",
    "padding-y",
    "padding-top",
    "padding-right",
    "padding-bottom",
    "padding-left",
    "margin",
    "margin-x",
    "margin-y",
    "margin-top",
    "margin-right",
    "margin-bottom",
    "margin-left",
    "gap",
    "flex",
    "flex-grow",
    "flex-shrink",
    "align-items",
    "align-self",
    "justify-content",
    "center",
    "fill",
    "safe-area",
    "bg",
    "border-radius",
    "border-width",
    "border-color",
    "opacity",
    "elevation",
    "hidden",
    "a11y-label",
    "a11y-hint",
    "@press",
    "@doubleTap",
    "@longPress",
    "columns",
    "horizontal"
  ],
  "list": [
    "horizontal",
    "shows-indicators",
    "separator",
    "plain",
    "on-refresh",
    "on-end-reached",
    "class"
  ],
  "list-item": [
    "headline",
    "supporting",
    "overline",
    "leadingIcon",
    "leadingIconIos",
    "leadingIconAndroid",
    "leadingMonogram",
    "leadingImage",
    "trailingIcon",
    "trailingIconIos",
    "trailingIconAndroid",
    "trailingText",
    "trailingSwitch",
    "trailingCheckbox",
    "trailing-menu",
    "disabled",
    "a11y-label",
    "a11y-hint",
    "@press",
    "class"
  ],
  "list-section": [
    "heading",
    "footer",
    "class"
  ],
  "modal": [
    "visible",
    "dismissible",
    "a11y-label",
    "a11y-hint",
    "@dismiss",
    "class"
  ],
  "pressable": [
    "class",
    "width",
    "height",
    "min-width",
    "min-height",
    "max-width",
    "max-height",
    "padding",
    "padding-x",
    "padding-y",
    "padding-top",
    "padding-right",
    "padding-bottom",
    "padding-left",
    "margin",
    "margin-x",
    "margin-y",
    "margin-top",
    "margin-right",
    "margin-bottom",
    "margin-left",
    "gap",
    "flex",
    "flex-grow",
    "flex-shrink",
    "align-items",
    "align-self",
    "justify-content",
    "center",
    "fill",
    "safe-area",
    "bg",
    "border-radius",
    "border-width",
    "border-color",
    "opacity",
    "elevation",
    "hidden",
    "a11y-label",
    "a11y-hint",
    "@press",
    "@doubleTap",
    "@longPress",
    "menu",
    "@navigate"
  ],
  "progress-bar": [
    "value",
    "indeterminate",
    "color",
    "track-color",
    "a11y-label",
    "a11y-hint",
    "class"
  ],
  "radio-group": [
    "value",
    "label",
    "disabled",
    "a11y-label",
    "a11y-hint",
    "native:model",
    "@change",
    "class"
  ],
  "radio": [
    "value",
    "label",
    "disabled",
    "a11y-label",
    "a11y-hint",
    "class"
  ],
  "refreshable": [
    "on-refresh",
    "refreshing",
    "class"
  ],
  "row": [
    "class",
    "width",
    "height",
    "min-width",
    "min-height",
    "max-width",
    "max-height",
    "padding",
    "padding-x",
    "padding-y",
    "padding-top",
    "padding-right",
    "padding-bottom",
    "padding-left",
    "margin",
    "margin-x",
    "margin-y",
    "margin-top",
    "margin-right",
    "margin-bottom",
    "margin-left",
    "gap",
    "flex",
    "flex-grow",
    "flex-shrink",
    "align-items",
    "align-self",
    "justify-content",
    "center",
    "fill",
    "safe-area",
    "bg",
    "border-radius",
    "border-width",
    "border-color",
    "opacity",
    "elevation",
    "hidden",
    "a11y-label",
    "a11y-hint",
    "@press",
    "@doubleTap",
    "@longPress"
  ],
  "scroll-view": [
    "class",
    "width",
    "height",
    "min-width",
    "min-height",
    "max-width",
    "max-height",
    "padding",
    "padding-x",
    "padding-y",
    "padding-top",
    "padding-right",
    "padding-bottom",
    "padding-left",
    "margin",
    "margin-x",
    "margin-y",
    "margin-top",
    "margin-right",
    "margin-bottom",
    "margin-left",
    "gap",
    "flex",
    "flex-grow",
    "flex-shrink",
    "align-items",
    "align-self",
    "justify-content",
    "center",
    "fill",
    "safe-area",
    "bg",
    "border-radius",
    "border-width",
    "border-color",
    "opacity",
    "elevation",
    "hidden",
    "a11y-label",
    "a11y-hint",
    "@press",
    "@doubleTap",
    "@longPress",
    "axis",
    "horizontal",
    "shows-indicators",
    "scroll-anchor"
  ],
  "select": [
    "options",
    "value",
    "label",
    "placeholder",
    "disabled",
    "a11y-label",
    "a11y-hint",
    "native:model",
    "@change",
    "class"
  ],
  "rect": [
    "class",
    "width",
    "height",
    "min-width",
    "min-height",
    "max-width",
    "max-height",
    "padding",
    "padding-x",
    "padding-y",
    "padding-top",
    "padding-right",
    "padding-bottom",
    "padding-left",
    "margin",
    "margin-x",
    "margin-y",
    "margin-top",
    "margin-right",
    "margin-bottom",
    "margin-left",
    "gap",
    "flex",
    "flex-grow",
    "flex-shrink",
    "align-items",
    "align-self",
    "justify-content",
    "center",
    "fill",
    "safe-area",
    "bg",
    "border-radius",
    "border-width",
    "border-color",
    "opacity",
    "elevation",
    "hidden",
    "a11y-label",
    "a11y-hint",
    "@press",
    "@doubleTap",
    "@longPress",
    "left",
    "top"
  ],
  "circle": [
    "class",
    "width",
    "height",
    "min-width",
    "min-height",
    "max-width",
    "max-height",
    "padding",
    "padding-x",
    "padding-y",
    "padding-top",
    "padding-right",
    "padding-bottom",
    "padding-left",
    "margin",
    "margin-x",
    "margin-y",
    "margin-top",
    "margin-right",
    "margin-bottom",
    "margin-left",
    "gap",
    "flex",
    "flex-grow",
    "flex-shrink",
    "align-items",
    "align-self",
    "justify-content",
    "center",
    "fill",
    "safe-area",
    "bg",
    "border-radius",
    "border-width",
    "border-color",
    "opacity",
    "elevation",
    "hidden",
    "a11y-label",
    "a11y-hint",
    "@press",
    "@doubleTap",
    "@longPress",
    "left",
    "top"
  ],
  "line": [
    "class",
    "width",
    "height",
    "min-width",
    "min-height",
    "max-width",
    "max-height",
    "padding",
    "padding-x",
    "padding-y",
    "padding-top",
    "padding-right",
    "padding-bottom",
    "padding-left",
    "margin",
    "margin-x",
    "margin-y",
    "margin-top",
    "margin-right",
    "margin-bottom",
    "margin-left",
    "gap",
    "flex",
    "flex-grow",
    "flex-shrink",
    "align-items",
    "align-self",
    "justify-content",
    "center",
    "fill",
    "safe-area",
    "bg",
    "border-radius",
    "border-width",
    "border-color",
    "opacity",
    "elevation",
    "hidden",
    "a11y-label",
    "a11y-hint",
    "@press",
    "@doubleTap",
    "@longPress"
  ],
  "side-nav": [
    "gestures-enabled",
    "label-visibility",
    "dark",
    "class"
  ],
  "side-nav-header": [
    "title",
    "subtitle",
    "icon",
    "background-color",
    "show-close-button",
    "pinned",
    "class"
  ],
  "side-nav-item": [
    "id",
    "label",
    "icon",
    "url",
    "open-in-browser",
    "active",
    "badge",
    "badge-color",
    "class"
  ],
  "side-nav-group": [
    "heading",
    "expanded",
    "icon",
    "class"
  ],
  "slider": [
    "value",
    "min",
    "max",
    "step",
    "disabled",
    "a11y-label",
    "a11y-hint",
    "native:model",
    "@change",
    "class"
  ],
  "spacer": [
    "class",
    "width",
    "height",
    "min-width",
    "min-height",
    "max-width",
    "max-height",
    "padding",
    "padding-x",
    "padding-y",
    "padding-top",
    "padding-right",
    "padding-bottom",
    "padding-left",
    "margin",
    "margin-x",
    "margin-y",
    "margin-top",
    "margin-right",
    "margin-bottom",
    "margin-left",
    "gap",
    "flex",
    "flex-grow",
    "flex-shrink",
    "align-items",
    "align-self",
    "justify-content",
    "center",
    "fill",
    "safe-area",
    "bg",
    "border-radius",
    "border-width",
    "border-color",
    "opacity",
    "elevation",
    "hidden",
    "a11y-label",
    "a11y-hint",
    "@press",
    "@doubleTap",
    "@longPress"
  ],
  "stack": [
    "class",
    "width",
    "height",
    "min-width",
    "min-height",
    "max-width",
    "max-height",
    "padding",
    "padding-x",
    "padding-y",
    "padding-top",
    "padding-right",
    "padding-bottom",
    "padding-left",
    "margin",
    "margin-x",
    "margin-y",
    "margin-top",
    "margin-right",
    "margin-bottom",
    "margin-left",
    "gap",
    "flex",
    "flex-grow",
    "flex-shrink",
    "align-items",
    "align-self",
    "justify-content",
    "center",
    "fill",
    "safe-area",
    "bg",
    "border-radius",
    "border-width",
    "border-color",
    "opacity",
    "elevation",
    "hidden",
    "a11y-label",
    "a11y-hint",
    "@press",
    "@doubleTap",
    "@longPress"
  ],
  "tab-row": [
    "value",
    "selected-index",
    "sync-mode",
    "a11y-label",
    "a11y-hint",
    "native:model",
    "@change",
    "class"
  ],
  "tab": [
    "label",
    "icon",
    "ios-icon",
    "android-icon",
    "iosIcon",
    "androidIcon",
    "ios",
    "android",
    "disabled",
    "class"
  ],
  "text": [
    "class",
    "width",
    "height",
    "min-width",
    "min-height",
    "max-width",
    "max-height",
    "padding",
    "padding-x",
    "padding-y",
    "padding-top",
    "padding-right",
    "padding-bottom",
    "padding-left",
    "margin",
    "margin-x",
    "margin-y",
    "margin-top",
    "margin-right",
    "margin-bottom",
    "margin-left",
    "gap",
    "flex",
    "flex-grow",
    "flex-shrink",
    "align-items",
    "align-self",
    "justify-content",
    "center",
    "fill",
    "safe-area",
    "bg",
    "border-radius",
    "border-width",
    "border-color",
    "opacity",
    "elevation",
    "hidden",
    "a11y-label",
    "a11y-hint",
    "@press",
    "@doubleTap",
    "@longPress",
    "font-size",
    "font-weight",
    "color",
    "text-align",
    "max-lines",
    "font-style",
    "font-family",
    "underline",
    "line-through",
    "text-transform",
    "letter-spacing",
    "font",
    "selectable"
  ],
  "text-input": [
    "value",
    "placeholder",
    "label",
    "supporting",
    "disabled",
    "read-only",
    "is-error",
    "loading",
    "keyboard",
    "autocapitalize",
    "secure",
    "multiline",
    "max-length",
    "max-lines",
    "min-lines",
    "keep-focus-on-submit",
    "sync-mode",
    "debounce-ms",
    "leading-icon",
    "ios-leading-icon",
    "android-leading-icon",
    "trailing-icon",
    "ios-trailing-icon",
    "android-trailing-icon",
    "prefix",
    "suffix",
    "font",
    "font-size",
    "a11y-label",
    "a11y-hint",
    "native:model",
    "@change",
    "@submit",
    "@focus",
    "@blur",
    "@selection-change",
    "class"
  ],
  "outlined-text-input": [
    "value",
    "placeholder",
    "label",
    "supporting",
    "disabled",
    "read-only",
    "is-error",
    "loading",
    "keyboard",
    "autocapitalize",
    "secure",
    "multiline",
    "max-length",
    "max-lines",
    "min-lines",
    "keep-focus-on-submit",
    "sync-mode",
    "debounce-ms",
    "leading-icon",
    "ios-leading-icon",
    "android-leading-icon",
    "trailing-icon",
    "ios-trailing-icon",
    "android-trailing-icon",
    "prefix",
    "suffix",
    "font",
    "font-size",
    "a11y-label",
    "a11y-hint",
    "native:model",
    "@change",
    "@submit",
    "@focus",
    "@blur",
    "@selection-change",
    "class"
  ],
  "filled-text-input": [
    "value",
    "placeholder",
    "label",
    "supporting",
    "disabled",
    "read-only",
    "is-error",
    "loading",
    "keyboard",
    "autocapitalize",
    "secure",
    "multiline",
    "max-length",
    "max-lines",
    "min-lines",
    "keep-focus-on-submit",
    "sync-mode",
    "debounce-ms",
    "leading-icon",
    "ios-leading-icon",
    "android-leading-icon",
    "trailing-icon",
    "ios-trailing-icon",
    "android-trailing-icon",
    "prefix",
    "suffix",
    "font",
    "font-size",
    "a11y-label",
    "a11y-hint",
    "native:model",
    "@change",
    "@submit",
    "@focus",
    "@blur",
    "@selection-change",
    "class"
  ],
  "bare-text-input": [
    "value",
    "placeholder",
    "label",
    "supporting",
    "disabled",
    "read-only",
    "is-error",
    "loading",
    "keyboard",
    "autocapitalize",
    "secure",
    "multiline",
    "max-length",
    "max-lines",
    "min-lines",
    "keep-focus-on-submit",
    "sync-mode",
    "debounce-ms",
    "leading-icon",
    "ios-leading-icon",
    "android-leading-icon",
    "trailing-icon",
    "ios-trailing-icon",
    "android-trailing-icon",
    "prefix",
    "suffix",
    "font",
    "font-size",
    "color",
    "a11y-label",
    "a11y-hint",
    "native:model",
    "@change",
    "@submit",
    "@focus",
    "@blur",
    "@selection-change",
    "class"
  ],
  "toggle": [
    "value",
    "label",
    "disabled",
    "a11y-label",
    "a11y-hint",
    "native:model",
    "@change",
    "class"
  ],
  "top-bar": [
    "title",
    "subtitle",
    "back",
    "show-navigation-icon",
    "background-color",
    "text-color",
    "font-name",
    "display-mode",
    "scroll-behavior",
    "elevation",
    "search-placeholder",
    "search-on-query",
    "search-debounce-ms",
    "custom",
    "class"
  ],
  "top-bar-action": [
    "id",
    "icon",
    "ios-icon",
    "android-icon",
    "ios",
    "android",
    "label",
    "badge",
    "news",
    "disabled",
    "items",
    "@press",
    "class"
  ],
  "virtual-list": [
    "count",
    "from",
    "to",
    "item",
    "on-window-change",
    "class"
  ],
  "webview": [
    "class",
    "width",
    "height",
    "min-width",
    "min-height",
    "max-width",
    "max-height",
    "padding",
    "padding-x",
    "padding-y",
    "padding-top",
    "padding-right",
    "padding-bottom",
    "padding-left",
    "margin",
    "margin-x",
    "margin-y",
    "margin-top",
    "margin-right",
    "margin-bottom",
    "margin-left",
    "gap",
    "flex",
    "flex-grow",
    "flex-shrink",
    "align-items",
    "align-self",
    "justify-content",
    "center",
    "fill",
    "safe-area",
    "bg",
    "border-radius",
    "border-width",
    "border-color",
    "opacity",
    "elevation",
    "hidden",
    "a11y-label",
    "a11y-hint",
    "@press",
    "@doubleTap",
    "@longPress",
    "src",
    "html",
    "javascript",
    "js",
    "dom-storage",
    "domStorage",
    "php",
    "fullscreen",
    "@navigated"
  ],
  "web-view": [
    "class",
    "width",
    "height",
    "min-width",
    "min-height",
    "max-width",
    "max-height",
    "padding",
    "padding-x",
    "padding-y",
    "padding-top",
    "padding-right",
    "padding-bottom",
    "padding-left",
    "margin",
    "margin-x",
    "margin-y",
    "margin-top",
    "margin-right",
    "margin-bottom",
    "margin-left",
    "gap",
    "flex",
    "flex-grow",
    "flex-shrink",
    "align-items",
    "align-self",
    "justify-content",
    "center",
    "fill",
    "safe-area",
    "bg",
    "border-radius",
    "border-width",
    "border-color",
    "opacity",
    "elevation",
    "hidden",
    "a11y-label",
    "a11y-hint",
    "@press",
    "@doubleTap",
    "@longPress",
    "src",
    "html",
    "javascript",
    "js",
    "dom-storage",
    "domStorage",
    "php",
    "fullscreen",
    "@navigated"
  ]
};
const SELF_CLOSING = new Set(["activity-indicator", "badge", "bare-text-input", "bottom-nav-item", "button", "checkbox", "chip", "circle", "divider", "fab", "filled-text-input", "horizontal-divider", "icon", "image", "line", "list-item", "outlined-text-input", "progress-bar", "radio", "rect", "select", "slider", "spacer", "tab", "text-input", "toggle", "top-bar-action", "virtual-list"]);

// Shared names are from NativePHP's documented cross-platform icon map.
const ICONS = [
  "dashboard","home","menu","settings","account","profile","user","person","people","connections","contacts","group","groups",
  "orders","receipt","cart","shopping","shop","store","down","check","done","close","warning","error","info","login","logout","exit","lock","unlock",
  "favorite","heart","star","bookmark","image","photo","image-plus","video","folder","folder-lock","file","description","book-open","newspaper","news","article",
  "camera","qr","qrcode","qr-code","device-phone-mobile","smartphone","vibrate","bell","finger-print","fingerprint","light-bulb","lightbulb","flashlight","map","location","globe-alt","globe","web","bolt","flash",
  "speaker","speaker-wave","volume-up","volume-down","volume-mute","mute","volume-off","music","audio","music-note","microphone","mic","help","about","information-circle","more","list","visibility","visibility_off"
];
const IOS_ICONS = ["house","house.fill","gearshape","gearshape.fill","person","person.fill","person.2","person.3","camera","camera.fill","photo","photo.fill","heart","heart.fill","star","star.fill","bookmark","bookmark.fill","bell","bell.fill","map","map.fill","location","location.fill","globe","airplane","car","car.fill","fork.knife","basketball","gamecontroller","gamecontroller.fill","wrench.and.screwdriver","magnifyingglass","chevron.left","chevron.right","chevron.up","chevron.down","xmark","checkmark","plus","minus","trash","pencil","square.and.arrow.up","arrow.down.circle","folder","doc","book","newspaper"];
const ANDROID_ICONS = ["home","settings","person","group","menu","search","close","check","warning","error","info","login","logout","lock","lock_open","favorite","star","bookmark","image","photo_camera","videocam","folder","description","article","camera_alt","qr_code_scanner","smartphone","notifications","fingerprint","lightbulb","map","location_on","public","bolt","volume_up","volume_down","volume_mute","music_note","mic","help","more_vert","visibility","visibility_off","shopping_cart","store","receipt","directions_car","flight","restaurant","sports_basketball","sports_esports","build","spa","delete","edit","add","remove","chevron_left","chevron_right","expand_less","expand_more","share","download"];



// Project-aware icon catalog -------------------------------------------------
// NativePHP v4 can generate typed icon enums directly into the user's app:
//   php artisan native-ui:generate-icons
// We read those generated files so completion follows the NativePHP version
// installed in the current workspace instead of relying only on bundled lists.
const projectIconCache = new Map();

function uniqueSorted(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function parsePhpBackedEnum(filePath) {
  try {
    if (!fs.existsSync(filePath)) return { values: [], cases: [] };
    const source = fs.readFileSync(filePath, 'utf8');
    const values = [];
    const cases = [];
    const re = /\bcase\s+([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(['"])(.*?)\2\s*;/g;
    let match;
    while ((match = re.exec(source))) {
      cases.push(match[1]);
      values.push(match[3]);
    }
    return { values: uniqueSorted(values), cases: uniqueSorted(cases) };
  } catch (_) {
    return { values: [], cases: [] };
  }
}

function parseSharedIconAliasesFromVendor(root) {
  const aliases = new Set();
  const roots = [
    path.join(root, 'vendor', 'nativephp', 'mobile-ui'),
    path.join(root, 'vendor', 'nativephp', 'mobile'),
  ];
  const candidates = [];

  function walk(dir, depth = 0) {
    if (depth > 7 || !fs.existsSync(dir)) return;
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch (_) { return; }
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (!['node_modules', '.git', 'build', 'dist'].includes(entry.name)) walk(full, depth + 1);
      } else if (/icon|symbol|resolver/i.test(entry.name) && /\.(php|json)$/i.test(entry.name)) {
        candidates.push(full);
      }
    }
  }
  roots.forEach(r => walk(r));

  for (const file of candidates.slice(0, 80)) {
    let source;
    try { source = fs.readFileSync(file, 'utf8'); } catch (_) { continue; }

    // Common NativePHP mapping shapes include keys such as:
    // 'home' => ...,  "settings" => ...
    // Keep only conservative alias-like keys and require the file to look icon-related.
    if (!/(SF Symbol|Material Icon|icon|symbol|house\.fill|gearshape)/i.test(source)) continue;
    const keyRe = /(?:^|[\s\[,])['"]([a-z][a-z0-9_-]{1,48})['"]\s*=>/gm;
    let m;
    while ((m = keyRe.exec(source))) aliases.add(m[1]);
  }
  return uniqueSorted([...aliases]);
}

function workspaceRootForDocument(document) {
  const folder = vscode.workspace.getWorkspaceFolder(document.uri);
  return folder ? folder.uri.fsPath : null;
}

function loadProjectIcons(document, force = false) {
  const root = workspaceRootForDocument(document);
  if (!root) return null;
  if (!force && projectIconCache.has(root)) return projectIconCache.get(root);

  const iconDirCandidates = [
    path.join(root, 'app', 'Icons'),
    path.join(root, 'src', 'Icons'),
  ];
  const configuredOutput = vscode.workspace.getConfiguration('nativephpEdge', document.uri).get('icons.generatedPath', 'app/Icons');
  if (configuredOutput) iconDirCandidates.unshift(path.resolve(root, configuredOutput));

  let iconDir = iconDirCandidates.find(d => fs.existsSync(d));
  const ios = iconDir ? parsePhpBackedEnum(path.join(iconDir, 'Ios.php')) : { values: [], cases: [] };
  const android = iconDir ? parsePhpBackedEnum(path.join(iconDir, 'Android.php')) : { values: [], cases: [] };
  const androidOutlined = iconDir ? parsePhpBackedEnum(path.join(iconDir, 'AndroidOutlined.php')) : { values: [], cases: [] };
  const shared = parseSharedIconAliasesFromVendor(root);

  const catalog = {
    root,
    iconDir,
    ios,
    android,
    androidOutlined,
    shared,
    loadedAt: Date.now(),
    fromProject: Boolean(iconDir || shared.length),
  };
  projectIconCache.set(root, catalog);
  return catalog;
}

function iconListsFor(document) {
  const p = loadProjectIcons(document);
  return {
    shared: uniqueSorted([...(p?.shared || []), ...ICONS]),
    ios: uniqueSorted([...(p?.ios.values || []), ...IOS_ICONS]),
    android: uniqueSorted([...(p?.android.values || []), ...(p?.androidOutlined.values || []), ...ANDROID_ICONS]),
    iosCases: p?.ios.cases || [],
    androidCases: p?.android.cases || [],
    androidOutlinedCases: p?.androidOutlined.cases || [],
    project: p,
  };
}

function projectIconDetail(kind, project) {
  if (!project?.fromProject) return kind;
  if (project.iconDir) return `${kind} • loaded from ${path.relative(project.root, project.iconDir)}`;
  return `${kind} • loaded from installed NativePHP package`;
}

const CLASSES = ["w-full", "h-full", "flex-1", "fill", "relative", "absolute", "overflow-hidden", "safe-area", "hidden", "items-start", "items-center", "items-end", "justify-start", "justify-center", "justify-between", "justify-around", "justify-evenly", "justify-end", "self-start", "self-center", "self-end", "text-left", "text-center", "text-right", "font-thin", "font-light", "font-normal", "font-medium", "font-semibold", "font-bold", "font-extrabold", "italic", "underline", "line-through", "text-xs", "text-sm", "text-base", "text-lg", "text-xl", "text-2xl", "text-3xl", "text-4xl", "rounded", "rounded-sm", "rounded-md", "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-3xl", "rounded-full", "bg-white", "bg-black", "text-white", "text-black", "border", "border-2", "border-4", "opacity-0", "opacity-25", "opacity-50", "opacity-75", "opacity-100", "shadow-sm", "shadow-md", "shadow-lg",
  ...[0,1,2,3,4,5,6,7,8,9,10,11,12].flatMap(n => ["p-","px-","py-","pt-","pr-","pb-","pl-","m-","mx-","my-","mt-","mr-","mb-","ml-","gap-"].map(x => x+n))
];

const COMPONENT_DOCS = {
  "icon": "Displays a platform-native icon. Shared names map to SF Symbols on iOS and Material Icons on Android.",
  "button": "A native button with semantic variants, sizes, optional leading/trailing icons, loading and accessibility props.",
  "text": "Displays native text with typography, line-height, truncation and accessibility support.",
  "text-input": "Native text input. Use outlined, filled or bare variants for different visual treatments.",
  "outlined-text-input": "Outlined native text input with validation, decoration, typography and binding support.",
  "filled-text-input": "Filled native text input with validation, decoration, typography and binding support.",
  "bare-text-input": "Minimal native text input without Material field chrome.",
  "top-bar": "Native navigation bar with title, subtitle, back navigation, search and actions.",
  "top-bar-action": "Action displayed in a native top bar. Supports shared or platform-specific icons.",
  "bottom-nav": "Native bottom navigation container.",
  "bottom-nav-item": "Item in a native bottom navigation bar.",
  "scroll-view": "Scrollable native container.",
  "row": "Horizontal native layout container.",
  "column": "Vertical native layout container.",
  "stack": "Overlapping native layout container.",
  "pressable": "Fully-customizable tappable native container.",
  "image": "Native image view supporting asset/URL sources and fit behavior.",
  "modal": "Native modal presentation container.",
  "bottom-sheet": "Native bottom sheet presentation container.",
  "list": "Native list container.",
  "list-item": "Native list row.",
  "webview": "Embedded native web view.",
  "web-view": "Embedded native web view. Alias of webview."
};
const ATTR_DOCS = {
  "class":"EDGE utility classes.", "name":"Component-specific name. For <native:icon>, a cross-platform icon name.", "ios":"iOS override, typically an SF Symbol name or typed enum.", "android":"Android override, typically a Material Icon name or typed enum.",
  "ios-icon":"iOS icon override.", "android-icon":"Android icon override.", "size":"Component size.", "color":"Foreground/icon color, usually hex.", "dark-color":"Dark-mode color override.", "a11y-label":"Accessibility label.", "a11y-hint":"Accessibility hint.",
  "label":"Visible/accessibility label.", "variant":"Semantic visual variant.", "disabled":"Disables interaction.", "loading":"Shows loading state and prevents interaction.", "@press":"Calls a public component method when pressed.", "@tap":"Calls a public component method when tapped.",
  "native:model":"Two-way NativePHP binding.", "value":"Current value.", "placeholder":"Placeholder text.", "title":"Title text.", "subtitle":"Subtitle text.", "url":"Navigation URL.", "src":"Image/web source URL.",
  "display-mode":"Top bar title display mode: inline, large, automatic.", "scroll-behavior":"Top bar scroll behavior: collapse, pinned, enterAlways.", "background-color":"Native background color.", "text-color":"Native text/icon color."
};
const ENUM_VALUES = {
  "button:variant":["primary","secondary","destructive","ghost"], "button:size":["sm","md","lg"],
  "top-bar:display-mode":["inline","large","automatic"], "top-bar:scroll-behavior":["collapse","pinned","enterAlways"],
  "activity-indicator:size":["small","medium","large"], "text-input:size":["sm","md","lg"], "outlined-text-input:size":["sm","md","lg"], "filled-text-input:size":["sm","md","lg"], "bare-text-input:size":["sm","md","lg"]
};

function isBlade(document) { return document.fileName.endsWith('.blade.php') || document.languageId === 'blade'; }
function prefix(document, position) { return document.lineAt(position.line).text.slice(0, position.character); }
function normalizeAttr(a) { return a.startsWith(':') ? a.slice(1) : a; }
function boolAttr(a) { return ['center','fill','safe-area','hidden','disabled','selected','visible','dark','custom','horizontal','separator','plain','back','show-navigation-icon','dismissible','loading','indeterminate','javascript','js','dom-storage','domStorage','php','fullscreen','secure','multiline','read-only','is-error','keep-focus-on-submit','open-in-browser','active','expanded','pinned','show-close-button','gestures-enabled','news','destructive'].includes(a); }
function componentUrl(name){ return `https://nativephp.com/docs/mobile/4/edge-components/${name === 'web-view' ? 'webview' : name}`; }
function markdownComponent(name){ const md = new vscode.MarkdownString(); md.isTrusted = true; md.appendMarkdown(`### \`<native:${name}>\`\n\n${COMPONENT_DOCS[name] || 'NativePHP v4 EDGE component.'}\n\n`); md.appendMarkdown(`[NativePHP documentation](${componentUrl(name)})`); return md; }

function getTagAt(document, position) {
  const text = document.getText(); const offset = document.offsetAt(position);
  const start = text.lastIndexOf('<native:', offset); if (start < 0) return null;
  const end = text.indexOf('>', start); if (end < 0 || offset > end + 1) return null;
  const raw = text.slice(start, end + 1); const m = raw.match(/^<native:([\w-]+)/); return m ? {name:m[1], start, end, raw} : null;
}

function completionProvider() { return { provideCompletionItems(document, position) {
  if (!isBlade(document)) return;
  const p = prefix(document, position);

  // IMPORTANT: value-context completions must run before generic tag attribute
  // completions. Otherwise `<native:icon name="...` is still inside an open tag
  // and the generic attribute branch wins, returning attributes instead of icons.
  const iconMatch = p.match(/\b([:\w-]*(?:name|icon|ios|android|leading-icon|trailing-icon))\s*=\s*["']([^"']*)$/);
  const currentTag = p.match(/<native:([\w-]+)\b[^>]*$/);
  if (iconMatch && currentTag) {
    const component = currentTag[1];
    const attr = normalizeAttr(iconMatch[1]);
    const isIconValue = component === 'icon' && ['name', 'ios', 'android'].includes(attr);
    const isIconAttribute = /(?:^|-)icon$/.test(attr) || /^(?:ios|android)-(?:leading|trailing)-icon$/.test(attr) || ['ios-icon','android-icon','leading-icon','trailing-icon'].includes(attr);
    if (isIconValue || isIconAttribute) {
      const catalogs = iconListsFor(document);
      const list = attr.includes('ios') ? catalogs.ios : attr.includes('android') ? catalogs.android : catalogs.shared;
      return list.map(x => {
        const i = new vscode.CompletionItem(x, vscode.CompletionItemKind.EnumMember);
        const kind = attr.includes('ios') ? 'SF Symbol' : attr.includes('android') ? 'Material Icon' : 'NativePHP cross-platform icon';
        i.detail = projectIconDetail(kind, catalogs.project);
        i.documentation = new vscode.MarkdownString(
          (attr.includes('ios') ? 'iOS SF Symbol override.' : attr.includes('android') ? 'Android Material Icon override.' : 'NativePHP cross-platform icon name.') +
          (catalogs.project?.fromProject ? '\n\nIcon catalog includes definitions read from the current NativePHP project.' : '')
        );
        i.insertText = x;
        i.filterText = x;
        return i;
      });
    }
  }

  // Typed enum case completion from the project's generated App\Icons enums.
  // Examples: :ios="Ios::House" and :android="AndroidOutlined::Home".
  const typedIconMatch = p.match(/\b:(?:ios|ios-icon|ios-leading-icon|ios-trailing-icon|android|android-icon|android-leading-icon|android-trailing-icon)\s*=\s*["'](?:\\?App\\Icons\\)?(Ios|Android|AndroidOutlined)::([A-Za-z0-9_]*)$/);
  if (typedIconMatch) {
    const catalogs = iconListsFor(document);
    const enumName = typedIconMatch[1];
    const cases = enumName === 'Ios' ? catalogs.iosCases : enumName === 'AndroidOutlined' ? catalogs.androidOutlinedCases : catalogs.androidCases;
    return cases.map(caseName => {
      const item = new vscode.CompletionItem(caseName, vscode.CompletionItemKind.EnumMember);
      item.detail = `${enumName} icon enum • current project`;
      item.insertText = caseName;
      item.filterText = caseName;
      return item;
    });
  }

  const enumContext = p.match(/<native:([\w-]+)[^>]*\b([\w-]+)\s*=\s*["']([^"']*)$/);
  if (enumContext) {
    const vals = ENUM_VALUES[`${enumContext[1]}:${enumContext[2]}`];
    if (vals) return vals.map(v => new vscode.CompletionItem(v, vscode.CompletionItemKind.EnumMember));
  }

  if (vscode.workspace.getConfiguration('nativephpEdge').get('completion.tailwindLikeClasses', true) && /\bclass\s*=\s*["'][^"']*$/.test(p)) {
    return CLASSES.map(x => { const i = new vscode.CompletionItem(x, vscode.CompletionItemKind.Value); i.detail = 'EDGE utility class'; return i; });
  }

  if (/<native:[\w-]*$/.test(p)) return Object.keys(COMPONENTS).sort().map(name => {
    const i = new vscode.CompletionItem(`native:${name}`, vscode.CompletionItemKind.Class);
    i.detail = 'NativePHP v4 EDGE component';
    i.documentation = markdownComponent(name);
    i.insertText = SELF_CLOSING.has(name) ? new vscode.SnippetString(`${name} $1/>$0`) : new vscode.SnippetString(`${name}$1>\n\t$0\n</native:${name}>`);
    return i;
  });

  const tag = p.match(/<native:([\w-]+)\b[^>]*$/);
  if (tag) {
    const name = tag[1], attrs = [...new Set([...(COMPONENTS[name] || []), ...SHARED])];
    return attrs.map(a => {
      const i = new vscode.CompletionItem(a, vscode.CompletionItemKind.Property);
      i.detail = `${name} attribute`;
      i.documentation = new vscode.MarkdownString(ATTR_DOCS[a] || `Supported attribute on \`<native:${name}>\`.`);
      if (boolAttr(a)) i.insertText = a;
      else i.insertText = new vscode.SnippetString(`${a}="$1"`);
      return i;
    });
  }
} }; }

function hoverProvider(){ return { provideHover(document, position){ if(!isBlade(document)) return; const range=document.getWordRangeAtPosition(position,/[@:\w-]+/); if(!range) return; const word=document.getText(range); const line=document.lineAt(position.line).text; const before=line.slice(0,position.character+1); const comp=before.match(/<\/?native:([\w-]+)/) || line.match(/<\/?native:([\w-]+)/); if(word.startsWith('native:')){const n=word.slice(7);if(COMPONENTS[n])return new vscode.Hover(markdownComponent(n),range);} if(comp && COMPONENTS[comp[1]]){ const attr=normalizeAttr(word); if((COMPONENTS[comp[1]]||[]).includes(attr)||SHARED.includes(attr)||ATTR_DOCS[attr]){const md=new vscode.MarkdownString();md.appendMarkdown(`**${attr}** — ${ATTR_DOCS[attr]||`Supported attribute on \`<native:${comp[1]}>\`.`}`);const vals=ENUM_VALUES[`${comp[1]}:${attr}`];if(vals)md.appendMarkdown(`\n\nAllowed values: ${vals.map(v=>'`'+v+'`').join(', ')}`);return new vscode.Hover(md,range);} } } }; }

function parseAttributes(raw){ const attrs=[]; const re=/\s([:@]?[A-Za-z_][\w:.-]*)(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?/g; let m; while((m=re.exec(raw))) attrs.push({name:m[1], index:m.index+1}); return attrs; }
function diagnosticsFor(document){ const diagnostics=[]; const text=document.getText(); const tagRe=/<native:([\w-]+)\b[\s\S]*?>/g; let m; while((m=tagRe.exec(text))){const name=m[1]; const start=document.positionAt(m.index+8); const compRange=new vscode.Range(start,document.positionAt(m.index+8+name.length)); if(!COMPONENTS[name]){diagnostics.push(new vscode.Diagnostic(compRange,`Unknown NativePHP EDGE component <native:${name}>.`,vscode.DiagnosticSeverity.Error));continue;} const allowed=new Set([...(COMPONENTS[name]||[]),...SHARED]); for(const a of parseAttributes(m[0])){let attr=normalizeAttr(a.name); if(attr.startsWith('@')||attr.startsWith('wire:')||attr.startsWith('x-')||attr==='native:model'||attr==='key'||attr==='id'||attr==='style') continue; if(!allowed.has(attr)){const offset=m.index+a.index; diagnostics.push(new vscode.Diagnostic(new vscode.Range(document.positionAt(offset),document.positionAt(offset+a.name.length)),`Attribute '${a.name}' is not documented for <native:${name}>.`,vscode.DiagnosticSeverity.Warning));}} } return diagnostics; }

function countNativeOpen(line){ return (line.match(/<native:[\w-]+\b/g)||[]).length - (line.match(/<native:[^>]*\/>/g)||[]).length - (line.match(/<native:[\w-]+\b[^>]*>[^<]*<\/native:[\w-]+>/g)||[]).length; }
function countNativeClose(line){ return (line.match(/<\/native:[\w-]+\s*>/g)||[]).length; }
function isBladeOpen(t){ return /^@(if|foreach|for|forelse|while|switch|unless|isset|auth|guest|can|cannot|production|env|once|verbatim|push|prepend|section|component)\b/.test(t); }
function isBladeClose(t){ return /^@(endif|endforeach|endfor|endforelse|endwhile|endswitch|endunless|endisset|endauth|endguest|endcan|endcannot|endproduction|endenv|endonce|endverbatim|endpush|endprepend|endsection|endcomponent)\b/.test(t); }
function isBladeBranch(t){ return /^@(else|elseif|empty|case|default)\b/.test(t); }
function formatBladeEdge(text, indentSize) {
  const lines=text.split(/\r?\n/); let indent=0, inPhp=false, inVerbatim=false, inScript=false, inStyle=false; const out=[];
  for(const raw of lines){ const t=raw.trim(); if(!t){out.push('');continue;}
    if(/^@php\b/.test(t) || /^<\?php\b/.test(t)) inPhp=true;
    if(/^@verbatim\b/.test(t)) inVerbatim=true;
    if(/^<script\b/i.test(t)) inScript=true; if(/^<style\b/i.test(t)) inStyle=true;
    if(inPhp||inVerbatim||inScript||inStyle){ out.push(raw); if(/^@endphp\b/.test(t)||/^\?>$/.test(t))inPhp=false; if(/^@endverbatim\b/.test(t))inVerbatim=false; if(/<\/script>/i.test(t))inScript=false; if(/<\/style>/i.test(t))inStyle=false; continue; }
    const closes=countNativeClose(t); if(closes) indent=Math.max(0,indent-closes); if(isBladeClose(t)||isBladeBranch(t)) indent=Math.max(0,indent-1);
    // Preserve internal spacing and multiline attributes; only normalize leading indentation.
    out.push(' '.repeat(indent*indentSize)+t);
    const opens=countNativeOpen(t); if(opens) indent+=opens; if(isBladeOpen(t)||isBladeBranch(t)) indent++;
  }
  return out.join('\n');
}
function formatterProvider() { return { provideDocumentFormattingEdits(document){ if(!isBlade(document))return[]; const n=vscode.workspace.getConfiguration('nativephpEdge').get('format.indentSize',4), o=document.getText(), f=formatBladeEdge(o,n); if(f===o)return[]; return [vscode.TextEdit.replace(new vscode.Range(document.positionAt(0),document.positionAt(o.length)),f)]; } }; }

function activate(context) {
  const selector=[{language:'blade',scheme:'file'},{language:'php',scheme:'file',pattern:'**/*.blade.php'}];
  const collection=vscode.languages.createDiagnosticCollection('nativephp-edge');
  const refresh=doc=>{if(isBlade(doc))collection.set(doc.uri,diagnosticsFor(doc));};
  context.subscriptions.push(collection,
    vscode.languages.registerCompletionItemProvider(selector,completionProvider(),'<',':',' ','"',"'",'-'),
    vscode.languages.registerHoverProvider(selector,hoverProvider()),
    vscode.languages.registerDocumentFormattingEditProvider(selector,formatterProvider()),
    vscode.commands.registerCommand('nativephpEdge.formatDocument',()=>vscode.commands.executeCommand('editor.action.formatDocument')),
    vscode.commands.registerCommand('nativephpEdge.refreshIcons',()=>{
      projectIconCache.clear();
      const editor=vscode.window.activeTextEditor;
      if(editor && isBlade(editor.document)) {
        const catalog=loadProjectIcons(editor.document,true);
        const iosCount=catalog?.ios.values.length||0, androidCount=catalog?.android.values.length||0, outlinedCount=catalog?.androidOutlined.values.length||0, sharedCount=catalog?.shared.length||0;
        vscode.window.showInformationMessage(`NativePHP EDGE icons refreshed: ${iosCount} iOS, ${androidCount} Android, ${outlinedCount} Android outlined, ${sharedCount} shared vendor aliases.`);
      } else vscode.window.showInformationMessage('NativePHP EDGE icon cache cleared.');
    }),
    vscode.workspace.onDidChangeWorkspaceFolders(()=>projectIconCache.clear()),
    vscode.workspace.onDidOpenTextDocument(refresh), vscode.workspace.onDidSaveTextDocument(doc=>{ refresh(doc); if(/(?:^|\/)(app\/Icons\/(?:Ios|Android|AndroidOutlined)\.php|composer\.lock)$/.test(doc.uri.fsPath.replace(/\\/g,'/'))) projectIconCache.clear(); }),
    vscode.workspace.onDidChangeTextDocument(e=>refresh(e.document)), vscode.workspace.onDidCloseTextDocument(d=>collection.delete(d.uri))
  );
  vscode.workspace.textDocuments.forEach(refresh);
}
function deactivate(){}
module.exports={activate,deactivate,formatBladeEdge,diagnosticsFor};
