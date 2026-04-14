import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Medal, MousePointer2Off } from "lucide-react";
import { homeDoctorsStyles as hds, iconSize } from "../assets/styles/styles.js";

const HomeDoctors = ({ previewCount = 8 }) => {
  const API_BASE = "http://localhost:3001";

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch doctors from server side
  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_BASE}/api/doctors`);
        const json = await res.json().catch(() => null);

        if (!res.ok) {
          const msg =
            (json && json.message) || `Failed to load doctors (${res.status})`;
          if (!mounted) return;
          setError(msg);
          setDoctors([]);
          setLoading(false);
          return;
        }
        const items = (json && (json.data || json)) || [];
        const normalized = (Array.isArray(items) ? items : []).map((d) => {
          const id = d._id || d.id;
          const image =
            d.imageUrl || d.image || d.imageSmall || d.imageSrc || "";
          const available =
            (typeof d.availability === "string"
              ? d.availability.toLowerCase() === "available"
              : typeof d.available === "boolean"
                ? d.available
                : d.availability === true) || d.availability === "Available";
          return {
            id,
            name: d.name || "Unknown",
            specialization: d.specialization || "",
            image,
            experience:
              d.experience || d.experience === 0 ? String(d.experience) : "",
            fee: d.fee ?? d.price ?? 0,
            available,
            raw: d,
          };
        });

        if (!mounted) return;
        setDoctors(normalized);
      } catch (err) {
        if (!mounted) return;
        console.error("load doctors error:", err);
        setError("Network error while loading doctors.");
        setDoctors([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [API_BASE]);

  const preview = doctors.slice(0, previewCount);

  return (
    <section className={hds.section}>
      <div className={hds.container}>
        <div className={hds.header}>
          <h1 className={hds.title}>
            Our <span className={hds.titleSpan}>Medical Team</span>
          </h1>
          <p className={hds.subtitle}>
            Book appointments quickly with our verified specialists
          </p>
        </div>

        {/* ERROR */}
        {error ? (
          <div className={hds.errorContainer}>
            <div className={hds.errorText}>{error}</div>
            <button
              onClick={() => {
                setLoading(true);
                setError("");
                (async () => {
                  try {
                    const res = await fetch(`${API_BASE}/api/doctors`);
                    const json = await res.json().catch(() => null);
                    const items = (json && (json.data || json)) || [];
                    const normalized = (Array.isArray(items) ? items : []).map(
                      (d) => {
                        const id = d._id || d.id;
                        const image = d.imageUrl || d.image || "";
                        const available =
                          (typeof d.availability === "string"
                            ? d.availability.toLowerCase() === "available"
                            : typeof d.available === "boolean"
                              ? d.available
                              : d.availability === true) ||
                          d.availability === "Available";
                        return {
                          id,
                          name: d.name || "Unknown",
                          specialization: d.specialization || "",
                          image,
                          experience: d.experience || "",
                          fee: d.fee ?? d.price ?? 0,
                          available,
                          raw: d,
                        };
                      },
                    );
                    setDoctors(normalized);
                    setError("");
                  } catch (err) {
                    console.error(err);
                    setError("Network error while loading doctors.");
                    setDoctors([]);
                  } finally {
                    setLoading(false);
                  }
                })();
              }}
              className={hds.retryButton}
            >
              Retry
            </button>
          </div>
        ) : null}

        {loading ? (
          <div className={hds.skeletonGrid}>
            {Array.from({ length: previewCount }).map((_, i) => (
              <div className={hds.skeletonCard} key={i}>
                <div className={hds.skeletonImage}></div>
                <div className={hds.skeletonText1}></div>
                <div className={hds.skeletonText2}></div>
                <div className="flex gap-2 mt-auto">
                  <div className={hds.skeletonButton}></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={hds.doctorsGrid}>
            {preview.map((doctor) => (
              <article key={doctor.id || doctor.name} className={hds.article}>
                {doctor.available ? (
                  <Link
                    to={`doctors/${doctor.id}`}
                    state={{
                      doctor: doctor.raw || doctor,
                    }}
                  >
                    <div className={hds.imageContainerAvailable}>
                      <img
                        src={doctor.image || "/placeholder-doctor.jpg"}
                        alt={doctor.name}
                        loading="lazy"
                        className={hds.image}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/placeholder-doctor.jpg";
                        }}
                      />
                    </div>
                  </Link>
                ) : (
                  <div className={hds.imageContainerUnavailable}>
                    <img
                      src={doctor.image || "/placeholder-doctor.jpg"}
                      alt={doctor.name}
                      loading="lazy"
                      className={hds.image}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/placeholder-doctor.jpg";
                      }}
                    />

                    <div className={hds.unavailableBadge}>Not Available</div>
                  </div>
                )}

                {/* BODY */}
                <div className={hds.cardBody}>
                  <h3
                    className={hds.doctorName}
                    id={`doctor-${doctor.id}-name`}
                  >
                    {doctor.name}
                  </h3>

                  <p className={hds.specialization}>{doctor.specialization}</p>

                  <div className={hds.experienceContainer}>
                    <div className={hds.experienceBadge}>
                      <Medal className={`${iconSize.small} h-4`} />
                      <span>{doctor.experience} years experience</span>
                    </div>
                  </div>

                  <div className={hds.buttonContainer}>
                    <div className="w-full">
                      {doctor.available ? (
                        <Link
                          className={hds.buttonAvailable}
                          to={`/doctors/${doctor.id}`}
                          state={{
                            doctor: doctor.raw || doctor,
                          }}
                        >
                          <ChevronRight className="w-5 h-5" />
                          Book Now
                        </Link>
                      ) : (
                        <button className={hds.buttonUnavailable} disabled>
                          <MousePointer2Off className="h-5 w-5" />
                          Not Available
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
      <style>{hds.customCSS}</style>
    </section>
  );
};

export default HomeDoctors;
