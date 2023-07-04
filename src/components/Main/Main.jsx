import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getData } from '../../redux/actions'
import { useNavigate } from 'react-router-dom'
import './Main.scss'
const Main = () => {
  const { data, seach } = useSelector((state) => state.appReducer)
  const [parts, setParts] = useState(12)
  const [dataNow, setDataNow] = useState([])
  const [dataSelectProvider, setDataSelectProvider] = useState([])
  const [dataSelectReal, setDataSelectReal] = useState([])
  const [real, provider] = ['Валюта', 'Провайдер']

  const [dataSelectFilter, setDataSelectFilter] = useState({
    real,
    provider,
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getData())
  }, [])

  const nextData = () => {
    setParts((res) => 12 + res)
  }
  useEffect(() => {
    filterData()
    filterArray()
  }, [parts, data])

  const filterArray = () => {
    let resAll = Object.entries(data)
      .slice(0, parts)
      .sort(function (a, b) {
        if (a[1].collections.popularity > b[1].collections.popularity) {
          return 1
        }
        if (a[1].collections.popularity < b[1].collections.popularity) {
          return -1
        }
        return 0
      })

    if (resAll.length > 0) {
      setDataNow(resAll)
    }
  }

  const filterData = () => {
    const resAll = Object.entries(data).slice(0, parts)
    const resSelectDataProvider = []
    const resSelectDataReal = []

    for (const iterator of resAll) {
      if (!resSelectDataProvider.includes(iterator[1].provider)) {
        resSelectDataProvider.push(iterator[1].provider)
      }
      if (iterator[1].real) {
        for (const key in iterator[1].real) {
          if (!resSelectDataReal.includes(key)) {
            resSelectDataReal.push(key)
          }
        }
      }
    }
    return fillArray(resSelectDataReal, resSelectDataProvider)
  }
  const fillArray = (two, three) => {
    if (two.length > 0) setDataSelectReal([real].concat(two))
    if (three.length > 0) setDataSelectProvider([provider].concat(three))
  }
  useEffect(() => {
    filterSearch()
  }, [dataSelectFilter])

  const filterSearch = () => {
    let filterRes = []
    if (
      dataSelectFilter.real !== real ||
      dataSelectFilter.provider !== provider
    ) {
      if (dataSelectFilter.provider !== provider) {
        filterRes = Object.entries(data)
          .slice(0, parts)
          .filter((el) => el[1]['provider'] == dataSelectFilter.provider)
      }
      if (dataSelectFilter.real !== real) {
        filterRes = Object.entries(data)
          .slice(0, parts)
          .filter((el) => el[1]['real'].hasOwnProperty(dataSelectFilter.real))
      }
    } else {
      filterRes = Object.entries(data).slice(0, parts)
    }

    setDataNow(
      filterRes.length > 0
        ? filterRes.sort(function (a, b) {
            if (a[1].collections.popularity > b[1].collections.popularity) {
              return 1
            }
            if (a[1].collections.popularity < b[1].collections.popularity) {
              return -1
            }
            return 0
          })
        : []
    )
  }

  const link = (el) => () => navigate(el)
  return (
    <div className="containerBlock">
      <div className="searchBlock">
        {dataSelectReal.length > 0 && (
          <select
            value={dataSelectFilter.real}
            onChange={(e) =>
              setDataSelectFilter({ ...dataSelectFilter, real: e.target.value })
            }
          >
            {dataSelectReal.map((el, i) => (
              <option key={i} value={el}>
                {el}
              </option>
            ))}
          </select>
        )}
        {dataSelectProvider.length > 0 && (
          <select
            value={dataSelectFilter.provider}
            onChange={(e) =>
              setDataSelectFilter({
                ...dataSelectFilter,
                provider: e.target.value,
              })
            }
          >
            {dataSelectProvider.map((el, i) => (
              <option key={i} value={el}>
                {el}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="mainBlock">
        {dataNow.length > 0
          ? dataNow.map((el) => {
              return (
                <div
                  className="elemInfo"
                  key={el[0]}
                  onClick={link(`/${el[0]}`)}
                >
                  <figure>
                    <img
                      src={`https://cdn2.softswiss.net/i/s2/${el[0]}.png`}
                      alt={el[0]}
                    />

                    <caption>
                      <p>{el[1].title}</p>
                    </caption>
                  </figure>
                </div>
              )
            })
          : 'Нет данных!'}
      </div>
      <button onClick={nextData}>Показать еще</button>
    </div>
  )
}

export default Main
