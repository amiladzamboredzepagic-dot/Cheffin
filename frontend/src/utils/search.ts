export function matchesSearch(text: string, query: string, locale?: string) {
  return text
    .toLocaleLowerCase(locale)
    .includes(query.trim().toLocaleLowerCase(locale))
}
