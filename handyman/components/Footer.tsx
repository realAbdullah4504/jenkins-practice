import { FooterData } from "@/constants/landingPage";
import Link from "next/link";
import React from "react";
import { BsFacebook, BsLinkedin, BsTwitter } from "react-icons/bs";

const FooterNavigation = () => (
  <React.Fragment>
    <nav className="m-2 space-y-7">
      <h2 className="text-2xl font-bold">Sobre Nosotros</h2>
      <div className="text-gray-500">
        <ul className="list-none space-y-2">
          {FooterData.AboutUS.map(({ id, title, link }) => (
            <FooterLinks key={id} title={title} link={link} />
          ))}
        </ul>
      </div>
    </nav>
    <nav className="m-2 space-y-7">
      <h2 className="text-2xl font-bold">Enlaces Rápidos</h2>
      <div className="text-gray-500">
        <ul className="list-none space-y-2">
          {FooterData.QuickLinks.map(({ id, title, link }) => (
            <FooterLinks key={id} title={title} link={link} />
          ))}
        </ul>
      </div>
    </nav>
    <nav className="m-2 space-y-7">
      <h2 className="text-2xl font-bold">Soporte</h2>
      <div className="text-gray-500">
        <ul className="list-none space-y-2">
          {FooterData.support.map(({ id, title, link }) => (
            <FooterLinks key={id} title={title} link={link} />
          ))}
        </ul>
      </div>
    </nav>
    <div />
  </React.Fragment>
);
const FooterLinks = ({ title, link }: { title: string; link: string }) => {
  return (
    <li>
      <Link href={link} title={title} aria-label={title}>
        {title}
      </Link>
    </li>
  );
};
export default function Footer() {
  return (
    <footer className="w-full bg-mainBackground">
      <div className="flex justify-between gap-10 mb-20 Container px-5 py-3 pt-10 flex-wrap ">
        <section className="sm:basis-1/2 grow-0 space-y-7 basis-auto">
          <h1 className="text-2xl font-bold">Servicio de Reparaciones</h1>
          <p className="text-gray-500 lg:w-2/3 w-full">
            ¿Buscas un servicio específico de mejora del hogar? Nuestra
            plataforma te permite elegir entre una variedad de servicios y te
            conecta con un hábil reparador que puede ayudarte a realizar el
            trabajo. Simplemente selecciona el servicio que necesitas y describe
            la tarea en detalle.
          </p>
        </section>
        <div className="flex-grow">
          <div className="flex justify-between flex-wrap">
            <FooterNavigation />
          </div>
        </div>
      </div>
      <div className="border-t-2">
        <div className="container mx-auto flex items-center justify-between py-5 flex-wrap px-4 gap-4">
          <div className="flex gap-10 items-center">
            {/* <Link href={"#"} title="Facebook">
              <BsFacebook className="text-2xl" />
            </Link> */}
            <Link href={"#"} title="Twitter">
              <BsTwitter className="text-2xl" />
            </Link>
            <Link href={"#"} title="LinkedIn">
              <BsLinkedin className="text-2xl" />
            </Link>
          </div>
          <div className="text-sm">
            <span>
              Todos los derechos reservados - Servicios de Reparaciones 2023
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
