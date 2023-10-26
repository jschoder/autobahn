import {
  ActionIcon,
  AppShell,
  Anchor,
  Box,
  Flex,
  Grid,
  Group,
  Loader,
  rem,
  Stack,
  Text,
  useMantineColorScheme,
  useComputedColorScheme,
} from '@mantine/core'
import { useHeadroom } from '@mantine/hooks'
import {
  IconSunFilled,
  IconMoonStars,
  IconRoad,
  IconSourceCode,
  IconCreativeCommons,
  IconCreativeCommonsZero,
} from '@tabler/icons-react'
import { useAtomValue } from 'jotai'
import React from 'react'
import { Helmet } from 'react-helmet'

import classes from './App.module.css'

import EmptyFormDarkImage from '~/assets/empty-form-dark.svg?react'
import EmptyFormLightImage from '~/assets/empty-form-light.svg?react'
import LoadRoadsFailedDarkImage from '~/assets/load-roads-failed-dark.svg?react'
import LoadRoadsFailedLightImage from '~/assets/load-roads-failed-light.svg?react'
import ChargingStationList from '~/components/ChargingStationList'
import ExternalLinkMarker from '~/components/ExternalLinkMarker'
import LorryParkingList from '~/components/LorryParkingList'
import ProblemList from '~/components/ProblemList'
import Form from '~/components/SearchForm'
import { geoLocationAtom, roadIdAtom } from '~/components/SearchForm/atoms'
import i18n from '~/i18n'
import { getRoads } from '~/services/autobahn'

const headerHeightRem = 48

function App() {
  const pinned = useHeadroom({ fixedAt: 120 })
  const { setColorScheme } = useMantineColorScheme()
  const computedColorScheme = useComputedColorScheme('light')

  const geoLocation = useAtomValue(geoLocationAtom)
  const roadId = useAtomValue(roadIdAtom)

  const [roads, setRoads] = React.useState<'loading' | string[] | 'failed'>('loading')

  React.useEffect(() => {
    getRoads()
      .then(roads => {
        setRoads(roads)
      })
      .catch(error => {
        console.log('Loading roads failed', error)
        setRoads('failed')
      })
  }, [])

  let shellMain
  if (roads === 'loading') {
    shellMain = <Loader color='blue' type='dots' />
  } else if (roads === 'failed') {
    shellMain = (
      <Box className={classes.main} p='md'>
        {computedColorScheme === 'light' ? (
          <LoadRoadsFailedLightImage className={classes.emptyMainImage} />
        ) : (
          <LoadRoadsFailedDarkImage className={classes.emptyMainImage} />
        )}
        <Text size='lg' ta='center'>
          {i18n.t('roads.loadFailed')}
        </Text>
      </Box>
    )
  } else {
    shellMain = (
      <Flex className={classes.body} direction={{ base: 'column', md: 'row' }} align='stretch'>
        <Box className={classes.formWrapper}>
          <Form roads={roads} />
        </Box>
        {geoLocation && roadId ? (
          <Grid className={classes.main} p='md'>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <ProblemList />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack>
                <ChargingStationList />
                <LorryParkingList />
              </Stack>
            </Grid.Col>
          </Grid>
        ) : (
          <Box className={classes.main} p='md'>
            {computedColorScheme === 'light' ? (
              <EmptyFormLightImage className={classes.emptyMainImage} />
            ) : (
              <EmptyFormDarkImage className={classes.emptyMainImage} />
            )}
            <Text size='lg' ta='center'>
              {i18n.t('form.empty')}
            </Text>
          </Box>
        )}
      </Flex>
    )
  }

  return (
    <>
      <Helmet>
        <link
          rel='icon'
          type='image/svg+xml'
          href={computedColorScheme === 'light' ? '/icon-light.svg' : '/icon-dark.svg'}
        />
        <title>{i18n.t('app.title')}</title>
      </Helmet>
      <AppShell
        className={classes.appShell}
        header={{
          height: rem(headerHeightRem),
          collapsed: !pinned,
          offset: false,
        }}
        px='md'
      >
        <AppShell.Header>
          <Group className={classes.header} justify='space-between' gap='sm' px='md'>
            <Group wrap='nowrap'>
              <IconRoad />
              <Box>{i18n.t('app.title')}</Box>
            </Group>
            <Group>
              {computedColorScheme === 'light' ? (
                <ActionIcon onClick={() => setColorScheme('dark')} color='#333333'>
                  <IconMoonStars style={{ color: '#FFFFFF' }} />
                </ActionIcon>
              ) : (
                <ActionIcon onClick={() => setColorScheme('light')} color='#FFFFFF'>
                  <IconSunFilled style={{ color: '#333333' }} />
                </ActionIcon>
              )}
            </Group>
          </Group>
        </AppShell.Header>
        <AppShell.Main
          pt={rem(headerHeightRem)}
          pb={rem(50)}
          className={roads === 'loading' ? classes.mainLoading : undefined}
        >
          {shellMain}
        </AppShell.Main>
        <AppShell.Footer p='md'>
          <Flex gap='md' justify='flex-end'>
            <Group gap={2}>
              <IconCreativeCommons color={'var(--mantine-color-dimmed)'} />
              <IconCreativeCommonsZero color={'var(--mantine-color-dimmed)'} />
              <Anchor href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>
                CC0-1.0 ({i18n.t('app.footer.publicDomain')})
              </Anchor>
              <ExternalLinkMarker />
            </Group>
            <Group gap={2}>
              <IconSourceCode color={'var(--mantine-color-dimmed)'} />
              <Anchor href='https://github.com/jschoder/autobahn' target='_blank'>
                {i18n.t('app.footer.sourceCode')}
              </Anchor>
              <ExternalLinkMarker />
            </Group>
          </Flex>
        </AppShell.Footer>
      </AppShell>
    </>
  )
}

export default App
