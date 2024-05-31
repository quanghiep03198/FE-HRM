import { useLocalStorage } from '@/common/hooks/use-storage';
import { parseJSON } from '@/common/utils/json-utils';
import {
	Box,
	Button,
	Checkbox,
	Form,
	Icon,
	InputFieldControl,
	Label,
	Typography
} from '@/components/ui';
import { LoginFormValues, loginSchema } from '@/schemas/auth.schema';
import { useLoginMutation } from '@/store/apis/@auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { store } from '@/store/store';
import { Helmet } from 'react-helmet';
import { toast } from 'sonner';
import tw from 'tailwind-styled-components';
import GridBackground from '../../(public)/_components/-grid-background';

export const Route = createFileRoute('/(auth)/login/')({
	beforeLoad({ navigate }) {
		if (store.getState().auth.authenticated) {
			navigate({ to: '/' });
		}
		//  Todo: Get auth states from store, if user logged in, redirect user to previous page
	},
	component: LoginPage
});

export default function LoginPage() {
	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		mode: 'onChange'
	});
	const [login, { isLoading }] = useLoginMutation();
	const navigate = useNavigate();

	const [savedAccount, setAccountToSave, removeSavedAccount] = useLocalStorage(
		'account',
		parseJSON(localStorage.getItem('account'))
	);

	useEffect(() => {
		if (savedAccount) form.setValue('email', savedAccount);
	}, []);

	const handleToggleSaveAccount = useCallback((checked: boolean) => {
		if (checked) {
			if (form.getValues('email')) setAccountToSave(form.getValues('email'));
		} else removeSavedAccount();
	}, []);

	const handleLoginWithEmail = (data: Required<LoginFormValues>) => {
		toast.promise(login(data).unwrap(), {
			loading: 'Signin you in...',
			success: () => {
				navigate({ to: '/' });
				return 'Success';
			},
			error: (e) => {
				console.log(e);
				return 'Failed';
			}
		});
	};

	return (
		<>
			<Helmet>
				<title>Login</title>
				<meta name='title' content='Login' />
				<meta
					name='description'
					content='Sign in to Greenland HRM System'
				/>
			</Helmet>
			<Box className='relative flex  h-screen w-full flex-grow flex-col items-center justify-center overflow-y-auto bg-background text-foreground scrollbar-none'>
				<GridBackground />
				<Box className='mb-6 w-full space-y-6'>
					<Typography
						variant='h5'
						className='relative text-center font-bold'>
						Sign in to your account
					</Typography>

					<Box
						as='section'
						className='relative flex flex-grow flex-col items-center justify-center space-y-6'>
						<Form {...form}>
							<StyledForm
								onSubmit={form.handleSubmit(handleLoginWithEmail)}>
								<InputFieldControl
									label='Email'
									placeholder='example@email.com'
									type='email'
									name='email'
									control={form.control}
									messageMode='tooltip'
								/>
								<InputFieldControl
									label='Password'
									placeholder='******'
									name='password'
									type='password'
									control={form.control}
								/>

								<Box className='flex items-center justify-between'>
									<Box className='flex items-center space-x-2'>
										<Checkbox
											type='button'
											id='remember-checkbox'
											defaultChecked={Boolean(savedAccount)}
											onCheckedChange={handleToggleSaveAccount}
										/>
										<Label htmlFor='remember-checkbox'>
											Remember me
										</Label>
									</Box>
									<Button variant='link' asChild className='px-0'>
										<Link to='/recover-password'>
											Forgot your password?
										</Link>
									</Button>
								</Box>
								<Button
									type='submit'
									className='w-full gap-x-2'
									disabled={isLoading}>
									<Icon name='LogIn' />
									Log in
								</Button>
							</StyledForm>
						</Form>
					</Box>
				</Box>
				<Typography variant='small' color='muted'>
					© {new Date().getFullYear()} GreenLand, Inc. All rights
					reserved.
				</Typography>
			</Box>
		</>
	);
}

const StyledForm = tw.form`border border-border max-w-md w-full flex flex-col items-stretch rounded gap-y-6 px-6 sm:px-4 py-6 bg-background dark:bg-popover`;
