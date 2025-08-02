import { getNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

const Notes = async () => {
  const data = await getNotes();

  return <NotesClient initialData={data} />;
};

export default Notes;
