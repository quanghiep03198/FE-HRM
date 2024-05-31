import LanguaguesSelect from '@/components/shared/languages-select';
import ThemeSelect from '@/components/shared/theme-toggle';
import Resources from '@/common/types/resources';
import { cn } from '@/common/utils/cn';
import {
	Badge,
	Box,
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Icon,
	Typography,
	buttonVariants
} from '@/components/ui';
import { Link } from '@tanstack/react-router';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

type NaviationLink = {
	title: keyof Resources['home.ns']['navigation'];
	href: string;
};

const navigationLinks: Array<NaviationLink> = [
	{
		title: 'features',
		href: 'outstanding-features'
	},
	{
		title: 'support',
		href: 'support'
	},
	{
		title: 'faqs',
		href: 'faqs'
	},
	{
		title: 'contact',
		href: 'contact'
	}
];

const Header: React.FunctionComponent = () => {
	const { t } = useTranslation('home.ns', { keyPrefix: 'navigation' });

	return (
		<Box className='sticky top-0 z-50 h-16 bg-opacity-85 backdrop-blur-xl'>
			<Box
				as='nav'
				className='mx-auto flex h-full max-w-7xl items-center justify-between p-6 sm:p-4 xxl:max-w-8xl'
				aria-label='Global'>
				<MenuDropdown />
				<Box className='flex items-center gap-x-2 sm:hidden md:hidden'>
					<Link
						to='/'
						className='text-xs font-bold transition-colors duration-200 hover:text-primary'>
						i-HRM
					</Link>
					<Badge variant='default' className='select-none'>
						{import.meta.env.VITE_APP_VERSION}
					</Badge>
				</Box>

				<Box className='flex flex-1 items-center justify-center gap-x-2 rounded-full text-sm font-medium sm:hidden md:hidden'>
					{navigationLinks.map((item, index) => (
						<Link
							resetScroll={false}
							hash={item.href}
							key={index}
							className={cn(
								buttonVariants({
									variant: 'link',
									className: 'text-foreground'
								})
							)}>
							{t(item.title)}
						</Link>
					))}
				</Box>

				<Box className='flex items-center justify-end gap-x-1 self-center'>
					<ThemeSelect />
					<LanguaguesSelect />
					<Link
						to='/login'
						className={buttonVariants({
							variant: 'ghost',
							className: 'gap-x-2'
						})}>
						Log in
						<Icon
							name='ArrowRight'
							size={12}
							className='translate-y-px'
						/>
					</Link>
				</Box>
			</Box>
		</Box>
	);
};

function MenuDropdown() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='ghost'
					size='icon'
					className='hidden sm:inline-flex md:inline-flex'>
					<Icon name='Menu' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='start' className='w-60'>
				<DropdownMenuLabel asChild>
					<Link to='/' className='flex items-center gap-x-2'>
						<Typography className='text-xs font-bold tracking-widest'>
							i-HRM
						</Typography>
						<Badge variant='default'>
							{import.meta.env.VITE_APP_VERSION}
						</Badge>
					</Link>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{navigationLinks.map((item, index) => (
					<DropdownMenuItem asChild key={index}>
						<Link hash={item.href}>{item.title}</Link>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default memo(Header);
