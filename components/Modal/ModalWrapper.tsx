"use client";

import React from "react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  content: string;
};

export default function ModalWrapper({ title, content }: Props) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      <h2>{title}</h2>
      <p>{content}</p>
    </Modal>
  );
}
