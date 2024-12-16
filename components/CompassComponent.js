import { Magnetometer } from 'expo-sensors';

class CompassComponent 
{
  constructor(headingHandler) 
  {
    this.lastHeading = null;
    this.lastUpdate = Date.now();

    this.startListening(headingHandler);
  }

  startListening(headingHandler) 
  {
    const magnetometer = new Magnetometer({ updateInterval: 5000 });

    magnetometer.addListener(({ x, y, z }) => 
    {
      const now = Date.now();
      if (now - this.lastUpdate > 5000) 
      {
        const heading = Math.atan2(y, x) * (180 / Math.PI);
        if (this.lastHeading === null || Math.abs(heading - this.lastHeading) > 5) 
        {
          headingHandler(heading);
          this.lastHeading = heading;
        }
        this.lastUpdate = now;
      }
    });
  }
}

export default CompassComponent;
