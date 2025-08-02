"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";

import { getNotes, type FetchNotesResponse } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteModal from "@/components/Modal/NoteModal";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./NoteDetails.client.module.css";

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const PER_PAGE = 12;

  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data } = useQuery<FetchNotesResponse, Error>({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () =>
      getNotes({ page, perPage: PER_PAGE, search: debouncedSearch }),
    placeholderData: keepPreviousData,
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
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {data && data.notes?.length > 0 && <NoteList notes={data.notes} />}
      {isModalOpen && (
        <NoteModal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </NoteModal>
      )}
    </div>
  );
}
