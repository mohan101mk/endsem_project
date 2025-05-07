// import Image from "next/image";
// import styles from "./page.module.css";
'use client';
import Link  from "next/link";


import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/login');
  }, [router]);
  return null
}
