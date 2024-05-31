import { useNavigate, useSearch } from '@tanstack/react-router';
import _ from 'lodash';

export default function useQueryParams(): [
	Record<string, string>,
	(key: string, value: any) => void,
	(key: string) => void
] {
	const searchParams = useSearch({ strict: false });

	const navigate = useNavigate();

	const setParam = (key: string, value: any) =>
		navigate({ search: (prev) => ({ ...prev, [key]: value }) });

	const removeParam = (key: string) =>
		navigate({ search: (prev) => _.omit(prev, [key]) });

	return [searchParams, setParam, removeParam];
}
