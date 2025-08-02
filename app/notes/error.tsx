"use client";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function NotesError({ error }: ErrorProps) {
  return <p>Could not fetch the list of notes. {error.message}</p>;
}
