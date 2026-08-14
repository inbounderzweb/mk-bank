"use client";

import React from "react";

const WHATSAPP_NUMBER = "919495335569";
const WHATSAPP_MESSAGE = "Hello, I would like to know more about MKSC Bank's services.";

export function WhatsAppFloat() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with MKSC Bank on WhatsApp"
      className="group fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-900/20 transition-transform duration-300 hover:scale-110 active:scale-95 md:bottom-8 md:right-8"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-40 group-hover:opacity-0" />
      <svg viewBox="0 0 32 32" className="relative w-7 h-7 fill-current">
        <path d="M16.004 3C9.373 3 4 8.373 4 15.004c0 2.648.86 5.098 2.318 7.086L4.667 28l6.09-1.598a11.94 11.94 0 0 0 5.247 1.213h.005c6.63 0 12.004-5.373 12.004-12.004C28.013 8.373 22.635 3 16.004 3zm0 21.828h-.004a9.812 9.812 0 0 1-5.001-1.372l-.359-.213-3.615.949.964-3.526-.234-.362a9.79 9.79 0 0 1-1.5-5.3c0-5.42 4.412-9.83 9.833-9.83 2.627 0 5.096 1.024 6.951 2.882a9.767 9.767 0 0 1 2.877 6.955c0 5.42-4.412 9.817-9.912 9.817zm5.383-7.353c-.295-.148-1.746-.861-2.017-.96-.271-.099-.469-.148-.666.148-.198.297-.762.96-.934 1.157-.172.198-.344.223-.639.075-.295-.148-1.246-.459-2.373-1.464-.877-.782-1.469-1.749-1.641-2.046-.172-.297-.018-.457.13-.605.134-.133.297-.346.445-.52.148-.173.198-.297.297-.494.099-.198.05-.372-.025-.52-.074-.148-.665-1.603-.912-2.196-.24-.575-.484-.497-.665-.507-.172-.008-.369-.01-.567-.01-.198 0-.518.074-.79.372-.272.297-1.037 1.014-1.037 2.472s1.062 2.868 1.21 3.066c.148.198 2.084 3.183 5.05 4.463.706.305 1.257.487 1.686.623.708.225 1.352.193 1.86.117.567-.084 1.746-.714 1.992-1.404.247-.69.247-1.281.173-1.404-.074-.124-.271-.198-.567-.347z" />
      </svg>
    </a>
  );
}
