"use client";

import Link from "next/link";
import css from "./NotesPage.module.css";
import type { Note } from "@/types/note";

type NotePageProps = {
  item: Note;
  onDelete: (id: string) => void;
};

const NotePage = ({ item, onDelete }: NotePageProps) => {
  return (
    <div className={css.app}>
      <h2>{item.title || "Untitled"}</h2>
      <p>{item.content}</p>
      <span>{item.tag}</span>

      <div className={css.toolbar}>
        <button
          className={css.button}
          onClick={() => onDelete(String(item.id))}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NotePage;
