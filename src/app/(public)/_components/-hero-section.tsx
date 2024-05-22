import { cn } from "@/common/utils/cn";
import { Box, Icon, Typography, buttonVariants } from "@/components/ui";
import { Link } from "@tanstack/react-router";

export default function HeroSection() {
	return (
		<Box
			as='section'
			className='relative flex min-h-[calc(100vh-4rem)] flex-grow items-center justify-center px-6 sm:px-4'>
			<Box className='mx-auto max-w-7xl space-y-6'>
				<Box className='text-center'>
					<Typography variant='h2' className='mb-6 leading-tight'>
						Simplify HR Management with i-HRM
					</Typography>

					<Typography variant='p' className='mb-10 xl:text-lg'>
						Effortlessly manage employee records, streamline payroll, and
						enhance productivity - all in one place.{" "}
						<br className='sm:hidden md:hidden' /> Experience the future
						of HR management with intuitive, efficient, and secure
						solutions.
					</Typography>

					<Box className='flex items-center justify-center gap-x-1'>
						<Link to='/login' className={cn(buttonVariants())}>
							Get started
						</Link>
						<Link
							hash='#outstanding-features'
							className={buttonVariants({
								variant: "link",
								className: "items-center gap-x-2 !text-foreground"
							})}>
							Learn more <Icon name='ArrowRight' size={12} />
						</Link>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}
