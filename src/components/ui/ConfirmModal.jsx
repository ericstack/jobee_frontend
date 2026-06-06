import { useEffect, useState } from "react";
import { AlertTriangle, X } from "lucide-react";

const ConfirmModal = ({
  isOpen,
  onClose,
  title,
  description,
  confirmLabel = "Confirm",
  onConfirm,
  danger = true,
}) => {
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setBusy(true);
    try {
      await onConfirm();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <X size={14} />
        </button>

        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-4 ${danger ? "bg-red-100 dark:bg-red-950" : "bg-amber-100 dark:bg-amber-950"}`}>
          <AlertTriangle size={20} className={danger ? "text-red-600 dark:text-red-400" : "text-amber-600 dark:text-amber-400"} />
        </div>

        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">{title}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{description}</p>

        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            disabled={busy}
            onClick={handleConfirm}
            className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white disabled:opacity-60 transition-colors ${
              danger ? "bg-red-600 hover:bg-red-700" : "bg-amber-600 hover:bg-amber-700"
            }`}
          >
            {busy ? "Please wait…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
