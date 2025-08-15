import type { Metadata } from "next";
import { getTags } from "@/lib/api";
import NoteForm from "@/components/NoteForm/NoteForm";

export const metadata: Metadata = {
  title: "Create Note | NoteHub",
  description: "Create a new note in NoteHub.",
  openGraph: {
    title: "Create Note | NoteHub",
    description: "Create a new note in NoteHub.",
    url: "https://your-domain.com/notes/action/create",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

const CreateNote = async () => {
  const categories = await getTags();

  return <NoteForm tags={categories} />;
};

export default CreateNote;
