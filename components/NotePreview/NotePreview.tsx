"use client";

import { useRouter } from "next/navigation";
import { Note } from "@/types/note";
import css from "./NotePreview.module.css";

interface NotePreviewProps {
  note: Note;
}

const NotePreview = ({ note }: NotePreviewProps) => {
  const router = useRouter();

  const handleClose = () => {
    router.back(); // Повертаємось до попереднього маршруту
  };

  return (
    <div className={css.overlay} onClick={handleClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeButton} onClick={handleClose}>
          ✕
        </button>
        <h2 className={css.title}>{note.title}</h2>
        <p className={css.content}>{note.content}</p>
        {note.tag && <span className={css.tag}>{note.tag}</span>}
      </div>
    </div>
  );
};

export default NotePreview;
