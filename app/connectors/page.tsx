"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Connector {
  id: string;
  name: string;
  type: string;
  config: any;
}

export default function ConnectorsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [connectors, setConnectors] = useState<Connector[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchConnectors = async () => {
      try {
        const response = await fetch("/api/connectors");
        if (!response.ok) {
          throw new Error("Failed to fetch connectors");
        }
        const data = await response.json();
        setConnectors(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchConnectors();
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
        <h1 className="text-2xl font-bold">Data Connectors</h1>
        <button
          onClick={() => router.push("/connectors/new")}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add New Connector
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connectors.map((connector) => (
          <div
            key={connector.id}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-2">{connector.name}</h2>
            <p className="text-gray-600 mb-4">Type: {connector.type}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => router.push(`/connectors/${connector.id}`)}
                className="text-indigo-600 hover:text-indigo-800"
              >
                Edit
              </button>
              <button
                onClick={() => router.push(`/connectors/${connector.id}/test`)}
                className="text-green-600 hover:text-green-800"
              >
                Test Connection
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 