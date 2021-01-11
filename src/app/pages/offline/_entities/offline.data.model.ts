export class OfflineUser {
    address: string;
    carType: string;
    code: string;
    deviceId: string;
    domain: string;
    email: string;
    lastname: string;
    hourly: 0;
    userId: string;
    isSocialUser: true;
    lang: string;
    drivername: string;
    latitude: 0;
    licenseNumber: string;
    loginStatus: string;
    longitude: string;
    notification: string;
    password: string;
    phoneNumber: string;
    phoneVerified: string;
    price: string;
    push: string;
    restKey: string;
    role: string;
    socialUser: string;
    status: string;
    website: string;
}

//Offline booking by sms
export class sms {
    statusCode: number;
    status: boolean;
    message: string;
    data: string;
    jwt: string;
    infoId: number
}
