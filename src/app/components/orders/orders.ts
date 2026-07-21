import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Order, OrderStatus } from '../../models/order.model';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders {
  totalClients = 245;
  totalTransactions = 524;

  selectAll = false;
  activeMenuId: string | null = null;

  // Pagination state
  currentPage = 1;
  pageSize = 5;

  orders: Order[] = [
    {
      id: '1',
      orderNumber: '#0001234',
      date: '2025-01-03',
      clientName: 'أحمد محمد الامام',
      propertyName: 'فيلا باطلالة مميزة',
      address: 'لبنان،مدينة لبنان الجديدة',
      price: '$521k',
      agentName: 'مؤسسة الريادة',
      propertyStatus: 'مستأجر',
      status: 'قيد الانتظار',
      selected: false,
    },
    {
      id: '2',
      orderNumber: '#0001234',
      date: '2025-01-20',
      clientName: 'ناصر بن علي',
      propertyName: 'بنتهاوس مرموق',
      address: 'الإمارات،دبي، مارينا',
      price: '$921k',
      agentName: 'شركة الأفق',
      propertyStatus: 'مستأجر',
      status: 'تم الاتفاق',
      selected: false,
    },
    {
      id: '3',
      orderNumber: '#0001234',
      date: '2024-11-03',
      clientName: 'يوسف الكيلاني',
      propertyName: 'شقة دوبلكس',
      address: 'الأردن،عمان، شارع مكة',
      price: '$521k',
      agentName: 'دار العمران',
      propertyStatus: 'مستأجر',
      status: 'يتم التفاوض',
      selected: false,
    },
    {
      id: '4',
      orderNumber: '#0001234',
      date: '2023-4-14',
      clientName: 'عبد الله المنصوري',
      propertyName: 'فيلا حديقة التصميم',
      address: 'قطر،الدوحة',
      price: '$7821k',
      agentName: 'مؤسسة رؤية',
      propertyStatus: 'مباع',
      status: 'تم الاتفاق',
      selected: false,
    },
    {
      id: '5',
      orderNumber: '#0001234',
      date: '2022-12-03',
      clientName: 'خالد مبارك',
      propertyName: 'فيلا بمساحة واسعة',
      address: 'عمان،مدينة عمان',
      price: '$5421k',
      agentName: 'مكتب العروبة',
      propertyStatus: 'مستأجر',
      status: 'يتم التفاوض',
      selected: false,
    },
    {
      id: '6',
      orderNumber: '#0001234',
      date: '2023-07-07',
      clientName: 'سميرة مصطفي',
      propertyName: 'برج في وسط المدينة',
      address: 'فلسطين، نابلس',
      price: '$990000',
      agentName: 'شركة التميز',
      propertyStatus: 'مباع',
      status: 'قيد الانتظار',
      selected: false,
    },
    {
      id: '7',
      orderNumber: '#0001234',
      date: '2022-12-23',
      clientName: 'أحمد الصافي',
      propertyName: 'شقة على البحر',
      address: 'البحرين،شرق البحر',
      price: '$521k',
      agentName: 'شركة مشروعك',
      propertyStatus: 'مستأجر',
      status: 'يتم التفاوض',
      selected: false,
    },
    {
      id: '8',
      orderNumber: '#0001234',
      date: '2021-9-03',
      clientName: 'عمر الحسن',
      propertyName: 'منزل عي البحر',
      address: 'مصر،الساحل الشمالي',
      price: '$641k',
      agentName: 'مؤسسة النخبة',
      propertyStatus: 'مباع',
      status: 'قيد الانتظار',
      selected: false,
    },
  ];

  // Computed properties
  get selectedCount(): number {
    return this.orders.filter((o) => o.selected).length;
  }

  get totalPages(): number {
    return Math.ceil(this.orders.length / this.pageSize) || 1;
  }

  get paginatedOrders(): Order[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.orders.slice(startIndex, startIndex + this.pageSize);
  }

  get pagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get startIndex(): number {
    return this.orders.length === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
  }

  get endIndex(): number {
    return Math.min(this.currentPage * this.pageSize, this.orders.length);
  }

  toggleSelectAll(): void {
    const visibleOrders = this.paginatedOrders;
    const allVisibleSelected = visibleOrders.every((o) => o.selected);
    visibleOrders.forEach((order) => (order.selected = !allVisibleSelected));
    this.checkSelectAllState();
  }

  checkSelectAllState(): void {
    const visibleOrders = this.paginatedOrders;
    this.selectAll = visibleOrders.length > 0 && visibleOrders.every((o) => o.selected);
  }

  onRowSelectChange(): void {
    this.checkSelectAllState();
  }

  // Pagination navigation
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.checkSelectAllState();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  // Bulk Actions
  bulkDelete(): void {
    if (confirm(`هل أنت تأكد من حذف ${this.selectedCount} طلبات مجهزة؟`)) {
      this.orders = this.orders.filter((o) => !o.selected);
      this.selectAll = false;
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      }
    }
  }

  bulkChangeStatus(newStatus: OrderStatus): void {
    this.orders.forEach((o) => {
      if (o.selected) {
        o.status = newStatus;
      }
    });
  }

  clearSelection(): void {
    this.orders.forEach((o) => (o.selected = false));
    this.selectAll = false;
  }

  toggleMenu(orderId: string, event: MouseEvent): void {
    event.stopPropagation();
    this.activeMenuId = this.activeMenuId === orderId ? null : orderId;
  }

  @HostListener('document:click')
  closeMenu(): void {
    this.activeMenuId = null;
  }

  downloadData(): void {
    const selectedOrders = this.orders.filter((o) => o.selected);
    const dataToExport = selectedOrders.length > 0 ? selectedOrders : this.orders;

    const headers = [
      'رقم الطلب',
      'التاريخ',
      'اسم العميل',
      'العقار',
      'العنوان',
      'السعر',
      'الوكيل العقاري',
      'حالة العقار',
      'الحالة',
    ];

    const rows = dataToExport.map((o) => [
      o.orderNumber,
      o.date,
      o.clientName,
      o.propertyName,
      o.address,
      o.price,
      o.agentName,
      o.propertyStatus,
      o.status,
    ]);

    const csvContent =
      '\uFEFF' +
      [headers.join(','), ...rows.map((r) => r.map((c) => `"${c}"`).join(','))].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  deleteOrder(id: string): void {
    this.orders = this.orders.filter((o) => o.id !== id);
    this.checkSelectAllState();
    this.activeMenuId = null;
  }

  viewOrder(order: Order): void {
    alert(`تفاصيل الطلب: ${order.orderNumber} - ${order.clientName}`);
    this.activeMenuId = null;
  }
}
