import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { TOAST_TYPES } from '../../constants';

const CONFIG = {
  [TOAST_TYPES.SUCCESS]: {
    icon: <CheckCircle size={18} />,
    classes: 'bg-green-600 text-white',
  },
  [TOAST_TYPES.ERROR]: {
    icon: <AlertCircle size={18} />,
    classes: 'bg-macys-red text-white',
  },
  [TOAST_TYPES.WARNING]: {
    icon: <AlertTriangle size={18} />,
    classes: 'bg-amber-500 text-white',
  },
  [TOAST_TYPES.INFO]: {
    icon: <Info size={18} />,
    classes: 'bg-macys-gray text-white',
  },
};

export function ToastContainer() {
  const { toasts, removeToast } = useAppContext();

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] flex flex-col gap-2 items-center w-full max-w-sm px-4 pointer-events-none"
    >
      {toasts.map((toast) => {
        const { icon, classes } = CONFIG[toast.type] || CONFIG[TOAST_TYPES.INFO];
        return (
          <div
            key={toast.id}
            role="status"
            className={[
              'flex items-center gap-3 w-full px-4 py-3 rounded-lg shadow-modal',
              'animate-slide-up pointer-events-auto',
              classes,
            ].join(' ')}
          >
            <span className="flex-shrink-0">{icon}</span>
            <p className="flex-1 text-sm font-medium">{toast.message}</p>
            <button
              type="button"
              aria-label="Dismiss"
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
