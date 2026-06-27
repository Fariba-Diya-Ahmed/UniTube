import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import LoginModal from "../components/LoginModal";
import heroLight from "../assets/hero-light.png";
import heroDark from "../assets/hero-dark.png";
const departments=[
    {icon:"💻",name: "Computer Science & Engineering (CSE)", count:"40+ courses"},
    { icon: "📊", name: "Data Science (DS)", count: "25+ courses" },
    {icon:"💻",name: "Software Engineering (SWE)", count:"40+ courses"},
    { icon: "⚡", name: "Electrical & Electronics Engineering (EEE)", count: "20+ courses" },
    { icon: "🎓", name: "All Depts.", count: "100+ courses" }

];
const videos = [
  { title: "Algorithm Design and Analysis", channel: "Abdul Bari • English", badge: "CSE", bg: "linear-gradient(135deg,#1A312C,#428475)" },
  { title: "Artificial Intelligence", channel: "MIT OpenCourse • English", badge: "CSE", bg: "linear-gradient(135deg,#428475,#89D7B7)" },
  { title: "Data Structures", channel: "Jenny's Lectures • English", badge: "CSE", bg: "linear-gradient(135deg,#2a5a4a,#428475)" },
];

const stats = [
  { num: "3+", label: "Departments" },
  { num: "100+", label: "Courses" },
  { num: "500+", label: "Video lectures" },
  { num: "24/7", label: "Access anytime" },
];

