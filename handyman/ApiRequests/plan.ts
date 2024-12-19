import { useSocketContext } from "@/context/SocketContext";
import useApiCaller from "@/hooks/useApiCaller";
import {
	useInfiniteQuery,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
const usePlanRequest = () => {
	const apiCaller = useApiCaller();
	const { socket } = useSocketContext();
	const clientQuery = useQueryClient();
	const GetPlans = (
		{ pageSize = 1 }: { pageSize: number },
		filter: any = ""
	) => {
		const fetchJobs = async () => {
			return apiCaller
				.get(`/plans?requestType=all`)
				.then((response) => response.data);
		};

		return useQuery({
			queryKey: ["getPlans"],
			queryFn: fetchJobs,
		});
	};

	const GetSubscription = (
		{
			pageSize = 10,
		}: {
			pageSize?: number;
		},
		filter: any
	) =>
		useInfiniteQuery({
			queryKey: ["getSubscription"],
			queryFn: async ({ pageParam = 1 }) => {
				const response = await apiCaller.get(
					`/subscription?pageSize=${pageSize}&pageNumber=${pageParam}&status=${filter?.status}&payment_status=${filter?.payment_status}&paymentId=${filter?.paymentId}`
				);
				return response.data;
			},
			initialPageParam: 1,
			getNextPageParam: (lastPage, allPage) => {
				const nextPage = lastPage.currentPage + 1;
				return nextPage <= lastPage.totalPages ? nextPage : undefined;
			},
		});

	const CreateSubscritpion = useMutation({
		mutationFn: async (data: any) => {
			const response = await apiCaller.post(`/subscription`, data);
			// socket.emit("sendOffer", { receiverId: data.client });
			return response.data;
		},
	});

	const VerifyPayment = useMutation({
		mutationFn: async (data: any) => {
			const response = await apiCaller.post(
				`/subscription/verify-payment`,
				data
			);
			response.data?.userId &&
				socket.emit("sendOffer", { receiverId: response.data?.userId });
			return response.data;
		},
	});

	return { GetPlans, GetSubscription, CreateSubscritpion, VerifyPayment };
};

export default usePlanRequest;
