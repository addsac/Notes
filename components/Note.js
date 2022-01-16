import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { noteActiveState } from "../atoms/noteActiveAtom";

function Note() {
  const [activeNote, setActiveNote] = useRecoilState(noteActiveState);

  return (
    <motion.div
      animate={{ y: "0px", opacity: 1 }}
      initial={{ y: "11px", opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="px-8 py-7"
    >
      <h1 className="text-2xl font-medium mt-1"> {activeNote.title} </h1>
      <p className="mt-7 text-lg text-gray-600"> {activeNote.description} </p>
    </motion.div>
  );
}

export default Note;
