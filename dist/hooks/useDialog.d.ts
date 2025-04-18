interface AlertDialogInterface {
    title?: string;
    message?: string;
    button?: string;
    hasButton?: boolean;
    required?: boolean;
    selectable?: boolean;
    onForceDismiss?: () => void;
    callback?: (e: string | boolean | null | any) => void;
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
    callback?: (value: {
        value1: string;
        value2: string;
    } | null) => void;
}
declare const useDialog: () => {
    alert: (options: AlertDialogInterface) => void;
    confirm: (options: ConfirmDialogInterface) => void;
    prompt: (options: PromptDialogInterface) => void;
    login: (options: LoginDialogInterface) => void;
};
export default useDialog;
