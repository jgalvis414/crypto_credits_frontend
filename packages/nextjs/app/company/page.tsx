"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { readContract } from "wagmi/actions";
import { CurrencyDollarIcon, DocumentCheckIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { abi_company_manager, address_company_manager } from "~~/JSON/COMPANY_MANAGER/COMPANY_MANAGER.json";
import { abi, address } from "~~/JSON/USDC_AVAX_FUJI/USDC_AVAX_FUJI.json";

export default function CompanyDashboard() {
  const [approvalAmount, setApprovalAmount] = useState("");
  const { address: connectedAddress } = useAccount();
  const [isCompany, setIsCompany] = useState(false);
  const [companyData, setCompanyData] = useState<any[]>([]);
  const [depositAmount, setDepositAmount] = useState("");
  const [userWallet, setUserWallet] = useState("");
  const [creditData, setCreditData] = useState({
    amount: "",
    installments: "",
    rate: "",
    wallet: "",
  });
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Estados separados para cada transacción
  const [approveHash, setApproveHash] = useState<`0x${string}` | undefined>();
  const [depositHash, setDepositHash] = useState<`0x${string}` | undefined>();
  const [withdrawHash, setWithdrawHash] = useState<`0x${string}` | undefined>();
  const [registerHash, setRegisterHash] = useState<`0x${string}` | undefined>();
  const [creditHash, setCreditHash] = useState<`0x${string}` | undefined>();

  const [notification, setNotification] = useState("");
  const { writeContractAsync } = useWriteContract();

  // Hooks de confirmación separados
  const { isLoading: isApproving, isSuccess: isApproved } = useWaitForTransactionReceipt({ hash: approveHash });
  const { isLoading: isDepositing, isSuccess: isDeposited } = useWaitForTransactionReceipt({ hash: depositHash });
  const { isLoading: isWithdrawing, isSuccess: isWithdrawn } = useWaitForTransactionReceipt({ hash: withdrawHash });
  const { isLoading: isRegistring, isSuccess: isRegistered } = useWaitForTransactionReceipt({ hash: registerHash });
  const { isLoading: isCreatingCredit, isSuccess: isCreditCreated } = useWaitForTransactionReceipt({
    hash: creditHash,
  });

  // Notificaciones
  useEffect(() => {
    if (notification) {
      toast.success(notification);
      setNotification("");
    }
  }, [notification]);

  const handleApprove = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const convertAmount = Number(approvalAmount) * 10 ** 6;
      const response = await writeContractAsync({
        abi: abi,
        address: address,
        functionName: "approve",
        args: ["0x6156108D82393179a467fCC3F9FF876A6b93886d", convertAmount],
      });
      setApproveHash(response);
    } catch (error) {
      toast.error("Error en la aprobación");
    }
  };

  const handleWithdrawFunds = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const convertAmount = Number(companyData[7]);
      const response = await writeContractAsync({
        abi: abi_company_manager,
        address: address_company_manager,
        functionName: "withdrawFundsCompany",
        args: [convertAmount],
      });
      setWithdrawHash(response);
    } catch (error) {
      toast.error("Error en el retiro");
      console.log(error);
    }
  };

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const convertAmount = Number(depositAmount) * 10 ** 6;
      const response = await writeContractAsync({
        abi: abi_company_manager,
        address: address_company_manager,
        functionName: "addFundsCompany",
        args: [convertAmount],
      });
      setDepositHash(response);
    } catch (error) {
      toast.error("Error en el depósito");
      console.log(error);
    }
  };

  const handleRegisterUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await writeContractAsync({
        abi: abi_company_manager,
        address: address_company_manager,
        functionName: "registerUser",
        args: [userWallet],
      });
      setRegisterHash(response);
    } catch (error) {
      toast.error("Error en el registro de usuario");
      console.log(error);
    }
  };

  const handleCreateCredit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const convertAmount = Number(creditData.amount) * 10 ** 6;
      const response = await writeContractAsync({
        abi: abi_company_manager,
        address: address_company_manager,
        functionName: "registerCredit",
        args: [creditData.wallet, convertAmount, creditData.rate, creditData.installments],
      });
      setCreditHash(response);
    } catch (error) {
      toast.error("Error en la creación del crédito");
      console.log(error);
    }
  };

  const result_company = useReadContract({
    abi: abi_company_manager,
    address: address_company_manager,
    functionName: "companies",
    args: [connectedAddress],
  });

  const dataCompany = result_company.data;

  useEffect(() => {
    console.log(result_company.data);

    if (Array.isArray(dataCompany) && dataCompany[0] && dataCompany[3] === connectedAddress) {
      setCompanyData(dataCompany);
      setIsCompany(true);
    }
    setIsLoadingData(false);
  }, [result_company.data, connectedAddress]);

  useEffect(() => {
    if (isApproved) {
      setNotification("Aprobación confirmada exitosamente!");
      setApprovalAmount("");
    }
    if (isDeposited) {
      setNotification("Depósito confirmado exitosamente!");
      setDepositAmount("");
    }
    if (isWithdrawn) {
      setNotification("Retiro confirmado exitosamente!");
    }
    if (isRegistered) {
      setNotification("Usuario registrado exitosamente!");
      setUserWallet("");
    }
    if (isCreditCreated) {
      setNotification("Crédito creado exitosamente!");
      setCreditData({
        amount: "",
        installments: "",
        rate: "",
        wallet: "",
      });
    }
  }, [isApproved, isDeposited, isWithdrawn, isRegistered, isCreditCreated]);

  if (isLoadingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-600 text-lg">Cargando verificación...</div>
      </div>
    );
  }

  if (!isCompany) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
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
          <p className="text-gray-600 mb-6">No eres una empresa y no puedes ver este contenido.</p>
          <Link
            href="/"
            className="inline-block px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Toaster position="top-right" />
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Empresas</h1>
        <p className="text-gray-600">Gestión integral de créditos blockchain</p>

        {/* Balances */}
        <div className="mt-8 grid grid-cols-2 gap-6 max-w-xl">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Saldo Disponible</p>
                <p className="text-2xl font-semibold text-gray-900">{(Number(companyData[7]) / 1000000).toString()}</p>
              </div>
              <button
                onClick={handleWithdrawFunds}
                disabled={isWithdrawing}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                {isWithdrawing ? "Procesando..." : "Retirar"}
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div>
              <p className="text-gray-500 text-sm">Saldo Prestado</p>
              <p className="text-2xl font-semibold text-gray-900">{(Number(companyData[6]) / 1000000).toString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Instrucciones Laterales */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm h-fit">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <DocumentCheckIcon className="w-5 h-5 text-purple-600" />
            Guía Rápida
          </h2>
          <ol className="space-y-4 text-sm text-gray-600">
            {[
              "Autoriza la cantidad de USDC que deseas depositar",
              "Deposita los USDC en el contrato",
              "Registra la wallet del beneficiario",
              "Crea el crédito con los parámetros que deseas",
              "Gana con los intereses",
            ].map((step, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="bg-purple-100 text-purple-600 w-6 h-6 rounded-full flex items-center justify-center text-xs">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* Sección Principal */}
        <div className="lg:col-span-3 space-y-8">
          {/* Sección USDC */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <CurrencyDollarIcon className="w-6 h-6 text-purple-600" />
              Autorización USDC
            </h2>

            <div>
              <h3 className="text-lg font-medium mb-4">1. Autorizar mover USDC</h3>
              <div className="flex gap-4">
                <input
                  type="number"
                  value={approvalAmount}
                  onChange={e => setApprovalAmount(e.target.value)}
                  className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Monto en USDC"
                />
                <button
                  type="button"
                  onClick={handleApprove}
                  disabled={isApproving}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  {isApproving ? "Procesando..." : "Aprobar"}
                </button>
              </div>
            </div>
          </div>

          {/* Sección Créditos */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <UserPlusIcon className="w-6 h-6 text-purple-600" />
              Gestión de Créditos
            </h2>

            <div className="space-y-8">
              {/* Paso 1: Depositar */}
              <div>
                <h3 className="text-lg font-medium mb-4">1. Depositar Fondos</h3>
                <div className="flex gap-4">
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={e => setDepositAmount(e.target.value)}
                    className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Monto en USDC"
                  />
                  <button
                    type="button"
                    onClick={handleDeposit}
                    disabled={isDepositing}
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                  >
                    {isDepositing ? "Procesando..." : "Depositar"}
                  </button>
                </div>
              </div>

              {/* Paso 2: Registrar Usuario */}
              <div>
                <h3 className="text-lg font-medium mb-4">2. Registrar Usuario</h3>
                <div className="flex gap-4">
                  <input
                    value={userWallet}
                    onChange={e => setUserWallet(e.target.value)}
                    className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Wallet del usuario"
                  />
                  <button
                    type="button"
                    onClick={handleRegisterUser}
                    disabled={isRegistring}
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                  >
                    {isRegistring ? "Procesando..." : "Registrar"}
                  </button>
                </div>
              </div>

              {/* Paso 3: Crear Crédito */}
              <div>
                <h3 className="text-lg font-medium mb-4">3. Crear Crédito</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder="Monto total"
                    className="p-2 border rounded-lg"
                    value={creditData.amount}
                    onChange={e => setCreditData({ ...creditData, amount: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Número de cuotas"
                    className="p-2 border rounded-lg"
                    value={creditData.installments}
                    onChange={e => setCreditData({ ...creditData, installments: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Tasa de interés (%)"
                    className="p-2 border rounded-lg"
                    value={creditData.rate}
                    onChange={e => setCreditData({ ...creditData, rate: e.target.value })}
                  />
                  <input
                    placeholder="Wallet beneficiario"
                    className="p-2 border rounded-lg"
                    value={creditData.wallet}
                    onChange={e => setCreditData({ ...creditData, wallet: e.target.value })}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleCreateCredit}
                  disabled={isCreatingCredit}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  {isCreatingCredit ? "Procesando..." : "Crear Crédito"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
