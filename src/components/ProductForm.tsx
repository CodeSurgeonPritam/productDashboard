import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  useCategories,
  useCreateProduct,
  useUpdateProduct,
} from "../hooks/useProducts";
import type { Product, CreateProductData } from "../types/product";

interface ProductFormProps {
  product?: Product | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const ProductForm = ({ product, onSuccess, onCancel }: ProductFormProps) => {
  const [formData, setFormData] = useState<CreateProductData>({
    title: "",
    description: "",
    price: 0,
    category: "",
    stock: 0,
  });

  const { data: categories = [] } = useCategories();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  // Fallback categories in case API is slow or fails
  const defaultCategories = [
    "electronics",
    "clothing",
    "books",
    "home",
    "sports",
  ];
  const availableCategories =
    categories.length > 0 ? categories : defaultCategories;

  const isEditing = !!product;
  const isLoading = createProduct.isPending || updateProduct.isPending;

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        stock: product.stock,
      });
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.category
    ) {
      alert("Please fill in all required fields");
      return;
    }

    if (formData.price <= 0 || formData.stock < 0) {
      alert("Please enter valid price and stock values");
      return;
    }

    try {
      if (isEditing && product) {
        await updateProduct.mutateAsync({
          ...formData,
          id: product.id,
        });
      } else {
        await createProduct.mutateAsync(formData);
      }
      onSuccess();
    } catch (error) {
      console.error("Failed to save product:", error);
      alert("Failed to save product. Please try again.");
    }
  };

  const handleInputChange =
    (field: keyof CreateProductData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        field === "price" || field === "stock"
          ? parseFloat(e.target.value) || 0
          : e.target.value;

      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-accent-foreground">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={handleInputChange("title")}
          placeholder="Enter product title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={handleInputChange("description")}
          placeholder="Enter product description"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={handleInputChange("price")}
            placeholder="0.00"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            type="number"
            min="0"
            value={formData.stock}
            onChange={handleInputChange("stock")}
            placeholder="0"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select value={formData.category} onValueChange={handleCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {availableCategories.length > 0 ? (
              availableCategories.map((category) => {
                const categoryName = String(category);
                return (
                  <SelectItem key={categoryName} value={categoryName}>
                    {categoryName.charAt(0).toUpperCase() +
                      categoryName.slice(1)}
                  </SelectItem>
                );
              })
            ) : (
              <SelectItem value="" disabled>
                Loading categories...
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? "Saving..."
            : isEditing
            ? "Update Product"
            : "Create Product"}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
