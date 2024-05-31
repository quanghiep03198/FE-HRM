import * as React from 'react';
import { useController } from 'react-hook-form';
import { cn } from '@/common/utils/cn';
import { TRequiredFormFieldProps } from '@/common/types/ui-component-props';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/@shadcn/form';

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

type TInputFieldControl = TRequiredFormFieldProps &
	React.HTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					'flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm text-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
					className
				)}
				ref={ref}
				{...props}
			/>
		);
	}
);
Input.displayName = 'Input';

const FieldControl: React.FC<TInputFieldControl> = (props) => {
	const { control, name, label, description, ...inputProps } = props;

	const { fieldState, field } = useController({
		name,
		control
	});

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}
					<FormControl>
						<Input placeholder={inputProps.placeholder} {...field} />
					</FormControl>
					{description && <FormDescription>{description}</FormDescription>}
					{fieldState.error && (
						<FormMessage>{fieldState.error.message}</FormMessage>
					)}
				</FormItem>
			)}
		/>
	);
};

export { Input, FieldControl as InputFieldControl };
