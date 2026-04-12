/**
 * SERVICE PAGE LEAD BUTTONS
 * Show WhatsApp + Call actions only on service routes.
 */
import React, { useState, useEffect, memo } from "react";
import { useLocation } from "react-router-dom";

const HALDWANI_COORDS = { lat: 29.218, lon: 79.512 };
const HALDWANI_RADIUS_KM = 60;

function getDistanceKm(lat1, lon1, lat2, lon2) {
  const toRad = (value) => (value * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return 6371 * c;
}

async function fetchIpLocation() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

const WhatsAppButton = memo(function WhatsAppButton() {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const [isLocal, setIsLocal] = useState(null);

  const isAdmin = pathname.startsWith("/admin");
  const isServicePage = /\/(electrician|solar|interior|service)/i.test(
    pathname,
  );
  const isHiddenPage =
    pathname.includes("/tools") || pathname.includes("/blog");
  const waPhone = "919258133689";
  const telPhone = "+919258133689";
  const waMessage = "Hello, I need service in Haldwani. Please share details.";
  const ctaText =
    isLocal === false ? "Get Help on WhatsApp" : "Book Electrician Service";
  const secondaryText = isLocal === false ? "Explore More Tools" : "Call Now";
  const secondaryHref = isLocal === false ? "/tools" : `tel:${telPhone}`;

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const markLocal = (value) => {
      if (!cancelled) setIsLocal(value);
    };

    const tryIp = async () => {
      const location = await fetchIpLocation();
      if (cancelled || !location) {
        markLocal(false);
        return;
      }
      const city = (location.city || "").toLowerCase();
      const region = (location.region || "").toLowerCase();
      const nearbyCity =
        city.includes("haldwani") || region.includes("nainital");
      if (nearbyCity) {
        markLocal(true);
        return;
      }
      markLocal(false);
    };

    if (navigator.geolocation) {
      const geoTimeout = window.setTimeout(() => {
        void tryIp();
      }, 2500);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          window.clearTimeout(geoTimeout);
          const { latitude, longitude } = position.coords;
          const dist = getDistanceKm(
            latitude,
            longitude,
            HALDWANI_COORDS.lat,
            HALDWANI_COORDS.lon,
          );
          markLocal(dist <= HALDWANI_RADIUS_KM);
        },
        () => {
          window.clearTimeout(geoTimeout);
          void tryIp();
        },
        { maximumAge: 1000 * 60 * 5, timeout: 5000 },
      );
    } else {
      void tryIp();
    }

    return () => {
      cancelled = true;
    };
  }, []);

  if (isAdmin || !show || isLocal === null || !isServicePage || isHiddenPage)
    return null;

  return (
    <div
      aria-label="Service contact actions"
      style={{
        position: "fixed",
        right: 20,
        bottom: 20,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        zIndex: 9999,
      }}
    >
      <a
        href={`https://wa.me/${waPhone}?text=${encodeURIComponent(waMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          minWidth: 200,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          padding: "14px 18px",
          borderRadius: 9999,
          background: "#25d366",
          color: "#fff",
          fontWeight: 700,
          textDecoration: "none",
          boxShadow: "0 14px 30px rgba(37, 211, 102, 0.22)",
          transition: "transform 0.18s ease, box-shadow 0.18s ease",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "translateY(-2px)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "translateY(0)")
        }
      >
        <span style={{ fontSize: 18 }}>💬</span>
        {ctaText}
      </a>

      <a
        href={secondaryHref}
        style={{
          minWidth: 200,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          padding: "14px 18px",
          borderRadius: 9999,
          background: "#111827",
          color: "#fff",
          fontWeight: 700,
          textDecoration: "none",
          boxShadow: "0 14px 30px rgba(15, 23, 42, 0.18)",
          transition: "transform 0.18s ease, box-shadow 0.18s ease",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "translateY(-2px)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "translateY(0)")
        }
      >
        <span style={{ fontSize: 18 }}>{isLocal === false ? "🧭" : "📞"}</span>
        {secondaryText}
      </a>
    </div>
  );
});

export default WhatsAppButton;
