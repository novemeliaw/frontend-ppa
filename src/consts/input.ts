import { Dispatch, SetStateAction } from "react"
import { UseFormRegister, FieldErrors } from "react-hook-form"

export interface InputProps {
    register: UseFormRegister<any>
    placeholder: string
    name: string
    isRequired?: boolean
    errors: FieldErrors<any>
    regex?: RegExp
    autoComplete?: string
    obscure?: boolean
    label?: string
    type?: string
    className?: string
}

export interface SearchInputProps {
    value: string,
    setValue: Dispatch<SetStateAction<string>>
}