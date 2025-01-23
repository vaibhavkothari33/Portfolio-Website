export interface Blog {
  slug: string;  // Make slug required
  title: string;
  content: string;
  date: string;
  tags: string[];
  image?: string;
}