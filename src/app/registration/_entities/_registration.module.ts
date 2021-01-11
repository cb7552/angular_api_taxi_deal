export class Regitration {
    address: string;
    carType: string;
    category:string;
    code: string;
    deviceId: string;
    domain: string;
    email: string;
    firstName: string;
    hourly: number;
    id: number;
    imageInfo: ImageInfo;
    isSocialUser: boolean;
    lang: string;
    lastName: string;
    latitude: string;
    licenseNumber: string;
    loginStatus: string;
    longitude: string;
    notification: string;
    password: string;
    phoneNumber: string;
    phoneVerified: string;
    price: number;
    push: string;
    restKey: string;
    role: string;
    socialUser: boolean;
    status: string;
    website: string;
}

export class ImageInfo {
    blobkey: string;
    fileName: string;
    imageUrl: string;
}

export class UploadImage {
    blobkey: string;
    fileName: string;
    imageUrl: string;
}

// Registration
export class result {
        statusCode: number;
        status: boolean;
        message: string;
        data: string;
        jwt: string;
        infoId: number
}