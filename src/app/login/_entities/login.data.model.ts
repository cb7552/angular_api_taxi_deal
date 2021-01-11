export class UserLogin {
  deviceId: 'string';
  domain: 'string';
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
  website: string;
}

export class UserDetails {
  statusCode: number;
  status: boolean;
  message: string;
  data: UserInfo;
  jwt: string;
  infoId: number;
}

export class UserInfo {
  id: number;
  userId: number;
  supplierId: number;
  role: string;
  taxiId: string;
  lan: string;
  hourly: string;
  price: string;
  peakPrice: string;
  basePrice: string;
  status: string;
  isApproved: string;
  type: string;
  phoneNumber: number;
  email: string;
  oneSignalValue: string;
  name: string;
}
