export interface Rating {
  rate: number;
  count: number;
}

export interface Insumo{
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}


export interface FetchState {
  data: Insumo[];
  loading: boolean;
  error: string | null;
}
