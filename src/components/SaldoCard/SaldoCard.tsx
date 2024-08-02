import { MdVisibility, MdVisibilityOff } from "react-icons/md";
// import balanceCardAccent from "@/assets/balance_card_accent.svg";
import { useState } from "react";
import currencyFormat from "@/utils/currencyFormat";

export default function SaldoCard() {
  const [accountNumber] = useState<string>("7293109283");
  const [balance] = useState<number>(3492203);
  const [isAccountNumberVisible, setIsAccountNumberVisible] =
    useState<boolean>(false);
  const [isBalanceVisible, setIsBalanceVisible] = useState<boolean>(false);

  return (
    <div className='w-full h-full bg-neutral-01 p-6 rounded-lg shadow-02 flex flex-col gap-y-2.5'>
      <h2 className='text-2xl font-bold'>Saldo</h2>
      <div
        className={`w-full max-w-[300px] h-[200px] self-center px-5 py-9 rounded-xl shadow-02 flex flex-col justify-center text-neutral-01 relative overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[url('assets/balance_card_accent.svg')] before:bg-no-repeat before:bg-contain`}
        style={{
          backgroundImage: `linear-gradient(119.69deg, #0066AE 15.4%, #0A3967 84.03%)`,
        }}
      >
        <p className='text-2xl font-bold mb-1.5'>Tunas Bangsa</p>
        <div className='flex items-center gap-x-2 mb-3'>
          <p>
            {isAccountNumberVisible
              ? accountNumber
              : accountNumber.replace(/\d(?=\d{3})/g, "*")}
          </p>
          <button
            type='button'
            onClick={() => setIsAccountNumberVisible(!isAccountNumberVisible)}
            aria-label='Tampilkan nomor rekening'
          >
            {isAccountNumberVisible ? (
              <MdVisibility size={18} color='#B7B9C8' />
            ) : (
              <MdVisibilityOff size={18} color='#B7B9C8' />
            )}
          </button>
        </div>
        <div className='flex items-center gap-x-2'>
          <p className='text-2xl font-bold'>
            {isBalanceVisible
              ? currencyFormat(balance, "id-ID", "IDR")
              : currencyFormat(balance, "id-ID", "IDR").replace(/[0-9.]/g, "*")}
          </p>
          <button
            type='button'
            onClick={() => setIsBalanceVisible(!isBalanceVisible)}
            aria-label='Tampilkan saldo rekening'
          >
            {isBalanceVisible ? (
              <MdVisibility size={20} color='#B7B9C8' />
            ) : (
              <MdVisibilityOff size={20} color='#B7B9C8' />
            )}
          </button>
        </div>
        <span className='absolute bottom-2 right-4'>BCA</span>
      </div>
    </div>
  );
}
