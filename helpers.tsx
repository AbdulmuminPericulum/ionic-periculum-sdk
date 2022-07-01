import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { Uid } from '@ionic-native/uid';
//import { Device } from '@ionic-native/device';
import { Device } from '@capacitor/device';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Capacitor } from '@capacitor/core';
import { SmsRetriever } from '@ionic-native/sms-retriever';
import { NetworkInterface } from '@ionic-native/network-interface';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';


export const getUniqueDeviceID = () =>{
    UniqueDeviceID.get()
      .then((uuid: any) => {
        console.log(uuid);
        return uuid;
      })
      .catch((error: any) => {
        console.log(error);
        return  "Error! ${error}";
      });
};

// get device location
export const getLocation = async () => {

  try {
      const position = await Geolocation.getCurrentPosition();
      return ({
        'latitude': position.coords.latitude,
        'longitude': position.coords.longitude,
      });
  } catch (e) {
      return `message: ${e.message}`;
  }
}

// get IP address
export const getIPAddress = () => {
    
    NetworkInterface.getCarrierIPAddress()
    .then(address => {return address.ip})
    .catch(error => console.error(`Unable to get IP: ${error}`));
}

// get device Ids such as IMEI, MAC, UUID
export const getIDs = (type: string) => {
    if(type == "IMEI"){
        return Uid.IMEI;
      }else if(type == "MAC"){
        return Uid.MAC;
      }else if(type == "UUID"){
        return Uid.UUID;
      }
};

// get device infomation such as Model, Name, Manufacturer
export const  getDeviceInfo = async () => {
    let info = await Device.getInfo();
    let deviceID = await Device.getId();
    return ({ 
        'uuid': deviceID.uuid,
        'model': info.model,
        'device_name': info.name,
        'manufacturer': info.manufacturer,
        'os_version': info.osVersion
    });
};


export const checkLocationPermission = () => {
    if (Capacitor.isNativePlatform()) {
        AndroidPermissions.checkPermission(AndroidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(
            result => {
                if (result.hasPermission) {
                    alert('fine location permission already granted');
                } else {
                    alert('fine location permission not granted');
                    AndroidPermissions.requestPermission(AndroidPermissions.PERMISSION.ACCESS_FINE_LOCATION);
                }
            }
        )
    }
    else {
        console.log('Capacitor not detected, this button will do nothing :(')
    }
};

export const requestAllPermission = () => {
    let list = [
        AndroidPermissions.PERMISSION.CAMERA,
        AndroidPermissions.PERMISSION.READ_SMS,
        AndroidPermissions.PERMISSION.ACCESS_FINE_LOCATION,
        AndroidPermissions.PERMISSION.READ_PHONE_STATE
      ];

      
}

export const checkSMSReadPermission = () => {
    if (Capacitor.isNativePlatform()) {
        AndroidPermissions.checkPermission(AndroidPermissions.PERMISSION.READ_SMS).then(
            result => {
                if (result.hasPermission) {
                    alert('Read SMS permission already granted');
                } else {
                    alert('Read SMS location permission not granted');
                    AndroidPermissions.requestPermission(AndroidPermissions.PERMISSION.READ_SMS);
                }
            }
        )
    }
    else {
        console.log('Capacitor not detected, this button will do nothing :(')
    }
};


// export const getSmsData = async () => {
//     const date = new Date(); // get date...
  
//     // max date...
//     const maxDate = date.getTime();
  
//     // min date...
//     date.setMonth(date.getMonth() - 6);
//     const minDate = date.getTime();
  
//     const filter = {
//       box: 'inbox',
//       minDate: minDate, // timestamp (in milliseconds since UNIX epoch)
//       maxDate: maxDate, // timestamp (in milliseconds since UNIX epoch)
//     };
  
//     let smsObj = [];
  
//     const newPromise = new Promise(async (resolve, reject) => {
//       await SmsRetriever.list(
//         JSON.stringify(filter),
//         fail => {
//           const data = {
//             status: false,
//             msg: 'Failed with this error: ' + fail,
//           };
//           return reject(data);
//         },
//         (count, smsList) => {
//           return resolve({
//             smsList: smsList,
//             count: count,
//           });
//         },
//       );
//     });
  
//     return newPromise;
//   };

  