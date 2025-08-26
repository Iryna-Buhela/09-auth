import { cookies } from "next/headers";
import { nextServer } from "./api";
import { User } from "@/types/user";
import { Note } from "@/types/note";
import { FetchNotesResponse } from "./clientApi";

export const checkServerSession = async () => {
  const cookiesData = await cookies();
  const res = await nextServer.get(`/auth/session`, {
    headers: { Cookie: cookiesData.toString() },
  });
  return {
    status: res.status,
    data: res.data,
    headers: res.headers,
  };
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const response = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const getServerNotes = async (
  search: string,
  page: number,
  tag: string | undefined
) => {
  const cookieStore = await cookies();
  const params = {
    ...(search && { search }),
    page,
    perPage: 12,
    ...(tag ? { tag } : {}),
  };
  const headers = {
    Cookie: cookieStore.toString(),
  };
  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    params,
    headers,
  });
  return response.data;
};

export const fetchServerNoteById = async (id: string) => {
  const cookieStore = await cookies();

  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};
