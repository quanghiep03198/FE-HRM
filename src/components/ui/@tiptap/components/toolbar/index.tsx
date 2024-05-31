import { cn } from '@/common/utils/cn';
import ColorPicker from './toolbar-color-picker';
import { Editor } from '@tiptap/react';
import { Box, Button, Icon } from '@/components/ui';
import Tooltip from '@/components/ui/@override/tooltip';
import { AlignmentDropdownMenu } from './toolbar-alignment-dropdown';
import FontSizeInput from './toolbar-font-size-input';
import ImageDropdown from './toolbar-image-dropdown';
import { LinkPopover } from './toolbar-link-popover';
import { StyleDropdownMenu } from './toolbar-style-dropdown';
import TableDropdownMenu from './toolbar-table-dropdown';

type ToolbarPluginProps = {
	editor: Editor;
};

const Toolbar: React.FC<ToolbarPluginProps> = ({ editor }) => {
	if (!editor) return null;

	return (
		<Box className='p-1'>
			<Box className='overflow-x-auto scrollbar-none'>
				<Box className='flex h-full items-center justify-start gap-x-1 p-1'>
					{/* Undo */}
					<Tooltip content='Hoàn tác'>
						<Button
							className='aspect-square h-8 w-8'
							type='button'
							size='icon'
							variant='outline'
							onClick={() => editor.chain().focus().undo().run()}>
							<Icon name='Undo' />
						</Button>
					</Tooltip>

					{/* Redo */}
					<Tooltip content='Làm lại'>
						<Button
							className='aspect-square h-8 w-8'
							type='button'
							size='icon'
							variant='outline'
							onClick={() => editor.chain().focus().redo().run()}>
							<Icon name='Redo' />
						</Button>
					</Tooltip>

					{/* Change style */}
					<StyleDropdownMenu editor={editor} />

					{/* Change font size */}
					<Tooltip content='Cỡ chữ'>
						<FontSizeInput editor={editor} />
					</Tooltip>

					{/* Toggle bold */}
					<Tooltip content='Đậm'>
						<Button
							variant='outline'
							size='icon'
							className={cn('aspect-square h-8 w-8', {
								'bg-accent text-accent-foreground':
									editor.isActive('bold')
							})}
							onClick={() => editor.chain().focus().toggleBold().run()}>
							<Icon name='Bold' />
						</Button>
					</Tooltip>

					{/* Toggle quote */}
					<Tooltip content='Block quote'>
						<Button
							variant='outline'
							size='icon'
							className={cn('aspect-square h-8 w-8', {
								'bg-accent text-accent-foreground':
									editor.isActive('blockquote')
							})}
							onClick={() =>
								editor.chain().focus().toggleBlockquote().run()
							}>
							<Icon name='Quote' size={14} />
						</Button>
					</Tooltip>

					{/* Toggle italic */}
					<Tooltip content='Nghiêng'>
						<Button
							variant='outline'
							size='icon'
							className={cn('aspect-square h-8 w-8', {
								'bg-accent text-accent-foreground':
									editor.isActive('italic')
							})}
							onClick={() =>
								editor.chain().focus().toggleItalic().run()
							}>
							<Icon name='Italic' />
						</Button>
					</Tooltip>

					{/* Toggle underline */}
					<Tooltip content='Gạch chân'>
						<Button
							variant='outline'
							size='icon'
							className={cn('aspect-square h-8 w-8', {
								'bg-accent text-accent-foreground':
									editor.isActive('underline')
							})}
							onClick={() => editor.commands.toggleUnderline()}>
							<Icon name='Underline' />
						</Button>
					</Tooltip>

					{/* Toggle underline */}
					<Tooltip content='Code'>
						<Button
							variant='outline'
							size='icon'
							className={cn('aspect-square h-8 w-8', {
								'bg-accent text-accent-foreground':
									editor.isActive('underline')
							})}
							onClick={() => editor.commands.toggleCodeBlock()}>
							<Icon name='Code' />
						</Button>
					</Tooltip>
					<ColorPicker
						label='Màu văn bản'
						icon='Baseline'
						editor={editor}
						type='textStyle'
					/>
					<ColorPicker
						label='Highlight'
						icon='Highlighter'
						editor={editor}
						type='highlight'
					/>

					{/* Toggle strike linethough */}
					<Tooltip content='Gạch ngang'>
						<Button
							variant='outline'
							size='icon'
							className={cn('aspect-square h-8 w-8', {
								'bg-accent text-accent-foreground':
									editor.isActive('strike')
							})}
							onClick={() =>
								editor.chain().focus().toggleStrike().run()
							}>
							<Icon name='Strikethrough' className='h-4 w-4' />
						</Button>
					</Tooltip>

					{/* Toggle ordered list */}
					<Tooltip content='Danh sách được đánh số'>
						<Button
							variant='outline'
							size='icon'
							className={cn('aspect-square h-8 w-8', {
								'bg-accent text-accent-foreground':
									editor.isActive('orderedList')
							})}
							onClick={() =>
								editor.chain().focus().toggleOrderedList().run()
							}>
							<Icon name='ListOrdered' />
						</Button>
					</Tooltip>

					{/* Toggle bullet list */}
					<Tooltip content='Danh sách có dấu đầu dòng'>
						<Button
							variant='outline'
							size='icon'
							className={cn('aspect-square h-8 w-8', {
								'bg-accent text-accent-foreground':
									editor.isActive('bulletList')
							})}
							onClick={() =>
								editor.chain().focus().toggleBulletList().run()
							}>
							<Icon name='List' />
						</Button>
					</Tooltip>

					{/* Horizontal ruler */}
					<Tooltip content='Đường kẻ ngang'>
						<Button
							variant='outline'
							size='icon'
							className='aspect-square h-8 w-8'
							onClick={() => editor.commands.setHorizontalRule()}>
							<Icon name='PencilLine' />
						</Button>
					</Tooltip>

					<AlignmentDropdownMenu editor={editor} />
					<LinkPopover editor={editor} />
					<ImageDropdown editor={editor} />
					<TableDropdownMenu editor={editor} />
				</Box>
			</Box>
		</Box>
	);
};

export default Toolbar;
