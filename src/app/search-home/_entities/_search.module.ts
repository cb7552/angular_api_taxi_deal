export class SearchResult {
    destination: string;
    distance: number;
    id: number;
    km: number;
    latitude: string;
    longitude: string;
    radius: number;
    source: string;
    type: string;
}

//Search Result
export class searchResult {
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
    imageInfo: string;
    deliveryTime: string;
    debit: number;
    distanceTime: {
      distance: number;
      time: number
    };
    oneSignalValue: string;
    transporttype: string;
    driverStatus: string;
    supplierId: string;
    latitude: number;
    longitude: number;
    driverId: number;
    taxiDetailId: string;
    imageInfos: []
}

// Driver review
export class review {
    id: number;
    rating: number;
    comment: string;
    taxiDetailId: number;
    updatedOn: string;
    formattedDate: number;
    userFullName: string;
    userId: number;
    imageInfo: {
      fileName: string;
      imageUrl: string;
      blobkey: string
    };
    driverId: number;
    postedBy: string;
    rideId: number
}

export class contact {
  email: string;
  message: string;
  name: string;
  phonenumber: string;
  senderMail: string;
  subject: string
}