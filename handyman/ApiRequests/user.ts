import { useSocketContext } from "@/context/SocketContext";
import useApiCaller from "@/hooks/useApiCaller";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
const useUserRequests = () => {
  const apiCaller = useApiCaller();
  const queryClient = useQueryClient();
  const { socket } = useSocketContext();
  const GetUser = (queryParams: any) =>
    useQuery({
      queryKey: ["getUserData"],
      queryFn: async () => {
        const response = await apiCaller.get(
          `/user?email=${queryParams.email}&_id=${queryParams._id}`
        );
        return response.data;
      },
    });

  const GetCraftManProfile = (queryParams: string) =>
    useQuery({
      queryKey: ["getCraftsmanProfile"],
      queryFn: async () => {
        const response = await apiCaller.get(`/user/craftman/${queryParams}`);
        return response.data;
      },
    });

  // try {
  // 	const response = await apiCaller.get(
  // 		`/user/craftman/${queryParams}`
  // 	);

  // 	return { data: response.data };
  // } catch (error) {
  // 	return { error: error };

  const GetUsers = (
    { pageSize, role }: { pageSize: number; role: string },
    filter: any
  ) => {
    return useInfiniteQuery({
      queryKey: ["getUsers"],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await apiCaller.get(
          `/user/getuser?role=${role}&pageSize=${pageSize}&pageNumber=${pageParam}&search=${filter.search}`
        );
        return response.data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPage) => {
        const nextPage = lastPage.currentPage + 1;
        return nextPage <= lastPage.totalPages ? nextPage : undefined;
      },
    });
  };

  const GetHandymans = ({ pageSize }: { pageSize: number }, filter: any) => {
    return useInfiniteQuery({
      queryKey: ["getCraftsmans"],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await apiCaller.get(
          `/user/craftman/getcraftsman?pageSize=${pageSize}&pageNumber=${pageParam}&status=${filter.status}`
        );
        return response.data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPage) => {
        const nextPage = lastPage.currentPage + 1;
        return nextPage <= lastPage.totalPages ? nextPage : undefined;
      },
    });
  };

  const UpdateUser = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiCaller.put("/user", data);
      await queryClient.invalidateQueries({
        queryKey: ["getUsers"],
      });
      socket.emit("sendOffer", { receiverId: data.user });
      return response.data;
    },
  });

  // client registration not using this route
  const CreateUser = useMutation({
    mutationFn: async (data: Object) => {
      const response = await apiCaller.post("/auth/register", data);
      return response.data;
    },
  });

  const UpdateCraftman = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiCaller.put("/user/craftman", data);
      await queryClient.invalidateQueries({
        queryKey: ["getCraftsmans"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["getUsers"],
      });
      socket.emit("sendOffer", { receiverId: data.user });
      return response.data;
    },
  });

  const DeleteCraftman = useMutation({
    mutationFn: async (nul: null) => {
      const response = await apiCaller.delete("/user/craftman");
      return response.data;
    },
  });

  const SearchHandyman = (
    { pageSize }: { pageSize: number },
    filter: {
      service: string;
      rating?: string;
      zipCode: string;
      city: string;
      distance?: string;
    }
  ) => {
    return useInfiniteQuery({
      queryKey: ["searchHandyman"],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await apiCaller.get(
          `/find_handymans/?zipCode=${filter?.zipCode || ""}&service=${
            filter?.service || ""
          }&rating=${filter?.rating || ""}&city=${filter.city}&distance=${
            filter?.distance
          }&pageSize=${pageSize}&pageNumber=${pageParam}`
        );
        return response.data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPage) => {
        const nextPage = lastPage.currentPage + 1;
        return nextPage <= lastPage.totalPages ? nextPage : undefined;
      },
    });
  };
  return {
    GetUser,
    GetUsers,
    GetHandymans,
    GetCraftManProfile,
    SearchHandyman,
    UpdateUser,
    CreateUser,
    UpdateCraftman,
    DeleteCraftman,
  };
};

export default useUserRequests;
