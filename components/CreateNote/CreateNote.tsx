import NoteForm from "../NoteForm/NoteForm";
import css from "./CreateNote.module.css";

type CreateNoteProps = {
  tags: string[];
};

export default function CreateNote({ tags }: CreateNoteProps) {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm tags={tags} />
      </div>
    </main>
  );
}
