import NotesClient from "./Notes.client";
import { getNotes } from "@/lib/api";

type NotesPageProps = { params: Promise<{ slug: string[] }> };

export default async function NotesPage({ params }: NotesPageProps) {
  const { slug } = await params;
  const tag = slug?.[0] === "All" ? undefined : slug?.[0];

  const initialData = await getNotes(
    tag !== "All" ? { tag, page: 1, perPage: 12 } : { page: 1, perPage: 12 }
  );

  return <NotesClient initialData={initialData} tag={tag} />;
}
