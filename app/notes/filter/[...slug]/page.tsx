import NotesClient from "./Notes.client";
import { getNotes } from "@/lib/api";

interface NotesPageProps {
  params: { slug?: string[] };
}

export default async function NotesPage({ params }: NotesPageProps) {
  const resolvedParams = await params;
  const tag = resolvedParams.slug?.[0] || "All";

  const initialData = await getNotes(
    tag !== "All" ? { tag, page: 1, perPage: 12 } : { page: 1, perPage: 12 }
  );

  return <NotesClient initialData={initialData} tag={tag} />;
}
