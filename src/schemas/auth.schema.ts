import Regex from "@/common/constants/regex";
import z from "zod";

export const loginSchema = z.object({
	email: z.string({ required_error: "Enter your email" }),
	password: z.string({ required_error: "Enter your password" })
	// company: z.string({ required_error: "Select your factory" }),
	// department: z.string({ required_error: "Select your department" })
});

export const changePasswordSchema = z
	.object({
		currentPassword: z
			.string({ required_error: "Vui lòng nhập mật khẩu hiện tại" })
			.min(1, { message: "Vui lòng nhập mật khẩu hiện tại" }),
		password: z
			.string({ required_error: "Vui lòng nhập mật khẩu" })
			.min(6, { message: "Mật khẩu phải có tối thiểu 6 ký tự" })
			.regex(Regex.PASSWORD, {
				message: "Mật khẩu mới phải có ít nhất 1 chữ số và 1 ký tự in hoa"
			}),
		confirmPassword: z.string({
			required_error: "Vui lòng nhập mật khẩu xác thực"
		})
	})
	.refine(
		(values) => {
			return values.password === values.confirmPassword;
		},
		{
			message: "Mật khẩu xác thực chưa đúng",
			path: ["confirmPassword"]
		}
	);

export const recoverPasswordSchema = z.object({
	email: z
		.string({ required_error: "Vui lòng nhập email" })
		.email({ message: "Email không đúng định dạng" })
		.regex(Regex.EMAIL, { message: "Email không đúng định dạng" })
});

export const resetPasswordSchema = z
	.object({
		token: z.string({ required_error: "Vui lòng nhập mã xác thực" }),
		password: z
			.string({ required_error: "Vui lòng nhập mật khẩu mới" })
			.regex(Regex.PASSWORD, {
				message:
					"Mật khẩu mới phải có ít nhất 1 ký tự viết hoa, và 1 chữ số"
			}),
		confirmPassword: z.string({
			required_error: "Vui lòng nhập mật khẩu xác thực"
		})
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Mật khẩu xác nhận không khớp",
		path: ["confirmPassword"]
	});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
export type RecoverPasswordFormValues = z.infer<typeof recoverPasswordSchema>;
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
