import { IconPlug } from '@tabler/icons-react'

import ItemList from '~/components/ItemList'
import i18n from '~/i18n'
import type { ChargingStation } from '~/item.types.ts'
import { getChargingStations } from '~/services/autobahn'

const loadItems = (roadId: string) => getChargingStations(roadId)

const getRenderInfo = (chargingStation: ChargingStation, colorScheme: 'light' | 'dark') => ({
  icon: (
    <IconPlug color={`var(--mantine-color-${colorScheme === 'light' ? 'green-8' : 'lime-6'})`} />
  ),
  title: chargingStation.title,
  description: chargingStation.description,
})

function ChargingStationList() {
  return (
    <ItemList
      title={i18n.t('chargingStations.title')}
      loadFailedMessage={i18n.t('chargingStations.loadFailed')}
      emptyResultMessage={i18n.t('chargingStations.emptyResult')}
      loadItems={loadItems}
      getRenderInfo={getRenderInfo}
    />
  )
}

export default ChargingStationList
