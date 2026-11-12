const MAX_BASE64_CHUNK_SIZE = 0x8000

export async function encodePhoto(photo: File): Promise<string> {
  const bytes = new Uint8Array(await photo.arrayBuffer())
  const chunks: string[] = []

  for (let offset = 0; offset < bytes.length; offset += MAX_BASE64_CHUNK_SIZE) {
    chunks.push(
      String.fromCharCode(
        ...bytes.subarray(offset, offset + MAX_BASE64_CHUNK_SIZE),
      ),
    )
  }

  return btoa(chunks.join(''))
}
