export interface TimeSlot {
  start: string;
  end: string;
}

export interface DateAvailability {
  date: string;
  timeSlots: TimeSlot[];
}

export interface Table {
  id: string;
  name: string;
  seats: number;
  minDiners: number;
  maxDiners: number;
  location: 'main' | 'outdoor' | 'private' | 'bar';
  isPrivate: boolean;
  availability?: DateAvailability[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  type: 'starter' | 'main' | 'dessert' | 'beverage';
  price: number;
  allergens?: string[];
  imageUrl?: string;
}

export interface Menu {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  price: number;
  discountedPrice: number;
  items: MenuItem[];
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  cuisineTypes: string[];
  priceRange: 1 | 2 | 3 | 4;
  rating: number;
  reviews: number;
  images: string[];
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  features: string[];
  openingHours: {
    [key: string]: {
      open: string;
      close: string;
    };
  };
  tables?: Table[];
  menus?: Menu[];
}