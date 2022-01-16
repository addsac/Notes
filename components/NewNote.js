import { motion } from "framer-motion";

function NewNote() {
  const auto_grow_title = () => {
    const element = document.querySelector('#titleNewNote')

    element.style.height = "5px";
    element.style.height = element.scrollHeight + "px";
  }

  const auto_grow_description = () => {
    const element = document.querySelector('#descriptionNewNote')

    element.style.height = "5px";
    element.style.height = element.scrollHeight + "px";
  }

  return (
    <motion.div
      animate={{ y: "0px", opacity: 1 }}
      initial={{ y: "11px", opacity: 0 }}
      exit={{ y: "11px", opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="px-8 py-7"
    >
      <textarea
        id="titleNewNote"
        className="w-full mt-1 h-9 border-0 focus:outline-none rounded-md text-2xl"
        style={{ resize: "none", overflow: "hidden", maxHeight: "200px" }}
        placeholder="Titolo della nota..."
        onInput={() => auto_grow_title()}
      ></textarea>

      <textarea
        id="descriptionNewNote"
        className="w-full mt-5 border-0 focus:outline-none rounded-md text-lg leading-7"
        style={{ resize: "none", overflow: "hidden" }}
        placeholder="Descrizione della nota..."
        onInput={() => auto_grow_description()}
      ></textarea>
    </motion.div>
  );
}

export default NewNote;
