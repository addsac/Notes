import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { boolNewNoteState } from "../atoms/boolNewNoteAtom";
import { categoryActiveState } from "../atoms/categoryActiveAtom";
import { notesState } from "../atoms/notesAtom";
import { supabase } from "../lib/initSupabase";

function CancelNewNote() {
  const [boolNewNote, setBoolNewNote] = useRecoilState(boolNewNoteState);

  const [notes, setNotes] = useRecoilState(notesState);

  const [activeCategory, setActiveCategory] =
    useRecoilState(categoryActiveState);

  const saveNewNote = async () => {
    const title = document.querySelector("#titleNewNote").value;
    const description = document.querySelector("#descriptionNewNote").value;

    if (title == "") {
      return alert("Aggiungi un titolo.");
    }
    if (description == "") {
      return alert("Aggiungi una descrizione.");
    }

    const { data, error } = await supabase
      .from("notes")
      .insert([{ title, description, category_id: activeCategory.id }]);

    setBoolNewNote(false);

    fetchNotes(activeCategory.id);
  };

  const fetchNotes = async (categoryId) => {
    const { data: notes } = await supabase
      .from("notes")
      .select("*")
      .match({ category_id: categoryId })
      .order("updated_at", { ascending: true });

    setNotes(notes);
  };

  return (
    <motion.div
      initial={{ y: "100px" }}
      animate={{ y: "0px" }}
      exit={{ y: "100px", opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="w-full flex justify-center absolute bottom-5"
    >
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setBoolNewNote(false)}
        className="px-3 h-9 bg-gray-100 font-medium text-sm rounded-lg"
      >
        Annulla
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => saveNewNote()}
        className="px-3 h-9 bg-black active:bg-gray-900/90 text-white font-medium text-sm rounded-lg ml-4"
      >
        Salva nota
      </motion.button>
    </motion.div>
  );
}

export default CancelNewNote;
