export interface Property {
  id: number;
  name: string;
  city: string;
  status: 'للبيع' | 'للإيجار';
  price: string;
  priceNum: number;
  description: string;
  image: string;
  agentName: string;
  agentImage: string;
  type: string;
  isSaved: boolean;
  isLiked: boolean;
}
