import { Box, Icon, TIconProps, Typography } from "@/components/ui";
import { useRef } from "react";
import { useScrollIntoView } from "..";

type FeatureItemProps = {
	icon: TIconProps["name"];
	title: string;
	description: string;
};

const mainFeatures: Array<FeatureItemProps> = [
	{
		icon: "Users",
		title: "Administration Work",
		description:
			"With a SaaS HR solution, there is no need for paperwork. All employees’ salary calculations, deductions, and perks allocations will be made automatically in the payroll system without any manual data entries. "
	},
	{
		icon: "LineChart",
		title: "Performance Management",
		description:
			"By using HR software, the process becomes effortless, and the evaluation will be done in real-time based on set KPIs and targets, making the process more engaging for employees."
	},
	{
		icon: "FileText",
		title: "Reporting",
		description:
			"HR solution provides you with a reporting dashboard where an HR manager can see turnover, headcount, overtime, time and attendance, benefits, and more to help the HR team create strategic plans and solve problems if any."
	}
];

const FeaturesSection: React.FunctionComponent = () => {
	const sectionRef = useRef<HTMLDivElement>(null);

	useScrollIntoView({
		hashMatch: "outstanding-features",
		target: sectionRef.current
	});

	return (
		<Box
			ref={sectionRef}
			as='section'
			className='relative mx-auto flex max-w-4xl flex-grow items-center justify-center px-6 sm:px-4 xl:max-w-7xl xxl:max-w-8xl'>
			<Box className='space-y-20'>
				<Box className='max-w-4xl text-left'>
					<Typography
						color='primary'
						variant='small'
						className='mb-2 !text-base font-medium'>
						No more paperwork
					</Typography>
					<Typography variant='h3' className='mb-6'>
						Comprehensive solutions for HR Management
					</Typography>
					<Typography variant='p' className='text-lg'></Typography>
				</Box>

				<Box className='grid flex-col items-start gap-6 xl:grid-cols-3'>
					{mainFeatures.map((item, index) => (
						<FeatureItem {...item} key={index} />
					))}
				</Box>
			</Box>
		</Box>
	);
};

const FeatureItem: React.FC<FeatureItemProps> = (props) => {
	return (
		<Box className='flex items-start gap-x-4'>
			<Box className='inline-flex items-center justify-center rounded-full bg-primary/10 p-3'>
				<Icon
					name={props.icon}
					strokeWidth={1.5}
					className='inline-flex h-6 w-6 stroke-primary'
				/>
			</Box>
			<Box className='space-y-2'>
				<Typography className='font-medium'>{props.title}</Typography>
				<Typography variant='small' color='muted'>
					{props.description}
				</Typography>
			</Box>
		</Box>
	);
};

export default FeaturesSection;
