import assert from 'node:assert/strict'
import test from 'node:test'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer } from 'vite'
import { MenuList } from '@mui/material'

test('select options forward accessibility props and compact selects keep an accessible label', async () => {
  const server = await createServer({
    server: { middlewareMode: true, hmr: false },
    appType: 'custom',
  })

  try {
    await server.ssrLoadModule('/src/i18n/index.ts')
    const { SelectMenuOptionRow } = await server.ssrLoadModule(
      '/src/components/ui/menus/SelectMenuOptionRow.tsx',
    )
    const { CustomSelectMenu } = await server.ssrLoadModule(
      '/src/components/ui/menus/CustomSelectMenu.tsx',
    )
    const option = renderToStaticMarkup(
      createElement(
        MenuList,
        null,
        createElement(SelectMenuOptionRow, {
          value: 'quickest',
          label: 'Quickest',
          selected: true,
          role: 'option',
          'aria-selected': true,
        }),
      ),
    )
    assert.match(option, /role="option"/)
    assert.match(option, /aria-selected="true"/)

    const select = renderToStaticMarkup(
      createElement(CustomSelectMenu, {
        label: 'Sort recipes',
        hideLabel: true,
        compact: true,
        searchable: false,
        value: 'quickest',
        options: [{ id: 'quickest', label: 'Quickest' }],
        onChange: () => {},
      }),
    )
    assert.match(select, /role="combobox"[^>]*aria-label="Sort recipes"/)
    assert.doesNotMatch(select, /<label/)
  } finally {
    await server.close()
  }
})
