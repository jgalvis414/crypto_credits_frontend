"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DebugContracts } from "../debug/_components/DebugContracts";
import type { NextPage } from "next";
import { useAccount, useAccountEffect, useReadContract } from "wagmi";
import { abi_company_manager, address_company_manager } from "~~/JSON/COMPANY_MANAGER/COMPANY_MANAGER.json";
import externalContracts from "~~/contracts/externalContracts";

const OwnerView: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [isOwner, setIsOwner] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const result = useReadContract({
    abi: abi_company_manager,
    address: address_company_manager,
    functionName: "owner",
  });

  useEffect(() => {
    if (result.data && connectedAddress) {
      setIsOwner(connectedAddress === result.data);
      setIsLoading(false);
    }
  }, [result.data, connectedAddress]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-600 text-lg">Cargando verificación...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {isOwner ? (
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">Bienvenido, Dueño</h1>
            <p className="text-gray-600">Tienes acceso completo al panel de administración.</p>
          </div>
          <DebugContracts />
        </div>
      ) : (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-red-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Acceso restringido</h2>
          <p className="text-gray-600 mb-6">No eres el dueño del contrato y no puedes ver este contenido.</p>
          <Link
            href="/"
            className="inline-block px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      )}
    </div>
  );
};

export default OwnerView;
