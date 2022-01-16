import { useState } from "react";
import { motion, Reorder } from "framer-motion";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryActiveState } from "../atoms/categoryActiveAtom";
import { boolNewNoteState } from "../atoms/boolNewNoteAtom";
import { noteActiveState } from "../atoms/noteActiveAtom";
import { notesState } from "../atoms/notesAtom";
import { boolActiveNoteState } from "../atoms/boolActiveNoteAtom";
import { supabase } from "../lib/initSupabase";

function Notes() {
  const categoryActive = useRecoilValue(categoryActiveState);

  const [boolNewNote, setBoolNewNote] = useRecoilState(boolNewNoteState);
  const [boolActiveNote, setBoolActiveNote] =
    useRecoilState(boolActiveNoteState);

  const [notes, setNotes] = useRecoilState(notesState);

  const [activeNote, setActiveNote] = useRecoilState(noteActiveState);

  const [activeNoteId, setActiveNoteId] = useState(0);

  const newNoteTitleFocus = () => {
    setTimeout(() => {
      document.querySelector("#titleNewNote").focus();
    }, 50);
  };

  const deleteNote = async (noteId) => {
    if (confirm("Ehi, vuoi veramente eliminare la nota?")) {
      const { data, error } = await supabase
        .from("notes")
        .delete()
        .match({ id: noteId });

      fetchNotes(categoryActive.id);
    }
  };

  const fetchNotes = async (categoryId) => {
    const { data: notes } = await supabase
      .from("notes")
      .select("*")
      .match({ category_id: categoryId })
      .order("updated_at", { ascending: true });

    setNotes(notes);

    setBoolNewNote(false);
    setBoolActiveNote(false);
  };

  return (
    <div className="px-8 py-7">
      <div className="flex items-center justify-between mb-7">
        <h2 className="text-xl font-medium">{categoryActive.title}</h2>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setBoolNewNote(true);
            setBoolActiveNote(false);
            setActiveNoteId(0);
            newNoteTitleFocus();
          }}
          className="h-9 w-9 rounded-lg bg-gray-100 text-lg"
        >
          +
        </motion.button>
      </div>

      {/* Notes list */}
      {notes && (
        <Reorder.Group axis="y" onReorder={setNotes} values={notes}>
          {notes.map((item) => (
            <Reorder.Item
              whileTap={{ scale: 0.9 }}
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: "34px" }}
              transition={{ ease: "easeOut", duration: 0.3 }}
              onClick={() => {
                setActiveNoteId(item.id);
                setActiveNote(item);
                setBoolNewNote(false);
                setBoolActiveNote(true);
              }}
              onDoubleClick={() => deleteNote(item.id)}
              value={item}
              id={item.id}
              key={item.id}
              className={`w-full h-32 rounded-xl cursor-pointer active:cursor-grab mt-4 p-4 ${
                activeNoteId == item.id ? "bg-black text-white" : "bg-gray-100"
              } `}
            >
              <h2 className="font-medium"> {item.title} </h2>
              <p className="mt-2 text-sm opacity-60"> {item.description} </p>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      )}
    </div>
  );
}

export default Notes;
