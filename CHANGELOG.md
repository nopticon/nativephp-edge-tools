# Changelog

## 1.0.0

### Added

- Component-specific EDGE API metadata with separate props, events, bindings, children, notes, and shared capabilities.
- Project-aware NativePHP v4 icon completion using generated iOS and Android icon enums and installed NativePHP icon definitions.
- Typed enum-case completion for `Ios::`, `Android::`, and `AndroidOutlined::` icon bindings.
- Hover documentation for EDGE components and attributes.
- Diagnostics for invalid EDGE components, attributes, and component-specific events.
- Blade-safe document formatting.
- NativePHP EDGE syntax highlighting.
- Marketplace-ready metadata, support documentation, repository links, and SE branding.

### Changed

- Promoted NativePHP EDGE Tools to the first stable release.
- Improved component-aware autocomplete, icon discovery, diagnostics, and IntelliSense organization.

## 0.5.0

### Added

- Project-aware NativePHP v4 icon discovery.
- Generated `App\\Icons\\Ios`, `App\\Icons\\Android`, and `App\\Icons\\AndroidOutlined` enum support.
- Shared icon discovery from installed NativePHP packages.
- Typed icon enum completion.
- `NativePHP EDGE: Refresh Project Icon Catalog` command.
- `nativephpEdge.icons.generatedPath` configuration setting.

### Changed

- Icon completion prefers definitions from the current NativePHP project with bundled fallbacks when necessary.
- Marketplace metadata and documentation prepared for public release.
