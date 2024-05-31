import {
	Box,
	Button,
	Form as FormProvider,
	Icon,
	TextareaFieldControl,
	Typography
} from '@/components/ui';
import { InputFieldControl } from '@/components/ui/@hook-form/input-field-control';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import tw from 'tailwind-styled-components';
import { useScrollIntoView } from '..';

const ContactSection: React.FunctionComponent = () => {
	const form = useForm();
	const sectionRef = useRef<HTMLDivElement>(null);

	useScrollIntoView({
		hashMatch: 'contact',
		target: sectionRef.current,
		block: 'end'
	});

	return (
		<Box
			ref={sectionRef}
			as='section'
			className='relative flex w-full flex-grow flex-col items-center justify-center space-y-10 px-6 sm:p-0'>
			<Box className='space-y-4 text-center'>
				<Typography variant='h3'>Get in touch</Typography>
				<Typography variant='p' className='xl:text-lg'>
					Don't hesitate to contact us if you have any question
				</Typography>
			</Box>
			<FormProvider {...form}>
				<Form>
					<Box className='col-span-1 sm:col-span-full'>
						<InputFieldControl
							label='First name'
							name='first_name'
							placeholder='Your first name ...'
							control={form.control}
						/>
					</Box>
					<Box className='col-span-1 sm:col-span-full'>
						<InputFieldControl
							label='Last name'
							name='last_name'
							placeholder='Your last name ...'
							control={form.control}
						/>
					</Box>
					<Box className='col-span-full'>
						<InputFieldControl
							label='Company'
							name='company'
							placeholder="Your company's name ..."
							control={form.control}
						/>
					</Box>
					<Box className='col-span-full'>
						<InputFieldControl
							label='Email'
							name='email'
							placeholder='example@email.com'
							control={form.control}
						/>
					</Box>
					<Box className='col-span-full'>
						<InputFieldControl
							label='Phone'
							name='phone'
							placeholder='+84 xxx xxx xxxx'
							control={form.control}
						/>
					</Box>
					<Box className='col-span-full'>
						<TextareaFieldControl
							label='Question'
							name='question'
							rows={5}
							control={form.control}
						/>
					</Box>
					<Box className='col-span-full'>
						<Button
							variant='default'
							type='submit'
							className='w-full gap-x-2'>
							<Icon name='Send' />
							Send
						</Button>
					</Box>
				</Form>
			</FormProvider>
		</Box>
	);
};

const Form = tw.form`grid grid-cols-2 gap-x-2 sm:p-4 sm:rounded-none sm:border-x-0 gap-y-6 max-w-2xl md:max-w-full w-full mx-auto bg-popover/50 backdrop-blur-sm border border-border rounded-lg p-6`;

export default ContactSection;
