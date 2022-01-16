import Head from "next/head";
import Header from "../components/Header";
import Notes from "../components/Notes";
import Note from "../components/Note";
import NewNote from "../components/NewNote";
import CancelNewNote from "../components/CancelNewNote";
import { useRecoilState } from "recoil";
import { boolNewNoteState } from "../atoms/boolNewNoteAtom";
import { boolActiveNoteState } from "../atoms/boolActiveNoteAtom";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [boolNewNote, setBoolNewNote] = useRecoilState(boolNewNoteState);
  const [boolActiveNote, setBoolActiveNote] =
    useRecoilState(boolActiveNoteState);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex w-screen">
        {/* Category */}
        <div className="h-screen max-h-screen overflow-auto flex-none w-80 border-r border-gray-300 px-5 py-7">
          <Header />
        </div>

        {/* Notes */}
        <div
          className="h-screen max-h-screen overflow-auto border-r border-gray-300"
          style={{ width: "calc(50% - 10rem)" }}
        >
          <Notes />
        </div>

        {/* Note */}
        <div
          className="h-screen max-h-screen overflow-auto relative"
          style={{ width: "calc(50% - 10rem)" }}
        >
          <AnimatePresence>{boolNewNote && <NewNote />}</AnimatePresence>
          <AnimatePresence>{boolNewNote && <CancelNewNote />}</AnimatePresence>
          {boolActiveNote && <Note />}
        </div>
      </div>
    </div>
  );
}
