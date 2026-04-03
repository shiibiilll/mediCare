import React, { useState, useEffect, useMemo } from "react";
import {
  BadgeIndianRupee,
  EyeClosed,
  Search,
  Star,
  Trash2,
  User,
  Users,
} from "lucide-react";
import { doctorListStyles as dls } from "../assets/dummyStyles.js";

// Helper Functions
// Give Output As DD-MM-YYYY
function formatDateISO(iso) {
  if (!iso || typeof iso !== "string") return iso;
  const parts = iso.split("-");
  if (parts.length !== 3) return iso;
  const [y, m, d] = parts;
  const dateObj = new Date(Number(y), Number(m) - 1, Number(d));
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = String(Number(d));
  const month = monthNames[dateObj.getMonth()] || "";
  return `${day} ${month} ${y}`;
}

// Normalize Any Date Like String
function normalizeToDateString(d) {
  if (!d) return null;
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return null;
  return dt.toISOString().split("T")[0];
}

// Normalize Schedule Map: YYYY-MM-DD : [slot1, slot2...]
// Also Converts Slots To Array Slots
function buildScheduleMap(schedule) {
  const map = {};
  if (!schedule || typeof schedule !== "object") return map;
  Object.entries(schedule).forEach(([k, v]) => {
    const nd = normalizeToDateString(k) || String(k);
    map[nd] = Array.isArray(v) ? v.slice() : [];
  });
  return map;
}

// Past Dates First and Nearest Date Comes First
function getSortedScheduleDates(scheduleLike) {
  let keys = [];
  if (Array.isArray(scheduleLike)) {
    keys = scheduleLike.map(normalizeToDateString).filter(Boolean);
  } else if (scheduleLike && typeof scheduleLike === "object") {
    keys = Object.keys(scheduleLike).map(normalizeToDateString).filter(Boolean);
  }

  keys = Array.from(new Set(keys));
  const parsed = keys.map((ds) => ({ ds, date: new Date(ds) }));
  const dateVal = (d) => Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());

  const today = new Date();
  const todayVal = dateVal(today);

  const past = parsed
    .filter((p) => dateVal(p.date) < todayVal)
    .sort((a, b) => dateVal(b.date) - dateVal(a.date));

  const future = parsed
    .filter((p) => dateVal(p.date) >= todayVal)
    .sort((a, b) => dateVal(a.date) - dateVal(b.date));

  return [...past, ...future].map((p) => p.ds);
}

