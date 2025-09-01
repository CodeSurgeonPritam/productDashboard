# Product Dashboard

A modern, responsive Product Dashboard built with React, TypeScript, TailwindCSS, shadcn/ui, and TanStack Query (React Query). The application demonstrates complete CRUD operations using the DummyJSON API.


## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd product-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── skeleton.tsx
│   │   └── table.tsx
│   ├── Layout.tsx          # Main layout component
│   ├── ProductForm.tsx     # Product create/edit form
│   └── ProductTable.tsx    # Product listing table
├── hooks/
│   └── useProducts.ts      # React Query hooks
├── lib/
│   ├── api.ts             # API functions
│   └── utils.ts           # Utility functions
├── types/
│   └── product.ts         # TypeScript types
└── App.tsx                # Main app component
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 API Integration

The application integrates with the DummyJSON API:

- **GET** `/products` - Fetch products with pagination
- **GET** `/products/search` - Search products
- **GET** `/products/categories` - Fetch categories
- **POST** `/products/add` - Create new product
- **PUT** `/products/:id` - Update product
- **DELETE** `/products/:id` - Delete product

