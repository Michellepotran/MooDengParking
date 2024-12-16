import * as Location from 'expo-location';

class GPSComponent
{
  async startTracking(locationHandler)
  {
    let {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted')
    {
      console.error('Permissions denied');
      return;
    }

    Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000,
        distanceInterval: 0,
      },
    (location) =>
    {
        const {latitude, longitude} = location.coords;
        locationHandler({ latitude, longitude });
    }
    );
  }
}

export default GPSComponent;