export default function Home({ dark, setDark}){
    const [showModal, setShowModal]=useState(false);
    const navigate=useNavigate();

    const t={
     bg: dark ? "#0f1a17" : "#FFF4E1",
     bg2: dark ? "#141f1b" : "#f5ead0",
     text: dark ? "#e8f5f0" : "#1A312C",
     text2: dark ? "#89D7B7" :  "#428475",
     cardBg: dark ? "#1a2e28" : "#ffffff",
     border: dark ? "#2a4a3e" : "#d4c9b0",
     navBg: dark ? "#0a1210" : "#1A312C",
     searchBg: dark ? "#1a2e28" : "#ffffff",
     tagBg: dark ? "#1a2e28" : "#ffffff",
     btnBg: dark ? "#428475" : "#1A312C",       
    }
  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: t.bg, color: t.text, minHeight: "100vh" }}>
      <Navbar dark={dark} setDark={setDark} />

      {/* HERO */}
      <div style={{ background: t.bg }}>
        <div style={{ padding: "60px 40px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ flex: 1.2 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: t.text2, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>
              
            </div>
            <h1 style={{ fontSize: 44, fontWeight: 800, color: t.text, lineHeight: 1.15, marginBottom: 14 }}>
              University Course<br />
              <span style={{ color: dark ? "#89D7B7" : "#428475", fontStyle: "italic" }}>Video</span> Library
            </h1>
            <p style={{ fontSize: 14, color: t.text2, marginBottom: 24, lineHeight: 1.7 }}><br/>
              Your courses, anytime anywhere.<br />One platform for lectures from all departments.<br/><br/>
            </p>
            <div style={{ display: "flex", background: t.searchBg, border: `1.5px solid ${t.border}`, borderRadius: 10, overflow: "hidden", maxWidth: 440 }}>
              <input type="text" placeholder="Search any subject or course..."
                onKeyDown={(e) => e.key === "Enter" && setShowModal(true)}
                style={{ flex: 1, padding: "11px 14px", border: "none", outline: "none", fontSize: 13, color: t.text, background: "transparent" }} />
              <button onClick={() => setShowModal(true)}
                style={{ background: t.btnBg, color: "white", border: "none", padding: "11px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                Search
              </button>
            </div>
            <div style={{ marginTop: 10, display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ fontSize: 11, color: t.text2 }}>Popular:</span>
              {["Algorithm", "AI", "Data Structures", "Database"].map((tag) => (
                <span key={tag} onClick={() => setShowModal(true)}
                  style={{ fontSize: 11, color: t.text, background: t.tagBg, border: `1px solid ${t.border}`, borderRadius: 20, padding: "3px 10px", cursor: "pointer" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
<div
    style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }}
>
    <img
        src={dark ? heroDark : heroLight}
        alt="UniTube Hero"
        style={{
            width: "100%",
            maxWidth: "520px",
            height: "auto",
            objectFit: "contain",
            transition: "0.4s ease",
            filter: dark
                ? "drop-shadow(0 0 25px rgba(137,215,183,0.25))"
                : "drop-shadow(0 15px 30px rgba(0,0,0,0.15))",
        }}
    />
</div>
        </div>
      </div>

      {/* STATS */}
      <div style={{ background: t.navBg, padding: "24px 40px", display: "flex", justifyContent: "center", gap: 56, borderTop: "1px solid rgba(137,215,183,0.1)" }}>
        {stats.map((s) => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#89D7B7" }}>{s.num}</div>
            <div style={{ fontSize: 11, color: "#89D7B7", opacity: 0.6 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* DEPARTMENTS */}
      <div style={{ padding: "48px 40px", background: t.bg }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: t.text2, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Browse by department</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: t.text, marginBottom: 24 }}>Which department are you in?</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
            {departments.map((d) => (
              <div key={d.name} onClick={() => setShowModal(true)}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#428475"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.transform = "translateY(0)"; }}
                style={{ background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 10, padding: "16px 12px", textAlign: "center", cursor: "pointer", transition: "all 0.2s" }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{d.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: t.text }}>{d.name}</div>
                <div style={{ fontSize: 10, color: t.text2, marginTop: 2 }}>{d.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* VIDEOS */}
      <div style={{ background: t.bg2, padding: "48px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: t.text2, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Trending now</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: t.text, marginBottom: 24 }}>Popular video lectures</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {videos.map((v) => (
              <div key={v.title} onClick={() => setShowModal(true)}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                style={{ background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 12, overflow: "hidden", cursor: "pointer", transition: "all 0.2s" }}>
                <div style={{ height: 130, background: v.bg, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <div style={{ position: "absolute", top: 8, left: 8, background: "#89D7B7", color: "#1A312C", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 4 }}>{v.badge}</div>
                  <div style={{ width: 40, height: 40, background: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>▶</div>
                </div>
                <div style={{ padding: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: t.text, marginBottom: 3, lineHeight: 1.4 }}>{v.title}</div>
                  <div style={{ fontSize: 11, color: t.text2 }}>{v.channel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: t.navBg, padding: "36px 40px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 28 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#89D7B7", marginBottom: 6 }}>🎬 UniTube</div>
            <div style={{ fontSize: 12, color: "#89D7B7", opacity: 0.5, maxWidth: 220, lineHeight: 1.6 }}>Metropolitan University, Sylhet এর official course video library।</div>
          </div>
          {[
            { title: "Platform", links: ["Browse courses", "Departments", "My dashboard"] },
            { title: "Account", links: ["Sign in", "Register"] },
            { title: "University", links: ["Metropolitan University", "CSE Department", "Contact"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 style={{ fontSize: 11, fontWeight: 700, color: "#89D7B7", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>{col.title}</h4>
              {col.links.map((l) => (
                <a key={l} href="#" onClick={(e) => { e.preventDefault(); setShowModal(true); }}
                  style={{ display: "block", fontSize: 12, color: "#89D7B7", opacity: 0.5, textDecoration: "none", marginBottom: 5 }}>{l}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(137,215,183,0.1)", paddingTop: 16, display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontSize: 11, color: "#89D7B7", opacity: 0.35 }}>© 2024 UniTube • Metropolitan University, Sylhet</div>
          <div style={{ fontSize: 11, color: "#89D7B7", opacity: 0.35 }}>Made by Iffath & Fariba</div>
        </div>
      </footer>

      <LoginModal show={showModal} onClose={() => setShowModal(false)} dark={dark} />
    </div>
  );
}