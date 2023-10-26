export type Item = {
  coordinate: {
    lat: number
    long: number
  }
  identifier: string
  title: string
  description: string[]
}

// Rendered in ProblemsList
export type ProblemItem = Item & {
  display_type: string
  subtitle?: string
}
export type Closure = ProblemItem
export type RoadWork = ProblemItem
export type Warning = ProblemItem

// Rendered in ChargingStationList
export type ChargingStation = Item

// Rendered in LorryParkingList
export type LorryParking = Item & {
  subtitle?: string
  lorryParkingFeatureIcons: {
    description: string
  }[]
}
