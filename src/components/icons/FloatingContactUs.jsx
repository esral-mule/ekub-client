import { CircleX, PhoneCall, Send } from "lucide-react";
import { useState } from "react";

export default function FloatingContactUs() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5">
      {/* Floating Button */}
      <div className="relative">
        <button
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          {open ? <CircleX size={24} /> : <PhoneCall size={24} />}
        </button>

        {/* Contact Options (Phone and Telegram) */}
        {open && (
          <div className="absolute bottom-16 right-0 bg-white dark:bg-secondary shadow-lg rounded-lg p-4">
            <a
              href="tel:+251962641983"
              className="flex items-center text-green-500 py-2 border-b border-gray-200"
            >
              <PhoneCall />
            </a>
            <a
              href="https://t.me/EsralDesta"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-blue-500  py-2"
            >
              <Send />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
