export interface Restaurant {
  id: number;
  name: string;
  location: string;
  priceRange: number;
  reviews: [{ rating: number }];
}
