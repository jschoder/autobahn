const dividedPi = Math.PI / 180

// Using an approximate calculation as a compromise betwen speed and accuracy
// https://henry-rossiter.medium.com/calculating-distance-between-geographic-coordinates-with-javascript-5f3097b61898
export const calculateDistance = (lat1: number, long1: number, lat2: number, long2: number) => {
  const p1 = lat1 * dividedPi
  const p2 = lat2 * dividedPi
  const deltaLon = long2 - long1
  const deltaLambda = (deltaLon * Math.PI) / 180
  return (
    Math.acos(Math.sin(p1) * Math.sin(p2) + Math.cos(p1) * Math.cos(p2) * Math.cos(deltaLambda)) *
    6371e3
  )
}
