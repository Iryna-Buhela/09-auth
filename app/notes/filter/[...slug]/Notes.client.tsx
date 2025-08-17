"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import Link from "next/link";

import { getNotes, getTags, type FetchNotesResponse } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import css from "./Notes.client.module.css";

interface NotesClientProps {
  initialData: FetchNotesResponse;
  tag?: string;
}

export default function NotesClient({ initialData, tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const PER_PAGE = 12;

  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);

  const { data } = useQuery<FetchNotesResponse, Error>({
    queryKey: ["notes", page, debouncedSearch, tag],
    queryFn: () =>
      getNotes({
        page,
        perPage: PER_PAGE,
        search: debouncedSearch,
        ...(tag && tag !== "All" ? { tag } : {}),
      }),
    placeholderData: keepPreviousData,
    initialData:
      page === 1 && debouncedSearch === "" && (!tag || tag === "All")
        ? initialData
        : undefined,
  });

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          value={search}
          onChange={(newValue) => {
            setSearch(newValue);
            setPage(1);
          }}
        />
        {data && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            onPageChange={handlePageChange}
            currentPage={page}
          />
        )}
        <Link href="/notes/action/create" className={css.createButton}>
          + Create note
        </Link>
      </header>

      {data && data.notes?.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}
