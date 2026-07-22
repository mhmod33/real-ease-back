import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Property } from '../models/property.model';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private propertiesSubject = new BehaviorSubject<Property[]>([
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
  ]);

  properties$ = this.propertiesSubject.asObservable();

  getProperties(): Property[] {
    return this.propertiesSubject.value;
  }

  getPropertyById(id: number): Property | undefined {
    return this.propertiesSubject.value.find((p) => p.id === id);
  }

  updateProperty(id: number, data: Partial<Property>): Observable<Property | undefined> {
    const current = this.propertiesSubject.value;
    const index = current.findIndex((p) => p.id === id);
    if (index !== -1) {
      current[index] = { ...current[index], ...data };
      this.propertiesSubject.next([...current]);
      return of(current[index]);
    }
    return of(undefined);
  }

  deleteProperty(id: number): Observable<boolean> {
    const filtered = this.propertiesSubject.value.filter((p) => p.id !== id);
    this.propertiesSubject.next(filtered);
    return of(true);
  }
}
