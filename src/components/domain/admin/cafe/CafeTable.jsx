import { useState } from 'react';
import { Card, Table } from 'react-bootstrap';
import { Star, Edit, Trash2, MapPin, Clock } from 'lucide-react';
import PaginationComponent from '../../../common/Pagination';

const ITEMS_PER_PAGE = 5;

const formatPrice = (price) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

const CafeTable = ({ cafesList, locationsList, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);


  const paginated = cafesList.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <>
      <Card className="modern-card no-lift border-0 shadow-sm rounded-4 overflow-hidden">
        <Card.Body className="p-0">
          <Table responsive className="mb-0 align-middle" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
            <thead>
              <tr style={{ backgroundColor: '#F7F3F0' }}>
                {['#', 'Cafe', 'Location', 'Price Range', 'Hours', 'Rating', 'Actions'].map(col => (
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
              {paginated.map((cafe, idx) => (
                <tr
                  key={cafe.id}
                  style={{ borderTop: '1px solid #F2EDE9', cursor: 'pointer' }}
                  className="cafe-row"
                >
                  <td className="px-4 py-3 fw-medium" style={{ color: '#BFA182', fontSize: '0.82rem' }}>
                    {String((currentPage - 1) * ITEMS_PER_PAGE + idx + 1).padStart(2, '0')}
                  </td>

                  <td className="py-3" style={{ minWidth: 220 }}>
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={cafe.image}
                        alt={cafe.name}
                        className="rounded-3 flex-shrink-0"
                        style={{
                          width: '48px',
                          height: '48px',
                          minWidth: '48px',
                          minHeight: '48px',
                          objectFit: 'cover',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                        }}
                      />
                      <div>
                        <span className="d-block fw-semibold text-dark" style={{ fontSize: '0.88rem' }}>{cafe.name}</span>
                        <span className="text-muted d-flex align-items-center gap-1 mt-1" style={{ fontSize: '0.76rem' }}>
                          <MapPin size={11} /> {cafe.address}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3">
                    <span className="px-3 py-1 rounded-pill fw-medium" style={{ backgroundColor: '#F0EBE6', color: '#7B5B3A', fontSize: '0.78rem' }}>
                      {locationsList?.find(l => l.id === cafe.locationId)?.name || 'Unknown'}
                    </span>
                  </td>

                  <td className="py-3">
                    <span className="fw-semibold" style={{ color: '#8B3A2A', fontSize: '0.83rem' }}>
                      {cafe.priceRange
                        ? `${formatPrice(cafe.priceRange.min)} – ${formatPrice(cafe.priceRange.max)}`
                        : '—'}
                    </span>
                  </td>

                  <td className="py-3">
                    <span className="text-muted d-flex align-items-center gap-1" style={{ fontSize: '0.82rem' }}>
                      <Clock size={12} /> {cafe.openHours || '—'}
                    </span>
                  </td>

                  <td className="py-3">
                    <span
                      className="d-inline-flex align-items-center gap-1 px-2 py-1 rounded-pill fw-semibold"
                      style={{ backgroundColor: '#FFF8E1', color: '#B7860B', fontSize: '0.82rem' }}
                    >
                      <Star size={12} fill="#F5A623" color="#F5A623" /> {cafe.rating}
                    </span>
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
                      onClick={() => onEdit(cafe)}
                      title="Edit cafe"
                    >
                      <Edit size={16} />
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
                      onClick={() => onDelete(cafe)}
                      title="Delete cafe"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}

              {cafesList.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-5 text-muted">
                    <div className="py-3">
                      <div className="mb-2" style={{ fontSize: '2rem' }}>☕</div>
                      No cafes found in the system.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Pagination */}
      <PaginationComponent
        currentPage={currentPage}
        ITEMS_PER_PAGE={ITEMS_PER_PAGE}
        itemList={cafesList}
        setCurrentPage={setCurrentPage}
      />

      <style>{`
        .no-lift:hover { transform: none !important; box-shadow: 0 10px 30px rgba(60,42,33,0.05) !important; }
        .cafe-row { transition: background-color 0.15s ease; }
        .cafe-row:hover td { background-color: #FDFAF8; }
      `}</style>
    </>
  );
};

export default CafeTable;
