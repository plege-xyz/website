export interface Token {
  id: number;
  name: string;
  image: string;
  mint: string;
  price: number;
  balance?: number;
}
