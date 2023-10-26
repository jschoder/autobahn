import axios from 'axios'

import config from '~/config'
import type { ChargingStation, Closure, LorryParking, RoadWork, Warning } from '~/item.types.ts'

export const getChargingStations = async (roadId: string): Promise<ChargingStation[]> => {
  const response = await axios.get<{
    electric_charging_station: ChargingStation[]
  }>(`${config.SERVICE_BASE_URL}/${roadId}/services/electric_charging_station`)
  return response.data.electric_charging_station
}

export const getClosures = async (roadId: string): Promise<Closure[]> => {
  const response = await axios.get<{ closure: Closure[] }>(
    `${config.SERVICE_BASE_URL}/${roadId}/services/closure`,
  )
  return response.data.closure
}

export const getLorryParking = async (roadId: string): Promise<LorryParking[]> => {
  const response = await axios.get<{ parking_lorry: LorryParking[] }>(
    `${config.SERVICE_BASE_URL}/${roadId}/services/parking_lorry`,
  )
  return response.data.parking_lorry
}

export const getRoads = async (): Promise<string[]> => {
  const response = await axios.get<{ roads: string[] }>(`${config.SERVICE_BASE_URL}/`)
  return response.data.roads
}

export const getRoadworks = async (roadId: string): Promise<RoadWork[]> => {
  const response = await axios.get<{ roadworks: RoadWork[] }>(
    `${config.SERVICE_BASE_URL}/${roadId}/services/roadworks`,
  )
  return response.data.roadworks
}

export const getWarnings = async (roadId: string): Promise<Warning[]> => {
  const response = await axios.get<{ warning: Warning[] }>(
    `${config.SERVICE_BASE_URL}/${roadId}/services/warning`,
  )
  return response.data.warning
}
