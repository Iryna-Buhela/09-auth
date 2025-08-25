"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import css from "./NoteForm.module.css";
import { createNote, CreateNoteParams } from "@/lib/api/clientApi";
import { useNoteDraftStore } from "@/lib/store/noteStore";

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note created!");
      clearDraft();
      router.push("/notes/filter/all");
    },
    onError: () => {
      toast.error("Failed to create note. Please try again.");
    },
  });

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as CreateNoteParams;
    mutate(values);
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
