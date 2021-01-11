export class rideRequest {
    category: string;
    distance: number;
    elapsedTime: number;
    googleKm: number;
    latitude: number;
    longitude: number;
    region: string;
    rideId: number;
    sourceLatitude: number;
    sourceLongitude: number;
    status: string;
    type: string;
}

export class rideResponse {
        statusCode: number;
        status: boolean;
        message: string;
        data: {
          type: string;
          region: string;
          base: number;
          time: number;
          baseFare: number;
          price: number;
          waitTime: number;
          minimumFare: number;
          totalTravelTime: number;
          userTotalPrice: number;
          totalPrice: number;
          estimateTime: number;
          km: number;
          percentage: number;
          discountCoupan: number;
          tax: number;
          discount: number;
          totalWaitTimePrice: number
        };
        
}