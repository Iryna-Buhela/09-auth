"use client";

import { useState } from "react";
import Link from "next/link";
import css from "./TagsMenu.module.css";

export default function TagsMenu() {
  const [open, setOpen] = useState(false);

  const tags = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];

  return (
    <div className={css.menuContainer}>
      <button
        className={css.menuButton}
        onClick={() => setOpen((prev) => !prev)}
      >
        Notes ▾
      </button>

      {open && (
        <ul className={css.menuList}>
          {tags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
                onClick={() => setOpen(false)}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
