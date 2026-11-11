import type { ReactNode } from 'react'
import {
  SectionIntroductionDescription,
  SectionIntroductionEyebrow,
  SectionIntroductionRoot,
  SectionIntroductionTitle,
  type SectionIntroductionVariant,
} from './SectionIntroduction.styles'

interface SectionIntroductionProps {
  eyebrow: ReactNode
  title: ReactNode
  description?: ReactNode
  titleId?: string
  titleLevel?: 'h1' | 'h2'
  variant?: SectionIntroductionVariant
}

export function SectionIntroduction({
  eyebrow,
  title,
  description,
  titleId,
  titleLevel = 'h2',
  variant = 'page',
}: SectionIntroductionProps) {
  return (
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
}
