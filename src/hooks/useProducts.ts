import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productApi } from "../lib/api";
import type { CreateProductData, UpdateProductData } from "../types/product";

// Query keys
export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (params: Record<string, unknown>) =>
    [...productKeys.lists(), params] as const,
  categories: () => [...productKeys.all, "categories"] as const,
};

// Hooks for products
export const useProducts = (
  params: {
    limit?: number;
    skip?: number;
    search?: string;
    category?: string;
    delay?: number;
  } = {}
) => {
  return useQuery({
    queryKey: productKeys.list(params),
    queryFn: () => productApi.getProducts(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: productKeys.categories(),
    queryFn: productApi.getCategories,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
};

// Mutations
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductData) => productApi.createProduct(data),
    onSuccess: () => {
      // Invalidate and refetch products list
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProductData) => productApi.updateProduct(data),
    onSuccess: () => {
      // Invalidate and refetch products list
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => productApi.deleteProduct(id),
    onSuccess: () => {
      // Invalidate and refetch products list
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
};
