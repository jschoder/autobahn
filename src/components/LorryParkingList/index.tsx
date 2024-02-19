import { IconTruck } from '@tabler/icons-react'

import ItemList from '~/components/ItemList'
import i18n from '~/i18n'
import type { LorryParking } from '~/item.types.ts'
import { getLorryParking } from '~/services/autobahn'

const loadItems = (roadId: string) => getLorryParking(roadId)

const getRenderInfo = (lorryParking: LorryParking, colorScheme: 'light' | 'dark') => ({
  icon: (
    <IconTruck color={`var(--mantine-color-${colorScheme === 'light' ? 'blue-7' : 'cyan-5'})`} />
  ),
  title: lorryParking.title + (lorryParking.subtitle && ' ' + lorryParking.subtitle),
  description: [
    ...lorryParking.description,
    ...lorryParking.lorryParkingFeatureIcons.map(icon => icon.description).filter(line => line),
  ],
})

function LorryParkingList() {
  return (
    <ItemList
      title={i18n.t('lorryParking.title')}
      loadFailedMessage={i18n.t('lorryParking.loadFailed')}
      emptyResultMessage={i18n.t('lorryParking.emptyResult')}
      loadItems={loadItems}
      getRenderInfo={getRenderInfo}
    />
  )
}

export default LorryParkingList
