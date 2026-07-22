import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PropertyService } from '../../../services/property.service';

interface AmenityOption {
  key: string;
  label: string;
  checked: boolean;
}

@Component({
  selector: 'app-create-property',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-property.html',
  styleUrl: './create-property.css',
})
export class CreateProperty implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private propertyService: PropertyService
  ) {}

  // ── Edit mode ──────────────────────────────────────────────────
  editingId?: number;

  get isEditMode(): boolean {
    return this.editingId !== undefined;
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const property = this.propertyService.getPropertyById(+idParam);
      if (property) {
        this.editingId = property.id;
        this.propertyType = property.type;
        this.propertyStatus = property.status;
        this.price = String(property.priceNum);
        this.address = property.city;
        this.description = property.description;
      }
    }
  }

  // ── Form fields ────────────────────────────────────────────────
  propertyType = '';
  propertyStatus = '';
  price = '';
  address = '';
  description = '';

  // ── Mock dropdown options ──────────────────────────────────────
  propertyTypes = ['شقة', 'فيلا', 'بنتهاوس', 'مكتب', 'أرض', 'مستودع'];
  propertyStatuses = ['للبيع', 'للإيجار', 'متاح', 'محجوز', 'مباع'];

  // ── Amenity checkboxes ─────────────────────────────────────────
  amenities: AmenityOption[] = [
    { key: 'pool', label: 'أسانسير', checked: false },
    { key: 'parking', label: 'باركينج أريا', checked: false },
    { key: 'wifi', label: 'واي فاي مجاني', checked: false },
    { key: 'ac', label: 'مكيف هواء', checked: false },
  ];

  // ── File upload ─────────────────────────────────────────────────
  uploadedFiles: File[] = [];
  isDragOver = false;

  onDragOver(e: DragEvent) {
    e.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(e: DragEvent) {
    this.isDragOver = false;
  }

  onDrop(e: DragEvent) {
    e.preventDefault();
    this.isDragOver = false;
    const files = Array.from(e.dataTransfer?.files ?? []);
    this.addFiles(files);
  }

  onFileSelect(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files) {
      this.addFiles(Array.from(input.files));
    }
  }

  private addFiles(files: File[]) {
    const imageFiles = files.filter((f) => f.type.startsWith('image/'));
    this.uploadedFiles.push(...imageFiles);
  }

  removeFile(index: number) {
    this.uploadedFiles.splice(index, 1);
  }

  getFilePreview(file: File): string {
    return URL.createObjectURL(file);
  }

  // ── Submit / Cancel ────────────────────────────────────────────
  onSubmit() {
    if (this.isEditMode && this.editingId !== undefined) {
      const priceNum = +this.price || 0;
      this.propertyService.updateProperty(this.editingId, {
        type: this.propertyType,
        status: this.propertyStatus as 'للبيع' | 'للإيجار',
        city: this.address,
        description: this.description,
        priceNum,
        price: `$${priceNum}k`,
      });
      this.router.navigate(['/properties']);
      return;
    }

    const payload = {
      propertyType: this.propertyType,
      propertyStatus: this.propertyStatus,
      price: this.price,
      address: this.address,
      description: this.description,
      amenities: this.amenities.filter((a) => a.checked).map((a) => a.key),
      filesCount: this.uploadedFiles.length,
    };
    console.log('📦 New Property Payload (mock):', payload);
    // TODO: Replace with real API call when backend is ready
    this.router.navigate(['/properties']);
  }

  onCancel() {
    this.router.navigate(['/properties']);
  }
}
