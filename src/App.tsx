import { Grid, GridItem } from "@chakra-ui/react"
import Sidebar from "./components/layout/Sidebar"
import Header from "./components/layout/Header"
function App() {
  return (
    <Grid backgroundColor="gray.900" minH="100vh" templateRows="1fr 8fr" templateColumns="1fr 5fr" >
      <GridItem gridRow="1 / 4" gridColumn="1 / 2" borderRightWidth="1px" borderColor="gray.500">
        <Sidebar/>
      </GridItem>
      <GridItem borderBottomWidth="1px" borderColor="gray.500">
        <Header/>
      </GridItem>
      <GridItem>
        
      </GridItem>
    </Grid>
  )
}

export default App
