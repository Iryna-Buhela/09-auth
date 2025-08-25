import type { Metadata } from "next";
import Image from "next/image";
import { getServerMe } from "@/lib/api/serverApi";
import css from "./ProfilePage.module.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "User Profile | NoteHub",
  description: "View and manage your user profile on NoteHub.",
  keywords: ["profile", "user", "NoteHub", "account"],
  robots: { index: false, follow: true },
  openGraph: {
    title: "User Profile",
    description: "View and manage your NoteHub profile",
    url: "https://05-notehub-pink-alpha.vercel.app/profile",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Profile",
      },
    ],
    type: "website",
  },
};

export default async function ProfilePage() {
  const user = await getServerMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src="https://ac.goit.global/fullstack/react/default-avatar.jpg"
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
            priority
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {user.username} </p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