const ListPage = () => {
  const API_BASE = "http://localhost:3001";

  const [doctors, setDoctors] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(false);

  const [isMobileScreen, setIsMobileScreen] = useState(false);
  useEffect(() => {
    function onResize() {
      if (typeof window === "undefined") return;
      setIsMobileScreen(window.innerWidth < 640);
    }
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Fetch Doctors
  async function fetchDoctors() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/doctors`);
      const body = await res.json().catch(() => null);

      if (res.ok && body && body.success) {
        const list = Array.isArray(body.data)
          ? body.data
          : Array.isArray(body.doctors)
            ? body.doctors
            : [];
        const normalized = list.map((d) => {
          const scheduleMap = buildScheduleMap(d.schedule || {});
          return {
            ...d,
            schedule: scheduleMap,
          };
        });
        setDoctors(normalized);
      } else {
        console.error("Failed to fetch doctors", { status: res.status, body });
        setDoctors([]);
      }
    } catch (err) {
      console.error("Network error fetching doctors", err);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Filter Doctors
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = doctors;
    if (filterStatus === "available") {
      list = list.filter(
        (d) => (d.availability || "").toString().toLowerCase() === "available",
      );
    } else if (filterStatus === "unavailable") {
      list = list.filter(
        (d) => (d.availability || "").toString().toLowerCase() !== "available",
      );
    }
    if (!q) return list;
    return list.filter((d) => {
      return (
        (d.name || "").toLowerCase().includes(q) ||
        (d.specialization || "").toLowerCase().includes(q)
      );
    });
  }, [doctors, query, filterStatus]);

  // Show Doctors According To Filter
  const displayed = useMemo(() => {
    if (showAll) return filtered;
    return filtered.slice(0, 6);
  }, [filtered, showAll]);

  function toggle(id) {
    setExpanded((prev) => (prev === id ? null : id));
  }

  async function removeDoctor(id) {
    const doc = doctors.find((d) => (d._id || d.id) === id);
    if (!doc) return;
    const ok = window.confirm(`Delete ${doc.name}? This Cannot Be Undone.`);
    if (!ok) return;

    try {
      const res = await fetch(`${API_BASE}/api/doctors/${id}`, {
        method: "DELETE",
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) {
        alert(body?.message || "Failed to delete");
        return;
      }
      setDoctors((prev) => prev.filter((p) => (p._id || p.id) !== id));
      if (expanded === id) setExpanded(null);
    } catch (err) {
      console.error("delete error", err);
      alert("Network error deleting doctor");
    }
  }

  // Shows All The Doctors Or The Filtered Ones
  function applyStatusFilter(status) {
    setFilterStatus((prev) => (prev === status ? "all" : status));
    setExpanded(null);
    setShowAll(false);
  }

  return (
    <div className={dls.container}>
      <header className={dls.headerContainer}>
        <div className={dls.headerTopSection}>
          <div className={dls.headerIconContainer}>
            <div className={dls.headerIcon}>
              <Users size={20} className={dls.headerIconSvg} />
            </div>
            <div>
              <h1 className={dls.headerTitle}>Find a Doctor</h1>
              <p className={dls.headerSubtitle}>
                Search by name or specialization
              </p>
            </div>
          </div>

          <div className={dls.headerSearchContainer}>
            <div className={dls.searchBox}>
              <Search size={16} className={dls.searchIcon} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Doctors, Specialization"
                className={dls.searchInput}
              />
            </div>

            <button
              onClick={() => {
                setQuery("");
                setExpanded(null);
                setShowAll(false);
                setFilterStatus("all");
              }}
              className={dls.clearButton}
            >
              Clear
            </button>
          </div>
        </div>

        <div className={dls.filterContainer}>
          <button
            className={dls.filterButton(
              filterStatus === "available",
              "emerald",
            )}
            onClick={() => applyStatusFilter("available")}
          >
            Available
          </button>

          <button
            className={dls.filterButton(filterStatus === "unavailable", "red")}
            onClick={() => applyStatusFilter("unavailable")}
          >
            Unavailable
          </button>
        </div>
      </header>

      <main className={dls.gridContainer}>
        {loading && (
          <div className={dls.loadingContainer}>Loading Doctors...</div>
        )}
        {!loading && filtered.length === 0 && (
          <div className={dls.noResultsContainer}>
            No Doctors Match Your Search.
          </div>
        )}

        {displayed.map((doc) => {
          const id = doc.id || doc._id;
          const isOpen = expanded === id;
          const isAvailable = doc.availability === "Available";

          const scheduleMap = buildScheduleMap(doc.schedule || {});
          const sortedDates = getSortedScheduleDates(scheduleMap);

          return (
            <article key={id} className={dls.article}>
              <div className={dls.articleContent}>
                <img
                  src={doc.imageUrl || doc.image || " "}
                  alt="doc.name"
                  className={dls.doctorImage}
                />

                <div className={dls.doctorInfoContainer}>
                  <div className={dls.doctorHeader}>
                    <div className="min-w-0 w-full">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className={dls.doctorName}>{doc.name}</h3>
                        <span className={dls.availabilityBadge(isAvailable)}>
                          <span className={dls.availabilityDot(isAvailable)} />

                          {isAvailable ? "Available" : "Unavailable"}
                        </span>
                      </div>

                      <div className={dls.doctorDetails}>
                        {doc.specialization} • {doc.experience} years
                      </div>
                    </div>

                    <div className={dls.ratingContainer}>
                      <div className={dls.rating}>
                        <Star size={14} /> {doc.rating}
                      </div>

                      <button
                        onClick={() => toggle(id)}
                        className={dls.toggleButton(isOpen)}
                      >
                        <EyeClosed size={18} />
                      </button>
                    </div>
                  </div>

                  <div className={dls.statsContainer}>
                    <div className={dls.statsLabel}>Patients</div>
                    <div className={dls.statsValue}>
                      <User size={14} /> {doc.patients}
                    </div>

                    <div className={dls.actionContainer}>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => removeDoctor(id)}
                          className={dls.deleteButton}
                        >
                          <Trash2 size={14} /> Delete
                        </button>

                        <div className={dls.feesLabel}>Fees:</div>
                        <div className={dls.feesValue}>
                          <BadgeIndianRupee size={14} />
                          {doc.fee}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AFTER EXPAND IS DONE */}
              <div
                className={dls.expandableContent}
                style={{
                  maxHeight: isOpen ? (isMobileScreen ? 320 : 600) : 0,
                  transition:
                    "max-height 420ms cubic-bezier(.2,.9,.2,1), padding 220ms ease",
                  paddingTop: isOpen ? 16 : 0,
                  paddingBottom: isOpen ? 16 : 0,
                }}
              >
                {isOpen && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className={dls.aboutSection}>
                      <h4 className={dls.aboutHeading}>About</h4>
                      <p className={dls.aboutText}>{doc.about}</p>

                      <div className="mt-4">
                        <div className={dls.qualificationsHeading}>
                          Qualifications
                        </div>
                        <div className={dls.qualificationsText}>
                          {doc.qualification || doc.qualifications}
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className={dls.scheduleHeading}>Schedule</div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {sortedDates.map((date) => {
                            const slots = scheduleMap[date] || [];
                            return (
                              <div key={date} className="min-w-full md:min-w-0">
                                <div className={dls.scheduleDate}>
                                  {formatDateISO(date)}
                                </div>
                                <div className="mt-1 flex flex-wrap gap-2">
                                  {slots.map((s, i) => (
                                    <span key={i} className={dls.scheduleSlot}>
                                      {s}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <aside className={dls.statsSidebar}>
                      <div className={dls.statsItemHeading}>Success</div>
                      <div className={dls.statsItemValue}>{doc.success}%</div>

                      <div className={dls.statsItemHeading}>Patients</div>
                      <div className={dls.statsItemValue}>{doc.patients}</div>

                      <div className={dls.statsItemHeading}>Location</div>
                      <div className={dls.locationValue}>{doc.location}</div>
                    </aside>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </main>
    </div>
  );
};

export default ListPage;
