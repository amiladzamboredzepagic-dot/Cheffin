import type { ReactNode } from 'react'
import {
  SectionIntroductionDescription,
  SectionIntroductionEyebrow,
  SectionIntroductionRoot,
  SectionIntroductionTitle,
  SectionIntroductionWithAction,
  type SectionIntroductionVariant,
} from './SectionIntroduction.styles'

interface SectionIntroductionProps {
  eyebrow: ReactNode
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
  titleId?: string
  titleLevel?: 'h1' | 'h2'
  variant?: SectionIntroductionVariant
}

export function SectionIntroduction({
  eyebrow,
  title,
  description,
  action,
  titleId,
  titleLevel = 'h2',
  variant = 'page',
}: SectionIntroductionProps) {
  const introduction = (
    <SectionIntroductionRoot
      introVariant={variant}
      direction="column"
      align="stretch"
    >
      <SectionIntroductionEyebrow introVariant={variant}>
        {eyebrow}
      </SectionIntroductionEyebrow>
      <SectionIntroductionTitle
        as={titleLevel}
        id={titleId}
        introVariant={variant}
      >
        {title}
      </SectionIntroductionTitle>
      {description !== undefined && (
        <SectionIntroductionDescription introVariant={variant}>
          {description}
        </SectionIntroductionDescription>
      )}
    </SectionIntroductionRoot>
  )

  if (action == null || typeof action === 'boolean') return introduction

  return (
    <SectionIntroductionWithAction>
      {introduction}
      {action}
    </SectionIntroductionWithAction>
  )
}
