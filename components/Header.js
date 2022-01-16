import { useState, useEffect } from "react";
import Category from "./Category";
import { motion } from "framer-motion";
import { supabase } from "../lib/initSupabase";
import { useRecoilState } from "recoil";
import { categoryActiveState } from "../atoms/categoryActiveAtom";
import { notesState } from "../atoms/notesAtom";
import { boolActiveNoteState } from "../atoms/boolActiveNoteAtom";
import { boolNewNoteState } from "../atoms/boolNewNoteAtom";

function Header() {
  // Supabase
  const [notes, setNotes] = useRecoilState(notesState);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] =
    useRecoilState(categoryActiveState);

  const fetchCategories = async (from) => {
    const { data: categories } = await supabase
      .from("categories")
      .select("*")
      .order("created_at", { ascending: true });

    setCategories(categories);

    if(from == 'init'){
      setActiveCategory(categories[0]);
    }

    fetchNotes(categories[0].id);
  };

  const fetchNotes = async (categoryId) => {
    const { data: notes } = await supabase
      .from("notes")
      .select("*")
      .match({ category_id: categoryId })
      .order("updated_at", { ascending: true });

    setNotes(notes);

    setBoolNewNote(false);
  };

  useEffect(() => {
    fetchCategories('init');
  }, []);

  const [boolNewCategory, setBoolNewCategory] = useState(false);

  const submitCategory = async (event) => {
    if (event.key === "Enter") {
      /* hiding the input */
      setBoolNewCategory(false);

      /* adding category to array */
      const { data, error } = await supabase
        .from("categories")
        .insert([{ title: event.target.value }]);

      fetchCategories();
    }
  };

  const [boolNewNote, setBoolNewNote] = useRecoilState(boolNewNoteState);
  const [boolActiveNote, setBoolActiveNote] = useRecoilState(boolActiveNoteState);

  const deleteItem = async (category) => {
    if (confirm("Ehi, vuoi veramente eliminare la categoria?")) {
      const { deletedNotes, errorNotes } = await supabase
        .from("notes")
        .delete()
        .match({ category_id: category.id });

      console.log(deletedNotes);

      const { deletedCategories, errorCategories } = await supabase
        .from("categories")
        .delete()
        .match({ title: category.title });

      console.log(deletedCategories);

      // Setto categoria attiva per l'ultima posizione - 1
      const index = categories.findIndex((item) => {
        return item.title === category.title;
      });

      if(index){
        setActiveCategory(categories[index - 1]);
        fetchNotes(categories[index - 1].id)
      }
      else{
        setActiveCategory({});
      }

      // Filtro le categorie da backend
      setCategories(
        categories.filter((item) => {
          return item.title !== category.title;
        })
      );
    }
  };

  return (
    <div className="flex flex-col w-full h-full rounded-xl">
      {/* Logo */}
      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold tracking-tight ml-2">Note.</div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setBoolNewCategory(true)}
          className="h-9 w-9 rounded-lg bg-gray-100 text-lg"
        >
          +
        </motion.button>
      </div>

      {/* Input add category */}
      {boolNewCategory && (
        <motion.textarea
          onBlur={() => setBoolNewCategory(false)}
          onKeyPress={(e) => submitCategory(e)}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ease: "easeOut", duration: 0.2 }}
          name="new-category"
          className="h-32 w-full text-sm border bg-gray-100 rounded-md mt-3 appearance-none text-left p-3 focus:outline-none"
          autoFocus={true}
          placeholder="Premi invio per confermare..."
        ></motion.textarea>
      )}

      {/* Categories */}
      <div className="flex flex-col w-full mt-3">
        {categories.map((category, i) => (
          <Category category={category} key={i} fetchNotes={fetchNotes} deleteItem={deleteItem} />
        ))}
      </div>
    </div>
  );
}

export default Header;
