# Changelog

## 0.5.0

### Added
- Project-aware NativePHP v4 icon discovery.
- Reads generated `App\Icons\Ios`, `App\Icons\Android`, and `App\Icons\AndroidOutlined` enums from the current workspace.
- Reads shared icon aliases from the installed `vendor/nativephp/mobile-ui` / `vendor/nativephp/mobile` package when available.
- Typed enum-case completion for bindings such as `:ios="Ios::..."`, `:android="Android::..."`, and `:android="AndroidOutlined::..."`.
- `NativePHP EDGE: Refresh Project Icon Catalog` command.
- `nativephpEdge.icons.generatedPath` setting for projects that generate icons outside `app/Icons`.

### Changed
- String icon completion now prefers definitions discovered in the installed NativePHP project, with bundled fallbacks only when needed.
- Icon completion details show when values came from the current project.
- Marketplace metadata and documentation were polished for public release.
- Added explicit free pricing, gallery banner metadata, support documentation, and repository-focused README cleanup.

## 0.4.1

### Fixed

- Fixed icon value IntelliSense for `<native:icon name="...">`.
- Icon suggestions now take precedence over generic attribute suggestions while the cursor is inside `name`, `ios`, `android`, and supported icon-valued attributes.
- Typing a partial icon name now filters the NativePHP icon completion list correctly.

## 0.4.0

### Added
- NativePHP EDGE syntax highlighting for `native:*` component tags.
- Dedicated syntax scopes for EDGE component names.
- Highlighting for Blade-style event attributes such as `@press` and `@change`.
- Highlighting for bound attributes such as `:size`, `:ios`, and `:android`.
- Highlighting for `native:*` attributes.
- Highlighting for accessibility attributes such as `a11y-label`.
- Theme-aware syntax coloring that follows the user's active VS Code color theme.

### Retained
- NativePHP v4 EDGE component and attribute completion.
- Cross-platform, iOS SF Symbol, and Android Material Icon completion.
- Hover documentation for EDGE components and common attributes.
- Diagnostics for unknown EDGE components and undocumented attributes.
- Blade-safe document formatting.

## 0.3.0

### Added
- NativePHP cross-platform icon completion.
- iOS SF Symbol and Android Material Icon suggestions for platform-specific icon attributes.
- Hover documentation for components and common attributes.
- Diagnostics for unknown EDGE components and undocumented attributes.
- Marketplace-ready README metadata and extension icon.
- MIT license.

### Changed
- Improved formatter behavior to preserve PHP, Blade `@verbatim`, `<script>`, and `<style>` blocks.

## 0.2.0

### Added
- Expanded autocomplete coverage for documented NativePHP v4 EDGE components.
- Expanded component-specific and shared EDGE attribute completion.

## 0.1.0

### Added
- Initial NativePHP EDGE component autocomplete prototype.
- Initial EDGE attribute autocomplete.
- Initial EDGE utility-class suggestions.
- Initial Blade/EDGE document formatter.
