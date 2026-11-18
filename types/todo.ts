export type Todo = {
  id: number;
  teks: string;
  selesai: boolean;
  prioritas: "Tinggi" | "Sedang" | "Rendah";
  deadline: string;
  kategori: string;
};

export type FilterTodo = "semua" | "belum" | "selesai";
