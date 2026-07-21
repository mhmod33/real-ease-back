import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChatModal, ChatContact } from '../shared/chat-modal/chat-modal';

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

@Component({
  selector: 'app-properties',
  imports: [CommonModule, FormsModule, ChatModal],
  templateUrl: './properties.html',
  styleUrl: './properties.css',
})
export class Properties {
  constructor(private router: Router) {}

  // Chat Modal
  showChatModal = false;
  chatContact?: ChatContact;

  // ── Filter state ─────────────────────────────────────────────
  searchKeyword = '';
  selectedType = '';
  selectedLocation = '';
  sliderMax = 1000;
  priceMin = 16;
  priceMax = 150;

  propertyTypes = ['شقة', 'فيلا', 'بنتهاوس', 'مكتب', 'أرض'];
  locations = ['الدوحة', 'الرياض', 'دبي', 'القاهرة', 'عمان', 'الكويت'];

  get trackBackground(): string {
    const minPct = (this.priceMin / this.sliderMax) * 100;
    const maxPct = (this.priceMax / this.sliderMax) * 100;
    return (
      `linear-gradient(to right,` +
      ` #f6a65b ${minPct}%,` +
      ` #003366 ${minPct}%,` +
      ` #003366 ${maxPct}%,` +
      ` #f6a65b ${maxPct}%)`
    );
  }

  // ── Mock Data ─────────────────────────────────────────────────
  allProperties: Property[] = [
    {
      id: 1,
      name: 'شقة البحر الأزرق',
      city: 'الدوحة',
      status: 'للبيع',
      price: '$6521k',
      priceNum: 6521,
      type: 'شقة',
      description:
        'شقة فاخرة بإطلالة مباشرة على البحر الأزرق، تتميز بتصميم عصري أنيق وتتوفر على ثلاث غرف نوم فسيحة وصالة متصلة وشرفة خاصة ومطبخ مجهز. الشقة في الطابق العاشر وتطل على الشاطئ والأفق الساحر.',
      image: 'images/properties/image-1.png',
      agentName: 'عبد العزيز النصر',
      agentImage: 'images/image 6.png',
      isSaved: false,
      isLiked: false,
    },
    {
      id: 2,
      name: 'فيلا النخبة المميزة',
      city: 'الرياض',
      status: 'للإيجار',
      price: '$15021k',
      priceNum: 15021,
      type: 'فيلا',
      description:
        'فيلا النخبة في قلب المنطقة السكنية الراقية وتتميز بتصميم عصري رائع وديكورات فاخرة وحديقة خضراء واسعة، تضم أربع غرف نوم فسيحة وقاعة متعددة الاستخدامات. الفيلا مثالية للعائلات التي تبحث عن الرقي والرفاهية في آنٍ واحد.',
      image: 'images/properties/image.png',
      agentName: 'عبد العزيز النصر',
      agentImage: 'images/image 6.png',
      isSaved: false,
      isLiked: true,
    },
    {
      id: 3,
      name: 'بنتهاوس النجوم',
      city: 'دبي',
      status: 'للإيجار',
      price: '$15021k',
      priceNum: 15021,
      type: 'بنتهاوس',
      description:
        'بنتهاوس الفخامة يقع في أعلى نقطة من برج حديث في وسط المدينة بحمامات سباحة خاصة وشرفات بانورامية، يتميز بتصميم داخلي فاخر وإضاءة ذكية. البنتهاوس مثالي لمن يبحث عن الحياة في قمة الرفاهية والتميز.',
      image: 'images/properties/image-2.png',
      agentName: 'عبد العزيز النصر',
      agentImage: 'images/image 6.png',
      isSaved: true,
      isLiked: false,
    },
    {
      id: 4,
      name: 'شقة الحديقة السرية',
      city: 'القاهرة',
      status: 'للبيع',
      price: '$15021k',
      priceNum: 15021,
      type: 'شقة',
      description:
        'شقة أرضية مميزة تحتوي على حديقة خاصة مخصصة للتنزه والترفيه طوال اليوم، تتميز بإطلالة خضراء ورائعة على الحديقة الداخلية. تقع في موقع استراتيجي وسط القاهرة الجديدة وقريبة من مناطق الخدمات والمرافق التجارية.',
      image: 'images/properties/image-4.png',
      agentName: 'عبد العزيز النصر',
      agentImage: 'images/image 6.png',
      isSaved: false,
      isLiked: false,
    },
  ];

  // ── Computed filtered list ─────────────────────────────────────
  get filteredProperties(): Property[] {
    return this.allProperties.filter((p) => {
      const matchKeyword =
        !this.searchKeyword ||
        p.name.includes(this.searchKeyword) ||
        p.description.includes(this.searchKeyword);
      const matchType = !this.selectedType || p.type === this.selectedType;
      const matchLocation =
        !this.selectedLocation || p.city === this.selectedLocation;
      const isDefaultPrice = this.priceMin === 16 && this.priceMax === 150;
      const matchPrice =
        isDefaultPrice ||
        (p.priceNum >= this.priceMin && p.priceNum <= this.priceMax);
      return matchKeyword && matchType && matchLocation && matchPrice;
    });
  }

  // ── Actions ───────────────────────────────────────────────────
  onSearch() {
    // Trigger re-render (already reactive via getter)
  }

  toggleSave(p: Property, e: Event) {
    e.stopPropagation();
    p.isSaved = !p.isSaved;
  }

  toggleLike(p: Property, e: Event) {
    e.stopPropagation();
    p.isLiked = !p.isLiked;
  }

  goToDetails(id: number) {
    this.router.navigate(['/properties', id]);
  }

  /* ── Chat / Negotiate ── */
  openChat(p: Property, e: Event) {
    e.stopPropagation();
    this.chatContact = {
      name: p.agentName,
      image: p.agentImage,
      role: 'وكيل عقارات',
    };
    this.showChatModal = true;
  }

  closeChat() {
    this.showChatModal = false;
    this.chatContact = undefined;
  }

  goToCreate() {
    this.router.navigate(['/properties/create']);
  }

  onPriceMinChange(value: string) {
    this.priceMin = +value;
    if (this.priceMin > this.priceMax) this.priceMax = this.priceMin;
  }

  onPriceMaxChange(value: string) {
    this.priceMax = +value;
    if (this.priceMax < this.priceMin) this.priceMin = this.priceMax;
  }

  clearFilters() {
    this.searchKeyword = '';
    this.selectedType = '';
    this.selectedLocation = '';
    this.priceMin = 16;
    this.priceMax = 150;
  }
}
