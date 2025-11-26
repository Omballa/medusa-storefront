"use client"

import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Image from "next/image"
import { useState } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [selected, setSelected] = useState(0)

  const selectedImage = images[selected]

  return (
    <div className="flex gap-x-4">
      {/* --- THUMBNAILS --- */}
      <div style={{height:400, overflowY: "scroll"}} className="flex flex-col gap-y-2 w-20">
        {images.map((img, index) => (
          <button
            key={img.id}
            onClick={() => setSelected(index)}
            className={`relative aspect-square w-full overflow-hidden rounded-lg border 
              ${selected === index ? "border-ui-fg-base" : "border-transparent"}`}
          >
            <Image
              src={img.url}
              alt={`Thumbnail ${index + 1}`}
              fill
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* --- MAIN IMAGE --- */}
      <Container
        style={{ width: "100%", height: 500, marginRight: "5%" }}
        className="relative overflow-hidden bg-ui-bg-subtle rounded-xl"
      >
        {selectedImage && (
          <>
            {/* BLURRED BACKGROUND */}
            <Image
              src={selectedImage.url}
              alt="Background blur"
              fill
              className="object-cover blur-xl scale-110"
              sizes="100vw"
            />

            {/* MAIN IMAGE (fit by height, maintain aspect ratio) */}
            <Image
              src={selectedImage.url}
              alt="Selected product image"
              fill
              className="object-contain z-10"
              sizes="(max-width: 768px) 50vw, 400px"
              priority
            />
          </>
        )}
      </Container>

    </div>
  )
}

export default ImageGallery
