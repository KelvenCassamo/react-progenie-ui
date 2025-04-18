import React from 'react';
import "../utils/Dialog";
import '../styles/dialog.css';
declare global {
    interface Window {
        dialog: any;
    }
}
interface DialogProviderProps {
    children?: React.ReactNode;
}
declare const DialogProvider: React.FC<DialogProviderProps>;
export default DialogProvider;
