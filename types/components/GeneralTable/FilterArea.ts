import { GeneralInputProps } from 'types/components/base/input';

export interface FilterParams {
    [key: string]: any;
}

export interface InputAreaProps<T extends FilterParams> {
    upperInput: GeneralInputProps[]
    lowerInput: GeneralInputProps[]
    generator: () => T
}