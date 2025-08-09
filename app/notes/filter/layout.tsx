import type { ReactNode } from "react";
import css from "./LayoutNotes.module.css";
import SidebarNotes from "./@sidebar/default";

interface NotesLayoutProps {
  children: ReactNode;
}

export default function NotesLayout({ children }: NotesLayoutProps) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>
        <SidebarNotes />
      </aside>
      <main className={css.notesWrapper}>{children}</main>
    </div>
  );
}
