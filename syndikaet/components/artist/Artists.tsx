"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface Artist {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

const Artists: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [newArtist, setNewArtist] = useState({
    name: "",
    description: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetch("/api/artists/getAll")
      .then((res) => res.json())
      .then((data) => {
        setArtists(data);
      })
      .catch((err) => {
        console.error("Error fetching artists:", err);
      });
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewArtist({ ...newArtist, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const apiUrl = isEditMode
      ? `/api/artists/${selectedArtist?.id}/update`
      : "/api/artists/create";

    try {
      const res = await fetch(apiUrl, {
        method: isEditMode ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newArtist),
      });

      if (res.ok) {
        const updatedArtistResponse = await res.json();
        if (isEditMode) {
          setArtists((prev) =>
            prev.map((artist) =>
              artist.id === updatedArtistResponse.id
                ? updatedArtistResponse
                : artist
            )
          );
        } else {
          setArtists((prev) => [...prev, updatedArtistResponse]);
        }
        closeModal();
      } else {
        console.error("Failed to create or update artist");
      }
    } catch (error) {
      console.error("Error creating or updating artist:", error);
    }
  };

  const openEditModal = (artist: Artist) => {
    setNewArtist(artist);
    setIsEditMode(true);
    setIsModalOpen(true);
    setSelectedArtist(artist);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setNewArtist({
      name: "",
      description: "",
      imageUrl: "",
    });
    setSelectedArtist(null);
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this artist?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const res = await fetch(`/api/artists/${id}/delete`, {
        method: "DELETE",
      });

      if (res.ok) {
        setArtists((prev) => prev.filter((artist) => artist.id !== id));
      } else {
        console.error("Failed to delete artist");
      }
    } catch (error) {
      console.error("Error deleting artist:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center my-4">
        <h1 className="text-2xl font-bold">Artists</h1>
        <button
          className="bg-black text-white py-2 px-4 rounded hover:bg-gray-500"
          onClick={() => setIsModalOpen(true)}
        >
          + Add Artist
        </button>
      </div>

      {artists.length === 0 ? (
        <div className="text-center flex justify-center items-center text-gray-500 my-8 min-h-96">
          <p>No artists available.</p>
        </div>
      ) : (
        <Swiper
          slidesPerView={2}
          spaceBetween={30}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="mySwiper p-5"
        >
          {artists.map((artist) => (
            <SwiperSlide key={artist.id} className="bg-inherit">
              <div className="shadow-lg rounded-lg overflow-hidden max-w-xs mx-auto">
                <div className="relative w-full h-64">
                  <Image
                    src={artist.imageUrl}
                    alt={artist.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-4 bg-black text-white">
                  <h2 className="text-xl font-semibold">{artist.name}</h2>
                  <p>{artist.description}</p>
                  <button
                    onClick={() => openEditModal(artist)}
                    className="bg-gray-500 text-white px-4 py-2 rounded mt-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(artist.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Modal for adding or editing an artist */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">
              {isEditMode ? "Edit Artist" : "Add New Artist"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newArtist.name}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1" htmlFor="description">
                  description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={newArtist.description}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1" htmlFor="imageUrl">
                  Image URL
                </label>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  value={newArtist.imageUrl}
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
                  {isEditMode ? "Update Artist" : "Add Artist"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Artists;
