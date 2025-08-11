import type { ReactNode } from "react";
import css from "./LayoutNotes.module.css";
import SidebarNotes from "./@sidebar/default";

interface NotesLayoutProps {
  children: ReactNode;
  sidebar: React.ReactNode;
}

export default function NotesLayout({ children }: NotesLayoutProps) {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>
        <SidebarNotes />
      </aside>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
}
