// lib/api.ts

import axios from "axios";
import { type Note } from "@/types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json",
};

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const getNotes = async ({
  page = 1,
  perPage = 10,
  search = "",
}: FetchNotesParams = {}): Promise<FetchNotesResponse> => {
  const res = await axios.get<FetchNotesResponse>("/notes", {
    headers,
    params: {
      page,
      perPage,
      search,
    },
  });
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await axios.get<Note>(`/notes/${id}`, { headers });
  return res.data;
};

export interface CreateNoteParams {
  title: string;
  content: string;
  tag?: string;
}

export async function createNote(data: CreateNoteParams): Promise<Note> {
  const response = await axios.post<Note>("/notes", data);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await axios.delete<Note>(`/notes/${id}`);
  return response.data;
}
