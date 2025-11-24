import { ArrowLongRight } from "@medusajs/icons"
import { Button, Heading, Text } from "@medusajs/ui"

const Hero = () => {
  return (
    <div style={{backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url("/herobg.png")', position: 'relative', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}} className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <span>
          <Heading
            level="h1"
            className="text-3xl leading-10 text-ui-fg-base font-normal"
            style={{fontWeight: 800}}
          >
            Your Vision, Printed.
          </Heading>
          <Text style={{fontSize: '1.25rem'}} className="mt-4 text-ui-fg-subtle txt-compact-large max-w-2xl">
            Transform ideas from screen to reality with precision 3D printing.
          </Text>
        </span>
        <div style={{gap: '1rem'}} className="flex flex-row mt-4">
          <a
            href="/ke/contact"
          >
            <Button variant="secondary">
              Contact us
            </Button>
          </a>
          <a
            href="/ke/store"
          >
            <Button variant="primary">
              Shop now
              <ArrowLongRight />
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Hero
