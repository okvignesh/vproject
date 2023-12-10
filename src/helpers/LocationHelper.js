import Geolocation from '@react-native-community/geolocation';
import {Platform} from 'react-native';
import {request, check, PERMISSIONS, RESULTS} from 'react-native-permissions';

class LocationHelper {
  watchId = undefined;

  unMount = () => {
    if (this.watchId) {
      Geolocation.clearWatch(this.watchId);
    }
  };

  fetchLocation = (success, failure) => {
    Geolocation.getCurrentPosition(
      locationData => {
        console.log('success fetching location ', locationData);
        success(locationData);
      },
      error => {
        console.log('Error fetching location ', error);
        failure(error);
      },
      {
        enableHighAccuracy: true,
      },
    );
  };

  trackUserLocation = (success, failure) => {
    this.watchId = Geolocation.watchPosition(
      locationData => {
        console.log('success tracking location ', locationData);
        success(locationData);
      },
      error => {
        console.log('Error tracking location ', error);
        failure(error);
      },
      {
        interval: 500,
        // fastestInterval?: number;
        // timeout: 5000,
        // maximumAge: 2000,
        enableHighAccuracy: true,
        // distanceFilter?: number;
        useSignificantChanges: true,
      },
    );
  };

  checkLocationPermission = (success, failure) => {
    check(
      Platform.select({
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        android: PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      }),
    )
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            break;
          case RESULTS.DENIED:
            this.requestPermission(success, failure);
            break;
          case RESULTS.GRANTED:
            success();
          case RESULTS.BLOCKED:
            this.requestPermission(success, failure);
        }
      })
      .catch(error => {
        failure(error);
      });
  };

  requestPermission = (success, failure) => {
    request(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      }),
    )
      .then(result => {
        success(result);
      })
      .catch(error => {
        failure(error);
      });
  };
}

export default new LocationHelper();
