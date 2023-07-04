import React from 'react'
import namePath from '../routers/namePath'

const Main = React.lazy(() => import('../components/Main/Main'))
const BLOCKELEMENT = React.lazy(() =>
  import('../components/BlockElement/BlockElement')
)

const pathItems = [
  { path: namePath.MAIN, element: <Main /> },

  { path: namePath.BLOCKELEMENT, element: <BLOCKELEMENT /> },
  { path: namePath.BLOCKELEMENTTWO, element: <BLOCKELEMENT /> },
]
export { pathItems }
