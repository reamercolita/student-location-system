import { useEffect } from 'react'
import L from 'leaflet'

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

const DEFAULT_CENTER = [
  14.5995,
  120.9842,
]

function MapUpdater({ students }) {
  const map = useMap()

  useEffect(() => {
    if (students.length === 0) {
      map.setView(
        DEFAULT_CENTER,
        11,
      )

      return
    }

    if (students.length === 1) {
      map.flyTo(
        [
          students[0].lat,
          students[0].lng,
        ],
        15,
        {
          duration: 0.8,
        },
      )

      return
    }

    const bounds = L.latLngBounds(
      students.map((student) => [
        student.lat,
        student.lng,
      ]),
    )

    map.fitBounds(bounds, {
      padding: [40, 40],
      maxZoom: 15,
    })

  }, [students, map])

  return null
}

export default function StudentMap({
  students,
}) {
  return (
    <div className="h-100 rounded-4 overflow-hidden border border-slate-200 bg-white shadow-sm d-flex flex-column">

      <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 p-4 border-bottom border-slate-200 bg-white">

        <div>

          <div
            className="small fw-bold text-dark text-uppercase mb-1"
            style={{
              letterSpacing: '.08em',
            }}
          >
            Live Map
          </div>

          <h2 className="h5 fw-bold text-slate-950 mb-0">
            Student locations
          </h2>

        </div>

        <span className="align-self-start align-self-sm-center rounded-pill bg-slate-100 text-slate-600 px-3 py-2 small fw-semibold border border-slate-200">

          {students.length}{' '}

          {students.length === 1
            ? 'marker'
            : 'markers'}

        </span>

      </div>

      <div className="position-relative flex-grow-1">

        {students.length === 0 && (

          <div
            className="position-absolute top-0 start-0 z-3 m-3 rounded-3 bg-white px-3 py-2 shadow-sm border border-slate-200 small text-slate-600"
            style={{
              maxWidth: 280,
            }}
          >

            <strong className="text-slate-900">
              No markers yet.
            </strong>{' '}

            Register a student to locate
            the submitted address.

          </div>

        )}

        <MapContainer
          center={DEFAULT_CENTER}
          zoom={11}
          scrollWheelZoom
          className="w-100"
          style={{
            minHeight: '535px',
            height: '100%',
          }}
        >

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapUpdater
            students={students}
          />

          {students.map((student) => (

            <Marker
              key={student.id}
              position={[
                student.lat,
                student.lng,
              ]}
            >

              <Popup minWidth={255}>

                <div className="p-1">

                  <div className="mb-3">

                    <h6 className="fw-bold mb-0">
                      {student.firstname}{' '}
                      {student.lastname}
                    </h6>

                    <span className="small text-secondary">
                      {student.course}
                    </span>

                  </div>

                  <div className="small mb-2">
                    <strong>
                      Email:
                    </strong>

                    <br />

                    {student.email}
                  </div>

                  <div className="small mb-2">

                    <strong>
                      Submitted address:
                    </strong>

                    <br />

                    {student.address}

                  </div>

                  <div className="rounded-2 bg-light p-2 small text-secondary font-monospace">

                    {student.lat.toFixed(5)},{' '}
                    {student.lng.toFixed(5)}

                  </div>

                </div>

              </Popup>

            </Marker>

          ))}

        </MapContainer>

      </div>

    </div>
  )
}