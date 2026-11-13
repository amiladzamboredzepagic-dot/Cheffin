import { Box } from '@mui/material'
import { Folder } from 'lucide-react'
import { CollectionCard } from '../LibraryPage.styles'

interface LibraryCollectionCardProps {
  name: string
}

export function LibraryCollectionCard({ name }: LibraryCollectionCardProps) {
  return (
    <CollectionCard>
      <Folder size={32} aria-hidden="true" />
      <Box
        component="h3"
        sx={{
          m: 0,
          fontFamily: '"Lora", Georgia, serif',
          fontSize: 20,
          fontWeight: 500,
        }}
      >
        {name}
      </Box>
    </CollectionCard>
  )
}
