import ResourceUpload from "@/components/ResourceUpload";










export default function DashboardPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      <section className="mb-6">
        <h2 className="text-lg font-medium mb-2">Upload your resource</h2>
        <ResourceUpload />
      </section>
    </main>
  );
}
