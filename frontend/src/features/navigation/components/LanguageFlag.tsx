export type LanguageCode = 'en' | 'bs' | 'de'

interface LanguageFlagProps {
  language: LanguageCode
}

export function LanguageFlag({ language }: LanguageFlagProps) {
  const flagContents = {
    en: (
      <>
        <path fill="#012169" d="M0 0h36v24H0z" />
        <path
          stroke="#fff"
          strokeWidth="5"
          d="m0 0 36 24M36 0 0 24"
        />
        <path
          stroke="#c8102e"
          strokeWidth="2"
          d="m0 0 36 24M36 0 0 24"
        />
        <path stroke="#fff" strokeWidth="8" d="M18 0v24M0 12h36" />
        <path stroke="#c8102e" strokeWidth="4" d="M18 0v24M0 12h36" />
      </>
    ),
    bs: (
      <>
        <path fill="#002395" d="M0 0h36v24H0z" />
        <path fill="#fecb00" d="M13 1h22v22z" />
        <path
          fill="#fff"
          d="m15 3 1.15 2.35 2.6.38-1.88 1.83.44 2.59L15 8.93l-2.31 1.22.44-2.59-1.88-1.83 2.6-.38L15 3Zm4.7 4.7 1.15 2.35 2.6.38-1.88 1.83.44 2.59-2.31-1.22-2.31 1.22.44-2.59-1.88-1.83 2.6-.38L19.7 7.7Zm4.7 4.7 1.15 2.35 2.6.38-1.88 1.83.44 2.59-2.31-1.22-2.31 1.22.44-2.59-1.88-1.83 2.6-.38 1.15-2.35Z"
        />
      </>
    ),
    de: (
      <>
        <path fill="#000" d="M0 0h36v8H0z" />
        <path fill="#d00" d="M0 8h36v8H0z" />
        <path fill="#ffce00" d="M0 16h36v8H0z" />
      </>
    ),
  }[language]

  return (
    <svg
      aria-hidden="true"
      width="28"
      height="20"
      viewBox="0 0 36 24"
      focusable="false"
      style={{ display: 'block', borderRadius: 3 }}
    >
      {flagContents}
    </svg>
  )
}
