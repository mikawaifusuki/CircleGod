"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Model {
  id: string;
  name: string;
  description: string | null;
  type: string;
  config: any;
}

export default function ModelsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch("/api/models");
        if (!response.ok) {
          throw new Error("Failed to fetch models");
        }
        const data = await response.json();
        setModels(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchModels();
    }
  }, [status]);

  if (status === "loading" || loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Analysis Models</h1>
        <button
          onClick={() => router.push("/models/new")}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add New Model
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {models.map((model) => (
          <div
            key={model.id}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-2">{model.name}</h2>
            <p className="text-gray-600 mb-2">Type: {model.type}</p>
            {model.description && (
              <p className="text-gray-600 mb-4">{model.description}</p>
            )}
            <div className="flex space-x-2">
              <button
                onClick={() => router.push(`/models/${model.id}`)}
                className="text-indigo-600 hover:text-indigo-800"
              >
                Edit
              </button>
              <button
                onClick={() => router.push(`/models/${model.id}/train`)}
                className="text-green-600 hover:text-green-800"
              >
                Train
              </button>
              <button
                onClick={() => router.push(`/models/${model.id}/predict`)}
                className="text-blue-600 hover:text-blue-800"
              >
                Predict
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 