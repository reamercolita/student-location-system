import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'

function StudentAvatar({ student }) {
  return (
    <div
      className="d-flex align-items-center justify-content-center rounded-circle bg-slate-950 text-white fw-bold flex-shrink-0"
      style={{
        width: 38,
        height: 38,
        fontSize: 12,
      }}
    >
      {student.firstname
        .charAt(0)
        .toUpperCase()}

      {student.lastname
        .charAt(0)
        .toUpperCase()}
    </div>
  )
}

export default function StudentTable({
  students,
  onDelete,
}) {
  return (
    <Card className="border border-slate-200 shadow-sm rounded-4 overflow-hidden bg-white">

      <Card.Body className="p-0">

        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 p-4 border-bottom border-slate-200">

          <div>

            <div
              className="small fw-bold text-dark text-uppercase mb-1"
              style={{
                letterSpacing: '.08em',
              }}
            >
              Directory
            </div>

            <h2 className="h5 fw-bold text-slate-950 mb-0">
              Registered students
            </h2>

          </div>

          <Badge
            bg="light"
            text="dark"
            pill
            className="px-3 py-2 border border-slate-200 align-self-start align-self-md-center"
          >

            {students.length}{' '}

            {students.length === 1
              ? 'Student'
              : 'Students'}

          </Badge>

        </div>

        {students.length === 0 ? (

          <div className="text-center px-4 py-5 bg-slate-50">

            <h3 className="h6 fw-bold text-slate-900">
              Your student directory is empty
            </h3>

            <p className="text-slate-500 small mb-0">
              Complete the registration form above
              to add your first record.
            </p>

          </div>

        ) : (

          <div className="table-responsive">

            <Table
              hover
              align="middle"
              className="mb-0"
            >

              <thead>

                <tr className="bg-slate-50">

                  <th
                    className="px-4 py-3 border-bottom text-slate-500 small text-uppercase"
                    style={{
                      letterSpacing: '.06em',
                    }}
                  >
                    Student
                  </th>

                  <th
                    className="py-3 border-bottom text-slate-500 small text-uppercase"
                    style={{
                      letterSpacing: '.06em',
                    }}
                  >
                    Course
                  </th>

                  <th
                    className="py-3 border-bottom text-slate-500 small text-uppercase"
                    style={{
                      letterSpacing: '.06em',
                    }}
                  >
                    Email
                  </th>

                  <th
                    className="py-3 border-bottom text-slate-500 small text-uppercase"
                    style={{
                      letterSpacing: '.06em',
                    }}
                  >
                    Address
                  </th>

                  <th
                    className="py-3 border-bottom text-slate-500 small text-uppercase"
                    style={{
                      letterSpacing: '.06em',
                    }}
                  >
                    Coordinates
                  </th>

                  <th
                    className="px-4 py-3 border-bottom text-end text-slate-500 small text-uppercase"
                    style={{
                      letterSpacing: '.06em',
                    }}
                  >
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {students.map(
                  (student, index) => (

                    <tr key={student.id}>

                      {/* STUDENT */}
                      <td className="px-4 py-3 text-nowrap">

                        <div className="d-flex align-items-center gap-3">

                          <StudentAvatar
                            student={student}
                          />

                          <div>

                            <div className="fw-bold text-slate-900">

                              {student.firstname}{' '}
                              {student.lastname}

                            </div>

                            <div
                              className="text-slate-400"
                              style={{
                                fontSize: 12,
                              }}
                            >

                              Student #
                              {String(index + 1)
                                .padStart(2, '0')}

                            </div>

                          </div>

                        </div>

                      </td>

                      <td className="py-3">

                        <span className="badge rounded-pill bg-light text-dark border border-slate-200 px-3 py-2 fw-semibold">

                          {student.course}

                        </span>

                      </td>

                      <td className="py-3 text-slate-600 small">

                        {student.email}

                      </td>

                      <td
                        className="py-3 text-slate-600 small"
                        style={{
                          minWidth: 240,
                          maxWidth: 320,
                        }}
                      >

                        {student.address}

                      </td>

                      <td className="py-3 text-nowrap">

                        <span
                          className="rounded-2 bg-slate-100 px-2 py-1 font-monospace text-slate-500"
                          style={{
                            fontSize: 12,
                          }}
                        >

                          {student.lat.toFixed(5)},{' '}
                          {student.lng.toFixed(5)}

                        </span>

                      </td>

                      <td className="px-4 py-3 text-end">

                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="rounded-3 fw-semibold px-3"
                          onClick={() =>
                            onDelete(student.id)
                          }
                        >
                          Delete
                        </Button>

                      </td>

                    </tr>

                  ),
                )}

              </tbody>

            </Table>

          </div>

        )}

      </Card.Body>

    </Card>
  )
}