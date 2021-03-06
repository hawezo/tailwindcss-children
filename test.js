const _ = require('lodash');
const cssMatcher = require('jest-matcher-css');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const childrenPlugin = require('./index.js');

const generatePluginCss = (variants = [], tailwindOptions = {}, css = null) => {
  return postcss(
    tailwindcss({
      theme: {
        screens: {
          'sm': '640px',
        },
      },
      corePlugins: false,
      plugins: [
        childrenPlugin(),
        ({ addUtilities }) => {
          addUtilities(css ? css : {
            '.block': {
              'display': 'block',
            },
          }, variants);
        },
      ],
      ...tailwindOptions,
    })
  )
  .process('@tailwind utilities', {
    from: undefined,
  })
  .then(result => {
    return result.css;
  });
};

expect.extend({
  toMatchCss: cssMatcher,
});

test('the plugin doesn’t do anything if the variants aren’t used', () => {
  return generatePluginCss().then(css => {
    expect(css).toMatchCss(`
      .block {
        display: block;
      }
    `);
  });
});

test('the children variant is working', () => {
  return generatePluginCss(['children']).then(css => {
    expect(css).toMatchCss(`
      .block {
        display: block;
      }
      .children\\:block > * {
        display: block;
      }
    `);
  });
});

test('the children variant can be generated before the default variant', () => {
  return generatePluginCss(['children', 'default']).then(css => {
    expect(css).toMatchCss(`
      .children\\:block > * {
        display: block;
      }
      .block {
        display: block;
      }
    `);
  });
});

test('all the variants are working', () => {
  return generatePluginCss(['children', 'default', 'odd-children', 'even-children', 'first-child', 'last-child', 'children-hover', 'hover', 'children-focus', 'focus', 'children-focus-within', 'focus-within', 'children-active', 'active', 'children-visited', 'visited', 'children-disabled', 'disabled']).then(css => {
    expect(css).toMatchCss(`
      .children\\:block > * {
        display: block;
      }
      .block {
        display: block;
      }
      .odd-children\\:block > :nth-child(odd) {
        display: block;
      }
      .even-children\\:block > :nth-child(even) {
        display: block;
      }
      .first-child\\:block > :first-child {
        display: block;
      }
      .last-child\\:block > :last-child {
        display: block;
      }
      .children\\:hover\\:block > :hover {
        display: block;
      }
      .hover\\:block:hover {
        display: block;
      }
      .children\\:focus\\:block > :focus {
        display: block;
      }
      .focus\\:block:focus {
        display: block;
      }
      .children\\:focus-within\\:block > :focus-within {
        display: block;
      }
      .focus-within\\:block:focus-within {
        display: block;
      }
      .children\\:active\\:block > :active {
        display: block;
      }
      .active\\:block:active {
        display: block;
      }
      .children\\:visited\\:block > :visited {
        display: block;
      }
      .visited\\:block:visited {
        display: block;
      }
      .children\\:disabled\\:block > :disabled {
        display: block;
      }
      .disabled\\:block:disabled {
        display: block;
      }
    `);
  });
});

test('all variants can be chained with the responsive variant', () => {
  return generatePluginCss(['children', 'default', 'odd-children', 'even-children', 'first-child', 'last-child', 'children-hover', 'children-focus', 'children-focus-within', 'children-active', 'children-visited', 'children-disabled', 'responsive']).then(css => {
    expect(css).toMatchCss(`
      .children\\:block > * {
        display: block;
      }
      .block {
        display: block;
      }
      .odd-children\\:block > :nth-child(odd) {
        display: block;
      }
      .even-children\\:block > :nth-child(even) {
        display: block;
      }
      .first-child\\:block > :first-child {
        display: block;
      }
      .last-child\\:block > :last-child {
        display: block;
      }
      .children\\:hover\\:block > :hover {
        display: block;
      }
      .children\\:focus\\:block > :focus {
        display: block;
      }
      .children\\:focus-within\\:block > :focus-within {
        display: block;
      }
      .children\\:active\\:block > :active {
        display: block;
      }
      .children\\:visited\\:block > :visited {
        display: block;
      }
      .children\\:disabled\\:block > :disabled {
        display: block;
      }
      @media (min-width: 640px) {
        .sm\\:children\\:block > * {
          display: block;
        }
        .sm\\:block {
          display: block;
        }
        .sm\\:odd-children\\:block > :nth-child(odd) {
          display: block;
        }
        .sm\\:even-children\\:block > :nth-child(even) {
          display: block;
        }
        .sm\\:first-child\\:block > :first-child {
          display: block;
        }
        .sm\\:last-child\\:block > :last-child {
          display: block;
        }
        .sm\\:children\\:hover\\:block > :hover {
          display: block;
        }
        .sm\\:children\\:focus\\:block > :focus {
          display: block;
        }
        .sm\\:children\\:focus-within\\:block > :focus-within {
          display: block;
        }
        .sm\\:children\\:active\\:block > :active {
          display: block;
        }
        .sm\\:children\\:visited\\:block > :visited {
          display: block;
        }
        .sm\\:children\\:disabled\\:block > :disabled {
          display: block;
        }
      }
    `);
  });
});

test('the variants work well with Tailwind’s prefix option', () => {
  return generatePluginCss(['children', 'default', 'first-child'], {
    prefix: 'tw-',
  }).then(css => {
    expect(css).toMatchCss(`
      .children\\:tw-block > * {
        display: block;
      }
      .tw-block {
        display: block;
      }
      .first-child\\:tw-block > :first-child {
        display: block;
      }
    `);
  });
});

/* TODO: This test fails */
/*
test('the variants work on utilities that include pseudo-elements', () => {
  return generatePluginCss(['children', 'default', 'first-child'], {}, {
    '.placeholder-gray-400::placeholder': {
      'color': '#cbd5e0',
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .children\\:placeholder-gray-400 > *::placeholder {
        color: #cbd5e0;
      }
      .placeholder-gray-400::placeholder {
        color: #cbd5e0;
      }
      .first-child\\:placeholder-gray-400 > :first-child::placeholder {
        color: #cbd5e0;
      }
    `);
  });
});
*/
