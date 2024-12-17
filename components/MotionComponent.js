import { Accelerometer, Gyroscope } from 'react-native-sensors';

class MotionComponent
{
  constructor(movementHandler)
  {
    this.acceleration = { x: 0, y: 0, z: 0};
    this.rotationRate = { x: 0, y: 0, z: 0};
    this.lastUpdate = Date.now();

    this.startListening(movementHandler);
  }

  startListening(movementHandler)
  {
    const accelerometer = new Accelerometer({ updateInterval: 5000 });
    const gyroscope = new Gyroscope({ updateInterval: 5000 });

    accelerometer.subscribe(({ x, y, z }) =>
    {
      const now = Date.now();
      if (now - this.lastUpdate > 5000)
        {
          this.acceleration = { x, y, z };
          this.detectMovement(movementHandler);
          this.lastUpdate = now;
        }
    });

    gyroscope.subscribe(({ x, y, z }) => 
    {
      this.rotationRate = { x, y, z };
    });
  }

  detectMovement(movementHandler)
  {
    if (this.acceleration.x > 1 || this.acceleration.y > 1 || this.acceleration.z > 1)
    {
      movementHandler(true);
    }
    else
    {
      movementHandler(false);
    }
  }
}

export default MotionComponent;
