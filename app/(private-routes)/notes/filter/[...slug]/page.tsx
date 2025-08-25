import type { Metadata } from "next";
import NotesClient from "./Notes.client";
import { getServerNotes } from "@/lib/api/serverApi";

type NotesPageProps = { params: Promise<{ slug?: string[] }> };

export async function generateMetadata({
  params,
}: NotesPageProps): Promise<Metadata> {
  const { slug } = await params; //
  const rawTag = slug?.[0];
  const tag = rawTag === "All" ? undefined : rawTag;

  const title = tag ? `Notes – ${tag} | NoteHub` : `All Notes | NoteHub`;
  const description = tag
    ? `Browse all notes tagged with "${tag}" in NoteHub.`
    : `Browse all available notes in NoteHub.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub.com/notes/filter/${tag ?? "All"}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1300,
          height: 900,
          alt: "NoteHub logo",
        },
      ],
    },
  };
}

export default async function NotesPage({ params }: NotesPageProps) {
  const { slug } = await params;
  const rawTag = slug?.[0];
  const tag = rawTag === "All" ? undefined : rawTag;

  const initialData = await getServerNotes("", 1, tag);

  return <NotesClient initialData={initialData} tag={tag} />;
}
