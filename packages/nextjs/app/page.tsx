"use client";

import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen">
      {/* Hero Section */}
      <header className="relative pt-24 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            Revolucionando el Crédito en la
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              {" "}
              Era Web3
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Acceso democratizado a créditos basados en tu actividad blockchain. Construye tu reputación financiera y
            accede a capital de forma transparente.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/dashboard"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all flex items-center"
            >
              Comenzar ahora
              <ChevronRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </header>

      {/* Problem Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">El Problema Actual</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Millones de trabajadores en cripto permanecen excluidos del sistema financiero tradicional
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              ["1.4B+", "Trabajadores remotos globales"],
              ["<15%", "Acceso a crédito en Latam"],
              ["72M+", "Reciben pagos en cripto"],
            ].map(([value, label]) => (
              <div key={label} className="bg-gray-700 p-6 rounded-xl">
                <div className="text-3xl font-bold text-purple-400 mb-2">{value}</div>
                <div className="text-gray-300">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Nuestra Solución</h2>
              <p className="text-gray-400 mb-8">
                Plataforma descentralizada que transforma tu actividad blockchain en historial crediticio
              </p>
              <ul className="space-y-4">
                {[
                  "Créditos avalados por empresas",
                  "Reputación financiera portable",
                  "Análisis on-chain automatizado",
                  "Sistema de recompensas integrado",
                ].map(feature => (
                  <li key={feature} className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-1 rounded-2xl">
                <div className="bg-gray-900 rounded-xl p-6 h-full">
                  <div className="aspect-w-16 aspect-h-9">
                    <div className="animate-pulse bg-gray-800 rounded-lg h-full flex items-center justify-center">
                      <span className="text-gray-600">Demo Interactiva</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Nuestra Ventaja</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              ["🔐 Seguridad Descentralizada", "Smart contracts auditados y verificación on-chain"],
              ["📈 Reputación Portable", "Lleva tu historial crediticio entre redes y plataformas"],
              ["💸 Liquidez Instantánea", "Acceso inmediato a capital mediante stablecoins"],
            ].map(([title, description]) => (
              <div
                key={title}
                className="bg-gray-700 p-6 rounded-xl hover:transform hover:-translate-y-2 transition-all"
              >
                <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
                <p className="text-gray-400">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-6">Comienza a Construir Tu Futuro Financiero</h2>
          <p className="text-gray-200 mb-8">Regístrate y descubre tu elegibilidad en minutos</p>
          <Link
            href="/signup"
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all"
          >
            Crear Cuenta Gratis
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center space-x-6 mb-8">
            <a href="#" className="text-gray-400 hover:text-white">
              Documentación
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Blog
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Contacto
            </a>
          </div>
          <div className="flex justify-center space-x-6 mb-8">
            <img src="/avalanche-logo.svg" className="h-8" alt="Avalanche" />
            <img src="/chainlink-logo.svg" className="h-8" alt="Chainlink" />
            <img src="/solidity-logo.svg" className="h-8" alt="Solidity" />
          </div>
          <p className="text-gray-400">&copy; 2025 CryptoCredits. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
