import {
  IconExclamationCircle,
  IconAlertTriangle,
  IconTrafficCone,
  IconArrowRampRight2,
  IconArrowNarrowUp,
} from '@tabler/icons-react'

import ItemList from '~/components/ItemList'
import i18n from '~/i18n'
import type { ProblemItem } from '~/item.types.ts'
import { getClosures, getRoadworks, getWarnings } from '~/services/autobahn'

const loadItems = async (roadId: string) => {
  const problems = await Promise.all([
    getClosures(roadId),
    getRoadworks(roadId),
    getWarnings(roadId),
  ])
  return problems.flat()
}

const getRenderInfo = (problem: ProblemItem, colorScheme: 'light' | 'dark') => {
  let icon = (
    <IconExclamationCircle
      color={`var(--mantine-color-${colorScheme === 'light' ? 'gray-6' : 'gray-4'})`}
    />
  )
  let iconTooltip = i18n.t('problems.tooltips.other')
  switch (problem.display_type) {
    case 'CLOSURE':
      icon = (
        <IconArrowNarrowUp
          color={`var(--mantine-color-${colorScheme === 'light' ? 'teal-6' : 'indigo-3'})`}
        />
      )
      iconTooltip = i18n.t('problems.tooltips.closure')
      break
    case 'CLOSURE_ENTRY_EXIT':
      icon = (
        <IconArrowRampRight2
          color={`var(--mantine-color-${colorScheme === 'light' ? 'teal-6' : 'indigo-3'})`}
        />
      )
      iconTooltip = i18n.t('problems.tooltips.closureEntryExit')
      break
    case 'ROADWORKS':
      icon = (
        <IconTrafficCone
          color={`var(--mantine-color-${colorScheme === 'light' ? 'orange-7' : 'yellow-6'})`}
        />
      )
      iconTooltip = i18n.t('problems.tooltips.roadworks')
      break
    case 'SHORT_TERM_ROADWORKS':
      icon = (
        <IconTrafficCone
          color={`var(--mantine-color-${colorScheme === 'light' ? 'orange-7' : 'yellow-6'})`}
        />
      )
      iconTooltip = i18n.t('problems.tooltips.shortTermRoadworks')
      break
    case 'WARNING':
      icon = (
        <IconAlertTriangle
          color={`var(--mantine-color-${colorScheme === 'light' ? 'gray-7' : 'yellow-4'})`}
        />
      )
      iconTooltip = i18n.t('problems.tooltips.warning')
      break
  }
  return {
    icon,
    iconTooltip,
    title: problem.title + (problem.subtitle && ' ' + problem.subtitle),
    description: problem.description,
  }
}

function ProblemList() {
  return (
    <ItemList
      itemsPerPage={25}
      title={i18n.t('problems.title')}
      loadFailedMessage={i18n.t('problems.loadFailed')}
      emptyResultMessage={i18n.t('problems.emptyResult')}
      loadItems={loadItems}
      getRenderInfo={getRenderInfo}
    />
  )
}

export default ProblemList
