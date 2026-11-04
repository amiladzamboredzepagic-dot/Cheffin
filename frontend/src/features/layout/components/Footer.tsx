import { Flex } from '../../../components/ui/Flex'
import { FooterContainer, BrandMotto, FooterLink } from './Footer.styles'

const FOOTER_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Contact Us', href: '/contact' },
]

export function Footer() {
  return (
    <FooterContainer component="footer" justify="space-between">
      <BrandMotto>
        Curated for home chefs, cherished by the whole table.
      </BrandMotto>

      <Flex gap={2.5}>
        {FOOTER_LINKS.map((link) => (
          <FooterLink key={link.label} href={link.href}>
            {link.label}
          </FooterLink>
        ))}
      </Flex>
    </FooterContainer>
  )
}
