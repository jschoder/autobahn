import { atom } from 'jotai'

type Coordinates = {
  lat: number
  long: number
}

export const geoLocationAtom = atom<'unknown' | 'loading' | Coordinates>('unknown')
export const roadIdAtom = atom<string | undefined>(undefined)
