import { supabase } from "@/lib/supabase";
import { noteData } from "@/utils/noteData";

export default function SeedNews() {
  const seed = async () => {
    const rows = noteData.map((n) => ({
      category: n.category,
      date: n.date,
      image: n.image ?? null,
      title: n.title,
      content: n.content,
    }));

    const { error } = await supabase.from("notes").insert(rows);
    console.log("seed error:", error);
    alert(error ? error.message : "notes seed done");
  };

  return (
    <button type="button" className="border !px-3 !py-2" onClick={seed}>
      Seed Notes
    </button>
  );
}
