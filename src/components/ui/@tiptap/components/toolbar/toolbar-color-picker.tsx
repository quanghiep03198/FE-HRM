import { cn } from '@/common/utils/cn';
import Tooltip from '@/components/ui/@override/tooltip';
import { Editor } from '@tiptap/react';
import { useEffect, useState } from 'react';
import {
	Box,
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Icon,
	Input,
	Label,
	TIconProps,
	buttonVariants
} from '../../..';
import { PresetColors } from '../../configs/preset-color.config';

type ColorPickerProps = {
	label: string;
	icon: TIconProps['name'];
	editor: Editor;
	type: 'textStyle' | 'highlight';
};

const ColorPicker: React.FC<ColorPickerProps> = ({
	editor,
	label,
	icon,
	type
}) => {
	const [open, setOpen] = useState<boolean>(false);
	const [currentColor, setCurrentColor] = useState<string | undefined>();

	useEffect(() => {
		setCurrentColor(editor.getAttributes(type).color);
	}, [editor.getAttributes('textStyle')]);

	const handleSelectColor = (value: string) => {
		setCurrentColor(value);
		if (type === 'textStyle') editor.commands.setColor(value);
		if (type === 'highlight') editor.commands.setHighlight({ color: value });
	};

	return (
		<Box className='relative'>
			<DropdownMenu open={open} onOpenChange={setOpen}>
				<Tooltip content={label}>
					<DropdownMenuTrigger asChild>
						<Button
							variant='outline'
							className='aspect-square h-8 w-8 flex-col gap-x-1.5'
							size='icon'>
							<Icon name={icon} />
							<Box
								className={cn('h-[4px] w-4/5 self-center', {
									'!bg-foreground':
										!currentColor && type === 'textStyle',
									'bg-transparent':
										!currentColor && type === 'highlight'
								})}
								style={{ backgroundColor: currentColor }}
							/>
						</Button>
					</DropdownMenuTrigger>
				</Tooltip>
				<DropdownMenuContent align='start'>
					<DropdownMenuGroup>
						<Box className='flex items-center justify-between'>
							<DropdownMenuLabel className='flex items-center justify-between'>
								Preset colors
							</DropdownMenuLabel>
							<Button
								variant='ghost'
								size='sm'
								className='gap-x-2'
								onClick={() => {
									if (type === 'highlight')
										editor.commands.unsetHighlight();
									if (type === 'textStyle')
										editor.commands.unsetColor();
								}}>
								<Icon name='Eraser' /> Không
							</Button>
						</Box>
						<DropdownMenuSeparator />
						<Box className='grid grid-cols-10 gap-2 p-2'>
							{PresetColors.map((color) => (
								<DropdownMenuItem
									key={color}
									style={{
										width: 18,
										height: 18,
										padding: 1,
										borderColor: color,
										backgroundColor: color
									}}
									className={cn({
										'border-1 border-solid': editor.isActive(
											'textStyle',
											{ color: color }
										)
									})}
									onClick={() => handleSelectColor(color)}
								/>
							))}
						</Box>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuLabel asChild onClick={() => setOpen(false)}>
							<Label
								htmlFor='color-picker'
								className={cn(
									buttonVariants({
										variant: 'ghost',
										size: 'sm',
										className: 'gap-x-2'
									})
								)}>
								<Icon name='PlusCircle' /> Tùy chỉnh
							</Label>
						</DropdownMenuLabel>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
			<Input
				id='color-picker'
				type='color'
				className='color invisible absolute inset-0 appearance-none border-none outline-none'
				onChange={(e) => handleSelectColor(e.target.value)}
			/>
		</Box>
	);
};

export default ColorPicker;
