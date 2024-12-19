import { useAuth } from "@/context/AuthContext";
import { useSocketContext } from "@/context/SocketContext";

import useApiCaller from "@/hooks/useApiCaller";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
const useFilterRequests = () => {
	const apiCaller = useApiCaller();
	const { setUserData } = useAuth();
	const { userData } = useAuth();
	const user = userData[0];
	const { socket } = useSocketContext();
	const queryClient = useQueryClient();

    const GetFilter= async () => {
		const fetchJobs = async () => {
			return apiCaller.get(`/filter`).then((response) => response.data);
		};

		//return useQuery({
		//	queryKey: ["getJobAlert"],
		//	queryFn: fetchJobs,
		//	staleTime:Infinity
		//});
		return await fetchJobs();
	};
	const UpdatedFilter = useMutation({
		mutationFn: async (data: any) => {
			const response = await apiCaller.put(`/filter`, data);
			// queryClient.invalidateQueries({ queryKey: ["getFilter"] });
			return response.data;
		},
		
	});
	return {GetFilter, UpdatedFilter};
};

export default useFilterRequests;
