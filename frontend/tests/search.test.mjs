import assert from 'node:assert/strict'
import test from 'node:test'
import { matchesSearch } from '../src/utils/search.ts'

test('matches case-insensitively and ignores surrounding query whitespace', () => {
  assert.equal(matchesSearch('Lemon & herb salmon', '  HERB  '), true)
  assert.equal(matchesSearch('Lemon & herb salmon', 'chickpea'), false)
  assert.equal(matchesSearch('Lemon & herb salmon', '  '), true)
})

test('uses the requested locale for case matching', () => {
  assert.equal(matchesSearch('ISPANAK', 'ısp', 'tr'), true)
  assert.equal(matchesSearch('ISPANAK', 'isp', 'tr'), false)
})
