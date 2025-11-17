import { z } from "zod";

export const passwordValidation = z.string()
    .min(6, { message: "Password must be at least 6 characters." })
    .regex(/[a-z]/, { message: "Must include one lowercase letter." })
    .regex(/[A-Z]/, { message: "Must include one uppercase letter." })
    .regex(/\d/, { message: "Must include one number." })
    .regex(/[^\w\s]/, { message: "Must include one special symbol (e.g., !@#$%)." });

export const setPasswordSchema = z.object({
    password: passwordValidation
});

export const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, { message: "Current password is required." }),
    newPassword: passwordValidation,
}).refine(
    (data) => data.currentPassword !== data.newPassword,
    {
        message: "New password must be different from current password.",
        path: ["newPassword"],
    }
);

export const signupSchema = z.object({
    name: z.string().trim().min(2, {message : "Name must at least be 2 character"}),
    email: z.email({ message: "Please enter a valid address."}).trim().toLowerCase(),
    password: passwordValidation,
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match.",
    path: ["confirmPassword"],
})