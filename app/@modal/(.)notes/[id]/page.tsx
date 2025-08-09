import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NotePreview from "@/components/NotePreview/NotePreview";

interface Props {
  params: { id: string };
}

export default async function NoteModal({ params }: Props) {
  const { id } = params;
  const queryClient = new QueryClient();

  const note = await queryClient.fetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview note={note} />
    </HydrationBoundary>
  );
}
