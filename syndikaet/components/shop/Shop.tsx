"use client";
import Image from "next/image";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";

interface Merch {
  id?: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  stock: number; // Add this line
}

interface Track {
  id?: string;
  title: string;
  artist: string;
  description: string;
  url: string;
  cover: string;
  price: number;
  releaseDate: string;
}

const Shop = () => {
  const [activeSection, setActiveSection] = useState<"Merch" | "Track">(
    "Merch"
  );
  const [merchProducts, setMerchProducts] = useState<Merch[]>([]);
  const [trackProducts, setTrackProducts] = useState<Track[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Merch | Track | null>(
    null
  );
  const [newProduct, setNewProduct] = useState<Merch | Track>({
    name: "",
    description: "",
    imageUrl: "",
    price: 0,
    stock: 0,
    title: "", // For Track
    artist: "", // For Track
    releaseDate: "", // For Track
  });

  // Fetch products on page load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (activeSection === "Merch") {
          const res = await fetch("/api/merch/getAll");
          const data = await res.json();
          setMerchProducts(data);
        } else {
          const res = await fetch("/api/track/getAll");
          const data = await res.json();
          setTrackProducts(data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [activeSection]);

  const openModal = (product: Merch | Track | null = null) => {
    if (product) {
      setIsEditMode(true);
      setSelectedProduct(product);
      setNewProduct(product);
    } else {
      setIsEditMode(false);
      setNewProduct(
        activeSection === "Merch"
          ? {
              name: "",
              description: "",
              imageUrl: "",
              price: 0,
              stock: 0,
            }
          : {
              title: "",
              artist: "",
              description: "",
              url: "",
              cover: "",
              price: 0,
              releaseDate: "",
            }
      );
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
        ? `/api/${activeSection.toLowerCase()}/${selectedProduct.id}/update`
        : `/api/${activeSection.toLowerCase()}/create`;

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
        const updatedProduct = await res.json();
        if (activeSection === "Merch") {
          if (isEditMode) {
            setMerchProducts((prev) =>
              prev.map((prod) =>
                prod.id === updatedProduct.id ? updatedProduct : prod
              )
            );
          } else {
            setMerchProducts((prev) => [...prev, updatedProduct]);
          }
        } else {
          if (isEditMode) {
            setTrackProducts((prev) =>
              prev.map((prod) =>
                prod.id === updatedProduct.id ? updatedProduct : prod
              )
            );
          } else {
            setTrackProducts((prev) => [...prev, updatedProduct]);
          }
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
      const apiUrl = `/api/${activeSection.toLowerCase()}/${id}/delete`;
      const res = await fetch(apiUrl, { method: "DELETE" });

      if (res.ok) {
        if (activeSection === "Merch") {
          setMerchProducts((prev) => prev.filter((prod) => prod.id !== id));
        } else {
          setTrackProducts((prev) => prev.filter((prod) => prod.id !== id));
        }
      }
    } catch (error) {
      console.error(`Error deleting ${activeSection.toLowerCase()}:`, error);
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
            activeSection === "Track" ? "text-pink-500" : "text-black"
          }`}
          onClick={() => setActiveSection("Track")}
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
        {activeSection === "Merch" ? (
          merchProducts.length === 0 ? (
            <p className="text-gray-600">No merch available</p>
          ) : (
            merchProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white text-black shadow-lg rounded-lg overflow-hidden w-80 mx-auto mb-8"
              >
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
          )
        ) : trackProducts.length === 0 ? (
          <p className="text-gray-600">No tracks available</p>
        ) : (
          trackProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white text-black shadow-lg rounded-lg overflow-hidden w-80 mx-auto mb-8"
            >
              <Image
                src={product.cover}
                alt={product.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg">{product.title}</h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="font-bold">${product.price}</p>
                <p>Release Date: {product.releaseDate}</p>
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
            {activeSection === "Merch" ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={(newProduct as Merch).name}
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
                    name="cover"
                    value={(newProduct as Track).cover}
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
                    value={(newProduct as Merch).stock}
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
                    {isEditMode ? "Update" : "Add"} Merch
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={(newProduct as Track).title}
                    onChange={handleInputChange}
                    className="w-full border rounded p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Artist</label>
                  <input
                    type="text"
                    name="artist"
                    value={(newProduct as Track).artist}
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
                    name="cover"
                    value={(newProduct as Track).cover}
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
                  <label className="block mb-1">Release Date</label>
                  <input
                    type="date"
                    name="releaseDate"
                    value={(newProduct as Track).releaseDate}
                    onChange={handleInputChange}
                    className="w-full border rounded p-2"
                    required
                  />
                </div>
                {activeSection === "Track" && (
                  <div className="mb-4">
                    <label className="block mb-1">Cover</label>
                    <input
                      type="text"
                      name="cover"
                      value={(newProduct as Track).cover}
                      onChange={handleInputChange}
                      className="w-full border rounded p-2"
                      required
                    />
                  </div>
                )}
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
                    {isEditMode ? "Update" : "Add"} Track
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
