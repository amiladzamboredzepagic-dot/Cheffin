import assert from 'node:assert/strict'
import test from 'node:test'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer } from 'vite'

test('only cards with a details action have a separate accessible open button', async () => {
  const server = await createServer({
    server: { middlewareMode: true, hmr: false },
    appType: 'custom',
  })

  try {
    await server.ssrLoadModule('/src/i18n/index.ts')
    const { RecipeCard } = await server.ssrLoadModule(
      '/src/components/RecipeCard.tsx',
    )
    const props = {
      title: 'Soup',
      imageUrl: '',
      imageAlt: 'Soup',
      metadata: '15 min',
    }
    const plain = renderToStaticMarkup(createElement(RecipeCard, props))
    const interactive = renderToStaticMarkup(
      createElement(RecipeCard, {
        ...props,
        onOpen: () => {},
        openLabel: 'View Soup',
      }),
    )
    assert.doesNotMatch(plain, /aria-haspopup="dialog"/)
    assert.match(interactive, /aria-label="View Soup" aria-haspopup="dialog"/)
    assert.match(interactive, /aria-label="Save Soup"/)
    const { DiscoveryRecipeGrid } = await server.ssrLoadModule(
      '/src/features/discovery/components/DiscoveryRecipeGrid.tsx',
    )
    const { discoveryRecipes } = await server.ssrLoadModule(
      '/src/features/discovery/discovery.data.ts',
    )
    const sample = discoveryRecipes[0]
    const published = {
      ...sample,
      source: 'published',
      id: 'public',
      title: 'Published soup',
      description: 'Soup',
      ingredients: ['Tomato'],
      steps: ['Cook'],
      servings: 2,
    }
    const markup = renderToStaticMarkup(
      createElement(DiscoveryRecipeGrid, { recipes: [sample, published] }),
    )
    assert.match(
      markup,
      /aria-label="View Green goddess salad" aria-haspopup="dialog"/,
    )
    assert.match(
      markup,
      /aria-label="View Published soup" aria-haspopup="dialog"/,
    )
  } finally {
    await server.close()
  }
})
