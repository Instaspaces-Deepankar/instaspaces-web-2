export interface Workspace {
    id: string;
    spaceId: string;
    details: {
      _id: any;
      tatkalOnboarding: boolean;
      name: string;
      venueAddress: string;
    };
    spaceImages: any[];
    geolocation: {
      lat: string;
      lon: string;
    };
    plans: Plan[];
    city: string;
    tags: any[]; 
    state: string;
  }
  
  export interface Plan {
    name: string;
    imageUrl: string | null;
    description: string | null;
    addons: Addon[];
    price: number;
    tenures: Tenure[];
    selected: boolean;
  }
  
  export interface Addon {
    name: string;
    price: number;
    selected: boolean;
    mandatory: boolean;
    recommended: boolean;
  }
  
  export interface Tenure {
    months: string;
    description: string | null;
    price: number;
    checked: boolean;
  }
  
  export interface Page<T> {
    content: T[];
    pageable: {
      sort: {
        empty: boolean;
        unsorted: boolean;
        sorted: boolean;
      };
      offset: number;
      pageNumber: number;
      pageSize: number;
      paged: boolean;
      unpaged: boolean;
    };
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    first: boolean;
    numberOfElements: number;
    empty: boolean;
  }
  