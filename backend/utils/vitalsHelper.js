const checkVitalsThresholds = (vitals) => {
    const thresholds = {
      heartRate: { min: 60, max: 100 },
      bloodPressure: {
        systolic: { min: 90, max: 140 },
        diastolic: { min: 60, max: 90 }
      },
      temperature: { min: 97, max: 99.5 },
      spO2: { min: 95, max: 100 },
      glucose: { min: 70, max: 140 }
    };
    
    return (
      vitals.heartRate < thresholds.heartRate.min ||
      vitals.heartRate > thresholds.heartRate.max ||
      vitals.bloodPressure.systolic < thresholds.bloodPressure.systolic.min ||
      vitals.bloodPressure.systolic > thresholds.bloodPressure.systolic.max ||
      vitals.bloodPressure.diastolic < thresholds.bloodPressure.diastolic.min ||
      vitals.bloodPressure.diastolic > thresholds.bloodPressure.diastolic.max ||
      vitals.temperature < thresholds.temperature.min ||
      vitals.temperature > thresholds.temperature.max ||
      vitals.spO2 < thresholds.spO2.min ||
      vitals.glucose < thresholds.glucose.min ||
      vitals.glucose > thresholds.glucose.max
    );
  };
  
  module.exports = { checkVitalsThresholds };