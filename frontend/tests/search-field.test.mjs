import assert from 'node:assert/strict'
import test from 'node:test'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer } from 'vite'

test('shows the pantry button only when requested', async () => {
  const server = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  })

  try {
    await server.ssrLoadModule('/src/i18n/index.ts')
    const { SearchField } = await server.ssrLoadModule(
      '/src/components/ui/forms/SearchField.tsx',
    )
    const props = { value: '', onChange: () => {}, placeholder: 'Search' }
    const hidden = renderToStaticMarkup(createElement(SearchField, props))
    const shown = renderToStaticMarkup(
      createElement(SearchField, { ...props, showPantryButton: true }),
    )

    assert.doesNotMatch(hidden, /<button/)
    assert.match(shown, /<button[^>]*disabled/)
    assert.match(shown, /Cook with my pantry/)
    assert.match(shown, /aria-describedby="[^"]+"/)
    assert.match(shown, /Pantry discovery is coming soon/)
  } finally {
    await server.close()
  }
})
