declare namespace API {
  interface Result_string_ {
    success?: boolean;
    errorMessage?: string;
    data?: string;
  }

  type ServiceItemProperty = {
    name: string;
    type: string; // [input, select]
    selectOptions?: string;
  };

  type ServiceItem = {
    name: string; // code/id
    fullName: string;
    subcategory: string;
    properties: Array<ServiceItemProperty>;
    description?: string;
    imgUrl?: string;
    payload?: Record<string, any>;
    otherInfo?: Record<string, any>;
  };

  type Service = {
    name: string; // code/id
    fullName: string;
    subcategories: string; // [Realistic, Chibi, ...]
    ai_type: string; // [sd-txt2img, sd-img2img]
    items: Array<ServiceItem>;
    description?: string;
    otherInfo?: Record<string, any>;
  };

  type PartialService = Partial<Service>;
  type PartialServiceItem = Partial<ServiceItem>;

  type GenerateTask = {
    upload?: any;
    numImages?: number;
    serviceName: string;
    itemName: string;
    base64Image: string;
    properties: Record<string, any>;
  };

  type GenerateTaskBody = {
    upload?: any;
    img: string;
    category: string;
    item_name: string;
    properties: Record<string, any>;
  };
}
