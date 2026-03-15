import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Users,
  Banknote,
  CalendarDays,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useGetFilmByIdQuery } from "@/store/api/filmsApi";
import { useBookTicketMutation} from "@/store/api/userApi";
import { useGetProfileQuery } from "@/store/api/userApi";
import { useToast } from "@/hooks/use-toast";

export default function FilmPage() {
  const { id } = useParams();
  const { toast } = useToast();

  const {
    data: film,
    isLoading: isFilmLoading,
    isError,
  } = useGetFilmByIdQuery(id as string);

  const { data: profile, refetch: refetchProfile } = useGetProfileQuery();

  const [bookTicket, { isLoading: isBooking }] = useBookTicketMutation();


  if (isFilmLoading) {
    return <div className="p-10 text-center text-muted-foreground animate-pulse">Завантаження...</div>;
  }

  if (isError || !film) {
    return <div className="p-10 text-center text-destructive">Фільм не знайдено</div>;
  }

  const { title, description, duration, places, tags, time, price, imageUrl } = film;
  const isAlreadyBooked = profile?.User?.tickets?.includes(id as string);

  const handleBook = async () => {
    try {
      await bookTicket(id as string).unwrap();
      toast({ title: "Успіх", description: "Квиток заброньовано!", variant: "default" });
    } catch (error) {
      toast({ title: "Помилка", description: "Не вдалося забронювати", variant: "destructive" });
    }
  };


  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Головна</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Картинка зліва */}
        <div>
          <img
            src={imageUrl || "/placeholder.jpg"}
            alt={title}
            className="w-full rounded-2xl shadow-xl"
          />
        </div>

        {/* Інформація справа */}
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
            {title}
          </h1>

          <p className="text-3xl font-bold text-primary mb-6">{price} грн</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag, index) => (
              <Badge key={`${tag}-${index}`} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="flex gap-3">
              <Clock className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Тривалість</p>
                <p className="font-semibold dark:text-white">{duration} хв.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <CalendarDays className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Час сеансу</p>
                <p className="font-semibold dark:text-white">{time}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Users className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Вільні місця</p>
                <p className="font-semibold dark:text-white">{places}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Banknote className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Вартість</p>
                <p className="font-semibold dark:text-white">{price}</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-3 dark:text-white">Про фільм</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {description}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}