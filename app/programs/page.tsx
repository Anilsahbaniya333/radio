import RecordingList from "@/components/RecordingSection";

export default function ProgramsPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">📻 Program Recordings</h1>
      <RecordingList />
    </main>
  );
}
