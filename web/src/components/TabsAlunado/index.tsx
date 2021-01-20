import React from 'react'
import { AppBar, Box, Typography, Tab, Tabs } from '@material-ui/core'

import MostraAlunosPesquisa from '../../components/BD/MostraAlunosPesquisa'

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

  const filtro: Array<string> = [
    '?ano=1º&turma=A',
    '?ano=1º&turma=B',
    '?ano=1º&turma=C',
    '?ano=1º&turma=D',
    '?ano=2º&turma=A',
    '?ano=2º&turma=B',
    '?ano=2º&turma=C',
    '?ano=2º&turma=D',
    '?ano=3º&turma=A',
    '?ano=3º&turma=B',
    '?ano=3º&turma=C',
    '?ano=4º&turma=A',
    '?ano=4º&turma=B',
    '?ano=4º&turma=C',
    '?ano=4º&turma=D',
    '?ano=5º&turma=A',
    '?ano=5º&turma=B',
    '?ano=5º&turma=C'
  ]

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
        <MostraAlunosPesquisa filter={filtro[0]} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MostraAlunosPesquisa filter={filtro[1]} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <MostraAlunosPesquisa filter={filtro[2]} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <MostraAlunosPesquisa filter={filtro[3]} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <MostraAlunosPesquisa filter={filtro[4]} />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <MostraAlunosPesquisa filter={filtro[5]} />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <MostraAlunosPesquisa filter={filtro[6]} />
      </TabPanel>
      <TabPanel value={value} index={7}>
        <MostraAlunosPesquisa filter={filtro[7]} />
      </TabPanel>
      <TabPanel value={value} index={8}>
        <MostraAlunosPesquisa filter={filtro[8]} />
      </TabPanel>
      <TabPanel value={value} index={9}>
        <MostraAlunosPesquisa filter={filtro[9]} />
      </TabPanel>
      <TabPanel value={value} index={10}>
        <MostraAlunosPesquisa filter={filtro[10]} />
      </TabPanel>
      <TabPanel value={value} index={11}>
        <MostraAlunosPesquisa filter={filtro[11]} />
      </TabPanel>
      <TabPanel value={value} index={12}>
        <MostraAlunosPesquisa filter={filtro[12]} />
      </TabPanel>
      <TabPanel value={value} index={13}>
        <MostraAlunosPesquisa filter={filtro[13]} />
      </TabPanel>
      <TabPanel value={value} index={14}>
        <MostraAlunosPesquisa filter={filtro[14]} />
      </TabPanel>
      <TabPanel value={value} index={15}>
        <MostraAlunosPesquisa filter={filtro[15]} />
      </TabPanel>
      <TabPanel value={value} index={16}>
        <MostraAlunosPesquisa filter={filtro[16]} />
      </TabPanel>
      <TabPanel value={value} index={17}>
        <MostraAlunosPesquisa filter={filtro[17]} />
      </TabPanel>
    </div>
  )
}
