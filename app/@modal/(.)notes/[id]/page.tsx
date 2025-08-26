import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchServerNoteById } from "@/lib/api/serverApi";
import NotePreviewClient from "./NotePreview.client";

interface NoteModalProps {
  params: { id: string };
}

export default async function NoteModal({ params }: NoteModalProps) {
  const { id } = params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchServerNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient id={id} />
    </HydrationBoundary>
  );
}
