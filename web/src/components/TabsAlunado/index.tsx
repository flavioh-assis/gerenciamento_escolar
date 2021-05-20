import React, { useEffect, useState } from 'react'
import { AppBar, Box, Typography, Tab, Tabs } from '@material-ui/core'

import MostraAlunado from '../../components/BD/MostraAlunado'

import api from '../../services/api'

import { useStyles, tabStyle } from './styles'

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={0}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`
  }
}

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles()
  const [value, setValue] = useState(0)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  interface classeProps {
    push: any
    forEach: any
    map: any
    sort: any
    [idx: number]: { ano: string; turma: string }
  }

  const [list, setList] = useState<classeProps>([])

  useEffect(() => {
    api.get('classes').then(response => {
      setList(response.data)
    })
  }, [list])

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Classes"
          // centered
        >
          {list.map((item: { ano: string; turma: string }) => {
            let classe = `${item.ano} ano ${item.turma}`

            return (
              <Tab
                key={item.ano + item.turma}
                label={classe}
                {...a11yProps(item)}
                style={tabStyle}
              />
            )
          })}
        </Tabs>
      </AppBar>

      {list.map((item: { ano: string; turma: string }, index: number) => {
        return (
          <TabPanel key={item.ano + item.turma} value={value} index={index}>
            <MostraAlunado
              filter={`?ano=${item.ano}&turma=${item.turma}`}
            />
          </TabPanel>
        )
      })}
    </div>
  )
}
