import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { categoryActiveState } from "../atoms/categoryActiveAtom";
import { noteActiveState } from "../atoms/noteActiveAtom";

function Category({ category, fetchNotes, deleteItem }) {
  const [activeCategory, setActiveCategory] =
    useRecoilState(categoryActiveState);

  // Animations
  const variants = {
    visible: { y: 7, opacity: 1 },
    hidden: { y: 0, opacity: 0 },
  };

  return (
    <motion.button
      variants={variants}
      initial={variants.hidden}
      animate={variants.visible}
      transition={{ duration: 0.2 }}
      onDoubleClick={() => deleteItem(category)}
      onClick={() => {
        setActiveCategory(category);
        fetchNotes(category.id);
      }}
      className="p-2 text-left text-sm font-medium w-full hover:bg-gray-100 transition rounded-md"
    >
      <motion.div
        transition={{ ease: "easeInOut" }}
        whileHover={{ x: 7 }}
        transition={{ duration: 0.2 }}
        className="w-full h-full rounded-md"
      >
        {category.title}
      </motion.div>
    </motion.button>
  );
}

export default Category;
