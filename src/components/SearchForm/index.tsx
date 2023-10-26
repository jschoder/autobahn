import { Box, Flex, Grid, LoadingOverlay, NativeSelect, Radio, Stack } from '@mantine/core'
import { useAtom } from 'jotai'
import React from 'react'

import { geoLocationAtom, roadIdAtom } from './atoms.ts'

import config from '~/config'
import i18n from '~/i18n'

type FormProps = {
  roads: string[]
}

function SearchForm({ roads }: FormProps) {
  const [geoLocation, setGeoLocation] = useAtom(geoLocationAtom)
  const [roadId, setRoadId] = useAtom(roadIdAtom)

  const [canAccessCurrentPosition, setCanAcccessCurrentPosition] = React.useState(true)
  const [locationSource, setLocationSource] = React.useState<string>('list')

  React.useEffect(() => {
    if (!navigator.geolocation) {
      setCanAcccessCurrentPosition(false)
    }
  }, [])

  React.useEffect(() => {
    if (locationSource === 'browser') {
      setGeoLocation('loading')
      navigator.geolocation.getCurrentPosition(
        position => {
          setGeoLocation({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          })
        },
        () => {
          setGeoLocation('unknown')
          setLocationSource('list')
          setCanAcccessCurrentPosition(false)
        },
      )
    }
  }, [locationSource, setGeoLocation])

  return (
    <Box pos='relative'>
      <Flex p='md' justify='center'>
        <Grid>
          <Grid.Col span={{ base: 12, sm: 6, md: 12 }}>
            <Radio.Group
              name='locationSource'
              label={i18n.t('form.location.title')}
              onChange={value => setLocationSource(value)}
              value={locationSource}
              withAsterisk
            >
              <Stack gap='xs'>
                <Radio
                  value='browser'
                  disabled={!canAccessCurrentPosition}
                  label={i18n.t('form.location.browser.radio')}
                />
                <Radio value='list' label={i18n.t('form.location.custom.radio')} />
                <NativeSelect
                  data={[
                    {
                      label: '-',
                      value: '',
                    },
                    ...Object.entries(config.CITIES).map(([id, city]) => ({
                      label: city.name,
                      value: id,
                    })),
                  ]}
                  onChange={event => {
                    setLocationSource('list')
                    setGeoLocation(
                      config.CITIES[event.currentTarget.value as keyof typeof config.CITIES],
                    )
                  }}
                />
              </Stack>
            </Radio.Group>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 12 }}>
            <NativeSelect
              label={i18n.t('form.road.title')}
              data={[
                {
                  label: '-',
                  value: '',
                },
                ...(roads || []),
              ]}
              onChange={value => setRoadId(value.currentTarget.value)}
              value={roadId}
              withAsterisk
            />
          </Grid.Col>
        </Grid>
      </Flex>
      <LoadingOverlay
        visible={geoLocation === 'loading'}
        loaderProps={{ type: 'dots' }}
        zIndex={1000}
      />
    </Box>
  )
}

export default SearchForm
