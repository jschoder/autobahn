import {
  Accordion,
  Flex,
  List,
  Pagination,
  Skeleton,
  Stack,
  Text,
  Title,
  Tooltip,
  useComputedColorScheme,
} from '@mantine/core'
import { IconInfoHexagon, IconAlertHexagon } from '@tabler/icons-react'
import { useAtomValue } from 'jotai'
import _ from 'lodash'
import React from 'react'

import InfoPanel from '~/components/InfoPanel'
import { geoLocationAtom, roadIdAtom } from '~/components/SearchForm/atoms'
import i18n from '~/i18n'
import type { Item } from '~/item.types.ts'
import { calculateDistance } from '~/utils/coordinates'

type RenderItemInfo = {
  icon: JSX.Element
  iconTooltip?: string
  title: string
  description: string[]
}

export type ItemListProps<T> = {
  itemsPerPage?: number
  title: string
  loadFailedMessage: string
  emptyResultMessage: string
  loadItems: (roadId: string) => Promise<T[]>
  getRenderInfo: (element: T, colorScheme: 'light' | 'dark') => RenderItemInfo
}

function ItemList<T extends Item>({
  itemsPerPage = 10,
  title,
  loadFailedMessage,
  emptyResultMessage,
  loadItems,
  getRenderInfo,
}: ItemListProps<T>) {
  const computedColorScheme = useComputedColorScheme('light')

  const geoLocation = useAtomValue(geoLocationAtom)
  const roadId = useAtomValue(roadIdAtom)

  const [status, setStatus] = React.useState<'empty' | 'loading' | 'complete' | 'failed'>('empty')
  const [unsortedItems, setUnsortedItems] = React.useState<T[]>([])
  const [sortedItems, setSortedItems] = React.useState<T[]>([])
  const [distances, setDistances] = React.useState<Map<string, number>>(new Map())
  const [paginationIndex, setPaginationIndex] = React.useState(1)

  React.useEffect(() => {
    if (roadId) {
      setStatus('loading')
      loadItems(roadId)
        .then((loadedItems: T[]) => setUnsortedItems(loadedItems))
        .catch(error => {
          console.error('Loading list failed', error)
          setUnsortedItems([])
          setStatus('failed')
        })
    }
  }, [roadId, loadItems])

  React.useEffect(() => {
    if (unsortedItems?.length && typeof geoLocation === 'object') {
      const distances = new Map<string, number>()
      for (const item of unsortedItems) {
        const distance = calculateDistance(
          item.coordinate.lat,
          item.coordinate.long,
          geoLocation.lat,
          geoLocation.long,
        )
        distances.set(item.identifier, Math.round(distance / 100) / 10)
      }
      setDistances(distances)
      setPaginationIndex(1)
      setSortedItems(
        unsortedItems.sort(
          (item1, item2) =>
            (distances.get(item1.identifier) || 0) - (distances.get(item2.identifier) || 0),
        ),
      )
      setStatus('complete')
    } else {
      setSortedItems([])
      setStatus('empty')
    }
  }, [unsortedItems, geoLocation])

  let content
  if (status === 'empty') {
    content = (
      <InfoPanel
        icon={
          <IconInfoHexagon
            color={`var(--mantine-color-${computedColorScheme === 'light' ? 'blue-7' : 'blue-3'})`}
          />
        }
        message={emptyResultMessage}
      />
    )
  } else if (status === 'loading') {
    content = (
      <Accordion>
        {_.range(itemsPerPage).map(index => (
          <Accordion.Item key={index} value={`item.${index}`}>
            <Accordion.Control disabled icon={<Skeleton height={16} width={16} circle />}>
              <Flex gap='xs' wrap='wrap'>
                <Skeleton height={8} width={32} radius={4} />
                {_.range(10).map(index => (
                  <Skeleton key={`skeleton.${index}`} height={8} width={64} radius={4} />
                ))}
              </Flex>
            </Accordion.Control>
            <Accordion.Panel></Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    )
  } else if (status === 'failed') {
    content = (
      <InfoPanel
        icon={<IconAlertHexagon color='var(--mantine-color-error)' />}
        message={loadFailedMessage}
      />
    )
  } else {
    content = (
      <>
        <Accordion>
          {sortedItems
            .slice((paginationIndex - 1) * itemsPerPage, paginationIndex * itemsPerPage)
            .map(item => {
              const distance = distances.get(item.identifier)
              const renderInfo = getRenderInfo(item, computedColorScheme)
              return (
                <Accordion.Item key={item.identifier} value={item.identifier}>
                  <Accordion.Control
                    icon={
                      renderInfo.iconTooltip ? (
                        <Tooltip
                          label={renderInfo.iconTooltip}
                          withArrow
                          events={{ hover: true, focus: true, touch: false }}
                        >
                          {renderInfo.icon}
                        </Tooltip>
                      ) : (
                        renderInfo.icon
                      )
                    }
                  >
                    <Text c='dimmed' span mr='xs'>
                      {distance}
                      {i18n.t('common.km')}
                    </Text>
                    {renderInfo.title}
                  </Accordion.Control>
                  <Accordion.Panel>
                    <List>
                      {renderInfo.description
                        .filter((line: string) => line && line.trim() !== '')
                        .map((line, index) => (
                          <List.Item key={`line${index}`}>{line}</List.Item>
                        ))}
                    </List>
                  </Accordion.Panel>
                </Accordion.Item>
              )
            })}
        </Accordion>
        {sortedItems.length > itemsPerPage && (
          <Flex justify='center'>
            <Pagination
              mt='md'
              mx='auto'
              total={Math.ceil(sortedItems.length / itemsPerPage)}
              value={paginationIndex}
              onChange={setPaginationIndex}
            />
          </Flex>
        )}
      </>
    )
  }

  return (
    <Stack gap={0}>
      <Title order={2}>{title}</Title>
      {content}
    </Stack>
  )
}

export default ItemList
