import { ArcMark } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Button, Container, Eyebrow } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center py-32">
      <Container size="narrow" className="text-center">
        <Reveal className="flex justify-center">
          <ArcMark className="h-10 w-10 text-sage" />
        </Reveal>
        <Eyebrow className="mt-9 justify-center">Error 404</Eyebrow>
        <Reveal as="h1" delay={110} className="mt-8 text-display font-light">
          Esta página
          <br />
          <span className="italic text-terra-deep">no existe</span>
        </Reveal>
        <Reveal as="p" delay={200} className="mx-auto mt-7 max-w-[42ch] text-lead font-light text-bark-soft">
          Puede que el enlace haya cambiado. Vuelve al inicio y sigue desde ahí.
        </Reveal>
        <Reveal delay={290} className="mt-11 flex flex-col items-center gap-3.5 sm:flex-row sm:justify-center">
          <Button href="/">Volver al inicio</Button>
          <Button href="/clases" variant="outline">
            Ver las clases
          </Button>
        </Reveal>
      </Container>
    </div>
  );
}
