import { Box, Group, Text } from '@mantine/core'

import classes from './InfoPanel.module.css'

type InfoPanelProp = {
  icon: JSX.Element
  message: string
}

export const InfoPanel = ({ icon, message }: InfoPanelProp) => {
  return (
    <Group wrap='nowrap' mt='sm' gap='xs' align='top'>
      <Box className={classes.iconWrapper}>{icon}</Box>
      <Text>{message}</Text>
    </Group>
  )
}

export default InfoPanel
