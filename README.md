# NativePHP EDGE Tools

VS Code tooling for **NativePHP Mobile v4 EDGE** Blade components.

## Features

- **Per-component API reference** — hover each `<native:...>` component to see its own Props, Events, Bindings, Children, Notes, and inherited shared EDGE capabilities as separate sections.

### EDGE component completion

Type:

```blade
<native:
```

and get completion for the bundled EDGE components and child components.

### Attribute completion

Inside an EDGE tag, the extension suggests documented component attributes plus shared layout, styling, accessibility and gesture attributes.

```blade
<native:button
    label="Save"
    variant="primary"
    @press="save"
/>
```

### Project-aware icon completion

The extension reads icon definitions from the NativePHP v4 project currently open in VS Code.

Run the NativePHP generator in your Laravel project when needed:

```bash
php artisan native-ui:generate-icons
```

By default the extension reads:

- `app/Icons/Ios.php`
- `app/Icons/Android.php`
- `app/Icons/AndroidOutlined.php`

It also inspects the installed `vendor/nativephp/mobile-ui` / `vendor/nativephp/mobile` package for shared icon aliases. If you generate enums elsewhere, set `nativephpEdge.icons.generatedPath`.

Examples:

```blade
<native:icon name="home" />
<native:icon ios="gearshape" android="settings" />
<native:icon :ios="Ios::Gearshape" :android="Android::Settings" />
<native:icon :android="AndroidOutlined::Home" />
```

Use **NativePHP EDGE: Refresh Project Icon Catalog** after regenerating icons if you want to refresh immediately.

### Syntax highlighting

NativePHP EDGE tags receive dedicated TextMate scopes, so `<native:column>`, `<native:icon>`, `@press`, bound `:props`, `native:*` attributes, and `a11y-*` attributes are visually distinguished using your active VS Code theme.

The extension intentionally does not hard-code colors, so highlighting works in both light and dark themes.

### Hover documentation

Hover an EDGE component or supported attribute to see a short description, allowed values where known, and a link to the NativePHP v4 documentation.

### Diagnostics

The extension reports:

- unknown `<native:...>` component names as errors;
- attributes not documented for the detected EDGE component as warnings.

Diagnostics are intentionally conservative around Blade bindings and directives such as `:value`, `@press`, `native:model`, `wire:*` and `x-*`.

### Blade-safe formatter

Use **Format Document** or run:

`NativePHP EDGE: Format Document`

The formatter focuses on indentation of EDGE tags and common Blade control directives. It avoids rewriting PHP blocks, `@verbatim` blocks, `<script>` and `<style>` contents.

## Installation

Install from the Visual Studio Marketplace once published, or install a local `.vsix` package from VS Code using **Extensions: Install from VSIX...**.

## Usage

Open a Laravel Blade file and type:

```blade
<native:
```

Use `Ctrl+Space` / `Control+Space` to manually trigger completion when needed.

For formatting, use VS Code's **Format Document** command or run **NativePHP EDGE: Format Document** from the Command Palette.

### Per-component props and events

Hover a component such as:

```blade
<native:modal :visible="$showModal" @dismiss="closeModal">
```

The hover panel separates the component API into:

- **Props** — props specific to that EDGE component.
- **Events** — events emitted/handled by that component.
- **Bindings** — e.g. `native:model` where supported.
- **Children** — expected/natural child EDGE components.
- **Notes** — component-specific behavior and constraints.
- **Shared EDGE capabilities** — inherited layout/style props and shared gesture events.

Attribute completion uses the same classification, so `@dismiss` is shown as an event while `visible` is shown as a prop.

## Configuration

```json
{
    "nativephpEdge.format.indentSize": 4,
    "nativephpEdge.completion.tailwindLikeClasses": true,
    "nativephpEdge.icons.generatedPath": "app/Icons"
}
```

## Recommended VS Code setup

This extension complements, rather than replaces:

- PHP Intelephense
- a Blade language extension
- Tailwind CSS IntelliSense if you also want broad utility-class suggestions

Because multiple extensions can provide Blade language tooling, test your preferred Blade extension alongside NativePHP EDGE Tools and report any compatibility issues.

## NativePHP documentation

This release targets the NativePHP Mobile **v4 EDGE** documentation:

- https://nativephp.com/docs/mobile/4/edge-components/introduction
- https://nativephp.com/docs/mobile/4/edge-components/icon

## Marketplace

Publisher: **Nopticon**

Extension ID:

`Nopticon.nativephp-edge-tools`

Repository:

https://github.com/nopticon/nativephp-edge-tools

Issues:

https://github.com/nopticon/nativephp-edge-tools/issues

## Disclaimer

This is a community editor extension and is not an official NativePHP product. NativePHP may add or change components and props; update the component metadata in the extension when the upstream documentation changes.

## License

MIT. See the bundled `LICENSE` file.
