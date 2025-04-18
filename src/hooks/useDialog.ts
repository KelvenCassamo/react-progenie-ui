import { useCallback } from 'react';

interface AlertDialogInterface {
  title?: string;
  message?: string;
  button?: string;
  hasButton?: boolean;
  required?: boolean;
  selectable?: boolean;
  onForceDismiss?: () => void;
  callback?: (e: string|boolean | null|any) => void;
  onOk?: () => void;
}

interface ConfirmDialogInterface extends AlertDialogInterface {
  cancel?: string;
  onCancel?: () => void;
}

interface PromptDialogInterface extends AlertDialogInterface {
  input?: {
    type?: string;
    placeholder?: string;
    [key: string]: any;
  };
  validate?: (value: string) => boolean | void;
  callback?: (value: string | null) => void;
}

interface LoginDialogInterface extends AlertDialogInterface {
  first?: {
    type?: string;
    placeholder?: string;
    [key: string]: any;
  };
  second?: {
    type?: string;
    placeholder?: string;
    [key: string]: any;
  };
  validate?: (value: string) => boolean | void;
  callback?: (value: { value1: string; value2: string } | null) => void;
}

const useDialog = () => {
  const alertDialog = useCallback((options: AlertDialogInterface) => {
    console.log(window.dialog);
    
    if (typeof window !== 'undefined' && window.dialog) {
      const obj: AlertDialogInterface = {};
      
      obj.title = options.selectable === false 
        ? `<div style="user-select:none;">${options.title ?? ""}</div>` 
        : options.title ?? "";
        
      obj.message = options.selectable === false 
        ? `<div style="user-select:none;">${options.message ?? ""}</div>` 
        : options.message ?? "";

      obj.button = options.button ?? "OK";
      obj.hasButton = options.hasButton ?? (options.button !== undefined);
      obj.required = options.required ?? false;

      obj.callback = (e: any) => {
        if (e == null) {
          options.onForceDismiss?.();
        } else if (e === true) {
          options.onOk?.();
        }
        options.callback?.(e);
      };

      window.dialog.alert(obj);
    } else {
      console.warn('Dialog not initialized');
    }
  }, []);

  const confirmDialog = useCallback((options: ConfirmDialogInterface) => {
    if (typeof window !== 'undefined' && window.dialog) {
      const obj: ConfirmDialogInterface = {};
      
      obj.title = options.selectable === false 
        ? `<div style="user-select:none;">${options.title ?? ""}</div>` 
        : options.title ?? "";
        
      obj.message = options.selectable === false 
        ? `<div style="user-select:none;">${options.message ?? ""}</div>` 
        : options.message ?? "";

      obj.button = options.button ?? "OK";
      obj.cancel = options.cancel ?? "CANCEL";
      obj.hasButton = options.hasButton ?? (options.button !== undefined);
      obj.required = options.required ?? false;

      obj.callback = (e: any) => {
        if (e == null) {
          options.onForceDismiss?.();
        } else if (e === true) {
          options.onOk?.();
        } else {
          options.onCancel?.();
        }
        options.callback?.(e);
      };

      window.dialog.confirm(obj);
    } else {
      console.warn('Dialog not initialized');
    }
  }, []);

  const promptDialog = useCallback((options: PromptDialogInterface) => {
    if (typeof window !== 'undefined' && window.dialog) {
      const obj: any = {
        ...options,
        title: options.selectable === false 
          ? `<div style="user-select:none;">${options.title ?? ""}</div>` 
          : options.title ?? "",
        message: options.selectable === false 
          ? `<div style="user-select:none;">${options.message ?? ""}</div>` 
          : options.message ?? "",
        button: options.button ?? "OK",
        required: options.required ?? false,
        input: {
          type: "text",
          placeholder: "",
          ...options.input
        }
      };

      obj.callback = (value: string | null) => {
        if (value === null) {
          options.onForceDismiss?.();
        } else {
          options.onOk?.();
        }
        options.callback?.(value);
      };

      window.dialog.prompt(obj);
    } else {
      console.warn('Dialog not initialized');
    }
  }, []);

  const loginDialog = useCallback((options: LoginDialogInterface) => {
    if (typeof window !== 'undefined' && window.dialog) {
      const obj: any = {
        ...options,
        title: options.selectable === false 
          ? `<div style="user-select:none;">${options.title ?? ""}</div>` 
          : options.title ?? "",
        message: options.selectable === false 
          ? `<div style="user-select:none;">${options.message ?? ""}</div>` 
          : options.message ?? "",
        button: options.button ?? "OK",
        required: options.required ?? false,
        first: {
          type: "text",
          placeholder: "",
          ...options.first
        },
        second: {
          type: "password",
          placeholder: "",
          ...options.second
        }
      };

      obj.callback = (value: { value1: string; value2: string } | null) => {
        if (value === null) {
          options.onForceDismiss?.();
        } else {
          options.onOk?.();
        }
        options.callback?.(value);
      };

      window.dialog.login(obj);
    } else {
      console.warn('Dialog not initialized');
    }
  }, []);

  return {
    alert: alertDialog,
    confirm: confirmDialog,
    prompt: promptDialog,
    login: loginDialog
  };
};

export default useDialog;