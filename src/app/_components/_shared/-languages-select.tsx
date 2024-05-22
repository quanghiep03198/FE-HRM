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
} from "@/components/ui";
import { memo } from "react";

const LanguaguesSelect: React.FunctionComponent = () => {
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
				<DropdownMenuRadioGroup value='vi'>
					<DropdownMenuRadioItem value='vi'>
						Tiếng Việt
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value='en'>English</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value='tw'>Taiwan</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default memo(LanguaguesSelect);
