interface ValidataType {
    [key: string]: string[];
}
interface FnObjType {
    [key: string]: (e: any) => void;
}
interface ValidateType {
    validate: (e: any) => boolean;
    message: string;
}
export interface UseFormProps {
    name: string;
    validate?: Array<ValidateType>;
}
export declare type UseFormType = [(onSubmit: any) => void, FnObjType, ValidataType, FnObjType];
export declare const useForm: (args: UseFormProps[]) => UseFormType;
export default useForm;
