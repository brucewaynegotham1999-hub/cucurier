import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FiArrowLeft, FiAlertTriangle, FiHelpCircle, FiUser, FiMapPin, FiPhone, FiUserCheck, FiTruck, FiBox } from 'react-icons/fi';

// Fix for default marker icon in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const STANDARD_FLOW = [
  { id: 'order_placed', label: 'Order Placed' },
  { id: 'left_warehouse', label: 'Left Warehouse' },
  { id: 'arrived_at_office', label: 'Arrived at Office' },
  { id: 'in_transit', label: 'In Transit' },
  { id: 'arrived_at_fulfilment_center', label: 'Arrived at Fulfilment Center' },
  { id: 'out_for_delivery', label: 'Out for Delivery' },
  { id: 'delivered', label: 'Delivered' }
];

export default function PackageDetailsPage() {
  const { trackingNumber } = useParams();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`https://oceanicdeliverydumbbackend.vercel.app/api/track/${trackingNumber}/`);
        setPkg(response.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError("Package not found. Please double-check the tracking number.");
        } else {
          setError("Unable to connect to tracing servers. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (trackingNumber) {
      fetchPackage();
    }
  }, [trackingNumber]);

  // Construct UI Timeline
  let uiTimeline = [];
  let isErrorState = false;

  if (pkg) {
    isErrorState = pkg.current_status === 'on_hold' || pkg.current_status === 'seized';

    // 1. Add actual recorded events
    pkg.timeline.forEach((event, idx) => {
      uiTimeline.push({
        ...event,
        isCompleted: true,
        isCurrent: idx === pkg.timeline.length - 1,
        isError: (idx === pkg.timeline.length - 1) && isErrorState
      });
    });

    // 2. Add remaining future steps from STANDARD_FLOW if not in error state
    if (!isErrorState && pkg.current_status !== 'delivered') {
      const lastCompletedStatus = pkg.timeline.length > 0 ? pkg.timeline[pkg.timeline.length - 1].status : null;
      let startIndex = STANDARD_FLOW.findIndex(s => s.id === lastCompletedStatus) + 1;

      if (startIndex <= 0) startIndex = 1;

      for (let i = startIndex; i < STANDARD_FLOW.length; i++) {
        uiTimeline.push({
          id: `future-${STANDARD_FLOW[i].id}`,
          status: STANDARD_FLOW[i].id,
          status_display: STANDARD_FLOW[i].label,
          location: 'Pending',
          timestamp: null,
          notes: '',
          isCompleted: false,
          isCurrent: false,
          isError: false
        });
      }
    }
  }

  // Calculate map center and marker position
  let mapCenter = [20, 0]; // Default world view
  let hasCoords = false;

  if (pkg && pkg.timeline && pkg.timeline.length > 0) {
    const latestWithCoords = [...pkg.timeline].reverse().find(event => event.latitude && event.longitude);
    if (latestWithCoords) {
      mapCenter = [latestWithCoords.latitude, latestWithCoords.longitude];
      hasCoords = true;
    }
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4" data-aos="fade-down">
          <div>
            <Link to="/" className="text-primary-600 font-medium hover:text-primary-700 flex items-center gap-1 mb-4 text-sm">
              <FiArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 flex items-center gap-3">
              Shipment Tracking
            </h1>
            <p className="text-slate-500 mt-2 font-mono text-lg tracking-wider">#{trackingNumber}</p>
          </div>

          {pkg && !error && (
            <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold ring-1 shadow-md self-start md:self-auto ${isErrorState ? 'bg-red-100/80 text-red-700 ring-red-600/30' : 'bg-green-100/80 text-green-700 ring-green-600/30'}`}>
              <span className={`w-3 h-3 rounded-full animate-pulse ${isErrorState ? 'bg-red-500' : 'bg-green-500'}`}></span>
              {pkg.current_status_display}
            </div>
          )}
        </div>

        {loading ? (
          <div className="bg-white rounded-3xl p-12 shadow-sm border border-slate-100 flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-primary-600 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 font-medium">Locating your shipment in our global database...</p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-3xl p-12 shadow-sm border border-slate-100 text-center min-h-[400px] flex flex-col justify-center items-center" data-aos="zoom-in">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <FiAlertTriangle className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Tracking Error</h2>
            <p className="text-slate-600 mb-8 max-w-lg">{error}</p>
            <Link to="/" className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">
              Try Another Number
            </Link>
          </div>
        ) : pkg ? (
          <div className="space-y-8">

            {/* Top Stats: Package Details Card */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 relative overflow-hidden" data-aos="fade-up">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Origin</span>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 text-xl">
                      <FiMapPin />
                    </div>
                    <div>
                      <span className="block font-bold text-slate-900 text-lg leading-tight">{pkg.origin}</span>
                      <span className="text-xs text-slate-400">Dispatch Port</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Destination</span>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600 text-xl">
                      <FiMapPin />
                    </div>
                    <div>
                      <span className="block font-bold text-slate-900 text-lg leading-tight">{pkg.destination}</span>
                      <span className="text-xs text-slate-400">Final Destination</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Weight</span>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 text-xl">
                      <FiTruck />
                    </div>
                    <div>
                      <span className="block font-bold text-slate-900 text-lg leading-tight">{pkg.weight ? `${pkg.weight} kg` : '--'}</span>
                      <span className="text-xs text-slate-400">Total Mass</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Description</span>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 text-xl">
                      <FiBox />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block font-bold text-slate-900 text-lg leading-tight truncate">{pkg.description || 'General Cargo'}</span>
                      <span className="text-xs text-slate-400">Package Contents</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Left Column: Vertical Timeline & Map */}
              <div className="lg:col-span-2 space-y-8">

                {/* Vertical Timeline */}
                <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-100 overflow-hidden relative" data-aos="fade-up">
                  <h2 className="text-xl font-heading font-bold text-slate-900 mb-8">Delivery Progress</h2>

                  <div className="relative pl-6 md:pl-8">
                    {/* The Background Grey Line */}
                    <div className="absolute top-[20px] bottom-[20px] left-[39px] md:left-[47px] w-1.5 bg-slate-100 rounded-full"></div>

                    {/* The Blue Progress Line */}
                    {pkg.timeline.length > 1 && (
                      <div
                        className={`absolute top-[20px] left-[39px] md:left-[47px] w-1.5 rounded-full transition-all duration-1000 ${isErrorState ? 'bg-red-500' : 'bg-primary-500'}`}
                        style={{
                          height: `calc(${(pkg.timeline.length - 1) / (uiTimeline.length - 1) * 100}% - 40px)`,
                          maxHeight: '100%'
                        }}
                      ></div>
                    )}

                    <div className="space-y-12 relative z-10 w-full">
                      {uiTimeline.map((item, idx) => {
                        const date = item.timestamp ? new Date(item.timestamp) : null;

                        return (
                          <div key={item.id} className="relative flex items-start group">

                            {/* Circle Dot */}
                            <div className={`mt-1 h-6 w-6 md:h-7 md:w-7 rounded-full border-[5px] shadow-sm flex-shrink-0 relative z-10 flex items-center justify-center bg-white transition-colors duration-300
                              ${item.isError ? 'border-red-500' :
                                item.isCurrent && !isErrorState ? 'border-primary-600' :
                                  item.isCompleted ? 'border-primary-500' : 'border-slate-200'}
                            `}>
                              {item.isError && <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></div>}
                              {item.isCurrent && !isErrorState && <div className="w-2.5 h-2.5 rounded-full bg-primary-600 animate-ping"></div>}
                            </div>

                            {/* Content */}
                            <div className="ml-8 flex-grow pb-1">
                              <h4 className={`font-bold tracking-tight text-xl mb-1
                                ${item.isError ? 'text-red-600' :
                                  item.isCompleted ? 'text-slate-900' : 'text-slate-400'}
                              `}>{item.status_display}</h4>

                              <p className={`text-base mb-1 font-medium ${item.isCompleted ? 'text-slate-600' : 'text-slate-400'}`}>
                                {item.location}
                              </p>

                              {date && (
                                <p className="text-sm text-slate-400 font-mono tracking-wide">
                                  {date.toLocaleDateString()} at {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                              )}

                              {item.notes && item.isCompleted && (
                                <div className={`mt-4 p-4 rounded-2xl border text-sm italic leading-relaxed
                                  ${item.isError ? 'bg-red-50 border-red-100 text-red-700' : 'bg-slate-50 border-slate-100 text-slate-600'}
                                `}>
                                  {item.notes}
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Map View */}
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100" data-aos="fade-up" data-aos-delay="100">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-heading font-bold text-slate-900">Live Location Map</h2>
                    {hasCoords ? (
                      <span className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-full font-bold flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                        GPS ACTIVE
                      </span>
                    ) : (
                      <span className="text-xs bg-slate-100 text-slate-500 px-3 py-1.5 rounded-full font-bold">
                        LOCATION ESTIMATED
                      </span>
                    )}
                  </div>

                  <div className="w-full h-[400px] bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 relative">
                    {!hasCoords && (
                      <div className="absolute inset-0 z-10 bg-slate-900/10 backdrop-blur-[2px] flex items-center justify-center p-6 text-center">
                        <div className="bg-white/90 p-4 rounded-xl shadow-lg max-w-xs">
                          <p className="text-sm font-medium text-slate-700">Waiting for next GPS ping from carrier...</p>
                        </div>
                      </div>
                    )}

                    <MapContainer key={`${mapCenter[0]}-${mapCenter[1]}`} center={mapCenter} zoom={hasCoords ? 12 : 3} scrollWheelZoom={false} className="w-full h-full">
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      {hasCoords && (
                        <Marker position={mapCenter}>
                          <Popup>
                            <div className="text-center p-1">
                              <strong className="text-primary-600 uppercase text-[10px] tracking-widest">{pkg.current_status_display}</strong>
                              <p className="text-slate-900 font-bold m-0 mt-1 text-sm">{pkg.timeline[pkg.timeline.length - 1].location}</p>
                              <p className="text-slate-500 text-[10px] m-0 font-mono mt-1">LAT: {mapCenter[0].toFixed(4)}, LNG: {mapCenter[1].toFixed(4)}</p>
                            </div>
                          </Popup>
                        </Marker>
                      )}
                    </MapContainer>
                  </div>
                </div>
              </div>

              {/* Right Column: People & Help */}
              <div className="space-y-6">

                {/* Help box */}
                <div
                  className={`rounded-3xl p-8 border text-center relative overflow-hidden transition-all duration-300 ${isErrorState
                    ? 'bg-red-50 border-red-200 shadow-[0_0_30px_rgba(239,68,68,0.3)] animate-pulse'
                    : 'bg-primary-50 border-primary-100 shadow-sm'
                    }`}
                  data-aos="fade-left"
                >
                  {isErrorState && <div className="absolute inset-0 bg-red-500 opacity-5"></div>}
                  <div className={`mx-auto mb-4 relative z-10 flex justify-center text-5xl ${isErrorState ? 'text-red-500' : 'text-primary-400'}`}>
                    {isErrorState ? <FiAlertTriangle /> : <FiHelpCircle />}
                  </div>
                  <h4 className={`font-bold relative z-10 mb-2 ${isErrorState ? 'text-red-900 text-xl' : 'text-primary-900 text-lg'}`}>
                    {isErrorState ? 'URGENT: Action Required' : 'Need help?'}
                  </h4>
                  <p className={`text-sm relative z-10 mb-8 leading-relaxed ${isErrorState ? 'text-red-700 font-medium' : 'text-primary-700'}`}>
                    {isErrorState ? 'There is a critical issue with your package. Please contact support immediately.' : 'Contact our support team referencing your tracking number for priority assistance.'}
                  </p>
                  <Link
                    to="/contact"
                    className={`relative z-10 inline-flex items-center justify-center w-full px-4 py-4 rounded-2xl font-bold transition-all shadow-md
                      ${isErrorState ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-500/30' : 'bg-primary-600 text-white hover:bg-primary-500'}
                    `}
                  >
                    Contact Support →
                  </Link>
                </div>

                {/* Sender Card */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100" data-aos="fade-left" data-aos-delay="100">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <FiUser className="w-4 h-4" />
                    Sender Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-bold text-slate-900 text-lg">{pkg.sender_details?.name}</p>
                      <p className="text-xs text-slate-400 font-medium">Verified Merchant</p>
                    </div>
                    {(pkg.sender_details?.address || pkg.sender_details?.city || pkg.sender_details?.country) && (
                      <div className="flex items-start gap-3 text-slate-600">
                        <FiMapPin className="w-5 h-5 mt-0.5 shrink-0 text-slate-300" />
                        <p className="text-sm leading-relaxed">{pkg.sender_details?.address} <br /> {pkg.sender_details?.city}, {pkg.sender_details?.country}</p>
                      </div>
                    )}
                    {pkg.sender_details?.phone && (
                      <div className="flex items-center gap-3 text-slate-600">
                        <FiPhone className="w-5 h-5 shrink-0 text-slate-300" />
                        <span className="text-sm font-medium">{pkg.sender_details?.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Receiver Card */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100" data-aos="fade-left" data-aos-delay="200">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <FiUserCheck className="w-4 h-4" />
                    Receiver Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-bold text-slate-900 text-lg">{pkg.receiver_details?.name}</p>
                      <p className="text-xs text-slate-400 font-medium">Consignee</p>
                    </div>
                    {(pkg.receiver_details?.address || pkg.receiver_details?.city || pkg.receiver_details?.country) && (
                      <div className="flex items-start gap-3 text-slate-600">
                        <FiMapPin className="w-5 h-5 mt-0.5 shrink-0 text-slate-300" />
                        <p className="text-sm leading-relaxed">{pkg.receiver_details?.address} <br /> {pkg.receiver_details?.city}, {pkg.receiver_details?.country}</p>
                      </div>
                    )}
                    {pkg.receiver_details?.phone && (
                      <div className="flex items-center gap-3 text-slate-600">
                        <FiPhone className="w-5 h-5 shrink-0 text-slate-300" />
                        <span className="text-sm font-medium">{pkg.receiver_details?.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
