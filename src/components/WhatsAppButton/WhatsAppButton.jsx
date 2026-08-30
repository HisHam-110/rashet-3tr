import React from 'react';
import './WhatsAppButton.css';

export default function WhatsAppButton({ phoneNumber = '966506540920' }) {
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float-btn"
      aria-label="تواصل معنا عبر واتساب"
      title="تواصل معنا عبر واتساب"
    >
      <span className="whatsapp-pulse-ring"></span>
      <svg
        className="whatsapp-icon-svg"
        viewBox="0 0 32 32"
        width="34"
        height="34"
        fill="#ffffff"
      >
        <path d="M16 2A13 13 0 0 0 4.7 20.9L3 27l6.3-1.6A13 13 0 1 0 16 2zm0 23.8a10.8 10.8 0 0 1-5.5-1.5l-.4-.2-3.7 1 1-3.6-.3-.4A10.8 10.8 0 1 1 16 25.8zm5.9-8.1c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-.9 1.2-.3.2-.6.1a8.1 8.1 0 0 1-2.4-1.5 8.9 8.9 0 0 1-1.6-2c-.2-.3 0-.5.1-.6s.3-.4.5-.6l.3-.4c.1-.2 0-.4 0-.5s-.7-1.7-.9-2.3c-.3-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4A3.7 3.7 0 0 0 10 13a6.4 6.4 0 0 0 1.3 3.4 14.8 14.8 0 0 0 5.7 5 19 19 0 0 0 1.9.7 4.6 4.6 0 0 0 2.1.1 3.4 3.4 0 0 0 2.3-1.6 2.8 2.8 0 0 0 .2-1.6c-.2-.2-.5-.3-.8-.5z" />
      </svg>
    </a>
  );
}
