import { FilmDetails } from "@/types";
import { Film } from "@/types";

const mockData: Film[] = [
  {
    id: "1",
    title: "Frontend Developer",
    description: "We are looking for a skilled frontend developer.",
    tags: ["React", "JavaScript", "CSS"],
    location: "New York, NY",
    createdAt: "2023-10-01",
    company: "Tech Corp",
    priceRange: "$70,000 - $90,000",
  },
  {
    id: "2",
    title: "Backend Developer",
    description: "Join our team as a backend developer.",
    tags: ["Node.js", "Express", "MongoDB"],
    location: "San Francisco, CA",
    createdAt: "2023-09-25",
    company: "Innovatech",
    priceRange: "$80,000 - $100,000",
  },
  {
    id: "3",
    title: "Full Stack Developer",
    description:
      "Looking for a full stack developer with experience in both frontend and backend.",
    tags: ["React", "Node.js", "TypeScript"],
    location: "Remote",
    createdAt: "2023-09-20",
    company: "Web Solutions",
    priceRange: "$90,000 - $110,000",
  },
];

export default mockData;

export const mockFilmDetails: FilmDetails[] = [
  {
    id: "1",
    title: "Frontend Developer",
    description: "We are looking for a skilled frontend developer.",
    tags: ["React", "JavaScript", "CSS"],
    location: "New York, NY",
    createdAt: "2023-10-01",
    company: "Tech Corp",
    priceRange: "$70,000 - $90,000",
    requirements: "Experience with React, JavaScript, and CSS.",
    responsibilities:
      "Develop and maintain the frontend of our web applications.",
  },
  {
    id: "2",
    title: "Backend Developer",
    description: "Join our team as a backend developer.",
    tags: ["Node.js", "Express", "MongoDB"],
    location: "San Francisco, CA",
    createdAt: "2023-09-25",
    company: "Innovatech",
    priceRange: "$80,000 - $100,000",
    requirements: "Experience with Node.js, Express, and MongoDB.",
    responsibilities:
      "Develop and maintain the backend of our web applications.",
  },
  {
    id: "3",
    title: "Full Stack Developer",
    description:
      "Looking for a full stack developer with experience in both frontend and backend.",
    tags: ["React", "Node.js", "TypeScript"],
    location: "Remote",
    createdAt: "2023-09-20",
    company: "Web Solutions",
    priceRange: "$90,000 - $110,000",
    requirements: "Experience with React, Node.js, and TypeScript.",
    responsibilities:
      "Develop and maintain both frontend and backend of our web applications.",
  },
];
