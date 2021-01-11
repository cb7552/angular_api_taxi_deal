export class DriverConfig {
    public static EndPoint = {
        DriverStatus: {
           // UpdateDriverInfo: 'taxi/v1/mytaxies/',
            UpdateDriverInfo: 'taxi/v1/updateInfo',
            GetDriverInfo: 'taxi/v1/details/',
            DeleteSupplier: 'admin/driver/v1/delete/'
        },
        AddNewDriver: {
            SignUP: 'web/supplier/user/v1/type/signup',
            imageUrl: 'taxi/uploadurl'
        },
        DriverTopUp: {
            TopUp: 'driverBilling/v1/create'
        }
    };
}
