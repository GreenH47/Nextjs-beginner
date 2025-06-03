// The /types.ts file will contain the types and schemas related
// to our form fields and their validation. Update the /types.ts file with the code below:
// /types.ts 文件将包含与我们的表单字段及其验证相关的类型和模式。
import { FieldError, UseFormRegister } from "react-hook-form";
import { z, ZodType } from "zod";

// FormData represents the structure of the data expected in the form.
// FormData 表示表单中预期数据的结构。
export type FormData = {
    email: string;
    githubUrl: string;
    yearsOfExperience: number;
    password: string;
    confirmPassword: string;
};

// ZodType is a generic type that represents a Zod schema type for a specific data structure.
// ZodType 是一种通用类型，表示特定数据结构的 Zod 模式类型。
export const UserSchema: ZodType<FormData> = z
    .object({
        email: z.string().email(),
        githubUrl: z
            .string()
            .url()
            .includes("github.com", { message: "Invalid GitHub URL" }),
        yearsOfExperience: z
            .number({
                required_error: "required field",
                invalid_type_error: "Years of Experience is required",
            })
            .min(1)
            .max(10),
        password: z
            .string()
            .min(8, { message: "Password is too short" })
            .max(20, { message: "Password is too long" }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"], // path of error
    });

// FormFieldProps defines the properties expected by the form
// field component (which we will build later on). It includes:
// FormFieldProps 定义了表单字段组件（我们稍后会构建）所需的属性。它包括：
export type FormFieldProps = {
    type: string;
    placeholder: string;
    name: ValidFieldNames;
    register: UseFormRegister<FormData>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
};

// ValidFieldNames is a union type that enumerates the valid
// field names for the form. These correspond to the fields defined in the FormData type.
//     ValidFieldNames 是一个联合类型，枚举了表单的有效字段名称。这些字段名称与 FormData 类型中定义的字段相对应。
export type ValidFieldNames =
    | "email"
    | "githubUrl"
    | "yearsOfExperience"
    | "password"
    | "confirmPassword";