"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

interface Component {
  id: string;
  name: string;
  type: string;
  config: any;
}

export default function DashboardEditPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [components, setComponents] = useState<Component[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [layouts, setLayouts] = useState({});

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await fetch(`/api/dashboard/${params.id}/components`);
        if (!response.ok) {
          throw new Error("Failed to fetch components");
        }
        const data = await response.json();
        setComponents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchComponents();
    }
  }, [status, params.id]);

  const handleLayoutChange = (layout: any) => {
    // Update component positions in the database
    console.log("Layout changed:", layout);
  };

  const handleDelete = async (componentId: string) => {
    if (!confirm("Are you sure you want to delete this component?")) {
      return;
    }

    try {
      const response = await fetch(
        `/api/dashboard/${params.id}/components/${componentId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete component");
      }

      // Refresh the component list
      setComponents(components.filter(c => c.id !== componentId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  if (status === "loading" || loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Edit Dashboard</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => router.push(`/dashboard/${params.id}/components/new`)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Add Component
          </button>
          <button
            onClick={() => router.push(`/dashboard/${params.id}`)}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Save & Exit
          </button>
        </div>
      </div>

      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={100}
        onLayoutChange={(layout, layouts) => {
          setLayouts(layouts);
        }}
      >
        {components.map((component) => (
          <div key={component.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{component.name}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => router.push(`/dashboard/${params.id}/components/${component.id}/edit`)}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(component.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="text-gray-600">{component.type}</p>
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
} 