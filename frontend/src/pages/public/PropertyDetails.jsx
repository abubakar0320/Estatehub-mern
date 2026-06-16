import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  FaLocationDot, FaBed, FaBath, FaKitchenSet, FaVectorSquare, 
  FaCalendarDays, FaEye, FaTag, FaCheck, FaPhone, FaEnvelope, 
  FaUserTie, FaChevronRight, FaArrowLeft, FaHeart
} from 'react-icons/fa6';
import AOS from 'aos';
import api from '../../services/api';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarProperties, setSimilarProperties] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    window.scrollTo(0, 0);
    fetchPropertyDetails();
  }, [id]);

  const fetchPropertyDetails = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/properties/${id}`);
      setProperty(response.data);
      fetchSimilar(response.data.category_id?._id || response.data.category_id);
    } catch (error) {
      console.error('Error fetching property dossier:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilar = async (categoryId) => {
    try {
      const response = await api.get(`/properties?category_id=${categoryId}`);
      setSimilarProperties(response.data.filter(p => (p.id || p._id) !== id).slice(0, 3));
    } catch (error) {
      console.error('Error fetching similar assets:', error);
    }
  };

  const getImageUrl = (path) => {
    if (!path) return 'https://via.placeholder.com/1200x800?text=Property+Asset';
    if (path.startsWith('http')) return path;
    const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5000';
    return `${baseUrl}/${path}`;
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-white">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container py-5 text-center">
        <h2 className="fw-bold">Asset Not Found</h2>
        <p className="text-muted">The requested property record is no longer available in the network.</p>
        <Link to="/properties" className="btn btn-primary rounded-pill px-5">Return to Inventory</Link>
      </div>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": property.title,
    "description": property.description,
    "url": window.location.href,
    "image": getImageUrl(property.main_image),
    "price": property.price,
    "priceCurrency": "PKR",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": property.location_area,
      "addressRegion": property.city,
      "addressCountry": "PK"
    }
  };

  return (
    <div className="property-details-page bg-light min-vh-100 pb-5">
      <style>{`
        @media (max-width: 768px) {
          .display-4 { font-size: 2.2rem !important; }
          .property-details-page section:first-of-type { height: 50vh !important; }
          .fw-extrabold { font-size: 1.5rem !important; }
          .p-5 { padding: 25px !important; }
          .sticky-top { position: relative !important; top: 0 !important; margin-top: 30px; }
          .row.g-5 { --bs-gutter-y: 2rem !important; }
        }
        @media (max-width: 576px) {
          .display-4 { font-size: 1.8rem !important; }
          .btn-glass { padding: 8px 16px !important; font-size: 0.8rem !important; }
          .badge { font-size: 0.7rem !important; }
        }
      `}</style>
      <Helmet>
        <title>{`${property.title} | EstateHub`}</title>
        <meta name="description" content={`${property.title} - ${property.bedrooms} Bed ${property.type} in ${property.location_area}, ${property.city}. Price: Rs. ${property.price?.toLocaleString()}. View more details on EstateHub.`} />
        <link rel="canonical" href={`https://estatehub.site/properties/${id}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${property.title} | EstateHub`} />
        <meta property="og:description" content={`${property.bedrooms} Bed ${property.type} in ${property.location_area}, ${property.city}. Rs. ${property.price?.toLocaleString()}.`} />
        <meta property="og:image" content={getImageUrl(property.main_image)} />
        <meta property="og:type" content="website" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* Dynamic Header */}
      <section className="position-relative text-white overflow-hidden" style={{ height: '60vh' }}>
        <img src={getImageUrl(property.main_image)} className="w-100 h-100 object-fit-cover position-absolute top-0 start-0" alt={property.title} />
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, transparent 60%)' }}></div>
        <div className="container h-100 d-flex align-items-end pb-5 position-relative">
          <div className="w-100" data-aos="fade-up">
            <Link to="/properties" className="btn btn-glass btn-sm rounded-pill px-3 mb-4 text-white border-white border-opacity-25">
              <FaArrowLeft className="me-2" /> Back to Search
            </Link>
            <div className="d-flex justify-content-between align-items-end flex-wrap gap-4">
              <div>
                <span className="badge bg-primary text-white rounded-pill px-3 py-2 mb-3 fw-bold shadow-sm">FOR {property.type?.toUpperCase()}</span>
                <h1 className="display-4 fw-bold mb-2">{property.title}</h1>
                <p className="lead mb-0 opacity-75"><FaLocationDot className="text-warning me-2" />{property.location_area}, {property.city}</p>
              </div>
              <div className="text-md-end">
                <h2 className="fw-extrabold text-warning mb-1">Rs. {property.price?.toLocaleString()}</h2>
                <span className="badge bg-white bg-opacity-20 rounded-pill px-3 py-2 small border border-white border-opacity-25">ID: {property.property_code || 'EST-9902'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mt-5">
        <div className="row g-5">
          <div className="col-lg-8">
            {/* Gallery Section */}
            <div className="card border-0 shadow-sm rounded-5 p-2 bg-white mb-5" data-aos="fade-up">
              <div className="row g-2">
                <div className="col-12">
                   <img src={getImageUrl(property.main_image)} className="rounded-5 w-100 shadow-sm" style={{ height: '450px', objectFit: 'cover' }} alt="Asset" />
                </div>
                {property.gallery && property.gallery.length > 0 && property.gallery.map((img, i) => (
                  <div className="col-3" key={i}>
                    <img src={getImageUrl(img)} className="rounded-4 w-100 shadow-sm h-100" style={{ height: '100px', objectFit: 'cover', cursor: 'pointer' }} alt="Gallery" />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Intel Bar */}
            <div className="row g-3 mb-5" data-aos="fade-up">
              {[
                { label: 'Bedrooms', val: property.bedrooms, icon: <FaBed /> },
                { label: 'Bathrooms', val: property.bathrooms, icon: <FaBath /> },
                { label: 'Kitchens', val: property.kitchens || 1, icon: <FaKitchenSet /> },
                { label: 'Area', val: `${property.area_size} ${property.area_unit || 'Sq Ft'}`, icon: <FaVectorSquare /> }
              ].map((intel, i) => (
                <div className="col-6 col-md-3" key={i}>
                  <div className="card border-0 shadow-sm rounded-4 text-center p-3 h-100 bg-white hover-shadow transition-all">
                    <div className="text-primary mb-2 fs-4">{intel.icon}</div>
                    <h6 className="fw-bold mb-1">{intel.val}</h6>
                    <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '0.6rem' }}>{intel.label}</small>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="card border-0 shadow-sm rounded-5 p-5 bg-white mb-5" data-aos="fade-up">
              <h4 className="fw-bold mb-4 text-dark border-start border-4 border-primary ps-3">Asset Intelligence</h4>
              <p className="text-muted lh-lg fs-5 mb-4">{property.description || 'Professional real estate asset details pending verification. This property represents a premium investment opportunity within the selected region.'}</p>
              
              <div className="row g-4 mt-2">
                <div className="col-md-6">
                  <h6 className="fw-bold mb-3">Key Features</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {(property.features && property.features.length > 0 ? property.features : ['Smart Home', 'Power Backup', 'Water Filtration']).map((f, i) => (
                      <span key={i} className="badge bg-light text-dark rounded-pill px-3 py-2 border shadow-sm small fw-bold">
                        <FaCheck className="text-success me-2" /> {f}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="col-md-6">
                  <h6 className="fw-bold mb-3">Elite Amenities</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {(property.amenities && property.amenities.length > 0 ? property.amenities : ['Gymnasium', 'Concierge', 'High-Speed Elevators']).map((a, i) => (
                      <span key={i} className="badge bg-light text-primary rounded-pill px-3 py-2 border shadow-sm small fw-bold">
                        <FaCheck className="me-2" /> {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            {/* Agent Sidebar Card */}
            <div className="card border-0 shadow-lg rounded-5 p-4 bg-white sticky-top" style={{ top: '100px', zIndex: 10 }}>
              <div className="text-center mb-4">
                <div className="position-relative d-inline-block mb-3">
                  <img src={getImageUrl(property.agent_image)} className="rounded-circle border border-4 border-light shadow" width="100" height="100" style={{ objectFit: 'cover' }} alt="Agent" />
                  <span className="position-absolute bottom-0 end-0 bg-success border border-2 border-white rounded-circle p-2 shadow-sm"></span>
                </div>
                <h5 className="fw-bold mb-1">{property.agent_name || 'System Specialist'}</h5>
                <p className="text-primary small fw-bold text-uppercase mb-3"><FaUserTie className="me-1" /> Verified Partner</p>
                <div className="d-flex justify-content-center gap-2 mb-4">
                  <div className="badge bg-light text-dark rounded-pill px-3 py-2 border small fw-bold">
                    <FaEnvelope className="text-primary me-2" /> Email Identity
                  </div>
                </div>
              </div>

              <div className="d-grid gap-2">
                <button className="btn btn-dark rounded-pill py-3 fw-bold shadow-sm border-0 d-flex align-items-center justify-content-center">
                  <FaPhone className="me-2" /> {property.agent_phone || 'Protocol Secured'}
                </button>
                <button className="btn btn-primary rounded-pill py-3 fw-bold shadow-lg border-0">
                  Initiate Booking
                </button>
              </div>

              <hr className="my-4 opacity-50" />
              
              <div className="bg-light rounded-4 p-4 mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="small text-muted fw-bold">Network Views</span>
                  <span className="badge bg-white text-primary border rounded-pill px-2">{property.views_count || 150}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="small text-muted fw-bold">Last Synchronized</span>
                  <span className="small text-dark fw-bold">Today</span>
                </div>
              </div>

              <button className="btn btn-outline-danger w-100 rounded-pill py-2 fw-bold small">
                <FaHeart className="me-2" /> Save to Favorites
              </button>
            </div>
          </div>
        </div>

        {/* Similar Assets */}
        {similarProperties.length > 0 && (
          <div className="mt-5 pt-5 border-top" data-aos="fade-up">
            <div className="d-flex justify-content-between align-items-end mb-5">
              <div>
                <span className="text-primary fw-bold small text-uppercase tracking-widest">Recommended Portfolio</span>
                <h3 className="fw-bold display-6 mt-2">Similar Assets</h3>
              </div>
              <Link to="/properties" className="btn btn-light rounded-pill px-4 border fw-bold">Explore More</Link>
            </div>
            <div className="row g-4">
              {similarProperties.map((p) => (
                <div className="col-md-4" key={p.id || p._id}>
                  <div className="property-card h-100 shadow-sm border-0 bg-white rounded-4 overflow-hidden hover-shadow transition-all">
                    <div className="position-relative" style={{ height: '200px' }}>
                      <img src={getImageUrl(p.main_image || p.image)} className="w-100 h-100 object-fit-cover" alt="Sim" />
                      <span className="position-absolute top-0 start-0 m-3 badge bg-primary text-white shadow-sm fw-bold px-3 py-2">FOR {p.type.toUpperCase()}</span>
                    </div>
                    <div className="card-body p-4">
                      <h6 className="fw-bold text-truncate mb-1">{p.title}</h6>
                      <p className="text-muted small mb-3"><FaLocationDot className="me-1" /> {p.city}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-bold text-primary">Rs. {p.price?.toLocaleString()}</span>
                        <Link to={`/properties/${p.id || p._id}`} className="btn btn-dark btn-sm rounded-pill px-3 shadow-sm">Details</Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;
