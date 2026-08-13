import React from "react";
import { getAuthUser } from "../lib/api";
import { useQuery } from "@tanstack/react-query";

const useAuthUser = () => {
  // it alows us to fetch data from backend more then 1 time if it gets fails cause it think that the data is not fetched and some problem from server side ,, thats why we use this queryfn tanstack  BEYOND  useState useEffect and useReducer
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false, // it will not retry to fetch the data if it fails
  });

  return { isLoading: authUser.isLoading, authUser: authUser.data?.user };
};

export default useAuthUser;
