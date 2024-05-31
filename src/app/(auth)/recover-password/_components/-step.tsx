import { Box, Icon, Typography } from '@/components/ui';
import { Link } from '@tanstack/react-router';
import tw from 'tailwind-styled-components';

export type StepItem = {
	index: number;
	name: string;
	href: React.ComponentProps<typeof Link>['search'];
	status: 'current' | 'upcoming' | 'completed';
};

export const Steps: React.FC<{ data: Array<StepItem> }> = ({ data }) => {
	return (
		<nav aria-label='Progress' className='w-full'>
			<StepList role='list'>
				{data.map((step, stepIndex) => (
					<Step key={step.name} className='relative flex flex-1'>
						{step.status === 'completed' ? (
							<Link
								search={step.href}
								className='group pointer-events-none flex w-full items-center'>
								<span className='flex items-center px-6 py-4 text-sm font-medium'>
									<span className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary group-hover:bg-primary/80'>
										<Icon
											name='Check'
											size={24}
											className='text-primary-foreground'
											aria-hidden='true'
										/>
									</span>
									<span className='ml-4 text-sm font-medium text-foreground'>
										{step.name}
									</span>
								</span>
							</Link>
						) : step.status === 'current' ? (
							<Link
								search={step.href}
								className='pointer-events-none flex items-center px-6 py-4 text-sm font-medium'
								aria-current='step'>
								<Box className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-primary'>
									<Typography className='text-primary'>
										{step.index}
									</Typography>
								</Box>
								<Typography
									variant='small'
									color='primary'
									className='ml-4 text-sm font-medium'>
									{step.name}
								</Typography>
							</Link>
						) : (
							<Link
								search={step.href}
								className='group pointer-events-none flex items-center'>
								<span className='flex items-center px-6 py-4 text-sm font-medium'>
									<span className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 duration-200 group-hover:border-muted-foreground'>
										<span className='text-muted-foreground duration-200 group-hover:text-foreground'>
											{step.index}
										</span>
									</span>
									<span className='ml-4 text-sm font-medium text-muted-foreground duration-200 group-hover:text-foreground'>
										{step.name}
									</span>
								</span>
							</Link>
						)}

						{stepIndex !== data.length - 1 ? (
							<>
								{/* Arrow separator for lg screens and up */}
								<div
									className='absolute right-0 top-0  h-full w-5 sm:hidden'
									aria-hidden='true'>
									<svg
										className='h-full w-full text-border'
										viewBox='0 0 22 80'
										fill='none'
										preserveAspectRatio='none'>
										<path
											d='M0 -2L20 40L0 82'
											vectorEffect='non-scaling-stroke'
											stroke='currentcolor'
											strokeLinejoin='round'
										/>
									</svg>
								</div>
							</>
						) : null}
					</Step>
				))}
			</StepList>
		</nav>
	);
};

const StepList = tw.ol`flex divide-y-0 divide-border rounded-md border sm:flex-col sm:divide-y`;
const Step = tw.li`relative flex flex-1`;
