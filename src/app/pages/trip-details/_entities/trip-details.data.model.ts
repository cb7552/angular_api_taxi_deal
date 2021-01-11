//driver triphistory
export class drivertrip {
      id: number;
      latitude: number;
      longitude: number;
      distance: number;
      endTIme: number;
      estimateTime: number;
      km: number;
      userKm: number;
      radius: null;
      source: string;
      destination: string;
      userId: number;
      driverId: number;
      taxiDetailId: number;
      dealId: string;
      rideStatus: string;
      userName: string;
      driverName: null;
      oneSignalId: null;
      desc: string;
      type: string;
      payment: string;
      price: number;
      totalPrice: number;
      push: false;
      imageInfo: {
        fileName: null;
        imageUrl: null;
        blobkey: string
      };
      star: number;
      totalComments: number;
      comments: string;
      updatedOn: number;
      base: number;
      travelTime: number;
      userTotalPrice: number;
      discount: number
}

//user TripHistory
export class userTrip {
        id: number;
        latitude: number;
        longitude: number;
        distance: null;
        endTIme: number;
        estimateTime: number;
        km: number;
        userKm: number;
        radius: null;
        source: string;
        destination: string;
        userId: number;
        driverId: number;
        taxiDetailId: number;
        dealId: string;
        rideStatus: string;
        userName: string;
        driverName: string;
        oneSignalId: string;
        desc: string;
        type: string;
        payment: string;
        price: number;
        totalPrice: number;
        push: false;
        imageInfo: {
          fileName: string;
          imageUrl: string;
          blobkey: string
        };
        star: number;
        totalComments: number;
        comments: string;
        updatedOn: number;
        base: number;
        travelTime: number;
        userTotalPrice: number;
        discount: number
}

//supplier Trip History
export class supplierTrip {
      id: number;
      latitude: number;
      longitude: number;
      distance: null;
      endTIme: number;
      estimateTime: number;
      km: number;
      userKm: number;
      radius: string;
      source: string;
      destination: string;
      userId: number;
      driverId: number;
      taxiDetailId: number;
      dealId: string;
      rideStatus: string;
      userName: string;
      driverName: string;
      oneSignalId: string;
      desc: string;
      type: string;
      payment: string;
      price: number;
      totalPrice: number;
      push: false;
      imageInfo: {
        fileName: null;
        imageUrl: null;
        blobkey: string
      };
      star: number;
      totalComments: number;
      comments: string;
      updatedOn: number;
      base: number;
      travelTime: number;
      userTotalPrice: number;
      discount: number
}

//offline supplier Trip history
export class offlineTrip {
    userId: number;
    driverId: number;
    endTIme: number;
    travelTime: number;
    startDate: number;
    endDate: number;
    destAddress: string;
    sourceAddrss: string;
    comment: string;
    userPhoneNumber: number
}