// TODO(Level 3): custom hook useToggle(awal: boolean = false) yang
// mengembalikan object { nilai, toggle, setTrue, setFalse }:
// - nilai: boolean (mulai dari `awal`),
// - toggle(): membalik nilai, setTrue(): jadi true, setFalse(): jadi false.
// Beri tipe parameter dan return yang tepat — lihat SOAL.md.

import { useState } from "react";

export function useToggle(awal: boolean = false): {
  nilai: boolean;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
} {
  const [nilai, setNilai] = useState<boolean>(awal);

  const toggle = () => {
    setNilai((prev) => !prev);
  };

  const setTrue = () => {
    setNilai(true);
  };

  const setFalse = () => {
    setNilai(false);
  };

  return { nilai, toggle, setTrue, setFalse };
}
