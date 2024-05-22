import useQueryParams from "@/common/hooks/use-query-params";
import {
	Button,
	Form as FormProvider,
	Icon,
	InputFieldControl
} from "@/components/ui";
import axiosInstance from "@/configs/axios.config";
import {
	RecoverPasswordFormValues,
	recoverPasswordSchema
} from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError, AxiosResponse } from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import tw from "tailwind-styled-components";

const VerifyEmailForm: React.FunctionComponent = () => {
	const form = useForm<RecoverPasswordFormValues>({
		resolver: zodResolver(recoverPasswordSchema)
	});
	const [params, setParam] = useQueryParams();

	const handleResetPassword = async (
		data: Required<RecoverPasswordFormValues>
	) => {
		toast.promise(axiosInstance.post("/reset-password", data), {
			loading: "Đang xử lý yêu cầu ...",
			success: (response: AxiosResponse["data"]) => {
				setParam("step", +params.step + 1);
				return response?.message;
			},
			error: (error: AxiosError<HttpResponse<unknown>>) => {
				return error.response?.data?.message;
			}
		});
	};

	return (
		<FormProvider {...form}>
			<Form onSubmit={form.handleSubmit(handleResetPassword)}>
				<InputFieldControl
					label='Email'
					name='email'
					control={form.control}
					type='email'
					placeholder='example@email.com'
					description='Verification code will be send to you email soon'
				/>
				<Button type='submit' className='gap-x-2'>
					<Icon name='CircleCheck' /> Continue
				</Button>
			</Form>
		</FormProvider>
	);
};

const Form = tw.form`flex flex-col gap-y-6 w-full`;

export default VerifyEmailForm;
