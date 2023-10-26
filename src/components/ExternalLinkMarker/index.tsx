import { Text } from '@mantine/core'
import { IconExternalLink } from '@tabler/icons-react'

import classes from './ExternalLinkMarker.module.css'

function ExternalLinkMarker() {
  return (
    <Text span c='dimmed' className={classes.externalLink}>
      <IconExternalLink />
    </Text>
  )
}

export default ExternalLinkMarker
