"use client";
import Image from "next/image";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";

interface Product {
  id?: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  stock: number; // Add this line
}

const Shop = () => {
  const [activeSection, setActiveSection] = useState<"Merch" | "Tracks">(
    "Merch"
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    description: "",
    imageUrl: "",
    price: 0,
    stock: 0,
  });

  // Fetch products on page load
  useEffect(() => {
    fetch("/api/merch/getAll")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const openModal = (product: Product | null = null) => {
    if (product) {
      setIsEditMode(true);
      setSelectedProduct(product);
      setNewProduct(product);
    } else {
      setIsEditMode(false);
      setNewProduct({
        name: "",
        description: "",
        imageUrl: "",
        price: 0,
        stock: 0,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const apiUrl =
      isEditMode && selectedProduct
        ? `/api/merch/${selectedProduct.id}/update`
        : "/api/merch/create";

    const method = isEditMode ? "PUT" : "POST";

    try {
      const res = await fetch(apiUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (res.ok) {
        const updatedProduct: Product = await res.json();
        if (isEditMode) {
          setProducts((prev) =>
            prev.map((prod) =>
              prod.id === updatedProduct.id ? updatedProduct : prod
            )
          );
        } else {
          setProducts((prev) => [...prev, updatedProduct]);
        }
        closeModal();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const res = await fetch(`/api/merch/${id}/delete`, { method: "DELETE" });

      if (res.ok) {
        setProducts((prev) => prev.filter((prod) => prod.id !== id));
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div id="shop" className="flex flex-col min-h-screen bg-gray-100">
      <h1 className="text-xl font-normal text-black sm:text-md mb-6 ml-6 mt-6">
        Shop
      </h1>

      <div className="flex space-x-4 mb-8 mx-auto">
        <a
          className={`px-4 py-2 font-semibold text-lg rounded ${
            activeSection === "Merch" ? "text-blue-400" : "text-black"
          }`}
          onClick={() => setActiveSection("Merch")}
        >
          Merch
        </a>
        <a
          className={`px-4 py-2 font-semibold text-lg rounded ${
            activeSection === "Tracks" ? "text-pink-500" : "text-black"
          }`}
          onClick={() => setActiveSection("Tracks")}
        >
          Tracks
        </a>
      </div>

      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-6"
        onClick={() => openModal()}
      >
        + Add {activeSection}
      </button>

      <div className="w-full max-w-full p-4 flex flex-wrap justify-around mx-auto">
        {products.length === 0 ? (
          <p className="text-gray-600">No merch available</p>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="bg-white text-black shadow-lg rounded-lg overflow-hidden w-80 mx-auto mb-8"
            >
              {/* Image de l'article */}
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="font-bold">${product.price}</p>
                <p>stock: {product.stock}</p>
              </div>
              <div className="flex space-x-2 p-4">
                <button
                  onClick={() => openModal(product)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => product.id && handleDelete(product.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Form for Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">
              {isEditMode ? "Edit" : "Add"} {activeSection}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Description</label>
                <textarea
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Image URL</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={newProduct.imageUrl}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Price</label>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={newProduct.stock}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  {isEditMode ? "Update" : "Add"} {activeSection}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
