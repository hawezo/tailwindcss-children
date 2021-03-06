# Children Variant Plugin for Tailwind CSS

## Installation

```bash
npm install tailwindcss-children
```

## Usage

```js
// tailwind.config.js
{
  variants: {
    display: ['children', 'default', 'odd-children', 'even-children', 'first-child', 'last-child', 'children-hover', 'hover', 'children-focus', 'focus', 'children-focus-within', 'focus-within', 'children-active', 'active', 'children-visited', 'visited', 'children-disabled', 'disabled', 'responsive'],
  },
  plugins: [
    require('tailwindcss-children')(),
  ],
}
```

The above configuration would generate the following CSS:

```css
.children\:block > * {
  display: block;
}

.block {
  display: block;
}

.odd-children\:block > :nth-child(odd) {
  display: block;
}

.even-children\:block > :nth-child(even) {
  display: block;
}

.first-child\:block > :first-child {
  display: block;
}

.last-child\:block > :last-child {
  display: block;
}

.children\:hover\:block > :hover {
  display: block;
}

.hover\:block:hover {
  display: block;
}

.children\:focus\:block > :focus {
  display: block;
}

.focus\:block:focus {
  display: block;
}

.children\:focus-within\:block > :focus-within {
  display: block;
}

.focus-within\:block:focus-within {
  display: block;
}

.children\:active\:block > :active {
  display: block;
}

.active\:block:active {
  display: block;
}

.children\:visited\:block > :visited {
  display: block;
}

.visited\:block:visited {
  display: block;
}

.children\:disabled\:block > :disabled {
  display: block;
}

.disabled\:block:disabled {
  display: block;
}

/* etc. */
```

Which you can then use in your HTML like this:

```html
<ul class="children:block children:border-b children:border-gray last-child:border-b-0 children:hover:bg-gray">
  <li>
    First item
  </li>
  <li>
    Second item
  </li>
  <li>
    Last item, this one doesn't have a bottom border
  </li>
</ul>
```

You can also override `children:` classes on specific children if needed:

```html
<ul class="children:block children:bg-gray">
  <li>
    First item
  </li>
  <li class="bg-red">
    Second item, this one has a red background
  </li>
  <li class="bg-blue">
    Third item, this one has a blue background
  </li>
  <li>
    Last item
  </li>
</ul>
```

The above depends on the order of the generated CSS, so make sure to add the `default` variant *after* the `children` one in the array of variants (as well as the `hover` variant after the `children-hover` variant if you want to override a `children-hover:` utility, etc.).
