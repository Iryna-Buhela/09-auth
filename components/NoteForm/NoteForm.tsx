"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import css from "./NoteForm.module.css";
import { createNote, CreateNoteParams } from "@/lib/api/clientApi";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import { type NoteTag } from "@/types/note";

export default function NoteForm() {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      toast.success("Note created!");
      clearDraft();
      router.back();
    },
    onError: () => {
      toast.error("Failed to create note. Please try again.");
    },
  });

  const handleSubmit = (formData: FormData) => {
    const data: CreateNoteParams = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tag: formData.get("tag") as NoteTag,
    };

    mutate(data);
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label className={css.label} htmlFor="title">
          Title
        </label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          defaultValue={draft?.title}
          onChange={handleChange}
          minLength={3}
          maxLength={50}
        />
      </div>

      <div className={css.formGroup}>
        <label className={css.label} htmlFor="content">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          defaultValue={draft?.content}
          onChange={handleChange}
          maxLength={500}
        ></textarea>
      </div>

      <div className={css.formGroup}>
        <label className={css.label} htmlFor="tag">
          Tag
        </label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          defaultValue={draft?.tag}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
          disabled={isPending}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={isPending || !draft.title.trim()}
        >
          {isPending ? "Creating..." : "Create note"}
        </button>
      </div>
    </form>
  );
}
