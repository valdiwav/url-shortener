import { LuArrowDown, LuArrowRight, LuChartNoAxesColumnIncreasing, LuCopy, LuGlobe, LuLink2, LuQrCode, LuSquarePen } from "react-icons/lu";
import Brand from "./components/Brand";
import Shortener from "./components/Shortener";

const features = [
  { icon: LuQrCode, title: "Códigos QR", description: "Descarga el QR de tu enlace para usarlo en carteles, presentaciones o tarjetas.", color: "lilac" },
  { icon: LuChartNoAxesColumnIncreasing, title: "Conteo de clics", description: "Consulta cuántas veces se ha abierto cada enlace desde tu panel.", color: "lime" },
  { icon: LuSquarePen, title: "Destinos editables", description: "Actualiza la URL de destino y sigue compartiendo el mismo enlace corto.", color: "peach" },
];

export default function Home() {
  return (
    <>
      <main className="frame">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow"><span /> ACORTADOR DE ENLACES</div>
            <h1 id="hero-title">Acorta tus links.<br /><em>Compártelos mejor.</em></h1>
            <p>Convierte cualquier URL en un enlace que da gusto compartir. Crea su QR y sigue los clics desde un mismo lugar.</p>
            <a href="#acortar" className="hero-jump">Probar el acortador <LuArrowDown aria-hidden="true" /></a>
          </div>
          <figure className="hero-art" aria-label="Ejemplo. Una dirección larga se convierte en un enlace LnKut">
            <div className="art-grid" aria-hidden="true" />
            <div className="art-orbit art-orbit-one" aria-hidden="true" />
            <div className="art-orbit art-orbit-two" aria-hidden="true" />
            <span className="art-label">EJEMPLO DE ENLACE</span>
            <div className="art-diagram" aria-hidden="true">
              <div className="art-row art-origin">
                <span className="art-icon"><LuGlobe /></span>
                <div><small>URL ORIGINAL</small><strong>ejemplo.com/proyectos/coleccion</strong></div>
              </div>
              <div className="art-connector"><span><LuArrowDown /></span></div>
              <div className="art-row art-result">
                <span className="art-icon"><LuLink2 /></span>
                <div><small>ENLACE CORTO</small><strong>lnkut.vercel.app/<b>m7vk2p</b></strong></div>
                <LuCopy className="art-copy" />
              </div>
            </div>
            <div className="art-spark" aria-hidden="true">✳</div>
            <div className="art-corner" aria-hidden="true"><LuArrowRight /></div>
          </figure>
        </section>

        <section className="shortener-panel" id="acortar" aria-labelledby="shortener-title">
          <div className="shortener-intro">
            <span className="section-icon lime"><LuLink2 aria-hidden="true" /></span>
            <h2 id="shortener-title">Acorta un enlace</h2>
          </div>
          <Shortener />
        </section>

        <section id="herramientas" className="features" aria-labelledby="features-title">
          <h2 id="features-title">Tus enlaces, bajo control.</h2>
          <div className="features-grid">
            {features.map(({ icon: Icon, title, description, color }) => (
              <article className="feature" key={title}>
                <span className={"section-icon " + color}><Icon aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="frame footer-inner">
          <Brand />
          <span>Hecho por Álvaro</span>
          <a href="#acortar">Volver al acortador <LuArrowRight aria-hidden="true" /></a>
        </div>
      </footer>
    </>
  );
}
