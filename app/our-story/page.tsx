import { Metadata } from "next";
import Image from "next/image";
import { storyBlocks } from "@/content/story";
import { AnimatedReveal } from "@/components/ui/animated-reveal";
import { GoldDivider } from "@/components/ui/divider";
import { OliveBranch, SmallBlossom } from "@/components/floral";

export const metadata: Metadata = {
  title: "Our Story — A Little Forever",
  description: "The story of Jabez & Priya — how they met, grew, and promised to walk through life together.",
};

type BlockProps = { block: typeof storyBlocks[number]; index: number };

function TextBlock({ content }: { content: string }) {
  return (
    <p className="text-walnut text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
      {content}
    </p>
  );
}

function ImageBlock({
  src,
  alt,
  caption,
  side,
  framed,
  handwrittenNote,
}: {
  src: string;
  alt: string;
  caption?: string;
  side?: "left" | "right";
  framed?: boolean;
  handwrittenNote?: string;
}) {
  return (
    <div
      className={`relative my-12 md:my-20 ${
        side === "right" ? "text-right" : "text-left"
      }`}
    >
      <div
        className={`inline-block ${
          framed ? "frame" : ""
        } relative overflow-hidden`}
      >
        {framed && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#E8DCC7] border border-[#493126]/20 z-10" />
        )}
        <Image
          src={src}
          alt={alt}
          width={side === "right" ? 700 : 700}
          height={side === "right" ? 933 : 525}
          className="w-full max-w-[700px] h-auto object-cover block mx-auto md:mx-0"
          loading="lazy"
        />
        {handwrittenNote && (
          <div className={`absolute -bottom-10 ${
            side === "right" ? "right-4" : "left-4"
          } handwritten text-maroon italic text-lg opacity-90 pointer-events-none`}>
            “{handwrittenNote}”
          </div>
        )}
      </div>
      {caption && (
        <p
          className={`mt-4 text-walnut/70 text-sm font-serif tracking-widest italic ${
            side === "right" ? "text-right" : "text-left"
          }`}
        >
          {caption}
        </p>
      )}
    </div>
  );
}

function NoteBlock({ content }: { content: string }) {
  return (
    <div className="my-16 md:my-24 flex justify-center">
      <div className="text-center">
        <p className="handwritten text-3xl md:text-4xl text-maroon italic leading-tight">
          “{content}”
        </p>
      </div>
    </div>
  );
}

export default function OurStory() {
  return (
    <>
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute top-12 left-8 hidden md:block opacity-50">
          <OliveBranch size={72} />
        </div>
        <div className="absolute -right-10 bottom-20 hidden md:block opacity-40 rotate-180">
          <OliveBranch size={64} />
        </div>
        <div className="container relative z-10">
          <AnimatedReveal>
            <div className="max-w-3xl">
              <p className="text-gold font-serif text-xs md:text-sm uppercase tracking-[0.4em] mb-3">
                our story
              </p>
              <h1 className="text-5xl md:text-6xl font-serif font-semibold leading-tight mb-6 text-balance">
                Our Story
              </h1>
              <p className="handwritten text-maroon text-xl italic mb-8 max-w-lg">
                “Different paths, one beautiful journey.”
              </p>
              <p className="text-walnut text-lg md:text-xl leading-relaxed max-w-xl">
                A scrapbook of our journey — the conversations, the quiet
                moments, the laughter, and the day we promised to walk through
                life together.
              </p>
            </div>
          </AnimatedReveal>

          <div className="mt-20 md:mt-28 relative">
            <Image
              src="/uploads/story-02.jpg"
              alt="A prominent photograph of the couple"
              width={900}
              height={600}
              className="w-full h-auto object-cover block mx-auto"
              loading="eager"
            />
            <div className="absolute -inset-2 border border-white/60 rounded-sm pointer-events-none" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 relative">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-12">
            {storyBlocks.map((block, i) => {
              const side = i % 2 === 0 ? "left" : "right";
              switch (block.type) {
                case "text":
                  return (
                    <div
                      key={i}
                      className={`lg:col-span-6 ${
                        side === "right" ? "lg:col-start-7" : "lg:col-start-1"
                      } reveal-delay-1`}
                    >
                      <TextBlock content={block.content} />
                    </div>
                  );
                case "image":
                  return (
                    <div
                      key={i}
                      className={`lg:col-span-6 ${
                        side === "right" ? "lg:col-start-7" : "lg:col-start-1"
                      } reveal-delay-2`}
                    >
                      <ImageBlock
                        src={block.src}
                        alt={block.alt}
                        caption={block.caption}
                        side={block.side ?? side}
                        framed={block.framed}
                        handwrittenNote={block.handwrittenNote}
                      />
                    </div>
                  );
                case "note":
                  return (
                    <div
                      key={i}
                      className="lg:col-span-12 reveal-delay-3"
                    >
                      <NoteBlock content={block.content} />
                    </div>
                  );
                case "divider":
                  return (
                    <div key={i} className="lg:col-span-12 my-4 lg:my-12">
                      <GoldDivider variant="flourish" className="mx-auto w-fit" />
                    </div>
                  );
              }
            })}
          </div>
        </div>
      </section>
    </>
  );
}
