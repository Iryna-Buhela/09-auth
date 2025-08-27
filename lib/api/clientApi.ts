import { nextServer } from "./api";
import { type Note } from "@/types/note";
import { type User } from "@/types/user";

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export type CreateNoteParams = {
  title: string;
  content: string;
  tag: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  userName: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type CheckSessionResponse = {
  success: boolean;
};

export interface UpdateMeRequest {
  username: string;
}

export async function getNotes(search: string, page: number, tag?: string) {
  try {
    const res = await nextServer.get("/notes", {
      params: {
        ...(search !== "" && { search }),
        page,
        perPage: 12,
        ...(tag && { tag }),
      },
      withCredentials: true,
    });

    return res.data;
  } catch (err: unknown) {
    console.error("❌ Fetch notes failed", err);
    throw new Error("Fetch notes failed");
  }
}

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await nextServer.get<Note>(`/notes/${id}`);
  return res.data;
};

export async function createNote(data: CreateNoteParams): Promise<Note> {
  const response = await nextServer.post<Note>(`/notes`, data);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await nextServer.delete<Note>(`/notes/${id}`);
  return response.data;
}

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>(`/auth/register`, data);
  return res.data;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>(`auth/login`, data);
  console.log("LOGIN URL:", res.config.url);
  return res.data;
};

export const logout = async (): Promise<void> => {
  const res = await nextServer.post(`/auth/logout`);
  return res.data;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionResponse>(`/auth/session`);
  return res.data.success;
};

export const getMe = async () => {
  const res = await nextServer.get<User>(`/users/me`);
  return res.data;
};

export const updateMe = async (body: UpdateMeRequest) => {
  const res = await nextServer.patch<User>(`/users/me`, body);
  return res.data;
};
