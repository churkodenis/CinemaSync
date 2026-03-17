import { useGetFilmsQuery, useDeleteFilmMutation } from "@/store/api/filmsApi";
import { Button } from "@/components/ui/button";
import EditFilmModal from "@/components/EditFilm";
import { useState } from "react";

export default function AdminPage() {
  const { data: films, isLoading } = useGetFilmsQuery();
  const [deleteFilm] = useDeleteFilmMutation();
 

  const [selectedFilm, setSelectedFilm] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddNew = () => {
    setSelectedFilm({
      title: "",
      description: "",
      duration: 120,
      places: 100,
      time: "18:00",
      price: "150",
      imageUrl: "",
      tags: []
    });
    setIsModalOpen(true);
  };

  const handleEdit = (film: any) => {
    setSelectedFilm(film);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Ви впевнені, що хочете видалити цей фільм?")) {
      await deleteFilm(id);
    }
  };

  if (isLoading) return <div className="p-10 text-center">Завантаження...</div>;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold dark:text-white">Адмін панель — Управління фільмами</h1>
        <Button onClick={handleAddNew} className="bg-green-600 hover:bg-green-700">
          + Додати новий фільм
        </Button>
      </div>

      <div className="space-y-4">
        {films?.map((film) => (
          <div
            key={film.id}
            className="flex items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-xl border dark:border-slate-700"
          >
            <div className="flex items-center gap-4">
              <img
                src={film.imageUrl || "/placeholder.jpg"}
                alt={film.title}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-semibold dark:text-white">{film.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {film.time} • {film.duration} хв • {film.places} місць
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => handleEdit(film)}
                className="dark:bg-slate-800 dark:text-white dark:border-slate-600"
              >
                Редагувати
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => handleDelete(film.id)}
              >
                Видалити
              </Button>
            </div>
          </div>
        ))}
      </div>

      <EditFilmModal
        film={selectedFilm}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}