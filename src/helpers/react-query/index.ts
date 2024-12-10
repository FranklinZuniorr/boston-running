import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import type {
  UseMutationOptions,
  UseQueryOptions,
  DefinedInitialDataInfiniteOptions,
} from '@tanstack/react-query';

export const generateReactQuery = <TReturnData, TFilter>(
  queryKey: string,
  fn: (filter: TFilter) => Promise<TReturnData>,
) => {
  return (
    params: TFilter,
    options?: UseQueryOptions<TReturnData>,
  ) => {
    return useQuery<TReturnData>({ 
      ...options,
      queryKey: [queryKey, params],
      queryFn: () => fn(params),
     });
  };
};

export const generateReactQueryMutation = <TReturnData = void, TFilter = void>(
  queryKey: string,
  fn: (filter: TFilter) => Promise<TReturnData> | void,
) => {
  return (
    options?: UseMutationOptions<TReturnData, Error, TFilter>,
  ) => {
    return useMutation({
      ...options,
      mutationKey: [queryKey],
      mutationFn: (event: TFilter) => fn(event) as Promise<TReturnData>,
    });
  };
};

export const generateReactQueryInfinityScroll = <
  TReturnData = void,
  TFilter = void,
  TReactQueryPageParam = any
>(
  queryKey: string,
  fn: (
    filter: TFilter,
    reactQueryPageParam: TReactQueryPageParam,
  ) => Promise<TReturnData>,
) => {
  return (
    params: TFilter,
    options: DefinedInitialDataInfiniteOptions<TReturnData>
  ) => {
    return useInfiniteQuery<TReturnData>({
      ...options,
      queryKey: [queryKey, params],
      queryFn: ({ pageParam }) => {
        const normalizedPageParam: TReactQueryPageParam = pageParam as TReactQueryPageParam;
        return fn(params, normalizedPageParam);
      },
    });
  };
};

