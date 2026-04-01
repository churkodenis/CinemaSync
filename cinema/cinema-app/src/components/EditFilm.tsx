import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateFilmMutation } from "@/store/api/filmsApi";

interface EditFilmModalProps {
  film: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditFilmModal({ film, isOpen, onClose }: EditFilmModalProps) {
  const [updateFilm] = useCreateFilmMutation();
  const [formData, setFormData] = useState<any>(null);

  const isEdit = !!film?.id;

  useEffect(() => {
    if (film) {
      setFormData({ ...film });
    }
  }, [film]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!formData) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    try {
      await updateFilm({ id: formData.id, ...formData }).unwrap();
      onClose();
    } catch (error) {
      console.error("Помилка збереження", error);
    }
  };

  if (!isOpen || !formData) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl w-full max-w-md shadow-xl">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-5 text-gray-900 dark:text-white">
            {isEdit ? "Редагувати фільм" : "Додати фільм"}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <p className="text-sm text-gray-500 dark:text-slate-400 mb-1">Назва</p>
              <Input 
                name="title" 
                value={formData.title || ""} 
                onChange={handleChange} 
                className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-slate-400 mb-1">Опис</p>
              <textarea 
                name="description" 
                value={formData.description || ""} 
                onChange={handleChange} 
                className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white resize-y min-h-[100px]"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-slate-400 mb-1">Тривалість (хв)</p>
                <Input 
                  name="duration" 
                  type="number" 
                  value={formData.duration || ""} 
                  onChange={handleChange} 
                  className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-slate-400 mb-1">Місця</p>
                <Input 
                  name="places" 
                  type="number" 
                  value={formData.places || ""} 
                  onChange={handleChange} 
                  className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-slate-400 mb-1">Час сеансу</p>
                <Input 
                  name="time" 
                  value={formData.time || ""} 
                  onChange={handleChange} 
                  className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-slate-400 mb-1">Ціна</p>
                <Input 
                  name="price" 
                  value={formData.price || ""} 
                  onChange={handleChange} 
                  className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-slate-400 mb-1">URL зображення</p>
              <Input 
                name="imageUrl" 
                value={formData.imageUrl || ""} 
                onChange={handleChange} 
                className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose} 
                className="flex-1 text-red-500" 
              >
                Скасувати
              </Button>
              <Button type="submit" className="flex-1">
                {isEdit ? "Зберегти зміни" : "Додати фільм"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}