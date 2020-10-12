import React from 'react'
import { AppBar, Box, Typography, Tab, Tabs } from '@material-ui/core'

import MostraAlunos from '../../components/BD/MostraAlunos'

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
        <Box p={2}>
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
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

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
          centered
        >
          <Tab label="1º ano A" {...a11yProps(0)} style={tabStyle} />
          <Tab label="1º ano B" {...a11yProps(1)} style={tabStyle} />
          <Tab label="1º ano C" {...a11yProps(2)} style={tabStyle} />
          <Tab label="1º ano D" {...a11yProps(3)} style={tabStyle} />
          <Tab label="2º ano A" {...a11yProps(4)} style={tabStyle} />
          <Tab label="2º ano B" {...a11yProps(5)} style={tabStyle} />
          <Tab label="2º ano C" {...a11yProps(6)} style={tabStyle} />
          <Tab label="2º ano D" {...a11yProps(7)} style={tabStyle} />
          <Tab label="3º ano A" {...a11yProps(8)} style={tabStyle} />
          <Tab label="3º ano B" {...a11yProps(9)} style={tabStyle} />
          <Tab label="3º ano C" {...a11yProps(10)} style={tabStyle} />
          <Tab label="4º ano A" {...a11yProps(11)} style={tabStyle} />
          <Tab label="4º ano B" {...a11yProps(12)} style={tabStyle} />
          <Tab label="4º ano C" {...a11yProps(13)} style={tabStyle} />
          <Tab label="4º ano D" {...a11yProps(14)} style={tabStyle} />
          <Tab label="5º ano A" {...a11yProps(15)} style={tabStyle} />
          <Tab label="5º ano B" {...a11yProps(16)} style={tabStyle} />
          <Tab label="5º ano C" {...a11yProps(17)} style={tabStyle} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <MostraAlunos />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MostraAlunos />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <MostraAlunos />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <MostraAlunos />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <MostraAlunos />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <MostraAlunos />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <MostraAlunos />
      </TabPanel>
    </div>
  )
}
