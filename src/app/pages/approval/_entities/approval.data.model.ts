// Non Approval Driver List
export class adminlist {
    cartype: string;
    id: number;
    name: string;
    phoneNumber: number;
    price: number;
    basePrice: number;
    waitingTime: string;
    imageUrl: string;
    blobkey: string;
    deviceId: string;
    tag: string;
    star: number;
    totalComments: number;
    notification: string;
    loginStatus: string;
    imageInfo: string;
    deliveryTime: string;
    debit: number;
    distanceTime: string;
    oneSignalValue: string;
    transporttype: string;
    driverStatus: string;
    supplierId: number;
    latitude: number;
    longitude: number;
    driverId: number;
    taxiDetailId: string;
    imageInfos: []
}

// Approval All Driver List
export class approvalist {
    cartype: string;
    id: number;
    name: string;
    phoneNumber: number;
    price: number;
    basePrice: number;
    waitingTime: number;
    imageUrl: string;
    blobkey: string;
    deviceId: string;
    tag: string;
    star: number;
    totalComments: number;
    notification: string;
    loginStatus: string;
    imageInfo: {
        fileName: string;
        imageUrl: string;
        blobkey: string;
    };
    deliveryTime: string;
    debit: number;
    distanceTime: string;
    oneSignalValue: string;
    transporttype: string;
    driverStatus: string;
    supplierId: string;
    latitude: number;
    longitude: number;
    driverId: number;
    taxiDetailId: string;
    imageInfos: [];
    licenceNumber: string;
    numberPlate: string;
    amount: number;
}

//Driver TaxiDetails
export class taxidetails {
    id: number;
    taxiId: number;
    supplierId: number;
    userId: number;
    name: string;
    description: string;
    additionalInformation: string;
    latitude: string;
    longitude: string;
    phoneNumber: string;
    taxiNumber: string;
    drivername: string;
    driverPhonenumber: number;
    status: string;
    imageInfos: [];
    currency: string;
    transporttype: string;
    carType: string;
    airPortprice: string;
    perDay: string;
    weekEndOffer: string;
    price: string;
    peakPrice: string;
    basePrice: string
    waitingTime: string;
    minimumFare: string;
    source: string;
    destination: string;
    pickUpLocation: string;
    cityDTO: {
      id: number;
      code: string;
      name: string;
      description: string;
      zipCode: string;
      countryId: string;
      region: string;
      lang: string
    };
    supplierDTO: string;
    active: string;
    updatedOn: string;
    city: string;
    year: string;
    vehicleBrand: string;
    seats: string;
    vehicleTypeDTO: {
      id: string;
      code: string;
      name: string;
      description: string;
      lang: string
    };
    tags: []
}