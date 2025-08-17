import type { Metadata } from "next";
import NotesClient from "./Notes.client";
import { getNotes } from "@/lib/api";

type NotesPageProps = { params: Promise<{ slug: string[] }> };

export async function generateMetadata({
  params,
}: NotesPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const tag =
    resolvedParams.slug?.[0] === "All" ? undefined : resolvedParams.slug?.[0];
  const pageTitle = tag ? `Notes – ${tag} | NoteHub` : `All Notes | NoteHub`;
  const pageDescription = tag
    ? `Browse all notes tagged with "${tag}" in NoteHub.`
    : `Browse all available notes in NoteHub.`;

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `https://your-domain.com/notes/filter/${tag || "All"}`,
      images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
  };
}

export default async function NotesPage({ params }: NotesPageProps) {
  const { slug } = await params;
  const tag = slug?.[0] === "All" ? undefined : slug?.[0];

  const initialData = await getNotes(
    tag !== "All" ? { tag, page: 1, perPage: 12 } : { page: 1, perPage: 12 }
  );

  return <NotesClient initialData={initialData} tag={tag} />;
}
