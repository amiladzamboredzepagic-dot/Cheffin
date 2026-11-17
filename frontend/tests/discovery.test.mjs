import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import {
  discoveryRecipes,
  emptyFilters,
  matchesFilters,
} from '../src/features/discovery/discovery.data.ts'

const recipe = discoveryRecipes[0]

test('combines dietary restrictions and filter groups', () => {
  const filters = { ...emptyFilters(), diets: ['vegan', 'glutenFree'] }
  assert.equal(
    matchesFilters(
      discoveryRecipes.find((item) => item.id === 'bowl'),
      filters,
    ),
    false,
  )
  assert.equal(
    matchesFilters(
      discoveryRecipes.find((item) => item.id === 'citrus'),
      filters,
    ),
    true,
  )
  assert.equal(
    matchesFilters(
      discoveryRecipes.find((item) => item.id === 'citrus'),
      {
        ...filters,
        times: ['under15', 'from15to30'],
        cuisines: ['mediterranean'],
      },
    ),
    false,
  )
})

test('cooking time ranges cover their boundaries without overlap', () => {
  for (const [minutes, time] of [
    [14, 'under15'],
    [15, 'from15to30'],
    [29, 'from15to30'],
    [30, 'from30to60'],
    [60, 'from30to60'],
    [61, 'over60'],
  ]) {
    assert.equal(
      matchesFilters(
        { ...recipe, minutes },
        { ...emptyFilters(), times: [time] },
      ),
      true,
    )
    assert.equal(
      ['under15', 'from15to30', 'from30to60', 'over60'].filter((value) =>
        matchesFilters(
          { ...recipe, minutes },
          { ...emptyFilters(), times: [value] },
        ),
      ).length,
      1,
    )
  }
})

test('recipes without classification do not match unsupported filters', () => {
  const published = {
    ...recipe,
    diets: [],
    difficulty: undefined,
    cuisine: undefined,
  }
  assert.equal(matchesFilters(published, emptyFilters()), true)
  assert.equal(
    matchesFilters(published, { ...emptyFilters(), times: ['from15to30'] }),
    true,
  )
  for (const filters of [
    { ...emptyFilters(), diets: ['vegan'] },
    { ...emptyFilters(), difficulties: ['easy'] },
    { ...emptyFilters(), cuisines: ['italian'] },
  ]) {
    assert.equal(matchesFilters(published, filters), false)
  }
})

test('discovery and card translations exist for every supported language', () => {
  const load = (language) =>
    JSON.parse(
      readFileSync(
        new URL(`../src/i18n/locales/${language}.json`, import.meta.url),
        'utf8',
      ),
    )
  const keys = (value, prefix = '') =>
    Object.entries(value).flatMap(([key, child]) =>
      typeof child === 'string'
        ? [`${prefix}${key}`]
        : keys(child, `${prefix}${key}.`),
    )
  const english = load('en')
  for (const language of ['bs', 'de']) {
    const translated = load(language)
    for (const section of [
      'discovery',
      'recipeCard',
      'library',
      'recipeCreate',
    ]) {
      const requiredKeys = keys(english[section]).filter(
        (key) => !key.endsWith('_one') && !key.endsWith('_other'),
      )
      const translatedKeys = keys(translated[section])
      assert.deepEqual(
        requiredKeys.filter((key) => !translatedKeys.includes(key)),
        [],
        `${language}: missing ${section} keys`,
      )
    }
  }
})
