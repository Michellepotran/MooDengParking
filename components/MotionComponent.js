import { Accelerometer, Gyroscope } from 'expo-sensors';
 
class MotionComponent {
  constructor(movementHandler) {
    this.acceleration = { x: 0, y: 0, z: 0 };
    this.rotationRate = { x: 0, y: 0, z: 0 };
    this.lastUpdate = Date.now();
 
    this.startListening(movementHandler);
  }
 
  startListening(movementHandler) {
    Accelerometer.setUpdateInterval(1000);
    Gyroscope.setUpdateInterval(1000);
 
    this.accelerometerSubscription = Accelerometer.addListener(({ x, y, z }) => {
      const now = Date.now();
      if (now - this.lastUpdate > 1000) {
        this.acceleration = { x, y, z };
        this.detectMovement(movementHandler);
        this.lastUpdate = now;
      }
    });
 
    this.gyroscopeSubscription = Gyroscope.addListener(({ x, y, z }) => {
      this.rotationRate = { x, y, z };
    });
  }
 
  detectMovement(movementHandler) {
    if (Math.abs(this.acceleration.x) > 1 || Math.abs(this.acceleration.y) > 1 || Math.abs(this.acceleration.z) > 1) {
      movementHandler(true);
    } else {
      movementHandler(false);
    }
  }
 
  stopListening() {
    if (this.accelerometerSubscription) {
      this.accelerometerSubscription.remove();
    }
    if (this.gyroscopeSubscription) {
      this.gyroscopeSubscription.remove();
    }
  }
}
 
export default MotionComponent;