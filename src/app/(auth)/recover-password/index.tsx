import { Box, Button, Icon, Typography } from '@/components/ui';
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router';
import VerifyEmailForm from './_components/-verify-email-form';
import { useEffect, useState } from 'react';
import { StepItem, Steps } from './_components/-step';
import * as qs from 'qs';
import useQueryParams from '@/common/hooks/use-query-params';
import ResetPasswordForm from './_components/-reset-password-form';
import { toast } from 'sonner';
import { Helmet } from 'react-helmet';

export const Route = createFileRoute('/(auth)/recover-password/')({
	beforeLoad: ({ navigate, search }) => {
		if (!search.hasOwnProperty('step')) navigate({ search: { step: '1' } });
	},
	component: RecoverPasswordPage
});

export default function RecoverPasswordPage() {
	const [steps, setSteps] = useState<Array<StepItem>>([
		{
			index: 1,
			name: 'Get verification code',
			href: { step: 1 },
			status: 'current'
		},
		{
			index: 2,
			name: 'Reset your password',
			href: { step: 2 },
			status: 'upcoming'
		}
	]);
	const navigate = useNavigate();
	const [params, setParam] = useQueryParams();
	const [isCompleted, setIsCompleted] = useState<boolean>(false);

	useEffect(() => {
		if (!params.step && !params.status) {
			setParam('step', 1);
			setParam('status', 'current');
		}

		if (steps.map((item) => String(item.index)).includes(params.step)) {
			setSteps((prev) =>
				prev.map((item) => {
					switch (true) {
						case item.index < +params.step:
							return { ...item, status: 'completed' };
						case item.index === +params.step && !isCompleted:
							return { ...item, status: 'current' };
						case item.index === +params.step && isCompleted:
							return { ...item, status: 'completed' };
						default:
							return item;
					}
				})
			);
		}

		if (isCompleted) {
			toast('Login now?', {
				description: 'You can log in with new password right now',
				duration: 30000,
				action: {
					label: 'Ok',
					onClick: () => navigate({ to: '/login' })
				},
				cancel: 'Dismiss'
			});
		}
	}, [params.step, isCompleted]);
	return (
		<>
			<Helmet>
				<title>Recover password</title>
				<meta name='title' content='Recover password' />
				<meta name='description' content='Recover password' />
			</Helmet>
			<Box className='relative flex h-screen items-center justify-center p-4'>
				<Box className='absolute top-0 flex w-full items-center justify-between p-4'>
					<Button variant='link' asChild className='gap-x-2'>
						<Link to='/login'>
							Login <Icon name='ArrowRight' size={12} />
						</Link>
					</Button>
				</Box>
				<Box className='mx-auto flex w-full max-w-2xl flex-col items-center justify-center gap-y-6'>
					<Box className='space-y-1 text-center'>
						<Typography variant='h5'>Recover password</Typography>
						<Typography variant='p' color='muted'>
							Following these steps below to reset your password
						</Typography>
					</Box>

					<Box className='mb-6 w-full'>
						<Steps data={steps} />
					</Box>

					<Box className='w-full'>
						{params.step == '1' ? (
							<VerifyEmailForm />
						) : params.step == '2' ? (
							<ResetPasswordForm onCompleted={setIsCompleted} />
						) : null}
					</Box>

					<Box
						as='footer'
						className='absolute bottom-0 p-4 text-center text-xs text-muted-foreground sm:hidden'>
						©{new Date().getFullYear()} GreenLand, Inc. All rights
						reserved.
					</Box>
				</Box>
			</Box>
		</>
	);
}
