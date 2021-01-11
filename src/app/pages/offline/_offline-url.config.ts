export class OfflineConfig {
    public static EndPoint = {
        SMS: {
            TaxiPositions: 'taxi/v1/mytaxies/',
            TaxiPosition: 'taxi/v1/mytaxies/user/',
            CreateSMS: 'phoneBooking/v1/create',
            UserCreate:'phoneBooking/v1/userOffline/sms/create'
        },
        BookMessage: {
            Toptp: 'driverBilling/v1/create'
        }
    };
}
