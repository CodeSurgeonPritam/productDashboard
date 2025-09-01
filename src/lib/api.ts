import type {
  Product,
  ProductsResponse,
  CreateProductData,
  UpdateProductData,
} from "../types/product";

const BASE_URL = "https://dummyjson.com";

export const productApi = {
  // Get products with pagination and search
  getProducts: async (
    params: {
      limit?: number;
      skip?: number;
      search?: string;
      category?: string;
      delay?: number;
    } = {}
  ): Promise<ProductsResponse> => {
    const { limit = 10, skip = 0, search, category, delay = 0 } = params;

    let url = `${BASE_URL}/products`;

    if (search) {
      url = `${BASE_URL}/products/search`;
    } else if (category && category !== "all") {
      url = `${BASE_URL}/products/category/${category}`;
    }

    const searchParams = new URLSearchParams({
      limit: limit.toString(),
      skip: skip.toString(),
    });

    if (search) {
      searchParams.append("q", search);
    }

    if (delay > 0) {
      searchParams.append("delay", delay.toString());
    }

    const response = await fetch(`${url}?${searchParams}`);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return response.json();
  },

  // Get all categories
  getCategories: async (): Promise<string[]> => {
    const response = await fetch(`${BASE_URL}/products/categories`);

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await response.json();

    // DummyJSON returns an array of strings like ["beauty", "fragrances", "furniture", ...]
    if (Array.isArray(data)) {
      return data.filter(
        (item) => typeof item === "string" && item.trim().length > 0
      );
    }

    // Fallback in case the API structure changes
    return [];
  },

  // Create product
  createProduct: async (data: CreateProductData): Promise<Product> => {
    const response = await fetch(`${BASE_URL}/products/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create product");
    }

    return response.json();
  },

  // Update product
  updateProduct: async (data: UpdateProductData): Promise<Product> => {
    const response = await fetch(`${BASE_URL}/products/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update product");
    }

    return response.json();
  },

  // Delete product
  deleteProduct: async (id: number): Promise<Product> => {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }

    return response.json();
  },
};
