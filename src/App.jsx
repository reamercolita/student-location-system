import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import StudentForm from './components/StudentForm'
import StudentMap from './components/StudentMap'
import StudentTable from './components/StudentTable'

function StatCard({ value, label, note }) {
  return (
    <div className="h-100 rounded-4 border border-slate-200 bg-white p-3 p-lg-4 shadow-sm">
      <div>
        <div className="text-2xl fw-bold text-slate-950">
          {value}
        </div>

        <div className="small fw-semibold text-slate-700 mt-1">
          {label}
        </div>

        <div
          className="text-slate-400 mt-1"
          style={{ fontSize: 12 }}
        >
          {note}
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [students, setStudents] = useState([])

  const registerStudent = (student) => {
    setStudents((current) => [...current, student])
  }

  const deleteStudent = (studentId) => {
    setStudents((current) =>
      current.filter((student) => student.id !== studentId),
    )
  }

  return (
    <div className="min-vh-100 bg-slate-50 text-slate-900">

      <header className="sticky-top border-bottom border-slate-200 bg-white shadow-sm">
        <Container className="py-3 d-flex align-items-center justify-content-between gap-3">

          <div>
            <div className="d-flex align-items-center gap-2">
              <h1 className="h5 fw-bold mb-0 text-slate-950">
                Student Locator
              </h1>

              <span className="badge rounded-pill bg-slate-100 text-slate-600 border border-slate-200 d-none d-sm-inline-block">
                SLS
              </span>
            </div>

            <p className="small text-slate-500 mb-0 d-none d-sm-block">
              Student Location Management System
            </p>
          </div>

          <div className="d-flex align-items-center gap-2">
            <span className="d-none d-md-inline-flex align-items-center gap-2 rounded-pill border border-slate-200 bg-slate-50 px-3 py-2 small fw-semibold text-slate-600">
              <span
                className="rounded-circle bg-success"
                style={{ width: 7, height: 7 }}
              />

              System Ready
            </span>

            <span className="badge rounded-pill bg-dark px-3 py-2">
              React + Leaflet
            </span>
          </div>

        </Container>
      </header>

      <main>

        <section className="position-relative overflow-hidden border-bottom border-slate-200 bg-white">

          <div
            className="position-absolute top-0 end-0 translate-middle-y rounded-circle bg-slate-100 opacity-75"
            style={{
              width: 420,
              height: 420,
              marginRight: '-120px',
            }}
          />

          <Container className="position-relative py-5">

            <div className="row align-items-center g-4">

              <div className="col-lg-7">

                <div className="d-inline-flex align-items-center gap-2 rounded-pill border border-slate-200 bg-slate-50 px-3 py-2 small fw-semibold text-slate-700 mb-3">

                  <span
                    className="rounded-circle bg-dark"
                    style={{ width: 7, height: 7 }}
                  />

                  Live student mapping dashboard

                </div>

                <h2
                  className="display-5 fw-bold text-slate-950 mb-3"
                  style={{ letterSpacing: '-0.035em' }}
                >
                  Register students.
                  <br className="d-none d-md-block" />
                  See where they are on the map.
                </h2>

                <p
                  className="lead text-slate-500 mb-4"
                  style={{ maxWidth: 700 }}
                >
                  A simple student location system that registers student information, identifies submitted addresses on the map, and keeps all records organized and updated.

                </p>

                <div className="d-flex flex-wrap gap-2">

                  {[
                    'Validated registration',
                    'Address geocoding',
                    'Interactive markers',
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-pill border border-slate-200 bg-white px-3 py-2 small fw-semibold text-slate-600 shadow-sm"
                    >
                      {item}
                    </span>
                  ))}

                </div>

              </div>

              <div className="col-lg-5">

                <div className="row g-3">

                  <div className="col-6">
                    <StatCard
                      value={students.length}
                      label="Registered"
                      note="Student records"
                    />
                  </div>

                  <div className="col-6">
                    <StatCard
                      value={students.length}
                      label="Map Markers"
                      note="Active locations"
                    />
                  </div>

                  <div className="col-12">

                    <div className="rounded-4 bg-slate-950 text-white p-4 shadow-sm">

                      <div>
                        <div className="small text-slate-400 mb-1">
                          DATA STATUS
                        </div>

                        <div className="fw-bold">
                          Map and table are synchronized
                        </div>
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </Container>

        </section>

        <Container className="py-4 py-lg-5">

          <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-between gap-2 mb-4">

            <div>

              <div
                className="small fw-bold text-dark text-uppercase mb-1"
                style={{ letterSpacing: '.08em' }}
              >
                Workspace
              </div>

              <h3 className="h4 fw-bold text-slate-950 mb-1">
                Student registration & map
              </h3>

              <p className="small text-slate-500 mb-0">
                Add a record on the left and verify its location on the map.
              </p>

            </div>

            <span className="small text-slate-400">
              Map data © OpenStreetMap contributors
            </span>

          </div>

          <div className="row g-4 align-items-stretch mb-4">

            <div className="col-xl-5">
              <StudentForm onRegister={registerStudent} />
            </div>

            <div className="col-xl-7">
              <StudentMap students={students} />
            </div>

          </div>

          <StudentTable
            students={students}
            onDelete={deleteStudent}
          />

          <footer className="d-flex flex-column flex-sm-row align-items-center justify-content-between gap-2 py-4 text-slate-400 small">

            <span>
              Student Locator System
            </span>

            <span>
              Built with React, Bootstrap, Tailwind CSS & Leaflet
            </span>

          </footer>

        </Container>

      </main>

    </div>
  )
}