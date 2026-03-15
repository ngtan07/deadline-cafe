import { useState } from 'react';
import { Card, Table, Pagination } from 'react-bootstrap';
import { Eye, Ban, Mail, Shield, User } from 'lucide-react';

const ITEMS_PER_PAGE = 5;

const UserTable = ({ usersList, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const usersLength = usersList?.length || 0;
  const totalPages = Math.ceil(usersLength / ITEMS_PER_PAGE);
  const paginated = (usersList || []).slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <>
      <Card className="modern-card no-lift border-0 shadow-sm rounded-4 overflow-hidden">
        <Card.Body className="p-0">
          <Table responsive className="mb-0 align-middle" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
            <thead>
              <tr style={{ backgroundColor: '#F7F3F0' }}>
                {['#', 'User', 'Email', 'Role', 'Actions'].map(col => (
                  <th
                    key={col}
                    className={`border-0 fw-semibold py-3 ${col === '#' ? 'px-4' : ''} ${col === 'Actions' ? 'text-end px-4' : ''}`}
                    style={{ color: '#8A7365', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((user, idx) => (
                <tr
                  key={user.id}
                  style={{ borderTop: '1px solid #F2EDE9', cursor: 'pointer' }}
                  className="user-row"
                >
                  <td className="px-4 py-3 fw-medium" style={{ color: '#BFA182', fontSize: '0.82rem' }}>
                    {String((currentPage - 1) * ITEMS_PER_PAGE + idx + 1).padStart(2, '0')}
                  </td>

                  <td className="py-3" style={{ minWidth: 220 }}>
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={user.avatar || `https://i.pravatar.cc/150?u=${user.id}`}
                        alt={user.name}
                        className="rounded-circle flex-shrink-0"
                        style={{
                          width: '42px',
                          height: '42px',
                          minWidth: '42px',
                          minHeight: '42px',
                          objectFit: 'cover',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                        }}
                      />
                      <div>
                        <span className="d-block fw-semibold text-dark" style={{ fontSize: '0.88rem' }}>
                          {user.name || 'Anonymous User'}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3">
                    <span className="text-muted d-flex align-items-center gap-2" style={{ fontSize: '0.82rem' }}>
                      <Mail size={13} style={{ color: '#8A7365' }} /> {user.email || 'No email provided'}
                    </span>
                  </td>

                  <td className="py-3">
                    {user.role === 'admin' ? (
                      <span
                        className="d-inline-flex align-items-center gap-1 px-3 py-1 rounded-pill fw-semibold"
                        style={{ backgroundColor: '#EBF3FF', color: '#2A72EA', fontSize: '0.78rem' }}
                      >
                        <Shield size={12} strokeWidth={2.5} /> Admin
                      </span>
                    ) : (
                      <span
                        className="d-inline-flex align-items-center gap-1 px-3 py-1 rounded-pill fw-semibold"
                        style={{ backgroundColor: '#F0EBE6', color: '#7B5B3A', fontSize: '0.78rem' }}
                      >
                        <User size={12} strokeWidth={2.5} /> Regular User
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-4 text-end">
                    <button
                      className="btn btn-sm me-2 rounded-circle d-inline-flex align-items-center justify-content-center"
                      style={{
                        backgroundColor: '#EDF2FF',
                        color: '#3B6FD4',
                        border: 'none',
                        width: '32px',
                        height: '32px'
                      }}
                      onClick={() => onEdit(user)}
                      title="View user details"
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      className="btn btn-sm rounded-circle d-inline-flex align-items-center justify-content-center"
                      style={{
                        backgroundColor: '#FFF0F0',
                        color: '#D94040',
                        border: 'none',
                        width: '32px',
                        height: '32px'
                      }}
                      onClick={() => onDelete(user)}
                      title="Ban user"
                    >
                      <Ban size={16} />
                    </button>
                  </td>
                </tr>
              ))}

              {usersLength === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted">
                    <div className="py-3">
                      <div className="mb-2" style={{ fontSize: '2rem' }}>👤</div>
                      No users found in the system.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-3 px-1">
          <span className="text-muted small">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, usersLength)} of {usersLength} users
          </span>
          <Pagination className="mb-0" size="sm">
            <Pagination.Prev
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            />
            {Array.from({ length: totalPages }, (_, i) => (
              <Pagination.Item
                key={i + 1}
                active={currentPage === i + 1}
                onClick={() => setCurrentPage(i + 1)}
                style={currentPage === i + 1 ? { '--bs-pagination-active-bg': '#8B3A2A', '--bs-pagination-active-border-color': '#8B3A2A' } : {}}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      )}

      <style>{`
        .no-lift:hover { transform: none !important; box-shadow: 0 10px 30px rgba(60,42,33,0.05) !important; }
        .user-row { transition: background-color 0.15s ease; }
        .user-row:hover td { background-color: #FDFAF8; }
      `}</style>
    </>
  );
};

export default UserTable;
