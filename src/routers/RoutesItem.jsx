import { Routes, Route } from 'react-router-dom'

import { pathItems } from '../routers/pathItems'
import namePath from '../routers/namePath'
import React from 'react'

function RoutesItem() {
  return (
    <React.Suspense fallback="...">
      <Routes>
        {pathItems.map(({ element, path }) => (
          <Route key={element} path={path} element={element} />
        ))}
      </Routes>
    </React.Suspense>
  )
}

export default RoutesItem
