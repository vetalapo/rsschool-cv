import type { Credentials } from "@/types";
import type { ValidationRules } from "@/utils/validationRules";

export interface LoginViewData {
    isPasswordVisible: boolean;
    form: boolean;
    credentials: Credentials;
    loading: boolean;
    isLoginError: boolean;
    commonValidationRules: ValidationRules;
};
