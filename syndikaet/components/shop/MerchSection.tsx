import React, { useState, useEffect } from 'react';
import { Product } from '../../types/Product';
import ProductCard from './ProductCard';

const MerchSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    name: '',
    description: '',
    price: 0,
    stock: 0,
    imageUrl: ''
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Fetch all merches from the API
  useEffect(() => {
    fetchMerches();
  }, []);

  const fetchMerches = async () => {
    try {
      const response = await fetch('/api/merch/getAll');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch merchandise items:', error);
    }
  };

  // Handle input changes for adding or editing a product
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Add a new product
  const handleAddProduct = async () => {
    try {
      const response = await fetch(`/api/merch/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const createdProduct = await response.json();
        setProducts([...products, createdProduct]);
        resetForm();
      }
    } catch (error) {
      console.error('Failed to add merchandise:', error);
    }
  };

  // Update an existing product
  const handleUpdateProduct = async () => {
    if (!selectedProduct) return;

    try {
      const response = await fetch(`/api/merch/${selectedProduct.id}/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        setProducts(products.map((prod) => (prod.id === updatedProduct.id ? updatedProduct : prod)));
        resetForm();
      }
    } catch (error) {
      console.error('Failed to update merchandise:', error);
    }
  };

  // Delete a product
  const handleDeleteProduct = async (id: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this product?');
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/merch/${id}/delete`, { method: 'DELETE' });
      if (response.ok) {
        setProducts(products.filter((product) => product.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete merchandise:', error);
    }
  };

  // Open form for editing a product
  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setNewProduct(product);
    setIsEditMode(true);
  };

  // Reset form state after add/update
  const resetForm = () => {
    setNewProduct({ id: 0, name: '', description: '', price: 0, stock: 0, imageUrl: '' });
    setIsEditMode(false);
    setSelectedProduct(null);
  };

  return (
    <div>
      <h1>Merchandise Section</h1>

      {/* Display products */}
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
            <button onClick={() => handleEditClick(product)}>Edit</button>
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* Form for adding/updating products */}
      <div className="product-form">
        <h2>{isEditMode ? 'Edit Product' : 'Add Product'}</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newProduct.name}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={newProduct.imageUrl}
          onChange={handleInputChange}
        />

        <button onClick={isEditMode ? handleUpdateProduct : handleAddProduct}>
          {isEditMode ? 'Update Product' : 'Add Product'}
        </button>
        {isEditMode && <button onClick={resetForm}>Cancel</button>}
      </div>
    </div>
  );
};

export default MerchSection;
