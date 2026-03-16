import { Col, Form } from 'react-bootstrap'

const Filter = ({ locationFilter, setLocationFilter, locations, amenitiesFilter, toggleAmenity,
    getIcon, priceFilter, setPriceFilter, sortBy, setSortBy
}) => {

    const ALL_AMENITIES = ['Wifi 5G', 'Quiet Zone', 'Power Plugs', 'Air Con', 'Specialty Coffee', 'Garden', 'Parking', 'Group Tables', 'Lake View'];

    return (
        <Col lg={3} className="mb-4">
            <div className="bg-white p-4 rounded-4 shadow-sm border-0 sticky-top" style={{ top: '90px' }}>
                <h5 className="fw-bold mb-4" style={{ color: 'var(--primary-btn)' }}>Filter List</h5>

                {/* Area */}
                <Form.Group className="mb-4">
                    <Form.Label className="text-muted fw-semibold small text-uppercase">Area</Form.Label>
                    <div className="d-flex flex-column gap-2">
                        <Form.Check
                            type="radio"
                            id="district-all"
                            label="All Areas"
                            name="districtFilter"
                            checked={locationFilter === 'All'}
                            onChange={() => setLocationFilter('All')}
                            className="cursor-pointer"
                        />
                        {locations.map((loc) => (
                            <Form.Check
                                key={loc.id}
                                type="radio"
                                id={`district-${loc.id}`}
                                label={loc.name}
                                name="districtFilter"
                                checked={locationFilter === loc.id}
                                onChange={() => setLocationFilter(loc.id)}
                                className="cursor-pointer"
                            />
                        ))}
                    </div>
                </Form.Group>

                {/* Amenities */}
                <Form.Group className="mb-4">
                    <Form.Label className="text-muted fw-semibold small text-uppercase">Amenities</Form.Label>
                    <div className="d-flex flex-wrap gap-2">
                        {ALL_AMENITIES.map((amenity) => (
                            <button
                                key={amenity}
                                type="button"
                                className={`modern-badge border-0 ${amenitiesFilter.includes(amenity) ? 'text-white' : ''}`}
                                style={amenitiesFilter.includes(amenity) ? { backgroundColor: 'var(--primary-btn)' } : {}}
                                onClick={() => toggleAmenity(amenity)}
                            >
                                {getIcon(amenity)} {amenity}
                            </button>
                        ))}
                    </div>
                </Form.Group>

                {/* Price Range */}
                <Form.Group className="mb-4">
                    <Form.Label className="text-muted fw-semibold small text-uppercase">Price Range</Form.Label>
                    <Form.Select
                        className="rounded-pill shadow-none border-1"
                        value={priceFilter}
                        onChange={(e) => setPriceFilter(e.target.value)}
                    >
                        <option value="All">All Prices</option>
                        <option value="Under50k">Under 50,000đ</option>
                        <option value="50k-100k">50,000đ - 100,000đ</option>
                        <option value="Over100k">Over 100,000đ</option>
                    </Form.Select>
                </Form.Group>

                {/* Sort By */}
                <Form.Group>
                    <Form.Label className="text-muted fw-semibold small text-uppercase">Sort By</Form.Label>
                    <Form.Select
                        className="rounded-pill shadow-none border-1"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="ratingDesc">Highest Rated</option>
                        <option value="ratingAsc">Lowest Rated</option>
                    </Form.Select>
                </Form.Group>
            </div>
        </Col>
    )
}

export default Filter
