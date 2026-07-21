export type OrderStatus = 'قيد الانتظار' | 'تم الاتفاق' | 'يتم التفاوض';
export type PropertyStatus = 'مستأجر' | 'مباع';

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  clientName: string;
  propertyName: string;
  address: string;
  price: string;
  agentName: string;
  propertyStatus: PropertyStatus;
  status: OrderStatus;
  selected?: boolean;
}
