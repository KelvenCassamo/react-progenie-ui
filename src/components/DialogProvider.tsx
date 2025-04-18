import React, { useEffect } from 'react';
import "../utils/Dialog"
import '../styles/dialog.css';

declare global {
  interface Window {
    dialog: any;
  }
}

interface DialogProviderProps {
  children?: React.ReactNode;
}

const DialogProvider: React.FC<DialogProviderProps> = ({ children }) => {
  useEffect(() => {
    const meta = document.querySelector('[name="bivalert"]');
    
    if (meta && meta.getAttribute('content') === 'true') {
      initializeDialog();
    }

    return () => {
      // Cleanup if needed
    };
  }, []);

  const initializeDialog = () => {
    if (typeof window !== 'undefined' && !window.dialog) {
      const script = document.createElement('script');
      script.innerHTML = `
        // Your minified dialog code here
        (function($){...})(jQuery);
      `;
      document.body.appendChild(script);
    }
  };

  return <>{children}</>;
};

export default DialogProvider;