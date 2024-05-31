import { memo } from 'react';
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Icon
} from '@/components/ui';
import { useTranslation } from 'react-i18next';

const LanguaguesSelect: React.FunctionComponent = () => {
	const { i18n } = useTranslation();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				asChild
				className='ring-0 focus:border-none focus:outline-none'>
				<Button variant='ghost' size='icon'>
					<Icon name='Languages' />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className='w-48' align='end'>
				<DropdownMenuLabel>Languages</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup
					value={i18n.language}
					onValueChange={(value) => i18n.changeLanguage(value)}>
					<DropdownMenuRadioItem value='vi'>
						Tiếng Việt
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value='en'>English</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value='tcn'>
						Chinese (Traditional)
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value='scn'>
						Chinese (Simplified)
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default memo(LanguaguesSelect);
