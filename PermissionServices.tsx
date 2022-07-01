import { Capacitor } from '@capacitor/core';
import { AndroidPermissions } from '@ionic-native/android-permissions';

const permissions =
{
    requestCameraPermission() {
        if (Capacitor.isNativePlatform()) {
            AndroidPermissions.checkPermission(AndroidPermissions.PERMISSION.CAMERA).then(
                result => {
                    if (result.hasPermission) {
                        //alert('you already have this permission')
                        alert('camera permission already granted');
                    } else {
                        //alert('please implement permission request')
                        AndroidPermissions.requestPermission(AndroidPermissions.PERMISSION.CAMERA);
                    }
                }
            )
        }
        else {
            console.log('Capacitor not detected, this button will do nothing :(')
        }
    },

    requestFineLocation() {
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
    }

}

export default permissions;